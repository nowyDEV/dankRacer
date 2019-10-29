# Dank Racer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
And customized by [Craco](https://github.com/sharegate/craco).\
[Craco Modification Recipes](https://github.com/gsoft-inc/craco/tree/master/recipes).

### How do I get set up?

- Install [yarn](https://yarnpkg.com/lang/en/)
- Install dependencies by running `yarn`
- Add env files [Guide](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used)

## Available Scripts

- run `yarn start` for development
- run `yarn build` builds the app for production to the `build` folder.
- run `yarn test` to run tests
- run `yarn eject` to remove the single build dependency (avoid it, use craco for customization instead)

### Static types

- [Typescript](https://www.typescriptlang.org/)

### Code formatting

- [Prettier](https://github.com/prettier/prettier)

### Folder structure

- `*.container.*` -> handle logic, fetch data, connect stores
- `*.component.*` -> React view
- `*.styles.*` -> styled components
- `*.helpers.*` -> helper functions used exclusively by that component
- `*.test.*` -> tests for component

### Core Libraries

- [Mobx](https://mobx.js.org/intro/concepts.html)
- [Mobx in React](https://mobx-react.js.org/)
- [Emotion](https://emotion.sh/docs/introduction)

### Consistent Node version

- [NVM](https://github.com/creationix/nvm)
- run `nvm use` to set your node version

### Deployment

https://facebook.github.io/create-react-app/docs/deployment

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
