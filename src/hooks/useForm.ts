import React from 'react';

export default function useForm<T>(defaultValue: T) {
  const [data, setData] = React.useState<T>(defaultValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return {
    data,
    input: (key: keyof T) => ({
      name: key,
      value: data[key],
      onChange,
    }),
  };
}
