import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default function EntradadeTexto ({onChangeText, tabAtiva}) {
  const [text, setText] = React.useState(tabAtiva);

  return (
    <TextInput
      label="Email"
      value={text}
     
      onChangeText={text=> onChangeText(text)}
    />
  );
};

