---
id: cli
title: Command Line Interface
sidebar_label: CLI
sidebar_position: 1
---

# Command Line Interface

**Complete reference for the DataOS CLI.**

---

## Overview

The DataOS CLI (`dataos-ctl`) provides command-line access to all platform operations.

### Installation

See [Installation Guide](/installation) for setup instructions.

### Syntax

```bash
dataos-ctl [command] [subcommand] [flags]
```

---

## Global Flags

Available for all commands:

| Flag | Description | Example |
|------|-------------|---------|
| `-h, --help` | Show help | `dataos-ctl get --help` |
| `-v, --verbose` | Verbose output | `dataos-ctl apply -f file.yaml -v` |
| `-o, --output` | Output format (yaml/json/table) | `dataos-ctl get -t depot -o json` |
| `--context` | Override context | `dataos-ctl get --context prod` |

---

## Authentication Commands

### login

Authenticate with DataOS.

```bash
dataos-ctl auth login
```

**Interactive prompts:**
```
DataOS URL: https://api.dataos.io
Username: your-username
Password: ********
```

**Flags:**
```bash
--url string      DataOS API URL
--username string User name
--token string    API token (skip interactive)
```

---

### logout

Clear authentication credentials.

```bash
dataos-ctl auth logout
```

---

### whoami

Display current user information.

```bash
dataos-ctl auth whoami
```

**Output:**
```
User: john.doe
ID: user:dataos:john.doe
Tags: users:id:123, roles:id:data-dev
```

---

### token

Manage API tokens.

```bash
# Create new token (30 days)
dataos-ctl auth token create --duration 720h

# List tokens
dataos-ctl auth token list

# Revoke token
dataos-ctl auth token revoke <token-id>
```

---

## Resource Management Commands

### apply

Create or update resources.

```bash
# Apply single file
dataos-ctl apply -f resource.yaml

# Apply directory
dataos-ctl apply -f ./resources/

# Apply with workspace
dataos-ctl apply -f workflow.yaml -w analytics

# Dry run (validate only)
dataos-ctl apply -f workflow.yaml --dry-run
```

**Flags:**
```bash
-f, --file string        File or directory path
-w, --workspace string   Workspace name
--dry-run                Validate without applying
```

---

### get

Retrieve resource information.

```bash
# List all resources
dataos-ctl get

# List specific type
dataos-ctl get -t workflow

# Get specific resource
dataos-ctl get -t workflow -n daily-etl

# Get from workspace
dataos-ctl get -t workflow -w analytics

# Output formats
dataos-ctl get -t depot -o yaml
dataos-ctl get -t depot -o json
dataos-ctl get -t depot -o table
```

**Flags:**
```bash
-t, --type string        Resource type
-n, --name string        Resource name
-w, --workspace string   Workspace name
-o, --output string      Output format (yaml/json/table)
-a, --all-workspaces     Search all workspaces
```

---

### delete

Remove resources.

```bash
# Delete by type and name
dataos-ctl delete -t workflow -n old-pipeline

# Delete from file
dataos-ctl delete -f workflow.yaml

# Delete from workspace
dataos-ctl delete -t workflow -n daily-etl -w analytics

# Force delete (skip confirmation)
dataos-ctl delete -t workflow -n test --force
```

**Flags:**
```bash
-t, --type string        Resource type
-n, --name string        Resource name
-w, --workspace string   Workspace name
-f, --file string        File path
--force                  Skip confirmation
```

---

### log

View resource logs.

```bash
# View recent logs
dataos-ctl log -t workflow -n daily-etl

# Follow logs (live tail)
dataos-ctl log -t workflow -n daily-etl -f

# Logs from specific time
dataos-ctl log -t service -n api --since 1h
dataos-ctl log -t workflow -n etl --since 2024-01-01T00:00:00Z

# Last N lines
dataos-ctl log -t workflow -n etl --tail 100
```

**Flags:**
```bash
-t, --type string        Resource type
-n, --name string        Resource name
-w, --workspace string   Workspace name
-f, --follow             Follow log output
--since string           Show logs since timestamp/duration
--tail int               Show last N lines
```

