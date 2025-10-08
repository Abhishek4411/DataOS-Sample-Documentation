---
id: gui
title: Graphical User Interface
sidebar_label: GUI
sidebar_position: 2
---

# Graphical User Interface

**Web-based interface for DataOS operations and data exploration.**

---

## Accessing the GUI

Navigate to your DataOS instance URL:

```
https://your-instance.dataos.io
```

Login with your credentials.

---

## Main Applications

### Metis - Data Catalog

**Purpose:** Discover, understand, and catalog enterprise data.

**Features:**
- Search datasets across all sources
- View schema and metadata
- Track data lineage
- Quality metrics and profiling
- Business glossary management
- Tag and classify data

**Use Cases:**
- Find relevant datasets
- Understand data structure
- Validate data quality
- Explore relationships

---

### Workbench - SQL Editor

**Purpose:** Query data sources using SQL interface.

**Features:**
- Interactive SQL editor
- Autocomplete and syntax highlighting
- Query history
- Result visualization
- Export to CSV/JSON
- Saved queries and snippets

**Example Query:**

```sql
SELECT 
  customer_id,
  SUM(order_value) as total_value,
  COUNT(*) as order_count
FROM depot_sales.orders
WHERE order_date >= CURRENT_DATE - INTERVAL '30' DAY
GROUP BY customer_id
ORDER BY total_value DESC
LIMIT 100;
```

---

### Operations - Monitoring

**Purpose:** Monitor system health and resource status.

**Features:**
- Resource status dashboard
- Real-time metrics
- Log viewer
- Alert management
- Performance monitoring
- Resource utilization

**Metrics Displayed:**
- CPU and memory usage
- Request rates
- Error rates
- Latency percentiles
- Resource counts

---

### Data Product Hub

**Purpose:** Discover and access data products.

**Features:**
- Product catalog
- Usage analytics
- Quality scores
- Popularity metrics
- Access requests
- Documentation

---

## User Management

### Profile Settings

Access via user menu (top-right):

1. **Profile Information**
   - Name and email
   - User ID
   - Assigned roles
   - Team memberships

2. **Preferences**
   - Theme (light/dark)
   - Timezone
   - Language
   - Notifications

3. **Security**
   - Change password
   - Two-factor authentication
   - Active sessions

---

### API Tokens

Generate tokens for programmatic access:

1. Navigate to Profile → Tokens
2. Click "Create New Token"
3. Set token name and expiration
4. Copy and store securely

**Token Permissions:**
- Inherits user permissions
- Can be scoped to specific resources
- Revocable at any time

---

## Resource Management

### Viewing Resources

1. Navigate to Operations
2. Select resource type
3. View list with status
4. Click for details

**Information Displayed:**
- Resource name and type
- Current status
- Creation time
- Owner
- Tags
- Configuration

---

### Resource Actions

**Available Actions:**
- View details
- View logs
- Download configuration
- Delete (if permitted)
- Restart (services only)

---

## Data Exploration

### Using Metis

**Search:**
1. Enter keywords in search bar
2. Filter by type, tags, owner
3. Sort by relevance, recency
4. Click result to view details

**Dataset Details:**
- Schema and types
- Sample data preview
- Statistics and profiling
- Lineage graph
- Quality metrics
- Documentation

**Lineage View:**
- Upstream sources
- Downstream consumers
- Transformation logic
- Impact analysis

---

### Using Workbench

**Query Workflow:**

1. Select data source
2. Write SQL query
3. Execute (Cmd/Ctrl + Enter)
4. View results
5. Export or save

**Features:**
- Multi-tab support
- Query templates
- Format SQL
- Query history
- Keyboard shortcuts

---

## Monitoring and Alerts

### Dashboard

**Overview Metrics:**
- Active resources
- Recent deployments
- Error rate
- System health

**Resource-Specific:**
- Workflow runs
- Service uptime
- API latency
- Storage usage

---

### Logs

**View Logs:**
1. Navigate to resource
2. Click "Logs" tab
3. Filter by time range
4. Search within logs
5. Download logs

**Log Levels:**
- ERROR: Critical issues
- WARN: Warnings
- INFO: Information
- DEBUG: Debug details

---

### Alerts

**Configure Alerts:**
1. Navigate to resource
2. Click "Alerts"
3. Create new alert
4. Set conditions and thresholds
5. Choose notification channel

**Alert Types:**
- Resource failure
- Performance degradation
- Quota exceeded
- Schedule missed

---

## Collaboration

### Sharing

**Share Resources:**
1. Navigate to resource
2. Click "Share"
3. Add users or teams
4. Set permission level
5. Send invitation

**Permission Levels:**
- Viewer: Read-only
- Editor: Modify
- Owner: Full control

---

### Comments

Add comments to resources:

1. Navigate to resource
2. Click "Comments" tab
3. Add comment
4. Tag team members
5. Receive notifications

---

## Preferences

### Theme

**Switch Theme:**
- Light mode
- Dark mode
- Auto (follows system)

**Customization:**
- Accent color
- Font size
- Density

---

### Notifications

**Configure:**
- Email notifications
- In-app notifications
- Webhook integrations
- Notification frequency

**Notification Types:**
- Resource status changes
- Alert triggers
- Access requests
- Comments and mentions

---

## Keyboard Shortcuts

**Global:**
- `?` - Show shortcuts
- `/` - Focus search
- `Esc` - Close modals

**Workbench:**
- `Cmd/Ctrl + Enter` - Execute query
- `Cmd/Ctrl + S` - Save query
- `Cmd/Ctrl + K` - Format SQL

**Navigation:**
- `G + H` - Go to home
- `G + W` - Go to workbench
- `G + O` - Go to operations

---

## Mobile Access

**Responsive Design:**
- View-only access on mobile
- Monitor resources
- View logs
- Receive alerts

**Limitations:**
- No resource creation
- No query execution
- Limited editing

---

## Next Steps

<div className="grid grid-3">
  <div className="card">
    <div className="card-title">CLI Interface</div>
    <div className="card-content">Use command-line for automation.</div>
    <p><a href="/interfaces/cli">CLI Guide →</a></p>
  </div>
  <div className="card">
    <div className="card-title">API Access</div>
    <div className="card-content">Programmatic resource management.</div>
    <p><a href="/interfaces/api">API Docs →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Quick Start</div>
    <div className="card-content">Get hands-on with examples.</div>
    <p><a href="/quick-start">Quick Start →</a></p>
  </div>
</div>