import { userEvent } from '@storybook/testing-library';
import { testRender } from 'lib/testRender';
import React from 'react';
import { Light, WithCopyText, Overlaid } from '../CopyToClipboard.stories';

describe('<CopyToClipboard />', () => {
  it.each([
    ['Light', Light],
    ['WithCopyText', WithCopyText],
    ['Overlaid', Overlaid],
  ])('Text is copied after click on %s component', (_: string, CopyToClipboardStory: typeof Light) => {
    document.execCommand = jest.fn();
    const { getByRole } = testRender(<CopyToClipboardStory text={CopyToClipboardStory.args.text} {...CopyToClipboardStory.args}>{CopyToClipboardStory.args.children}</CopyToClipboardStory>);
    userEvent.click(getByRole('button'));
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
});
