# fullstack-dockerized-example

This infrastructure consists of a backend, a MongoDB database, and a web server, orchestrated by docker-compose. To launch it, run:
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

### WARNING
Each time you add a dependency to **backend/package.json**, you should restart the infrastructure to install the module in the Docker container.



For database GUI, there is a service running on port **`8081`**, allowing you to visualize and operate with the database in a user-friendly way. The website has basic authentication, and its credentials are configured in **`docker-compose.yml`** under **`ME_CONFIG_BASICAUTH_USERNAME`** and **`ME_CONFIG_BASICAUTH_PASSWORD`**.

The Backend API can be accessed at: 
```bash 
    localhost/api/[...path]
```

The frontend runs by default on port **`3000`**. To start it, navigate to **`frontend/web`** and execute the following commands:

- Development
```bash
    yarn start
``` 
or 
```bash 
npm run start
```
- Production
```bash
yarn prod
``` 
or 
```bash
npm run prod
```
If its first time run **`yarn`** or **`npm install`** as first command.

Working system specifications:
- Node 20.4.0
- Yarn 1.22.19
- Docker version 24.0.5, build ced0996
- Docker Compose version v2.19.1
- OS: Ubuntu 22.04, uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu), 1001(docker)