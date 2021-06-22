export enum IdentityProfileErrorTypes {
  UserDeleted = 'userWasDeleted',
  UserDeletedByGdpr = 'userDeletedByGdpr',
  IdentityNotFound = 'identityNotFound',
  RequestError = 'requestError',
}

// TODO @vladislav.snimshchikov: remove the stubs when the backend starts sending data
export const userDataStub = {
  photo: 'https://static.mk.ru/upload/entities/2019/10/18/22/articles/detailPicture/1e/29/a3/a5/a0b656599fde72d6d31da7415a8cbad4.jpg',
  name: 'Pavel Rysych',
  birthDate: '2001-05-11T20:52:16.935Z',
  location: 'Saint-Petersburg, Russia',
};

export const notesTextStub = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.';
