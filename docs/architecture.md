---
id: architecture
title: Architecture
sidebar_label: Architecture
sidebar_position: 2
---

# DataOS Architecture

**Three-layer architecture designed for modularity, scalability, and cloud independence.**

---

## High-Level Overview

DataOS implements a layered architecture that separates concerns and provides clear boundaries between user space, platform engine, and infrastructure.

<div className="image-placeholder">
  [Architecture Diagram - Three Layers]
  <br/>
  User Space ↔ Core Kernel ↔ Cloud Kernel
</div>

---

## Layer 1: User Space

**Where data developers work and interact with DataOS.**

### Components

#### Interfaces

| Interface | Purpose | Use Case |
|-----------|---------|----------|
| **CLI** | Command-line operations | Automation, CI/CD pipelines |
| **GUI** | Visual interface | Data exploration, monitoring |
| **API** | Programmatic access | Custom integrations, SDKs |

#### Resources

Declarative units representing infrastructure components:

- **Data Connection**: Depot, Lakehouse
- **Data Processing**: Workflow, Service, Worker
- **Security**: Policy, Secret, Grant
- **Infrastructure**: Cluster, Compute, Volume
- **Observability**: Monitor, Pager

### User Layer Characteristics

**Declarative:**
```yaml
name: my-resource
version: v1
type: workflow
# User declares what, not how
```

**Version Controlled:**
```bash
git add workflow.yaml
git commit -m "Add sales pipeline"
git push
```

**Multi-tenant:**
```bash
# Isolated workspaces
dataos-ctl apply -f workflow.yaml -w analytics
dataos-ctl apply -f workflow.yaml -w sales
```

---

## Layer 2: Core Kernel

**The DataOS platform engine that powers all operations.**

### Key Services

#### Poros - Orchestration Engine

**Purpose:** Resource lifecycle management and state reconciliation.

**Responsibilities:**
- Monitor resource states
- Reconcile desired vs actual state
- Manage resource versions
- Handle resource dependencies
- Coordinate service interactions

**Operator Pattern:**

```
User applies YAML → Poros receives spec
                  → Poros creates resources
                  → Monitors continuously
                  → Reconciles state
```

#### Heimdall - Governance Engine

**Purpose:** Access control and policy enforcement.

**Responsibilities:**
- Authenticate users and services
- Authorize resource access
- Enforce data policies
- Audit access logs
- Manage permissions

**Policy Decision Point (PDP):**

```
Request → Heimdall checks policy
       → Evaluates conditions
       → Returns allow/deny
       → Logs decision
```

**Example Policy:**

```yaml
name: sales-access
type: policy
policy:
  type: data
  rules:
    - resource: "urn:dataos:depot:sales"
      actions: [read]
      subjects:
        - "users:dataos:analyst"
      conditions:
        - "department == 'sales'"
```

#### Metis - Metadata Management

**Purpose:** Data cataloging and metadata services.

**Responsibilities:**
- Scan data sources
- Collect metadata
- Track lineage
- Manage glossary
- Quality metrics

**Metadata Flow:**

```
Data Source → Scanner extracts metadata
           → Metis stores in catalog
           → Indexed for search
           → Available via API/GUI
```

**Metadata Types:**
- **Technical**: Schema, types, statistics
- **Business**: Descriptions, owners, tags
- **Operational**: Quality, freshness, usage
- **Lineage**: Upstream/downstream relationships

#### Minerva - Query Engine

**Purpose:** Federated query execution across data sources.

**Architecture:**

```
Query → Coordinator parses
     → Optimizer plans execution
     → Workers fetch from sources
     → Results aggregated
     → Returned to user
```

**Characteristics:**
- **Distributed**: Parallel query execution
- **Federated**: Query across multiple sources
- **Decoupled**: Separate compute and storage
- **Scalable**: Add workers independently

