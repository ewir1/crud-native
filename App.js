/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import BarraSuperior from './components/ui/Barra';
import DetallesCliente from './views/DetallesCliente';
import Inicio from './views/Inicio';
import {NavigationContainer} from '@react-navigation/native';
import NuevoCliente from './views/NuevoCliente';
import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Definir el tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF',
  },
};

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {backgroundColor: theme.colors.primary},
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={({navigation, route}) => ({
                headerTitleAlign: 'center',
                // headerLeft: props => (
                //   <BarraSuperior
                //     {...props}
                //     navigation={navigation}
                //     route={route}
                //   />
                // ),
              })}
            />
            <Stack.Screen
              name="NuevoCliente"
              component={NuevoCliente}
              options={{
                title: 'Nuevo Cliente',
              }}
            />
            <Stack.Screen
              name="DetallesCliente"
              component={DetallesCliente}
              options={{
                title: 'Detalles Cliente',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
