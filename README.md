# FullStack Dockerized Workspace

This is a full-stack project that enables fast infrastructure deployment for developing projects with both backend and frontend components. It's a monorepo project based on Yarn workspaces, making it easily extensible.

## 🚀 Start project 🚀
```bash 
./start
```
You can start/stop the infrastructure with the following commands:
```bash
docker-compose up
```
or 
```bash 
docker-compose down
```
### 🚨🚨🚨WARNING🚨🚨🚨 
each time you add a dependency to any of the services that use nodejs, as **backend**, you should restart the infrastructure to install the module in the **Docker container**.

## 👾 Available services (default)👾
- **backend**: **NodeJS** with **ExpressJS** API handler and NodeJS backend.
- **frontend/web**: **NextJS** based on React web application. Running by default at port **3000**
- **mongodb**: non relational database based on document storage.
- **mongoexpress**: database GUI that allow to visualize your **mongodb** documents using a user friendly interface. Running in port **`8081`**. The website has basic authentication, and its credentials are configured in **`docker-compose.yml`** under **`ME_CONFIG_BASICAUTH_USERNAME`** and **`ME_CONFIG_BASICAUTH_PASSWORD`**.
- **proxy**: a reverse proxy to redirect traffic through services using **port 8080**, build using **nginx**
  ### 🔀 Proxy default routing 🔀
  [YOUR_URL]/api/[...path], all requests go to **backend** service
  [YOUR_URL]/*, default requests go to **frontend/web** service

📝 NOTE: All of these services run using docker containers and all services are orchestrated using **Docker Compose v2**.

🎯 To start frontend 🎯
Frontend is not running using Docker. 
First install packages for the first time:
```node
yarn
```
- Development
```node
yarn start
``` 
- Production
```node
yarn prod
``` 

Working system specifications:
- Node 20.4.0
- Yarn 1.22.19 (If not installed globally: *npm i -g yarn*)
- Docker version 24.0.5, build ced0996
- Docker Compose version v2.19.1
- OS: Ubuntu 22.04, uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu), 1001(docker)

### 🚨🚨🚨 CAUTION
The system works if its configured with user 1000 and docker its also added to user group. 
See more at: https://docs.docker.com/engine/install/linux-postinstall/
### 🚨🚨🚨 
