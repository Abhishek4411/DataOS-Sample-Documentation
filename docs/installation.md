---
id: installation
title: Installation Guide
sidebar_label: Installation
sidebar_position: 2
---

# Installation Guide

**Complete installation instructions for DataOS CLI and platform setup.**

---

## System Requirements

### Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **Operating System** | Windows 10/11, macOS 11+, Ubuntu 20.04+ |
| **RAM** | 8GB minimum, 16GB recommended |
| **Disk Space** | 10GB free space |
| **Network** | Stable internet connection |
| **Permissions** | Administrator (Windows) or sudo (macOS/Linux) |

### Supported Platforms

- **Windows**: 10, 11 (64-bit)
- **macOS**: Big Sur (11.0) or later
- **Linux**: Ubuntu 20.04+, CentOS 8+, Debian 11+

---

## Install DataOS CLI

### Windows Installation

#### Using PowerShell (Recommended)

Open PowerShell **as Administrator**:

```powershell
# Set execution policy
Set-ExecutionPolicy Bypass -Scope Process -Force

# Configure TLS
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Download and install
iwr https://get.dataos.io/install.ps1 -useb | iex
```

#### Manual Installation

1. Download the installer:
   - [DataOS CLI for Windows (x64)](https://downloads.dataos.io/cli/windows/dataos-cli-installer.exe)

2. Run the installer as Administrator

3. Follow the installation wizard

4. Add to PATH (if not automatic):
   ```powershell
   $env:Path += ";C:\Program Files\DataOS\bin"
   ```

---

### macOS Installation

#### Using Homebrew (Recommended)

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install DataOS CLI
brew tap dataos/tap
brew install dataos-cli
```

#### Using curl

```bash
# Download and install
curl -fsSL https://get.dataos.io/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # or ~/.zshrc
```

#### Manual Installation

1. Download the package:
   ```bash
   curl -LO https://downloads.dataos.io/cli/macos/dataos-cli.pkg
   ```

2. Install the package:
   ```bash
   sudo installer -pkg dataos-cli.pkg -target /
   ```

---

### Linux Installation

#### Ubuntu/Debian

```bash
# Add repository
curl -fsSL https://apt.dataos.io/gpg | sudo apt-key add -
echo "deb https://apt.dataos.io stable main" | sudo tee /etc/apt/sources.list.d/dataos.list

# Update and install
sudo apt update
sudo apt install dataos-cli
```

#### RHEL/CentOS/Fedora

```bash
# Add repository
sudo tee /etc/yum.repos.d/dataos.repo <<EOF
[dataos]
name=DataOS Repository
baseurl=https://yum.dataos.io/stable
enabled=1
gpgcheck=1
gpgkey=https://yum.dataos.io/gpg
EOF

# Install
sudo yum install dataos-cli
```

#### Universal Binary

```bash
# Download
curl -LO https://downloads.dataos.io/cli/linux/dataos-cli-linux-amd64.tar.gz

# Extract
tar -xzf dataos-cli-linux-amd64.tar.gz

# Move to PATH
sudo mv dataos-ctl /usr/local/bin/

# Make executable
sudo chmod +x /usr/local/bin/dataos-ctl
```

---

## Verify Installation

Check the installation:

```bash
dataos-ctl version
```

**Expected output:**

```
DataOS CLI v2.5.0
Build: 2024.10.08
Go version: go1.21.3
OS/Arch: linux/amd64
```

---

## Initialize Configuration

### Create Configuration Directory

```bash
dataos-ctl init
```

This creates the configuration structure:

**Windows:**
```
C:\Users\<username>\.dataos\
├── config.yaml
├── contexts\
└── credentials\
```

**macOS/Linux:**
```
~/.dataos/
├── config.yaml
├── contexts/
└── credentials/
```

### Configuration File

The `config.yaml` contains:

```yaml
apiVersion: v1
kind: Config
current-context: default
contexts:
  - name: default
    context:
      server: https://api.dataos.io
      user: default
users:
  - name: default
    user:
      token: ""
```

---

## Authentication

### Login to DataOS

```bash
dataos-ctl auth login
```

**Interactive prompts:**

```
DataOS URL [https://api.dataos.io]: 
Username: your-username
Password: ********
```

### Verify Authentication

```bash
dataos-ctl auth whoami
```

**Output:**

```
User: your-username
ID: user:dataos:your-username
Tags: users:id:user-123, roles:id:data-dev
```

### Generate API Token

For programmatic access:

```bash
# Generate token (valid for 30 days)
dataos-ctl auth token create --duration 720h

# Output
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

Save this token securely for API access.

---

## Configure Context

### Multiple Environments

Set up different contexts for dev/staging/prod:

```bash
# Add production context
dataos-ctl context add prod \
  --server=https://prod.dataos.io \
  --user=prod-user

# Add staging context  
dataos-ctl context add staging \
  --server=https://staging.dataos.io \
  --user=staging-user

# List contexts
dataos-ctl context list
```

### Switch Context

```bash
# Switch to production
dataos-ctl context use prod

# Verify current context
dataos-ctl context current
```

---

## Shell Completion

Enable auto-completion for faster command execution.

### Bash

```bash
# Add to ~/.bashrc
echo 'source <(dataos-ctl completion bash)' >> ~/.bashrc
source ~/.bashrc
```

### Zsh

```bash
# Add to ~/.zshrc
echo 'source <(dataos-ctl completion zsh)' >> ~/.zshrc
source ~/.zshrc
```

### PowerShell

```powershell
# Add to PowerShell profile
dataos-ctl completion powershell | Out-String | Invoke-Expression
```

---

## Update DataOS CLI

### Windows (PowerShell)

```powershell
iwr https://get.dataos.io/update.ps1 -useb | iex
```

### macOS (Homebrew)

```bash
brew upgrade dataos-cli
```

### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade dataos-cli

# RHEL/CentOS
sudo yum update dataos-cli
```

---

## Uninstall DataOS CLI

### Windows

```powershell
# Using installer
# Go to: Settings > Apps > DataOS CLI > Uninstall

# Or using PowerShell
Remove-Item -Path "C:\Program Files\DataOS" -Recurse -Force
```

### macOS

```bash
# Using Homebrew
brew uninstall dataos-cli

# Manual removal
sudo rm -rf /usr/local/bin/dataos-ctl
sudo rm -rf /usr/local/lib/dataos
```

### Linux

```bash
# Ubuntu/Debian
sudo apt remove dataos-cli

# RHEL/CentOS
sudo yum remove dataos-cli

# Clean up configuration
rm -rf ~/.dataos
```

---

## Troubleshooting

### Installation Fails on Windows

**Issue:** PowerShell execution policy prevents installation

**Solution:**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Permission Denied on macOS/Linux

**Issue:** Insufficient permissions

**Solution:**

```bash
# Add user to dataos group
sudo usermod -aG dataos $USER

# Or use sudo for installation
sudo bash install.sh
```

### Command Not Found

**Issue:** CLI not in PATH

**Solution:**

```bash
# Find installation location
which dataos-ctl

# Add to PATH
export PATH=$PATH:/path/to/dataos-ctl

# Make permanent (add to ~/.bashrc or ~/.zshrc)
echo 'export PATH=$PATH:/path/to/dataos-ctl' >> ~/.bashrc
```

### SSL/TLS Certificate Errors

**Issue:** Certificate verification fails

**Solution:**

```bash
# Disable SSL verification (not recommended for production)
dataos-ctl config set insecure-skip-tls-verify true

# Or install certificates
# macOS
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain certificate.crt

# Linux
sudo cp certificate.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```

### Authentication Fails

**Issue:** Unable to authenticate

**Solution:**

```bash
# Clear cached credentials
rm -rf ~/.dataos/credentials

# Re-authenticate
dataos-ctl auth login

# Check connectivity
ping api.dataos.io
```

---

## Environment Variables

Configure DataOS using environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATAOS_CONFIG` | Config file location | `~/.dataos/config.yaml` |
| `DATAOS_CONTEXT` | Active context | `default` |
| `DATAOS_SERVER` | API server URL | `https://api.dataos.io` |
| `DATAOS_TOKEN` | Authentication token | - |
| `DATAOS_LOG_LEVEL` | Logging level | `info` |

**Example:**

```bash
export DATAOS_CONTEXT=production
export DATAOS_LOG_LEVEL=debug
dataos-ctl get -t workflow
```

---

## Next Steps

<div className="grid grid-3">
  <div className="card">
    <div className="card-title">Quick Start</div>
    <div className="card-content">Deploy your first resource in 15 minutes.</div>
    <p><a href="/quick-start">Quick Start →</a></p>
  </div>
  <div className="card">
    <div className="card-title">CLI Reference</div>
    <div className="card-content">Complete command reference and examples.</div>
    <p><a href="/interfaces/cli">CLI Guide →</a></p>
  </div>
  <div className="card">
    <div className="card-title">Core Concepts</div>
    <div className="card-content">Understand DataOS architecture and principles.</div>
    <p><a href="/philosophy">Philosophy →</a></p>
  </div>
</div>

---

## Support

If you encounter issues during installation:

- **Documentation**: Check troubleshooting section above
- **Community**: Ask in [DataOS Community Forum](https://community.dataos.io)
- **Support**: Email support@dataos.io
- **GitHub**: Report issues at [github.com/dataos/cli](https://github.com/dataos/cli)