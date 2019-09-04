import React from 'react';
import { storiesOf } from '@storybook/react';
import PopupWindow from '.';

const stories = storiesOf('components/PopupWindow', module);

stories.add('Default', () => (
  <PopupWindow>
    <form>
      <fieldset>
        <legend>Name</legend>
        <label>Please enter first name: </label>
        <input type="text" />
        <br />
        <label>Please enter last name: </label>
        <input type="text" />
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  </PopupWindow>
));
