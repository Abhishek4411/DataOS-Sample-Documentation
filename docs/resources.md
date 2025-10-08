---
id: resources
title: DataOS Resources
sidebar_label: Resources Overview
sidebar_position: 3
---

# DataOS Resources

**Atomic, declarative building blocks with managed lifecycles.**

---

## What are Resources?

Resources are **declarative units** that represent infrastructure components in DataOS. Each resource is:

- **Atomic**: Self-contained and independent
- **Declarative**: Describes desired state
- **Versioned**: Tracks changes over time
- **Composable**: Works with other resources
- **Managed**: Automatic lifecycle management

---

## Common Resource Structure

All DataOS resources share a common YAML structure:

```yaml
# Resource Metadata (Required)
name: resource-name
version: v1
type: resource-type

# Optional Metadata
tags:
  - environment:production
  - team:analytics
description: "Resource purpose and context"
owner: data-team
layer: user

# Resource-Specific Configuration (Required)
<resource-type>:
  # Type-specific fields
```

---

## Resource Categories

### Data Connection

Connect to external data sources and storage systems.

| Resource | Purpose | Example |
|----------|---------|---------|
| **Depot** | Connect databases, lakes, warehouses | PostgreSQL, S3, Snowflake |
| **Lakehouse** | Managed lakehouse storage | Iceberg, Delta Lake |

**Use Cases:**
- Connect to operational databases
- Access data lakes
- Query data warehouses
- Store processed data

---

### Data Processing

Execute data transformations and computations.

| Resource | Purpose | Example |
|----------|---------|---------|
| **Workflow** | Batch processing with DAGs | ETL pipelines, scheduled jobs |
| **Service** | Long-running processes | REST APIs, streaming consumers |
| **Worker** | Background task execution | Continuous computations |

**Use Cases:**
- ETL/ELT pipelines
- Data transformations
- API services
- Real-time processing

---

### Security & Governance

Manage access control and secure sensitive data.

| Resource | Purpose | Example |
|----------|---------|---------|
| **Policy** | Access control rules | Data masking, row-level security |
| **Secret** | Secure credential storage | Database passwords, API keys |
| **Grant** | Permission assignments | User access, role assignments |

**Use Cases:**
- Fine-grained access control
- Secure credential management
- Data governance
- Compliance requirements

---

### Observability

Monitor system health and manage incidents.

| Resource | Purpose | Example |
|----------|---------|---------|
| **Monitor** | System health checks | Resource monitoring, alerts |
| **Pager** | Incident management | Alert routing, escalations |

**Use Cases:**
- Performance monitoring
- Error detection
- Alert management
- Incident response

---

### Infrastructure

Manage compute resources and infrastructure.

| Resource | Purpose | Example |
|----------|---------|---------|
| **Cluster** | Compute resource pools | Dedicated clusters |
| **Compute** | Processing power allocation | Resource quotas |
| **Volume** | Persistent storage | Shared file systems |

**Use Cases:**
- Resource allocation
- Cost optimization
- Performance tuning
- Data persistence

---

## Resource Lifecycle

### States

```
Pending → Provisioning → Running → Active
                                  ↓
                              Terminated
```

**Pending:** Resource created, waiting for provisioning  
**Provisioning:** Infrastructure being allocated  
**Running:** Resource executing/operational  
**Active:** Stable running state  
**Terminated:** Resource deleted

### Transitions

**Create/Update:**
```bash
dataos-ctl apply -f resource.yaml
```

**Read:**
```bash
dataos-ctl get -t <type> -n <name>
```

**Delete:**
```bash
dataos-ctl delete -t <type> -n <name>
```

**Monitor:**
```bash
dataos-ctl log -t <type> -n <name>
```

---

## CRUD Operations

### Apply (Create/Update)

Create or update a resource from a YAML file.

```bash
# Apply single file
dataos-ctl apply -f depot.yaml

# Apply directory
dataos-ctl apply -f ./resources/

# Apply to specific workspace
dataos-ctl apply -f workflow.yaml -w analytics
```

**Idempotent:** Running apply multiple times produces the same result.

---

### Get (Read)

Retrieve resource information.

```bash
# List all resources of a type
dataos-ctl get -t workflow

# Get specific resource
dataos-ctl get -t workflow -n daily-etl

# Get with workspace
dataos-ctl get -t workflow -w analytics

# Output formats
dataos-ctl get -t depot -n postgres -o yaml
dataos-ctl get -t depot -n postgres -o json
```

---

### Delete

Remove a resource from the system.

