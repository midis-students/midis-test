import { TaskCreatorEditor } from '@/pages/Edit/editors/TaskCreator';
import metaImage from './image.png';

const editor: TaskCreatorEditor = () => {
  return <>Task editor</>;
};

editor.meta = {
  type: 'radio',
  img: metaImage,
  description: 'Выбор одного варианта',
  title: 'Radio кнопки',
};

export default editor;
