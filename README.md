# Mati Dashboard Frontend Project

## Start:

0. Make sure you're using the required Node and npm versions defined in `package.json` (the project includes an `.nvmrc` file, so you can just use `nvm use` if you manage your Node installation with `nvm`)

1. Install deps:
```bash
npm i
```

2. Run app:
```bash
yarn start
```

## Lint:
```bash
yarn eslint
```

## Build:

```bash
yarn build
```

# Feature structure

If you need to integrate a new feature into a project, then here's a small tip on how to organize the structure of the feature in order to go through the code review. The description of the structure will be on the example of the abstract component ```apps/NewFeature```

1. ```apps/NewFeature/index.ts``` - the barrier file which provide public API of the feature for other features. Re-export only public file here

For example:
 ```js
 export { NewFeature } from './components/NewFeature/NewFeature';
export * from './store/NewFeature.selectors';
 ```
2. ```apps/NewFeature/components``` - here are all the components that are related to the feature.
  
  For example: 
  ```sh 
    apps/NewFeature/components/NewFeatureSettings
    apps/NewFeature/components/NewFeatureVerification
    apps/NewFeature/components/NewFeatureModal
  ```
3. ```apps/NewFeature/store``` - everything related to the redux store is stored here.
      - ```apps/NewFeature/store/NewFeature.reducer.ts``` - redux reducer, which in turn connects to ```src/state/reducers```
      - ```apps/NewFeature/store/NewFeature.selectors.ts``` - reselect selectors, here we get data from the store, which we can then use in components
      - ```apps/NewFeature/store/NewFeature.actions.ts``` - redux actions
      - ```apps/NewFeature/store/NewFeature.store.ts``` - as a rule, there are interfaces that relate to the redux store (see examples in existing components)
4. ```apps/NewFeature/store/client``` - api requests related to the feature
      - ```apps/NewFeature/store/client/NewFeature.client.ts```

Also, a feature, as a rule, has a model.

5. ```apps/models/``` - here is the feature model, this is a place for business logic, here you can store interfaces and utility functions related to the feature
      - ```apps/models/NewFeature.model.ts``` - this is a <strong>shared</strong> feature model, here you store anything related to feature and needed outside of the ```apps/NewFeature```
      - ```apps/NewFeature/models/NewFeature.model.ts``` - this is a <strong>private</strong> feature model, here you can store all buisness logic which only used in the current feature

The above are the most common entities that are used when adding a new feature. Also, a feature can include any other entities necessary to implement the feature, for example:

6. ```apps/NewFeature/hooks/somehook.hook.ts```  - react hooks
7. ```apps/NewFeature/services/somehook.services.ts``` - service usually has methods and is called in components or elsewhere, for example:
```javascript 
export class SomeService {}
``` 

