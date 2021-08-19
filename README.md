# Mati Dashboard Frontend Project

## Start:

```bash
yarn start
```

##Lint:
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

5. ```apps/models/``` - here is the feature model, in it you need to store interfaces and utility functions related to the feature
      - ```apps/models/NewFeature.model.ts``` - you need to use this way
      - ```apps/NewFeature/models/NewFeature.model.ts``` - you can often find a model inside a feature, this way of specifying a model is outdated

The above are the most common entities that are used when adding a new feature. Also, a feature can include any other entities necessary to implement the feature, for example:

6. ```apps/NewFeature/hooks/somehook.hook.ts```  - react hooks
7. ```apps/NewFeature/services/somehook.services.ts``` - service usually has methods and is called in components or elsewhere, for example:
```javascript 
export class SomeService {}
``` 