```bash
# Delete by type and name
dataos-ctl delete -t workflow -n old-pipeline

# Delete from file
dataos-ctl delete -f workflow.yaml

# Delete from workspace
dataos-ctl delete -t workflow -n daily-etl -w analytics
```

:::warning
Deleted resources cannot be recovered. Ensure you have backups if needed.
:::

---

### Logs

View resource logs for debugging and monitoring.

```bash
# View recent logs
dataos-ctl log -t workflow -n daily-etl

# Follow logs (live tail)
dataos-ctl log -t workflow -n daily-etl -f

# Logs from specific time
dataos-ctl log -t service -n api --since 1h
dataos-ctl log -t workflow -n etl --since 2024-01-01
```

---

## Resource Composition

Resources can reference and depend on each other.

### Example: Workflow Using Depot

```yaml
# depot.yaml
name: postgres-source
version: v1
type: depot
depot:
  type: postgresql
  connection:
    host: db.example.com
    port: 5432
```

```yaml
# workflow.yaml
name: data-pipeline
version: v1
type: workflow
workflow:
  dag:
    - name: extract
      spec:
        stack: flare:7.0
        stackSpec:
          job:
            inputs:
              - depot: postgres-source
            outputs:
              - depot: lakehouse-target
```

**Benefits:**
- Reusable components
- Clear dependencies
- Modular architecture
- Easier testing

---

## Workspaces

Workspaces provide logical isolation for resources.

### Purpose

- **Multi-tenancy**: Separate team resources
- **Environment isolation**: Dev, staging, prod
- **Access control**: Workspace-level permissions
- **Resource organization**: Group related resources

### Operations

```bash
# List workspaces
dataos-ctl workspace list

# Create workspace
dataos-ctl workspace create -n analytics

# Delete workspace (must be empty)
dataos-ctl workspace delete -n old-workspace

# Deploy to workspace
dataos-ctl apply -f workflow.yaml -w analytics
```

### Default Workspace

Resources without explicit workspace go to `public`:

```bash
# Deployed to public workspace
dataos-ctl apply -f depot.yaml

# Explicitly to analytics
dataos-ctl apply -f depot.yaml -w analytics
```

---

## Resource Patterns

### Environment Variables

Use variables for configuration flexibility.

```yaml
name: ${ENV}-sales-pipeline
version: v1
type: workflow
description: "Pipeline for ${ENV} environment"

workflow:
  schedule:
    cron: "${CRON_SCHEDULE}"
  dag:
    - name: extract
      spec:
        stack: flare:7.0
        stackSpec:
          job:
            inputs:
              - depot: ${SOURCE_DEPOT}
```

**Deploy:**

```bash
ENV=production \
CRON_SCHEDULE="0 2 * * *" \
SOURCE_DEPOT=prod-postgres \
dataos-ctl apply -f workflow.yaml
```

---

### Naming Conventions

Use consistent, descriptive names.

**Good Names:**
```yaml
# Descriptive, hierarchical
name: sales-daily-etl-pipeline
name: customer-profile-api-service
name: postgres-production-depot
```

**Avoid:**
```yaml
# Vague, unclear
name: workflow1
name: test
name: my-depot
```

**Pattern:**
```
<domain>-<frequency>-<type>-<purpose>
  sales   daily      etl    pipeline
```

---

### Tagging Strategy

Apply consistent tags for organization and filtering.

```yaml
tags:
  - environment:production
  - team:analytics
  - domain:sales
  - criticality:high
  - frequency:daily
  - cost-center:marketing
```

**Use Cases:**
- Filter resources by tag
- Cost allocation
- Access policies
- Monitoring dashboards

---

### Version Control

Store all YAML files in Git for tracking and collaboration.

**Repository Structure:**

```
data-platform/
├── depots/
│   ├── postgres-sales.yaml
│   └── s3-datalake.yaml
├── workflows/
│   ├── daily-etl.yaml
│   └── hourly-sync.yaml
├── services/
│   ├── customer-api.yaml
│   └── analytics-api.yaml
├── policies/
│   ├── sales-access.yaml
│   └── pii-masking.yaml
└── README.md
```

**Workflow:**

```bash
# Create feature branch
git checkout -b add-new-pipeline

# Add resource
git add workflows/new-pipeline.yaml

# Commit with message
git commit -m "Add customer enrichment pipeline"

# Push and create PR
git push origin add-new-pipeline
```

---

## Resource Templates

Create reusable templates for common patterns.

### Template File