---

### describe

Get detailed resource information.

```bash
# Describe resource
dataos-ctl describe -t workflow -n daily-etl

# Include events
dataos-ctl describe -t workflow -n daily-etl --events
```

**Output includes:**
- Resource metadata
- Current status
- Configuration
- Events/history
- Related resources

---

## Workspace Commands

### list

List all workspaces.

```bash
dataos-ctl workspace list
```

**Output:**
```
NAME         CREATED              RESOURCES
public       2024-01-01T00:00:00  45
analytics    2024-01-15T10:30:00  12
sales        2024-02-01T14:20:00  8
```

---

### create

Create new workspace.

```bash
dataos-ctl workspace create -n analytics

# With description
dataos-ctl workspace create -n analytics \
  --description "Analytics team workspace"

# With labels
dataos-ctl workspace create -n analytics \
  --labels team=analytics,env=prod
```

---

### delete

Delete workspace (must be empty).

```bash
dataos-ctl workspace delete -n old-workspace

# Force delete (with resources)
dataos-ctl workspace delete -n test --force
```

---

### describe

Get workspace details.

```bash
dataos-ctl workspace describe -n analytics
```

**Output:**
```
Name: analytics
Created: 2024-01-15T10:30:00Z
Labels: team=analytics, env=prod
Resources: 12
  - workflows: 5
  - depots: 3
  - services: 2
  - policies: 2
```

---

## Context Commands

Manage multiple DataOS environments.

### list

List all contexts.

```bash
dataos-ctl context list
```

**Output:**
```
CURRENT   NAME       SERVER                      USER
*         prod       https://prod.dataos.io      prod-user
          staging    https://staging.dataos.io   staging-user
          dev        https://dev.dataos.io       dev-user
```

---

### add

Add new context.

```bash
dataos-ctl context add prod \
  --server=https://prod.dataos.io \
  --user=prod-user
```

---

### use

Switch to different context.

```bash
dataos-ctl context use prod
```

---

### delete

Remove context.

```bash
dataos-ctl context delete staging
```

---

### current

Show current context.

```bash
dataos-ctl context current
```

**Output:**
```
prod (https://prod.dataos.io)
```

---

## Configuration Commands

### view

Display current configuration.

```bash
dataos-ctl config view
```

**Output:**
```yaml
apiVersion: v1
kind: Config
current-context: prod
contexts:
  - name: prod
    context:
      server: https://prod.dataos.io
      user: prod-user
```

---

### set

Set configuration value.

```bash
# Set default workspace
dataos-ctl config set workspace analytics

# Set log level
dataos-ctl config set log-level debug

# Set timeout
dataos-ctl config set timeout 300
```

---

### get

Get configuration value.

```bash
dataos-ctl config get workspace
dataos-ctl config get log-level
```

---

## Utility Commands

### version

Display CLI version.

```bash
dataos-ctl version
```

**Output:**
```
DataOS CLI v2.5.0
Build: 2024.10.08
Go version: go1.21.3
OS/Arch: linux/amd64
```

---

### completion

Generate shell completion scripts.

```bash
# Bash
dataos-ctl completion bash > /etc/bash_completion.d/dataos-ctl

# Zsh
dataos-ctl completion zsh > ~/.zsh/completion/_dataos-ctl

# Fish
dataos-ctl completion fish > ~/.config/fish/completions/dataos-ctl.fish

# PowerShell
dataos-ctl completion powershell | Out-String | Invoke-Expression
```

---

### ping

Test connectivity to DataOS.

```bash
dataos-ctl ping
```

**Output:**
```
Pinging https://api.dataos.io
Response time: 45ms
Status: OK
```

---

## Advanced Usage

### Environment Variables

Configure CLI via environment variables:

```bash
# Set context
export DATAOS_CONTEXT=prod

# Set workspace
export DATAOS_WORKSPACE=analytics

# Set API server
export DATAOS_SERVER=https://api.dataos.io

# Set auth token
export DATAOS_TOKEN=your-token-here

# Set log level
export DATAOS_LOG_LEVEL=debug
```

