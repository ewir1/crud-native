import {StyleSheet, Text, View} from 'react-native';

import {Button} from 'react-native-paper';
import React from 'react';

const BarraSuperior = ({navigation, route}) => {
  const handlePress = () => {
    navigation.navigate('NuevoCliente');
  };
  return (
    <Button name="plus-circle" color="#FFF" onPress={() => handlePress()}>
      + Cliente
    </Button>
  );
};

export default BarraSuperior;

const styles = StyleSheet.create({});