```yaml title="templates/etl-workflow.yaml"
name: ${PIPELINE_NAME}
version: v1
type: workflow
tags:
  - ${ENV}
  - ${TEAM}
description: "${DESCRIPTION}"

workflow:
  schedule:
    cron: "${SCHEDULE}"
  dag:
    - name: extract
      spec:
        stack: flare:7.0
        stackSpec:
          job:
            inputs:
              - depot: ${SOURCE}
            outputs:
              - depot: ${TARGET}
```

### Usage

```bash
# Set variables
export PIPELINE_NAME="sales-etl"
export ENV="production"
export TEAM="analytics"
export DESCRIPTION="Daily sales data ETL"
export SCHEDULE="0 2 * * *"
export SOURCE="postgres-sales"
export TARGET="lakehouse-sales"

# Apply template
envsubst < templates/etl-workflow.yaml | dataos-ctl apply -f -
```

---

## Best Practices

### Resource Design

**Single Responsibility**
- One resource, one purpose
- Avoid multi-function resources
- Keep configurations focused

**Idempotency**
- Same input = same output
- Safe to re-apply
- No side effects

**Declarative**
- Describe what, not how
- Let DataOS handle details
- Minimal imperative logic

---

### Security

**Credentials**
- Never hardcode secrets
- Use Secret resources
- Reference via environment variables

**Access Control**
- Apply least privilege
- Use workspace isolation
- Define explicit policies

**Audit**
- Enable logging
- Track resource changes
- Monitor access patterns

---

### Performance

**Resource Limits**
```yaml
compute: runnable-default

# Or custom
resources:
  requests:
    cpu: 500m
    memory: 1Gi
  limits:
    cpu: 2000m
    memory: 4Gi
```

**Optimization**
- Right-size resources
- Use appropriate compute tiers
- Enable caching where applicable
- Monitor and tune

---

### Maintainability

**Documentation**
```yaml
description: |
  Daily ETL pipeline for sales data.
  
  Source: PostgreSQL production database
  Target: Iceberg lakehouse
  Schedule: 2 AM UTC daily
  Owner: Analytics Team
  SLA: 99.5% success rate
```

**Comments**
```yaml
workflow:
  dag:
    - name: extract
      # Fetches last 24h of sales orders
      spec:
        stack: flare:7.0
```

---

## Resource Examples

### Minimal Depot

```yaml
name: my-database
version: v1
type: depot
depot:
  type: postgresql
  connection:
    host: localhost
    port: 5432
```

### Complete Workflow

```yaml
name: sales-etl
version: v1
type: workflow
tags:
  - production
  - sales
  - daily
description: "Daily sales data processing pipeline"
owner: analytics-team

workflow:
  schedule:
    cron: "0 2 * * *"
    timezone: UTC
  
  dag:
    - name: extract
      spec:
        stack: flare:7.0
        compute: runnable-default
        
        stackSpec:
          job:
            explain: true
            logLevel: INFO
            
            inputs:
              - name: sales_data
                depot: postgres-sales
            
            steps:
              - sequence:
                  - name: transform
                    sql: |
                      SELECT 
                        order_id,
                        customer_id,
                        order_date,
                        SUM(amount) as total
                      FROM sales_orders
                      WHERE order_date >= CURRENT_DATE - 1
                      GROUP BY order_id, customer_id, order_date
            
            outputs:
              - name: processed_sales
                depot: lakehouse-sales
```

---

## Troubleshooting

### Resource Not Starting

```bash
# Check resource status
dataos-ctl get -t workflow -n my-workflow -o yaml

# View logs
dataos-ctl log -t workflow -n my-workflow

# Common issues:
# - Invalid configuration
# - Missing dependencies
# - Insufficient resources
# - Permission denied
```

### Configuration Errors

```bash
# Validate before applying
dataos-ctl apply -f workflow.yaml --dry-run

# Check syntax
yamllint workflow.yaml
```

### Permission Issues

```bash
# Check your permissions
dataos-ctl auth whoami

# Verify workspace access
dataos-ctl workspace list

# Check resource ownership
dataos-ctl get -t workflow -n my-workflow -o yaml | grep owner
```

---

## Next Steps

<div className="grid grid-3">
  <div className="card">
    <div className="card-title">CLI Reference</div>
    <div className="card-content">Complete command reference for managing resources.</div>
    <p><a href="/interfaces/cli">CLI Guide →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Examples</div>
    <div className="card-content">Real-world resource configurations and patterns.</div>
    <p><a href="/quick-start">Examples →</a></p>
  </div>
  <div className="card">
    <div className="card-title">API Reference</div>
    <div className="card-content">Programmatic resource management via API.</div>
    <p><a href="/interfaces/api">API Docs →</a></p>
  </div>
</div>