**Supported Sources:**
- Relational databases (PostgreSQL, MySQL, Oracle)
- Data lakes (S3, GCS, Azure Blob)
- Lakehouses (Iceberg, Delta Lake, Hudi)
- Warehouses (Snowflake, BigQuery, Redshift)

#### Gateway - API Gateway

**Purpose:** Unified entry point for all API requests.

**Responsibilities:**
- Route requests to services
- Handle authentication
- Apply rate limiting
- Log requests
- Manage SSL/TLS

#### Database Services

**Purpose:** Persist platform state and metadata.

**Components:**
- **PostgreSQL**: Operational metadata
- **ElasticSearch**: Search indices
- **Redis**: Caching layer

---

## Layer 3: Cloud Kernel

**Infrastructure abstraction layer.**

### Purpose

Provide cloud-agnostic infrastructure management.

### Components

#### Kubernetes

**Container orchestration platform.**

**Responsibilities:**
- Schedule workloads
- Manage containers
- Handle scaling
- Provide service discovery
- Ensure high availability

**DataOS on Kubernetes:**

```
DataOS Resource → Kubernetes Deployment
               → Pods created
               → Containers running
               → Services exposed
```

#### Cloud Providers

**Infrastructure providers:**

- **AWS**: EC2, S3, RDS, EKS
- **GCP**: Compute Engine, Cloud Storage, GKE
- **Azure**: VMs, Blob Storage, AKS
- **On-prem**: VMware, OpenStack, bare metal

### Cloud Kernel Characteristics

**Abstraction:**
```yaml
# Same YAML works on any cloud
name: my-cluster
type: cluster
cluster:
  compute:
    - name: default
      replicas: 3
      instanceType: standard
  # Cloud-specific details abstracted
```

**Infrastructure as Code:**
```hcl
# Deployed using Terraform/Pulumi
module "dataos" {
  source = "dataos/platform"
  cloud  = "aws"
  region = "us-east-1"
}
```

---

## Communication Patterns

### User to Core Kernel

**Protocol:** HTTPS REST API

```
CLI/GUI/API → API Gateway → Service
                          → Response
```

**Authentication:**
- JWT tokens
- OAuth 2.0 / OIDC
- API keys

### Service to Service

**Protocol:** gRPC / REST

```
Service A → Service Discovery
         → Load Balancer
         → Service B
```

**Security:**
- mTLS (mutual TLS)
- Service mesh
- Network policies

### Core Kernel to Cloud Kernel

**Protocol:** Kubernetes API

```
Poros → Kubernetes API
     → Create resources
     → Monitor status
     → Update state
```

---

## Data Flow Architecture

### Ingestion Flow

```
Source System → Depot → Workflow
                     → Processing (Flare/Bento)
                     → Lakehouse/Warehouse
```

### Query Flow

```
User → Workbench → Minerva Query Engine
                → Data Sources (via Depot)
                → Results
```

### Governance Flow

```
Request → Heimdall Policy Check
       → Gateway Data Filtering
       → Resource Access
       → Audit Log
```

---

## Microservices Design

### Characteristics

**Loosely Coupled:**
- Independent deployment
- No shared state
- API-based communication
- Failure isolation

**Polyglot:**
- Go for performance-critical services
- Python for data processing
- Java for query engine
- JavaScript for UI

**Scalable:**
- Horizontal scaling
- Stateless design
- Load balancing
- Auto-scaling

**Resilient:**
- Health checks
- Circuit breakers
- Retry logic
- Graceful degradation

---

## Storage Architecture

### Metadata Storage

```
PostgreSQL → Operational metadata
          → Resource definitions
          → User data
          → Audit logs

ElasticSearch → Search indices
             → Catalog metadata
             → Logs aggregation
```

### Data Storage

```
Object Storage → S3/GCS/Azure Blob
              → Lakehouse formats
              → Parquet/ORC files
              → Iceberg/Delta tables

Caching → Redis
       → Query results
       → Session data
       → Temporary state
```

---

## Security Architecture

### Network Security

**Layers:**

