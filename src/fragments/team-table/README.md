```js
initialState = {
  rows: [
    {
      name: 'Dima Martynchuk',
      email: 'lisette_bosco@yahoo.com',
      role: 'admin'
    },
    {
      name: 'Sasha Homakov',
      email: 'sasha_homak@gmail.com',
      role: 'agent'
    },
    {
      name: 'Johnny Somansky',
      email: 'jo_somansky@bing.com',
      role: 'agent'
    },
  ],
  teamName: 'Bank of Mexico'
};

<TeamTable 
  rows={state.rows}
  onInviteSubmit={() => {}}
  teamName={state.teamName}
  onTeamNameChange={(teamName) => {setState({teamName})}}
  onDeleteSubmit={() => {}}
  onRoleChange={() => {}}
/>
```
