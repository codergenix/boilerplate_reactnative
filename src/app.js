/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { Provider } from 'react-redux';
 import FlashMessage from "react-native-flash-message";

 import{StatusBar,StyleSheet,Text,View } from 'react-native';
 import Navigation from './navigation';
 
 import store from './Store';

 const App =() =>  {
   return (
     <>
     <Provider store={store}>
      <StatusBar/>
      <Navigation />
      <FlashMessage position="bottom" />
     </Provider>
     </>
   );
 };
 export default App;
 