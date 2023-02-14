import { ApiTaskResponse } from '@/lib/Service.type';
import { createContext, Dispatch, SetStateAction } from 'react';

export type EditorValue = {
  onSave: () => Promise<boolean>;
  data: ApiTaskResponse | undefined;
};

type EditorDispatchValue = Dispatch<SetStateAction<EditorValue>>;

type EditorConext = {
  value: EditorValue;
  setValue: EditorDispatchValue;
};

export const defaultValue: EditorValue = {
  onSave: async () => false,
  data: undefined,
};

export const EditorContext = createContext<EditorConext>({
  value: defaultValue,
  setValue: () => defaultValue,
});
