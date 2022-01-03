import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export const Color = {
   primary: "#b59f6b",
   primary2: "#d5c192",
   secondary: "#201c19",
   secondary2: "#35302d",
   secondary3: "#423d38",
   dark: "#161616",
   grayDark: "#868482",
   grayLight: "#ababab",
   light: "#ececec",
   white: "#FFFFFF",
   red1: "#fa3633",
   red: "red",
   yellow1: "#FAFF05",
   orange: "#ff831e",
}

export const BodyImage = (props) => { return (<ImageBackground source={props.url} resizeMode="cover" style={css.bodyImage}><View style={[css.bodyImageoverlay, { backgroundColor: props.overlay ? `rgba(0,0,0,${props.overlay})` : 'rgba(0,0,0,0.7)' }]}>{props.children}</View></ImageBackground>) }
export const Row = (props) => { return (<View style={[css.row, props.style]}>{props.children}</View>) }
export const Col = (props) => { return (<View style={[css.col, props.style]}>{props.children}</View>) }
export const H1 = (props) => { return (<Text style={[css.h1, props.style]}>{props.children}</Text>) }
export const H2 = (props) => { return (<Text style={[css.h2, props.style]}>{props.children}</Text>) }
export const H3 = (props) => { return (<Text style={[css.h3, props.style]}>{props.children}</Text>) }
export const H4 = (props) => { return (<Text style={[css.h4, props.style]}>{props.children}</Text>) }
export const H5 = (props) => { return (<Text style={[css.h5, props.style]}>{props.children}</Text>) }
export const H6 = (props) => { return (<Text style={[css.h6, props.style]}>{props.children}</Text>) }
export const Label = (props) => { return (<Text style={[css.Label, props.style]}>{props.children}</Text>) }
export const Box = (props) => { return (<View style={[css.box, props.style]}>{props.children}</View>) }
export const FormGroup = (props) => { return (<View style={[css.formGorup, props.style]}>{props.children}</View>) }
export const VHcenter = (props) => { return (<View style={[css.vhCenter, props.style]}>{props.children}</View>) }
export const Center = (props) => { return (<View style={[css.center, props.style]}>{props.children}</View>) }

const css = StyleSheet.create({
   test: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "stretch",
      paddingHorizontal: 1,
      paddingVertical: 1,
      marginHorizontal: 1,
      marginVertical: 1,
      borderBottomColor: "green",
      borderBottomWidth: 2,
      textAlign: "center",
      textTransform: "uppercase"
   },
   row: {
      flexDirection: "row",
      marginHorizontal: -5,
      alignItems: "center",
   },
   col: {
      flex: 1,
      paddingHorizontal: 5,
   },
   box: {
      position: "relative",
      flex: 1,
      marginBottom: 10,
      padding: 10,
      borderRadius: 8,
      backgroundColor: Color.secondary2,
      overflow: "hidden",
   },

   h1: {
      marginBottom: 8,
      color: "#FFF",
      fontSize: 40,
      lineHeight: 45,
      fontWeight: "600",
   },
   h2: {
      marginBottom: 7,
      color: "#FFF",
      fontSize: 35,
      lineHeight: 40,
      fontWeight: "600",
   },
   h3: {
      marginBottom: 6,
      color: "#FFF",
      fontSize: 30,
      lineHeight: 35,
      fontWeight: "600",
   },
   h4: {
      marginBottom: 6,
      color: "#FFF",
      fontSize: 25,
      lineHeight: 30,
      fontWeight: "600",
   },
   h5: {
      marginBottom: 5,
      color: "#FFF",
      fontSize: 18,
      lineHeight: 20,
      fontWeight: "600",
   },
   h6: {
      marginBottom: 4,
      color: "#FFF",
      fontSize: 16,
      lineHeight: 18,
      fontWeight: "500",
   },
   Label: {
      color: "#FFF",
   },
   formGorup: {
      marginBottom: 20,
   },
   vhCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   center: {
      justifyContent: "center",
      alignItems: "center",
   },
   bodyImage: {
      flex: 1,
   },
   bodyImageoverlay: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 35,
      paddingBottom: 10,
   },
});

