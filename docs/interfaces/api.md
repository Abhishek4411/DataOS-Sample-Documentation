---
id: api
title: API & SDK Reference
sidebar_label: API & SDK
sidebar_position: 3
---

# API & SDK Reference

**Programmatic access to DataOS platform.**

---

## API Overview

DataOS provides RESTful APIs for all platform operations.

**Base URL:**
```
https://api.dataos.io/v1
```

**Authentication:**
```bash
Authorization: Bearer <your-api-token>
```

---

## Authentication

### Generate Token

Via CLI:
```bash
dataos-ctl auth token create --duration 720h
```

Via GUI:
1. Profile → Tokens
2. Create New Token
3. Copy token

### Use Token

```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.dataos.io/v1/resources
```

---

## API Endpoints

### List Resources

**Request:**
```http
GET /v1/resources?type=workflow&workspace=analytics
```

**Parameters:**
- `type` (optional): Resource type
- `workspace` (optional): Workspace name
- `limit` (optional): Results per page
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "data": [
    {
      "name": "daily-etl",
      "version": "v1",
      "type": "workflow",
      "workspace": "analytics",
      "status": "active",
      "created": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 45,
    "limit": 20,
    "offset": 0
  }
}
```

---

### Get Resource

**Request:**
```http
GET /v1/resources/{type}/{name}?workspace=analytics
```

**Response:**
```json
{
  "name": "daily-etl",
  "version": "v1",
  "type": "workflow",
  "workspace": "analytics",
  "tags": ["production", "daily"],
  "description": "Daily ETL pipeline",
  "status": "active",
  "spec": {
    "workflow": {
      "schedule": {
        "cron": "0 2 * * *"
      },
      "dag": [...]
    }
  }
}
```

---

### Create Resource

**Request:**
```http
POST /v1/resources
Content-Type: application/yaml

name: my-workflow
version: v1
type: workflow
workflow:
  dag:
    - name: task
      spec:
        stack: flare:7.0
```

**Response:**
```json
{
  "message": "Resource created successfully",
  "resource": {
    "name": "my-workflow",
    "version": "v1",
    "type": "workflow",
    "status": "pending"
  }
}
```

---

### Update Resource

**Request:**
```http
PUT /v1/resources/{type}/{name}
Content-Type: application/yaml

name: my-workflow
version: v1
type: workflow
workflow:
  dag:
    - name: updated-task
      spec:
        stack: flare:7.0
```

---

### Delete Resource

**Request:**
```http
DELETE /v1/resources/{type}/{name}?workspace=analytics
```

**Response:**
```json
{
  "message": "Resource deleted successfully",
  "resource": {
    "name": "my-workflow",
    "type": "workflow"
  }
}
```

---

### Get Logs

**Request:**
```http
GET /v1/resources/{type}/{name}/logs?since=1h&tail=100
```

**Parameters:**
- `since`: Time duration (1h, 30m, 1d)
- `tail`: Number of lines
- `follow`: Boolean for streaming

**Response:**
```json
{
  "logs": [
    {
      "timestamp": "2024-01-01T10:00:00Z",
      "level": "INFO",
      "message": "Workflow started"
    },
    {
      "timestamp": "2024-01-01T10:01:00Z",
      "level": "INFO",
      "message": "Task completed successfully"
    }
  ]
}
```

---

## Python SDK

### Installation

```bash
pip install dataos-sdk
```

### Initialize Client

```python
from dataos import DataOS

# Using API token
client = DataOS(
    server="https://api.dataos.io",
    token="your-api-token"
)

# Using credentials
client = DataOS(
    server="https://api.dataos.io",
    username="your-username",
    password="your-password"
)
```

---

### List Resources

```python
# List all workflows
workflows = client.resources.list(
    type="workflow",
    workspace="analytics"
)

for workflow in workflows:
    print(f"{workflow.name}: {workflow.status}")
```

---

### Get Resource

```python
# Get specific resource
workflow = client.resources.get(
    type="workflow",
    name="daily-etl",
    workspace="analytics"
)

print(workflow.name)
print(workflow.status)
print(workflow.spec)
```

---

### Create Resource

```python
# From YAML file
workflow = client.resources.apply("workflow.yaml")

# From dictionary
spec = {
    "name": "my-workflow",
    "version": "v1",
    "type": "workflow",
    "workflow": {
        "dag": [
            {
                "name": "task",
                "spec": {
                    "stack": "flare:7.0"
                }
            }
        ]
    }
}

workflow = client.resources.create(spec)
```

---

### Update Resource

```python
# Get resource
workflow = client.resources.get("workflow", "daily-etl")

# Modify
workflow.spec["workflow"]["schedule"]["cron"] = "0 3 * * *"

# Update
workflow.save()
```

---

### Delete Resource

```python
# Delete resource
client.resources.delete(
    type="workflow",
    name="old-workflow",
    workspace="analytics"
)
```

---

### Get Logs

```python
# Get logs
logs = client.resources.logs(
    type="workflow",
    name="daily-etl",
    tail=100,
    since="1h"
)

for log in logs:
    print(f"{log.timestamp}: {log.message}")

