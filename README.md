# App de rentrée

## Getting started

### Mongo server

Either:

- install and start Mongo on host machine
- run Mongo in Docker container:

```
docker run --name <container-name> -d -p 127.0.0.1:27017:27017/tcp mongo
```

Access Mongo shell from within Docker container:

```
docker exec -it <container-name> mongosh
```

### Environment

Create `.env` file based on `.env.example` and modify variables if needed.

### API server

Install dependencies:

```
npm install
```

Start development server:

```
npm run start:watch
```

(Or start production server:)

```
npm start
```
