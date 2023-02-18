import { lazy } from 'react';
import { EditorMeta } from '../type';
import metaImage from './image.png';

const editor: EditorMeta = {
  type: 'radio',
  img: metaImage,
  description: 'Выбор одного варианта',
  title: 'Radio кнопки',
  Editor: lazy(() => import('./editor')),
  Reply: lazy(() => import('./reply')),
};

export default editor;
