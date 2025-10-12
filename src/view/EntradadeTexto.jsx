import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function EntradadeTexto ({onChangeText, placeholder, title, value, keyboardType}) {
 

  return (
    <><Text style = {styles.texto} title = {title}>
        {title}
    </Text>
    <TextInput
      label={title}
      value={value}
        title={title}
      keyboardType={keyboardType}
        mode="outlined"
      onChangeText={onChangeText}
      placeholder={placeholder}
      
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