import {Alert, StyleSheet, View} from 'react-native';
import {Button, FAB, Headline, Subheading, Text} from 'react-native-paper';

import React from 'react';
import axios from 'axios';
import globalStyles from '../styles/global';

const DetallesCliente = ({route, navigation}) => {
  const {guardarConsultarAPI} = route.params;
  const {nombre, telefono, correo, empresa, id} = route.params;
  const mostrarConfirmacion = () => {
    Alert.alert(
      'Deseas eliminar este cliente?',
      'Un contacto eliminado no se puede recuperar',
      [
        {text: 'Si, eliminar', onPress: () => eliminarContacto()},
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  const eliminarContacto = async () => {
    // console.log('Eliminando...', id);
    const url = `http://localhost:3000/clientes/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Inicio');
    guardarConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo: <Subheading>{correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Telefono: <Subheading>{telefono}</Subheading>
      </Text>
      <Button
        style={styles.boton}
        mode="contained"
        icon="cancel"
        onPress={() => mostrarConfirmacion()}>
        Eliminar Cliente
      </Button>
      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate('NuevoCliente', {
            cliente: route.params.item,
            guardarConsultarAPI,
          })
        }
      />
    </View>
  );
};

export default DetallesCliente;

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  boton: {
    marginTop: 100,
    backgroundColor: 'red',
  },
});
