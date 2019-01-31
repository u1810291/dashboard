With existing application
```js
const getID = () => Math.random().toString().split('.')[1];
initialState = { clientId: getID(), clientSecret: getID() };
<ManageApplicationsForm
  clientId={state.clientId}
  clientSecret={state.clientSecret}
  createApplication={() => setState({
    clientId: getID(), clientSecret: getID()
  })}
/>
```

Without any application
```js
const getID = () => Math.random().toString().split('.')[1];
initialState = {};
<ManageApplicationsForm
  clientId={state.clientId}
  clientSecret={state.clientSecret}
  createApplication={() => setState({
    clientId: getID(), clientSecret: getID()
  })}
/>
```
