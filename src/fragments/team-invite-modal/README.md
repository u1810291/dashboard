Team invite form

```js
initialState = {
  visible: false
};
<div>
  <button onClick={() => setState({visible: true})}>Show modal</button>
  {
    state.visible && 
    <TeamInviteModal
      onClose={() => setState({visible: false})}
      onSubmit={() => new Promise((resolve) => resolve())}
    />
  }
</div>

```
