import React from 'react'
import { storiesOf } from '@storybook/react'
import PageContentLayout from '.'

const stories = storiesOf('components/PageContentLayout', module)

const nav = (
  <nav
    style={{
      height: '100px',
      borderRadius: '10px',
      background: 'red',
      color: 'white',
      padding: '20px'
    }}
  >
    NAV
  </nav>
)

const aside = (
  <aside
    style={{
      height: '150px',
      borderRadius: '10px',
      background: 'crimson',
      color: 'white',
      padding: '20px'
    }}
  >
    ASIDE
  </aside>
)

const main = (
  <main
    style={{
      height: '250px',
      borderRadius: '10px',
      background: 'pink',
      color: 'white',
      padding: '20px'
    }}
  >
    MAIN
  </main>
)

stories.add('All elements', () => (
  <PageContentLayout>
    {nav}
    {aside}
    {main}
  </PageContentLayout>
))

stories.add('Empty navigation slot', () => (
  <PageContentLayout>
    {aside}
    {main}
  </PageContentLayout>
))

stories.add('Without navigation', () => (
  <PageContentLayout navigation={false}>
    {aside}
    {main}
  </PageContentLayout>
))

stories.add('Empty aside slot', () => (
  <PageContentLayout>
    {nav}
    {main}
  </PageContentLayout>
))

stories.add('Without aside', () => (
  <PageContentLayout aside={false}>
    {nav}
    {main}
  </PageContentLayout>
))

stories.add('Empty navigation and aside slots', () => (
  <PageContentLayout>{main}</PageContentLayout>
))

stories.add('Without aside and navigation', () => (
  <PageContentLayout aside={false} navigation={false}>
    {main}
  </PageContentLayout>
))