---

### Batch Operations

Apply multiple files:

```bash
# Apply all YAML files in directory
dataos-ctl apply -f ./resources/

# Apply files matching pattern
find ./resources -name "*.yaml" -exec dataos-ctl apply -f {} \;

# Delete multiple resources
for resource in workflow1 workflow2 workflow3; do
  dataos-ctl delete -t workflow -n $resource
done
```

---

### Output Processing

Use with other tools:

```bash
# Count resources
dataos-ctl get -t workflow -o json | jq length

# Extract names
dataos-ctl get -t depot -o json | jq -r '.[].name'

# Filter by tag
dataos-ctl get -t workflow -o json | \
  jq '.[] | select(.tags[]? | contains("production"))'

# Export to file
dataos-ctl get -t workflow -n daily-etl -o yaml > backup.yaml
```

---

### Scripting

Use in automation scripts:

```bash
#!/bin/bash
set -e

# Deploy resources
dataos-ctl apply -f depot.yaml
dataos-ctl apply -f workflow.yaml

# Wait for workflow
while [ "$(dataos-ctl get -t workflow -n my-workflow -o json | jq -r '.status')" != "active" ]; do
  echo "Waiting for workflow..."
  sleep 5
done

echo "Deployment complete"
```

---

## Troubleshooting

### Connection Issues

```bash
# Test connectivity
dataos-ctl ping

# Verify configuration
dataos-ctl config view

# Check authentication
dataos-ctl auth whoami
```

---

### Authentication Errors

```bash
# Clear and re-login
dataos-ctl auth logout
dataos-ctl auth login

# Verify token
dataos-ctl auth token list
```

---

### Resource Errors

```bash
# Validate configuration
dataos-ctl apply -f workflow.yaml --dry-run

# Check resource status
dataos-ctl describe -t workflow -n my-workflow

# View logs
dataos-ctl log -t workflow -n my-workflow
```

---

### Debug Mode

Enable verbose output:

```bash
# Verbose flag
dataos-ctl apply -f workflow.yaml -v

# Debug log level
dataos-ctl config set log-level debug
dataos-ctl apply -f workflow.yaml

# Or via environment
export DATAOS_LOG_LEVEL=debug
dataos-ctl apply -f workflow.yaml
```

---

## Examples

### Deploy Complete Stack

```bash
# Create workspace
dataos-ctl workspace create -n production

# Deploy infrastructure
dataos-ctl apply -f depots/ -w production
dataos-ctl apply -f secrets/ -w production
dataos-ctl apply -f policies/ -w production

# Deploy applications
dataos-ctl apply -f workflows/ -w production
dataos-ctl apply -f services/ -w production

# Verify deployment
dataos-ctl get -w production
```

---

### Monitor Resources

```bash
# Watch resource status
watch -n 5 'dataos-ctl get -t workflow'

# Follow logs
dataos-ctl log -t workflow -n daily-etl -f

# Export metrics
dataos-ctl get -t workflow -o json | \
  jq '.[] | {name: .name, status: .status}'
```

---

### Backup and Restore

```bash
# Backup all resources
mkdir -p backup/$(date +%Y%m%d)
for type in depot workflow service policy; do
  dataos-ctl get -t $type -o yaml > backup/$(date +%Y%m%d)/${type}.yaml
done

# Restore from backup
dataos-ctl apply -f backup/20240101/
```

---

## Next Steps

<div className="grid grid-3">
  <div className="card">
    <div className="card-title">GUI Interface</div>
    <div className="card-content">Explore the graphical user interface.</div>
    <p><a href="/interfaces/gui">GUI Guide →</a></p>
  </div>
  <div className="card">
    <div className="card-title">API Reference</div>
    <div className="card-content">Use the programmatic API.</div>
    <p><a href="/interfaces/api">API Docs →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Quick Start</div>
    <div className="card-content">Get hands-on with examples.</div>
    <p><a href="/quick-start">Quick Start →</a></p>
  </div>
</div>