---
sidebar_position: 3
---

# macOS

## 🧰 Step 1: Install Docker Desktop

🖥️ Works on:
- macOS 11 (Big Sur) and newer  
- Apple Intel or Apple Silicon (M1/M2) chips

### 🔹 1. Download Docker Desktop

- Official link: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

Choose the correct version:
- Intel Chip – _"Mac with Intel chip"_  
- Apple Silicon (M1/M2) – _"Mac with Apple chip"_

You can check your chip via:  > **About This Mac**

### 🔹 2. Install

- Open the downloaded `.dmg` file  
- Drag Docker into the **Applications** folder  
- Launch Docker Desktop from **Applications**  
- Follow any setup prompts and allow required system permissions

---

## 🚀 Step 2: Verify Docker Is Working

After Docker Desktop starts (you'll see the 🐳 icon in the macOS menu bar):  
Open your **Terminal** and run:

```bash
docker --version
docker info
docker run hello-world
```

You should see:  
**Hello from Docker!**

---

## 👤 Optional: Add Docker CLI to PATH

Docker Desktop sets up Docker CLI automatically. If not, check:

```bash
echo $PATH
which docker
```

If it's not working, you may need to add `/usr/local/bin` or `/opt/homebrew/bin` to your `$PATH`.

---

## 🧪 (Optional) Install Docker using Homebrew (CLI tools only)

If you prefer just Docker CLI and no GUI:

```bash
brew install docker docker-compose
```

⚠️ _This does **not** install the Docker Engine, which is needed to run containers._  
You still need Docker Desktop unless you’re connecting to a remote Docker daemon or using a VM.

---

## 🧠 Docker Desktop Features on macOS

| Feature                          | Available     |
|----------------------------------|---------------|
| Docker CLI & GUI Dashboard       | ✅            |
| Docker Compose                   | ✅            |
| Kubernetes (optional)            | ✅            |
| Virtualization via HyperKit/AVF  | ✅            |
| GPU Support                      | ❌ Not yet    |
| Port Forwarding to localhost     | ✅            |
| File Sharing with host (volumes) | ✅            |

---

## ✅ Summary

| Step | Description                                |
|------|--------------------------------------------|
| 1️⃣   | Download Docker Desktop from docker.com    |
| 2️⃣   | Install & launch Docker                    |
| 3️⃣   | Run `docker run hello-world` to verify     |
| 4️⃣   | Use Docker from Terminal (`docker ps`, etc.) |

---

Running GUI apps from Docker on macOS is possible, but it requires extra setup because:

- Docker containers run in a **Linux virtual machine** (not directly on macOS).  
- macOS does not support native **X11** or **Wayland** inside Docker.  
- You must forward the graphical display output to an **X server** running on macOS.
