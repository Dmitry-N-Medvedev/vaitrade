# vaitrade challenge

## prerequisites

1. install [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating): `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
2. install `node` via `nvm`: `nvm install 13.12.0 && nvm alias default 13.12.0 && nvm use default`
3. install [pnpm](https://pnpm.js.org/en/installation): `curl -L https://unpkg.com/@pnpm/self-installer | PNPM_VERSION=next node`
4. install dependencies: `./scripts/install-dependencies` and optionally upgrade them if you feel like a brave heart via `./scripts/upgrade-dependencies`

`NB`: if you are *updating* node version via nvm, you should consider changing npm prefix via `npm config set prefix ~/.nvm/versions/node/v13.12.0`
