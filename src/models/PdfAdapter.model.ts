import React, { FC } from 'react';
/**
 * Copied from @react-pdf/types/style.d.ts
 * All imports from the library should be encapsulated inside apps/pdf folder
 */
export interface Style {
  // Flexbox

  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  flex?: number | string;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexFlow?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

  // Layout

  bottom?: number | string;
  display?: 'flex' | 'none';
  left?: number | string;
  position?: 'absolute' | 'relative';
  right?: number | string;
  top?: number | string;
  overflow?: 'hidden';

  // Dimension

  height?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  width?: number | string;

  // Color

  backgroundColor?: string;
  color?: string;
  opacity?: number;

  // Text

  fontSize?: number | string;
  fontFamily?: string;
  fontStyle?: string | 'normal';
  fontWeight?: number | 'thin' | 'hairline' | 'ultralight' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'demibold' | 'bold' | 'ultrabold' | 'extrabold' | 'heavy' | 'black';
  letterSpacing?: number | string;
  lineHeight?: number | string;
  maxLines?: number; // ?
  textAlign?: 'left' | 'right' | 'center' | 'justify'; // ?
  textDecoration?: 'line-through' | 'underline' | 'none' | 'line-through underline' | 'underline line-through';
  textDecorationColor?: string;
  textDecorationStyle?: 'dashed' | 'dotted' | 'solid' | string; // ?
  textIndent?: any; // ?
  textOverflow?: 'ellipsis';
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase';

  // Sizing/positioning

  objectFit?: string;
  objectPosition?: number | string;
  objectPositionX?: number | string;
  objectPositionY?: number | string;

  // Margin/padding

  margin?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  padding?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;

  // Transformations

  transform?: string;
  transformOrigin?: number | string;
  transformOriginX?: number | string;
  transformOriginY?: number | string;

  // Borders

  border?: number | string;
  borderWidth?: number | string;
  borderColor?: string;
  borderStyle?: 'dashed' | 'dotted' | 'solid';
  borderTop?: number | string;
  borderTopColor?: string;
  borderTopStyle?: 'dashed' | 'dotted' | 'solid'; // ?
  borderTopWidth?: number | string;
  borderRight?: number | string;
  borderRightColor?: string;
  borderRightStyle?: 'dashed' | 'dotted' | 'solid'; // ?
  borderRightWidth?: number | string;
  borderBottom?: number | string;
  borderBottomColor?: string;
  borderBottomStyle?: 'dashed' | 'dotted' | 'solid'; // ?
  borderBottomWidth?: number | string;
  borderLeft?: number | string;
  borderLeftColor?: string;
  borderLeftStyle?: 'dashed' | 'dotted' | 'solid'; // ?
  borderLeftWidth?: number | string;
  borderTopLeftRadius?: number | string;
  borderTopRightRadius?: number | string;
  borderBottomRightRadius?: number | string;
  borderBottomLeftRadius?: number | string;
  borderRadius?: number | string;
}

type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type SourceURL = string

type SourceBuffer = Buffer

type SourceDataBuffer = { data: Buffer; format: 'png' | 'jpg' }

type SourceURLObject = { uri: string; method: HTTPMethod; body: any; headers: any }

type Source =
  | SourceURL
  | SourceBuffer
  | SourceDataBuffer
  | SourceURLObject
  | undefined

type SourceFactory = () => Source

type SourceAsync = Promise<Source>

type SourceAsyncFactory = () => Promise<Source>

export type SourceObject = Source | SourceFactory | SourceAsync | SourceAsyncFactory

export interface Styles {
  [key: string]: Style;
}

export type StyleSheet = {
  create: <T extends Styles>(styles: T) => T;
};

export enum PdfCommonStyleTypes {
  Page = 'page',
  Paper = 'paper',
  Mt1 = 'mt1',
  Mr05 = 'mr05',
  Mb0 = 'mb0',
  Mb05 = 'mb05',
  Mb1 = 'mb1',
  Mb15 = 'mb15',
  Pb0 = 'pb0',
  Title = 'title',
  TitleBold = 'titleBold',
  TitleBoldMain = 'titleBoldMain',
  Code = 'code',
  Data = 'data',
  LabelContainer = 'labelContainer',
  Label = 'label',
  LabelIcon = 'labelIcon',
  MapBox = 'mapBox',
  Map = 'map',
  Footer = 'footer',
  BoldText = 'boldText',
}

export type CommonStyles = Record<PdfCommonStyleTypes, Style>;

export interface NodeProps {
  id?: string;
  fixed?: boolean;
  break?: boolean;
  style?: Style | Style[];
}

export interface TextProps extends NodeProps{
  wrap?: boolean;
  debug?: boolean;
  orphans?: number;
  widows?: number;
  children?: React.ReactNode;
}

export type PdfText = FC<TextProps>;

export interface ImageProps extends NodeProps {
  debug?: boolean;
  cache?: boolean;
  fixed?: boolean;
  src: SourceObject;
}

export type PdfImage = FC<ImageProps>;

export interface ViewProps extends NodeProps {
  wrap?: boolean;
  debug?: boolean;
  children?: React.ReactNode;
}

export type PdfView = FC<ViewProps>;

export interface IPdfRendererAdapter {
  View: PdfView;
  Image: PdfImage;
  Text: PdfText;
  commonStyles: CommonStyles;
  StyleSheet: StyleSheet;
}

export interface ProductVerificationPdfProps<T> {
  verification: T;
  pdfRendererAdapter: IPdfRendererAdapter;
}
