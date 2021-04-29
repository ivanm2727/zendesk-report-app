# Boilerplate para desarrollo de aplicaciones de Zendesk usando React con TypeScript

## Fuente de la base del proyecto
https://github.com/Cloudhuset/Zendesk-React-App-Boilerplate.git

## Ejecutar aplicacion con Docker
Para ejecutar la aplicacion y verla desde la instancia de Zendesk en modo de desarrollo siga estos pasos:

1. Se recomienda modificar el nombre del contenedor en el archivo __docker-compose.yaml__ por el de la aplicacion. Por defecto el nombre es: __zendesk-app-boilerplate__
2. Ejecutar `docker-compose up -d`. Usar `docker ps` para verificar que se haya buildeado correctamente
3. Abrir dos terminales para ejecutar __bash__ dentro del contenedor con el comando `docker exec -it zendesk-app-boilerplate bash`
4. En uno de los terminales ejecutar `npm i`, luego `npm run dev` para ejecutar la aplicacion de React. Todo esto debe ser dentro del contenedor.
5. En la otra terminal ir dentro de la carpeta dist con `cd dist` y ejecutar `zat server --bind 0.0.0.0` para iniciar el servidor de desarrollo de Zendesk. Este corre en el puerto __4567__ asi que se debe revisar que no este en uso. Todo esto debe ser dentro del contenedor.
6. Usar la URL de la instancia de Zendesk (subdomain.zendesk.com) en la que se quiere probar y agregar al final de la URL el parametro `?zat=true`

## Comandos npm

En el README del proyecto original se usa yarn pero puede ser usado con npm

# README original del proyecto:
## Includes

* React
* Webpack
* Babel
* SASS compiler
* CSS modules
* Jest
* zafClient

## How to use it

Start by cloning this repository with `git clone https://github.com/Cloudhuset/Zendesk-React-App-Boilerplate.git`

### Commands

Install all node modules before running any commands since some commands might require a specific node module.
Note that yarn can be replaced with npm by writing `npm run` instead.

#### yarn build

This command can be used to build to build the application to the `dist/` folder using the production env.

#### yarn build-dev

This command can be used to build to build the application to the `dist/` folder using the development env.

#### yarn dev

This command watches for file changes and when a file is changed builds to the `dist/` folder using the development env.

#### yarn package

This command packages the `dist/` folder for upload to Zendesk in a `.zip` file.
Note you must run `yarn build` at least once before using this command.

#### yarn build:package

This command uses npm-run-all to run both the `yarn build` and the `yarn package` command with one command.

#### yarn serve

This command uses [ZAT](https://developer.zendesk.com/apps/docs/developer-guide/zat) to serve the content to your Zendesk directly from your computer

Read more about ZAT Here: <https://developer.zendesk.com/apps/docs/developer-guide/zat>

#### yarn clean

This command uses rimraf to remove the last `.zip` from the `dist/` folder.

#### yarn test

This command uses Jest to run tests. All tests are placed in the `src/__tests__` folder.

## Do you have any ideas

Please let us know by making an issue here on github. Also feel free to contribute to the development, by making a pull request.

License: MIT
