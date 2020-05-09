import {
  Button,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';
import {Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from 'axios';
import globalStyles from '../styles/global';

const NuevoCliente = ({navigation, route}) => {
  const [nombre, guardarNombre] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [correo, guardarCorreo] = useState('');
  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  useEffect(() => {
    if (route.params.cliente) {
      const {nombre, telefono, correo, empresa} = route.params.cliente;
      guardarNombre(nombre);
      guardarTelefono(telefono);
      guardarCorreo(correo);
      guardarEmpresa(empresa);
    } else {
    }
  }, [route.params.cliente]);

  const {guardarConsultarAPI} = route.params;

  const guardarCliente = async () => {
    if (
      nombre.trim() === '' ||
      telefono.trim() === '' ||
      correo.trim() === '' ||
      empresa.trim() === ''
    ) {
      guardarAlerta(true);
      return;
    }

    const cliente = {nombre, telefono, correo, empresa};

    if (route.params.cliente) {
      const {id} = route.params.cliente;
      cliente.id = id;
      const url = `http://localhost:3000/clientes/${id}`;
      try {
        await axios.put(url, cliente);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // para android
        if (Platform.OS === 'ios') {
          await axios.post('http://localhost:3000/clientes', cliente);
        } else {
          // para ios
          await axios.post('http://10.0.2.2:3000/clientes', cliente);
        }
      } catch (error) {
        console.log(error);
      }
    }

    navigation.navigate('Inicio');
    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');

    guardarConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Anadir Nuevo Cliente</Headline>
      <TextInput
        label="Nombre"
        onChangeText={texto => guardarNombre(texto)}
        style={styles.input}
        value={nombre}
      />
      <TextInput
        label="Telefono"
        onChangeText={texto => guardarTelefono(texto)}
        style={styles.input}
        value={telefono}
      />
      <TextInput
        label="Correo"
        onChangeText={texto => guardarCorreo(texto)}
        style={styles.input}
        value={correo}
      />
      <TextInput
        label="Empresa"
        onChangeText={texto => guardarEmpresa(texto)}
        style={styles.input}
        value={empresa}
      />
      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>
      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default NuevoCliente;

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});