# Stream logs
for log in client.resources.logs_stream("workflow", "daily-etl"):
    print(log.message)
```

---

### Workspace Operations

```python
# List workspaces
workspaces = client.workspaces.list()

# Create workspace
workspace = client.workspaces.create(
    name="analytics",
    description="Analytics team workspace"
)

# Delete workspace
client.workspaces.delete("old-workspace")
```

---

## JavaScript SDK

### Installation

```bash
npm install @dataos/sdk
```

### Initialize Client

```javascript
const { DataOS } = require('@dataos/sdk');

const client = new DataOS({
  server: 'https://api.dataos.io',
  token: 'your-api-token'
});
```

---

### List Resources

```javascript
// List workflows
const workflows = await client.resources.list({
  type: 'workflow',
  workspace: 'analytics'
});

workflows.forEach(workflow => {
  console.log(`${workflow.name}: ${workflow.status}`);
});
```

---

### Create Resource

```javascript
// From file
const workflow = await client.resources.apply('workflow.yaml');

// From object
const spec = {
  name: 'my-workflow',
  version: 'v1',
  type: 'workflow',
  workflow: {
    dag: [
      {
        name: 'task',
        spec: {
          stack: 'flare:7.0'
        }
      }
    ]
  }
};

const workflow = await client.resources.create(spec);
```

---

### Get Logs

```javascript
// Get logs
const logs = await client.resources.logs('workflow', 'daily-etl', {
  tail: 100,
  since: '1h'
});

logs.forEach(log => {
  console.log(`${log.timestamp}: ${log.message}`);
});

// Stream logs
const stream = client.resources.logsStream('workflow', 'daily-etl');

stream.on('data', log => {
  console.log(log.message);
});
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid request |
| 401 | Unauthorized | Authentication failed |
| 403 | Forbidden | Permission denied |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Internal Error | Server error |

---

### Error Response

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Workflow 'daily-etl' not found",
    "details": {
      "type": "workflow",
      "name": "daily-etl",
      "workspace": "analytics"
    }
  }
}
```

---

### Python Error Handling

```python
from dataos import DataOS, ResourceNotFoundError, AuthenticationError

try:
    workflow = client.resources.get("workflow", "missing")
except ResourceNotFoundError as e:
    print(f"Not found: {e}")
except AuthenticationError as e:
    print(f"Auth failed: {e}")
except Exception as e:
    print(f"Error: {e}")
```

---

## Rate Limiting

**Limits:**
- 100 requests per minute per token
- 1000 requests per hour per token

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

**429 Response:**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Retry after 60 seconds.",
    "retry_after": 60
  }
}
```

---

## Webhooks

Subscribe to resource events.

### Create Webhook

```python
webhook = client.webhooks.create(
    url="https://myapp.com/webhook",
    events=["resource.created", "resource.updated"],
    resources=["workflow", "service"]
)
```

### Webhook Payload

```json
{
  "event": "resource.created",
  "timestamp": "2024-01-01T10:00:00Z",
  "resource": {
    "type": "workflow",
    "name": "my-workflow",
    "workspace": "analytics",
    "status": "active"
  }
}
```

---

## Best Practices

### Authentication
- Rotate tokens regularly
- Use environment variables
- Never commit tokens to code

### Requests
- Use pagination for large lists
- Implement exponential backoff
- Handle rate limits gracefully

### Error Handling
- Validate responses
- Log errors
- Implement retries

### Performance
- Cache responses when appropriate
- Use bulk operations
- Minimize API calls

---

## Examples

### Python Complete Example

```python
from dataos import DataOS
import os

# Initialize client
client = DataOS(
    server=os.getenv('DATAOS_SERVER'),
    token=os.getenv('DATAOS_TOKEN')
)

# Create workflow
workflow_spec = {
    "name": "sales-pipeline",
    "version": "v1",
    "type": "workflow",
    "workspace": "analytics",
    "workflow": {
        "schedule": {
            "cron": "0 2 * * *"
        },
        "dag": [
            {
                "name": "extract",
                "spec": {
                    "stack": "flare:7.0"
                }
            }
        ]
    }
}

# Apply workflow
workflow = client.resources.create(workflow_spec)
print(f"Created: {workflow.name}")

# Monitor status
while workflow.status != "active":
    time.sleep(5)
    workflow.refresh()
    print(f"Status: {workflow.status}")

# Get logs
logs = client.resources.logs(
    type="workflow",
    name="sales-pipeline",
    tail=50
)

for log in logs:
    print(log.message)
```

---

## Next Steps

<div className="grid grid-3">
  <div className="card">
    <div className="card-title">CLI Reference</div>
    <div className="card-content">Command-line interface documentation.</div>
    <p><a href="/interfaces/cli">CLI Guide →</a></p>
  </div>
  <div className="card">
    <div className="card-title">GUI Interface</div>
    <div className="card-content">Web-based interface guide.</div>
    <p><a href="/interfaces/gui">GUI Guide →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Examples</div>
    <div className="card-content">Real-world integration examples.</div>
    <p><a href="/quick-start">Examples →</a></p>
  </div>
</div>