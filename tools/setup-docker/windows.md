---
sidebar_position: 1
---

# Windows

## 🪟 Option 1: Install Docker Desktop (Recommended)

Works on: Windows 10/11 (Pro, Enterprise, or Education) — for Home edition, Docker uses WSL2 (no Hyper-V).

### 🔹 Step 1: Install WSL2 (for Windows Home or modern Windows 11 Pro)

1. Open PowerShell as Administrator and run:
   ```
   wsl --install
   ```

2. Restart your machine.

3. Confirm WSL2 is default:
   ```
   wsl --set-default-version 2
   ```

### 🔹 Step 2: Download Docker Desktop

- Go to: https://www.docker.com/products/docker-desktop  
- Download the installer and run it.

During installation:

- Enable WSL 2 backend (recommended).  
- Allow it to install the required WSL distributions (e.g., Ubuntu).

### 🔹 Step 3: Launch Docker Desktop

- Start Docker Desktop from the Start menu.  
- It will take a few seconds to initialize.  
- Confirm it's running via the system tray 🐳.

### 🔹 Step 4: Test Installation

Open PowerShell or Command Prompt and run:

```
docker version
docker run hello-world
```

If you see the "Hello from Docker!" message — it's working ✅

---

## 🛠️ Option 2: Install Docker without Docker Desktop (Advanced)

If you don’t want to use Docker Desktop (e.g., for licensing reasons), you can install Docker CLI & Engine manually on WSL2:

### 🔸 Steps:

1. Install WSL2 and a Linux distro (e.g., Ubuntu):
   ```
   wsl --install -d Ubuntu
   ```

2. Inside WSL (Ubuntu shell):
   ```
   sudo apt update
   sudo apt install docker.io
   sudo usermod -aG docker $USER
   ```

3. Enable Docker service:
   ```
   sudo service docker start
   ```

4. Run Docker commands:
   ```
   docker run hello-world
   ```

⚠️ You must start Docker service manually every time unless you configure it to auto-start.
