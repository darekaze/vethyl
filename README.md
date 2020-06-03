# Vethyl

> My capstone project

Vethyl -- A full-stack system for quering verifiable Ethreum data


This monorepo consists of 5 components:

- [`api`](./api/README.md) -- Query Service
- [`client`](./client/README.md) -- Frontend of the client
- `common` -- shared codes between components
- `crawler` -- Blockchain-Ethereum Sync Manager
- `fgptr` -- Data Validation service (fingerprint generator)


### Branch

- `master` -> Development branch
- `stable` -> Staging branch (for releasing tags)
- `dev/*` -> Feature, fix etc.

## Quick start

> Have `docker-compose` installed and run `yarn` first to install all dependencies

### 1. Copy `.env` file

> Instructions are inside `<package>/.env.example`

Create `.env` in each package root directory (e.g. `crawler/.env`).


### 2. Local development

```bash
# Boot up `api
yarn dev:api

# Boot up crawler
yarn dev:crawler

# Boot up fingerprint
yarn dev:fgptr

# Boot up client
yarn dev:client
```

## Build

Ensure that `<package-name>.production.env` is created in `environments` folder.

Then run the belowings:

```bash
# Build the docker image with docker-compose (will update to use docker only)
# -- api, crawler, fgptr, or all
yarn build:<package-name>

# Build and run in docker compose
yarn compose [package-name]...
```

And view your docker status inside shell using [`lazydocker`](https://github.com/jesseduffield/lazydocker).

## Deployment

You need to init Docker swarm on your local system first:

```bash
docker swarm init
```

Then you can setup a new stack and deploy:

```bash
yarn deploy
```

To remove the deploy, run:

```bash
yarn stopall
```

Details on the commands can be found in `package.json`

