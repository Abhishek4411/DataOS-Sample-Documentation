---
id: intro
title: DataOS Documentation
sidebar_label: Introduction
slug: /
---

# DataOS Documentation

**Enterprise-grade data product platform for building, managing, and scaling data products.**

---

## What is DataOS?

DataOS is a comprehensive data operating system that transforms how organizations create and manage data products. It provides the essential infrastructure, tools, and governance needed to build scalable data products efficiently.

<div className="grid grid-2">
  <div className="feature-box">
    <h3>Data Product Lifecycle Management</h3>
    <p>Complete lifecycle management from creation to consumption with integrated development, deployment, and monitoring capabilities.</p>
  </div>
  <div className="feature-box">
    <h3>Consumption Ready Layer</h3>
    <p>Context-aware discovery, secure exploration, reliable quality checks, and multi-interface activation for immediate data access.</p>
  </div>
  <div className="feature-box">
    <h3>Faster Time to Value</h3>
    <p>Accelerate development cycles with declarative infrastructure, automated provisioning, and built-in best practices.</p>
  </div>
  <div className="feature-box">
    <h3>AI-Powered Assistance</h3>
    <p>Leverage AI agents for intelligent recommendations and automated optimizations based on usage patterns.</p>
  </div>
</div>

---

## Platform Architecture

DataOS implements a three-layer architecture designed for modularity, scalability, and cloud independence.

<div className="image-placeholder">
  [Architecture Diagram]
  <br/>
  User Space -> Core Kernel -> Cloud Kernel
</div>

### Architecture Layers

| Layer | Purpose | Key Components |
|-------|---------|----------------|
| **User Space** | Development environment | CLI, GUI, API, Resources |
| **Core Kernel** | Platform engine | Poros, Heimdall, Metis, Minerva |
| **Cloud Kernel** | Infrastructure layer | Kubernetes, Cloud Providers |

**Learn More:**  
[View Complete Architecture →](/architecture)

---

## Getting Started

### Quick Installation

```bash
# Windows (PowerShell as Administrator)
iwr https://get.dataos.io/install.ps1 -useb | iex

# Verify installation
dataos-ctl version

# Initialize
dataos-ctl init
```

### First Deployment

Create your first resource in under 5 minutes:

```yaml title="depot.yaml"
name: my-first-depot
version: v1
type: depot
depot:
  type: postgresql
  connection:
    host: localhost
    port: 5432
    database: mydb
```

Deploy it:

```bash
dataos-ctl apply -f depot.yaml
```

**Next Steps:**  
[Complete Installation Guide →](/installation)  
[Quick Start Tutorial →](/quick-start)

---

## Core Components

### Resources

Resources are atomic, declarative units with managed lifecycles.

```yaml
# Common structure for all resources
name: resource-name
version: v1
type: resource-type
tags:
  - environment
  - team
description: "Resource purpose"

<resource-type>:
  # Type-specific configuration
```

**Resource Categories:**

- **Data Connection**: Depot, Lakehouse
- **Data Processing**: Workflow, Service, Worker
- **Security**: Policy, Secret, Grant
- **Infrastructure**: Cluster, Compute, Volume
- **Observability**: Monitor, Pager

[Explore All Resources →](/resources)

### Workspaces

Logical isolation for multi-tenancy and resource organization.

```bash
# List all workspaces
dataos-ctl workspace list

# Create new workspace
dataos-ctl workspace create -n analytics

# Deploy to specific workspace
dataos-ctl apply -f workflow.yaml -w analytics
```

---

## Key Features

<div className="comparison-table">

| Traditional Approach | DataOS Approach |
|---------------------|-----------------|
| Multiple disconnected tools | Unified platform |
| Manual orchestration | Automated lifecycle management |
| Infrastructure-focused | Data product-focused |
| Weeks to deploy | Hours to deploy |
| Vendor lock-in | Cloud-agnostic |
| Limited governance | Built-in policy engine |

</div>

---

## Use Cases

### Data Engineering

Build robust data pipelines with declarative workflows:

```yaml
name: daily-etl
version: v1
type: workflow
workflow:
  schedule:
    cron: "0 2 * * *"
  dag:
    - name: extract
      spec:
        stack: flare:7.0
    - name: transform
      dependencies: [extract]
    - name: load
      dependencies: [transform]
```

### Data Governance

Implement fine-grained access control:

```yaml
name: sales-access-policy
version: v1
type: policy
policy:
  type: data
  rules:
    - resource: "urn:dataos:depot:sales"
      actions: [read, write]
      subjects:
        - "users:dataos:analyst"
        - "users:dataos:engineer"
```

### Real-time Services

Deploy long-running API services:

```yaml
name: customer-api
version: v1
type: service
service:
  replicas: 3
  ingress:
    enabled: true
    path: /api/customers
  stack: container:1.0
```

---

## Platform Principles

### Declarative Infrastructure

All resources defined as code in YAML format, version-controlled in Git.

### Cloud Agnostic

Deploy on any cloud provider or on-premises:

- Amazon Web Services (AWS)
- Google Cloud Platform (GCP)
- Microsoft Azure
- On-premises Kubernetes

### Built-in Observability

Comprehensive monitoring, logging, and alerting out of the box.

### Security First

Enterprise-grade security with ABAC policies, encryption, and audit logging.

---

## Documentation Sections

### Getting Started
Installation procedures, prerequisites, and initial configuration.

### Core Concepts
Fundamental principles, architecture patterns, and design philosophy.

### Interfaces
Command-line tools, graphical interfaces, and programmatic APIs.

### Resources
Comprehensive documentation for each resource type.

---

## Support Resources

<div className="grid grid-4">
  <div className="card">
    <div className="card-title">Documentation</div>
    <div className="card-content">Comprehensive guides and references</div>
  </div>
  <div className="card">
    <div className="card-title">Community</div>
    <div className="card-content">Forums and discussions</div>
  </div>
  <div className="card">
    <div className="card-title">Training</div>
    <div className="card-content">Video tutorials and workshops</div>
  </div>
  <div className="card">
    <div className="card-title">Support</div>
    <div className="card-content">Technical support and SLA</div>
  </div>
</div>

---

## Next Steps

<div className="grid grid-3">
  <div className="card">
    <div className="card-title">Understand Philosophy</div>
    <div className="card-content">Learn the core principles behind DataOS design and architecture.</div>
    <p><a href="/philosophy">Read Philosophy →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Install DataOS CLI</div>
    <div className="card-content">Set up your development environment and configure authentication.</div>
    <p><a href="/installation">Installation Guide →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Deploy First Resource</div>
    <div className="card-content">Follow the quick start guide to deploy your first data product.</div>
    <p><a href="/quick-start">Quick Start →</a></p>
  </div>
</div>

