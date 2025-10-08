---
id: quick-start
title: Quick Start Guide
sidebar_label: Quick Start
sidebar_position: 1
---

# Quick Start Guide

**Deploy your first data product in under 15 minutes.**

---

## Prerequisites

Before starting, ensure you have:

- Windows 10/11, macOS 11+, or Linux (Ubuntu 20.04+)
- Administrator/sudo access
- Internet connection
- 8GB RAM minimum
- 10GB free disk space

---

## Step 1: Install DataOS CLI

### Windows (PowerShell)

Open PowerShell **as Administrator** and run:

```powershell
# Set execution policy
Set-ExecutionPolicy Bypass -Scope Process -Force

# Install DataOS CLI
iwr https://get.dataos.io/install.ps1 -useb | iex
```

### macOS

```bash
# Using Homebrew
brew install dataos-cli

# Or using curl
curl -fsSL https://get.dataos.io/install.sh | bash
```

### Linux

```bash
# Download and install
curl -fsSL https://get.dataos.io/install.sh | sudo bash
```

### Verify Installation

```bash
dataos-ctl version
```

**Expected output:**
```
DataOS CLI v2.5.0
Build: 2024.10.08
```

---

## Step 2: Initialize and Authenticate

### Initialize Configuration

```bash
dataos-ctl init
```

This creates the configuration directory:
- **Windows**: `C:\Users\<username>\.dataos\`
- **macOS/Linux**: `~/.dataos/`

### Login

```bash
dataos-ctl auth login
```

Follow the prompts to authenticate using your credentials.

### Verify Authentication

```bash
dataos-ctl auth whoami
```

---

## Step 3: Create Your First Depot

A Depot is a connection to a data source.

### Create Configuration File

Create a file named `my-depot.yaml`:

```yaml title="my-depot.yaml"
name: postgres-sales
version: v1
type: depot
tags:
  - sales
  - quickstart
description: "Sales database connection for quick start"
depot:
  type: postgresql
  connection:
    host: localhost
    port: 5432
    database: sales_db
```

### Deploy the Depot

```bash
dataos-ctl apply -f my-depot.yaml
```

**Output:**
```
INFO[0000] 🚀 applying depot:v1:postgres-sales...
INFO[0001] 🚀 depot:v1:postgres-sales created successfully
```

### Verify Deployment

```bash
dataos-ctl get -t depot
```

---

## Step 4: Create a Workflow

Workflows orchestrate batch data processing tasks.

### Create Workflow Configuration

Create `my-workflow.yaml`:

```yaml title="my-workflow.yaml"
name: daily-sales-etl
version: v1
type: workflow
tags:
  - etl
  - sales
  - quickstart
description: "Daily sales data ETL pipeline"
workflow:
  schedule:
    cron: "0 2 * * *"
    timezone: UTC
  dag:
    - name: extract-data
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
                  - name: extract
                    sql: |
                      SELECT 
                        order_id,
                        customer_id,
                        order_date,
                        total_amount
                      FROM sales_orders
                      WHERE order_date >= CURRENT_DATE - INTERVAL '1' DAY
            outputs:
              - name: daily_sales
                depot: dataos://icebase:sales
```

### Deploy the Workflow

```bash
dataos-ctl apply -f my-workflow.yaml
```

### Check Workflow Status

```bash
dataos-ctl get -t workflow -n daily-sales-etl
```

---

## Step 5: Create a Service

Services are long-running processes that expose APIs.

### Create Service Configuration

Create `my-service.yaml`:

```yaml title="my-service.yaml"
name: sales-api
version: v1
type: service
tags:
  - api
  - sales
description: "Sales data REST API"
service:
  replicas: 2
  ingress:
    enabled: true
    path: /api/sales
    stripPath: true
  stack: container:1.0
  compute: runnable-default
  stackSpec:
    image: myregistry/sales-api:v1.0
    ports:
      - name: http
        port: 8080
        protocol: TCP
    env:
      DATABASE_URL: ${SALES_DB_URL}
    resources:
      requests:
        cpu: 100m
        memory: 256Mi
      limits:
        cpu: 500m
        memory: 512Mi
