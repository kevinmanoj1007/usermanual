---
sidebar_position: 2
---

# Linux Desktop (X11-based)

Setting up Docker on Linux is generally straightforward, and Docker provides official packages for all major distributions.  
Here’s a step-by-step guide to install Docker CE (Community Edition) on the most common Linux distributions.

## ✅ 1. Prerequisites

- 64-bit Linux system  
- `sudo` privileges  
- Internet access  

---

## 🐧 Installing Docker on Ubuntu / Debian

### 🔹 Step 1: Remove Old Versions (if any)

```bash
sudo apt remove docker docker-engine docker.io containerd runc
```

### 🔹 Step 2: Install Required Packages

```bash
sudo apt update
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### 🔹 Step 3: Add Docker’s Official GPG Key

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

### 🔹 Step 4: Set Up the Repository

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 🔹 Step 5: Install Docker Engine

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 🔹 Step 6: Verify Installation

```bash
sudo docker run hello-world
```

---

## 🐧 Installing Docker on CentOS / RHEL / Fedora

### 🔹 Step 1: Remove Old Versions

```bash
sudo yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```

### 🔹 Step 2: Set Up the Repository

```bash
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager \
    --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

### 🔹 Step 3: Install Docker Engine

```bash
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 🔹 Step 4: Start Docker

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 🔹 Step 5: Test Docker

```bash
sudo docker run hello-world
```

---

## 👤 (Optional) Run Docker as Non-root User

```bash
sudo usermod -aG docker $USER
newgrp docker
```

_Log out and back in or run `newgrp docker` to apply group changes._

---

## ✅ Common Commands

| Task              | Command                          |
|-------------------|----------------------------------|
| Check version     | `docker --version`               |
| List containers   | `docker ps -a`                   |
| List images       | `docker images`                  |
| Run container     | `docker run hello-world`         |
| Enable on boot    | `sudo systemctl enable docker`   |

---

## 🧪 Test Docker with a Simple Container

```bash
docker run -it ubuntu bash
```
