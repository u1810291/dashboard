import { appPalette } from 'apps/theme/app.palette';

export default {
  'code[class*="language-"]': {
    display: 'inline-block',
    verticalAlign: 'top',
    color: 'var(--mgi-theme-palette-lightergray)',
    fontFamily: 'Menlo, monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    fontSize: '14px',
    lineHeight: '1.33em',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: 'var(--mgi-theme-palette-lightergray)',
    fontFamily: 'Menlo, monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    fontSize: '12px',
    lineHeight: '1.33em',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '10px 1rem 0',
    margin: '0',
    overflow: 'auto',
  },
  'pre[class*="language-"]::-moz-selection': {
    background: '#C1DEF1',
  },
  'pre[class*="language-"] ::-moz-selection': {
    background: '#C1DEF1',
  },
  'code[class*="language-"]::-moz-selection': {
    background: '#C1DEF1',
  },
  'code[class*="language-"] ::-moz-selection': {
    background: '#C1DEF1',
  },
  'pre[class*="language-"]::selection': {
    background: '#C1DEF1',
  },
  'pre[class*="language-"] ::selection': {
    background: '#C1DEF1',
  },
  'code[class*="language-"]::selection': {
    background: '#C1DEF1',
  },
  'code[class*="language-"] ::selection': {
    background: '#C1DEF1',
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '.2em',
    paddingTop: '1px',
    paddingBottom: '1px',
    background: '#f8f8f8',
    border: '1px solid #dddddd',
  },
  comment: {
    color: 'var(--mgi-theme-palette-gray)',
  },
  prolog: {
    color: '#008000',
    fontStyle: 'italic',
  },
  doctype: {
    color: '#008000',
    fontStyle: 'italic',
  },
  cdata: {
    color: '#008000',
    fontStyle: 'italic',
  },
  namespace: {
    Opacity: '.7',
  },
  string: {
    color: appPalette.green,
  },
  punctuation: {
    color: 'var(--mgi-theme-palette-lightergray)',
  },
  operator: {
    color: '#393A34',
  },
  url: {
    color: appPalette.lightblue,
  },
  symbol: {
    color: appPalette.lightblue,
  },
  number: {
    color: appPalette.lightblue,
  },
  boolean: {
    color: appPalette.lightblue,
  },
  variable: {
    color: appPalette.lightblue,
  },
  constant: {
    color: appPalette.lightblue,
  },
  inserted: {
    color: appPalette.lightblue,
  },
  atrule: {
    color: appPalette.green,
  },
  keyword: {
    color: appPalette.green,
  },
  'attr-value': {
    color: appPalette.green,
  },
  '.language-autohotkey .token.selector': {
    color: appPalette.green,
  },
  '.language-json .token.boolean': {
    color: appPalette.green,
  },
  '.language-json .token.number': {
    color: appPalette.green,
  },
  'code[class*="language-css"]': {
    color: appPalette.green,
  },
  function: {
    color: '#393A34',
  },
  deleted: {
    color: '#9a050f',
  },
  '.language-autohotkey .token.tag': {
    color: '#9a050f',
  },
  selector: {
    color: 'var(--mgi-theme-palette-blue)',
  },
  '.language-autohotkey .token.keyword': {
    color: '#00009f',
  },
  important: {
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  'class-name': {
    color: '#2B91AF',
  },
  '.language-json .token.property': {
    color: '#2B91AF',
  },
  tag: {
    color: 'var(--mgi-theme-palette-blue)',
  },
  'attr-name': {
    color: 'var(--mgi-theme-palette-lightergray)',
  },
  property: {
    color: 'var(--mgi-theme-palette-lightergray)',
  },
  regex: {
    color: 'var(--mgi-theme-palette-lightergray)',
  },
  entity: {
    color: 'var(--mgi-theme-palette-lightergray)',
  },
  'directive.tag  .tag': {
    background: '#ffff00',
    color: '#393A34',
  },
  '.line-numbers .line-numbers-rows': {
    borderRightColor: '#a5a5a5',
  },
  '.line-numbers-rows > span:before': {
    color: '#2B91AF',
  },
  '.line-highlight': {
    background:
      'linear-gradient(to right, rgba(193, 222, 241, 0.2) 70%, rgba(221, 222, 241, 0))',
  },
};