```

### Deploy the Service

```bash
dataos-ctl apply -f my-service.yaml
```

### Check Service Status

```bash
dataos-ctl get -t service -n sales-api
```

---

## Step 6: Monitor Your Resources

### View Logs

```bash
# Workflow logs
dataos-ctl log -t workflow -n daily-sales-etl

# Service logs
dataos-ctl log -t service -n sales-api -f
```

### Check Resource Status

```bash
# List all resources
dataos-ctl get

# List specific type
dataos-ctl get -t workflow

# Get detailed info
dataos-ctl get -t workflow -n daily-sales-etl -o yaml
```

---

## Step 7: Create a Workspace

Workspaces provide isolation for your resources.

### Create Workspace

```bash
dataos-ctl workspace create -n analytics
```

### Deploy to Workspace

```bash
dataos-ctl apply -f my-workflow.yaml -w analytics
```

### List Workspace Resources

```bash
dataos-ctl get -t workflow -w analytics
```

---

## Common Commands Reference

### Resource Management

```bash
# Apply (create/update)
dataos-ctl apply -f <file.yaml>

# Get (read)
dataos-ctl get -t <type> -n <name>

# Delete
dataos-ctl delete -t <type> -n <name>

# Logs
dataos-ctl log -t <type> -n <name>
```

### Workspace Operations

```bash
# List workspaces
dataos-ctl workspace list

# Create workspace
dataos-ctl workspace create -n <name>

# Delete workspace
dataos-ctl workspace delete -n <name>
```

### Context Management

```bash
# List contexts
dataos-ctl context list

# Switch context
dataos-ctl context use <context-name>

# Show current context
dataos-ctl context current
```

---

## Troubleshooting

### Connection Issues

```bash
# Check connectivity
dataos-ctl ping

# Verify authentication
dataos-ctl auth whoami
```

### Resource Not Starting

```bash
# Check logs
dataos-ctl log -t <type> -n <name>

# Get detailed status
dataos-ctl get -t <type> -n <name> -o yaml
```

### Permission Denied

Ensure you have the required permissions:

```bash
# Check your permissions
dataos-ctl auth permissions
```

---

## Next Steps

<div className="grid grid-3">
  <div className="card">
    <div className="card-title">Learn Core Concepts</div>
    <div className="card-content">Understand the architecture and design principles.</div>
    <p><a href="/philosophy">Philosophy →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Explore Resources</div>
    <div className="card-content">Deep dive into each resource type.</div>
    <p><a href="/resources">Resources →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Master the CLI</div>
    <div className="card-content">Complete command reference and advanced usage.</div>
    <p><a href="/interfaces/cli">CLI Guide →</a></p>
  </div>
</div>

---

## Best Practices

### Version Control

Store all YAML files in Git:

```
project/
├── depots/
│   └── postgres-sales.yaml
├── workflows/
│   └── daily-sales-etl.yaml
└── services/
    └── sales-api.yaml
```

### Naming Conventions

Use descriptive, hierarchical names:

```yaml
# Good
name: sales-daily-etl
name: customer-profile-api

# Avoid
name: workflow1
name: test
```

### Tagging Strategy

Apply consistent tags:

```yaml
tags:
  - environment:production
  - team:analytics
  - domain:sales
  - criticality:high
```

### Environment Variables

Use environment variables for configuration:

```yaml
name: ${ENV}-sales-etl
description: "Sales ETL for ${ENV} environment"
```

Deploy with:

```bash
ENV=production dataos-ctl apply -f workflow.yaml
```

---

## Resources Created

After completing this guide, you will have:

- ✅ DataOS CLI installed and configured
- ✅ One Depot (database connection)
- ✅ One Workflow (ETL pipeline)
- ✅ One Service (REST API)
- ✅ One Workspace (resource isolation)

**Total time:** ~15 minutes