import React from 'react';

export interface EditorMeta {
  title: string;
  description: string;
  img: string;
  type: string;

  Editor: ReturnType<typeof React.lazy>;
  Reply: ReturnType<typeof React.lazy>;
}
