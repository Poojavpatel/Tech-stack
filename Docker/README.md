### Deploy React Application on docker

https://www.youtube.com/watch?v=O3SvhpnSZWY

1. Create Dockerfile in root
```
FROM node:alpine
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
```
2. in terminal run 
```bash
docker build . -t frontend-image
```

3. To list all images 
```bash
docker image ls
```

4. To run image
```
docker run frontend-image
```

```
docker ps
docker exec -it 82e8331f4652 sh
```