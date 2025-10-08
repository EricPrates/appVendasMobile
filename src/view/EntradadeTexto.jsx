import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function EntradadeTexto ({onChangeText, tabAtiva, title}) {
  const [text, setText] = React.useState('');

  return (
    <><Text style = {styles.texto} title = {title}>
        {title}
    </Text>
    <TextInput
      label={title}
      value={text}
        title={title}
        mode="outlined"
      onChangeText={text=> onChangeText(text)}
    />
    </>

  );
};
const styles = StyleSheet.create({

    texto:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 10,
    }
})