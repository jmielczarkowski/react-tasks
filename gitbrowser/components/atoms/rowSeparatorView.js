/**
 * Common list separator view.
 */

 import React from 'react';
 import { View } from 'react-native';
 import {
     StyleSheet
 } from 'react-native';
 
 export const rowSeparatorView = () => {
     return (
        <View style={styles.itemSeparatorStyle} />);
 };
 
 const styles = StyleSheet.create({
     itemSeparatorStyle: {
         height: 0.5,
         width: '100%',
         backgroundColor: '#000000',
     }
 });