1. **Perimeter**: WAF, DDoS protection
2. **Network**: VPC, subnets, security groups
3. **Service**: Network policies, service mesh
4. **Application**: API authentication, authorization

**Zero Trust:**
- No implicit trust
- Verify every request
- Least privilege access
- Continuous monitoring

### Identity & Access

**Components:**

- **Authentication**: OAuth 2.0, OIDC, SAML
- **Authorization**: RBAC + ABAC
- **Service Identity**: mTLS, JWT
- **Secrets Management**: Vault integration

### Data Security

**At Rest:**
- Encryption (AES-256)
- Key management
- Volume encryption

**In Transit:**
- TLS 1.3
- Certificate rotation
- Encrypted connections

**In Use:**
- Data masking
- Row-level security
- Column-level encryption

---

## Scalability Architecture

### Horizontal Scaling

**Stateless Services:**
```
Load Balancer → Service Instance 1
             → Service Instance 2
             → Service Instance N
```

**Stateful Services:**
```
Coordinator → Worker 1
           → Worker 2
           → Worker N
```

### Vertical Scaling

**Resource Limits:**
```yaml
resources:
  requests:
    cpu: 1000m
    memory: 2Gi
  limits:
    cpu: 2000m
    memory: 4Gi
```

**Auto-scaling:**
- CPU-based
- Memory-based
- Custom metrics

---

## High Availability

### Multi-Zone Deployment

```
Region: us-east-1
  ├── Zone A: Active
  ├── Zone B: Active
  └── Zone C: Active
```

**Benefits:**
- No single point of failure
- Automatic failover
- Load distribution
- Disaster recovery

### Data Replication

- **Metadata**: Multi-master replication
- **Storage**: Cross-region replication
- **Cache**: Distributed caching

---

## Monitoring & Observability

### Metrics

**Collected:**
- Resource utilization
- Request rates
- Error rates
- Latency percentiles

**Tools:**
- Prometheus for collection
- Grafana for visualization
- Custom dashboards

### Logging

**Centralized:**
```
Services → Fluent Bit → ElasticSearch
                      → Kibana
```

**Log Levels:**
- ERROR: Critical issues
- WARN: Potential problems
- INFO: Normal operations
- DEBUG: Detailed debugging

### Tracing

**Distributed:**
```
Request → Service A (span)
       → Service B (span)
       → Service C (span)
       → End-to-end trace
```

**Tool:** OpenTelemetry

---

## Deployment Architecture

### CI/CD Pipeline

```
Code → Git Push
    → Build
    → Test
    → Deploy to Dev
    → Deploy to Staging
    → Deploy to Production
```

### Blue-Green Deployment

```
Blue Environment (Current)
Green Environment (New)
→ Test Green
→ Switch traffic
→ Blue becomes standby
```

### Rolling Update

```
v1: [Pod1] [Pod2] [Pod3]
→   [Pod1-v2] [Pod2] [Pod3]
→   [Pod1-v2] [Pod2-v2] [Pod3]
→   [Pod1-v2] [Pod2-v2] [Pod3-v2]
```

---

## Performance Optimization

### Caching Strategy

**Levels:**
1. **Application**: In-memory cache
2. **Service**: Redis cache
3. **CDN**: Static assets
4. **Database**: Query cache

### Query Optimization

- **Push-down**: Filters to source
- **Partition pruning**: Skip irrelevant data
- **Join optimization**: Efficient join strategies
- **Result caching**: Cache frequent queries

---

## Next Steps

<div className="grid grid-3">
  <div className="card">
    <div className="card-title">Resources</div>
    <div className="card-content">Learn about the building blocks deployed on this architecture.</div>
    <p><a href="/resources">Explore Resources →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Security</div>
    <div className="card-content">Deep dive into security policies and implementation.</div>
    <p><a href="/resources">Security Guide →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Operations</div>
    <div className="card-content">Monitor and manage the platform effectively.</div>
    <p><a href="/interfaces/gui">Operations →</a></p>
  </div>
</div>