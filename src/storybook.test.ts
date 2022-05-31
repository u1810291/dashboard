/** This test creates snapshots from all .stories files in the project
 * and store them in src/__snapshots__/
 */

import initStoryshots from '@storybook/addon-storyshots';

/** I tried to use multiSnapshotWithOptions for several snapshot files
 * https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-core#multisnapshotwithoptionsoptions
 * but it was creating snapshots in src/src (making subfolder).
 * I tried to move it outside of src and run with 'jest storybook.test.ts'
 * but it produces 'Jest encountered an unexpected token' Error
 */

initStoryshots();
