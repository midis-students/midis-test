import { lazy } from 'react';
import { EditorMeta } from '../type';
import metaImage from './icon.svg';

const editor: EditorMeta = {
  type: 'json',
  img: metaImage,
  description: 'RAW editor',
  title: 'JSON',
  Editor: lazy(() => import('./editor')),
  Reply: lazy(() => import('./reply')),
};

export default editor;
