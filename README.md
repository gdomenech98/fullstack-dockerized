# fullstack-dockerized-example

Infra consist of a backend, mongo database and a webserver, orchestrated by docker-compose, to launch it run:
```./start```
You can start/stop the infra by:
````docker-compose up``
or 
````docker-compose down``

WARINNG: Each time you put dependency at backend/package.json you should restart the infrastucture in order to install the module in the docker container.

For database GUI there is a service running at port ```8081``` which allows to visualize and operate with database in a userfriendly way. The website has basic auth and its credentials are configured in ```docker-compose.yml``` at ```ME_CONFIG_BASICAUTH_USERNAME``` and ```ME_CONFIG_BASICAUTH_PASSWORD```.

Backend API can be accessed through: ```localhost/api/[...path]```

Frontend runs by default at port ```3000``` and its started by going ```frontend/web``` and executing:
- Development: ```yarn start``` or ```npm run start```
- Production: ```yarn prod``` or ```npm run prod```


Working system specs: 
- Node 20.4.0
- Yarn 1.22.19
- Docker version 24.0.5, build ced0996
- Docker Compose version v2.19.1
- OS: Ubuntu 22.04, uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu), 1001(docker)