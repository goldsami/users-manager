# users-manager

## Setup

Create and fill `.env` file by example of `.env.example`


### DB creation

Install `docker` and `docker-compose` and run `docker`.

Run following command to launch MySQL server:

```bash
$ docker-compose up
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open your browser and navigate to http://localhost:3000/.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Migration

```bash
# create migration 
$ npx sequelize-cli migration:generate --name <migration-name>
```

```bash
# run migration
$ npx sequelize-cli db:migrate   
```

```bash
# undo latest migration
$ npx sequelize-cli db:migrate:undo
```

Read more on [Sequelize docs](https://sequelize.org/docs/v6/other-topics/migrations/)
