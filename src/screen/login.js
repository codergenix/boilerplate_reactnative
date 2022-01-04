import React, { useState, useEffect } from "react";
import { ScrollView, FlatList, SafeAreaView, StatusBar, StyleSheet, View as Div, Text, TextInput, Button, } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";

import Service from '../Utils/service';
import { loginUser, loginSelector, clearState } from '../Store/Reducers/login';
import { Color, FormGroup, H3 } from '../Components/html';

const Login = ({ navigation }) => {

    const dispatch = useDispatch();
    const { isLogin, isError, errorMessage } = useSelector(loginSelector);

    const [formdata, setFormdata] = useState({});

    useEffect(() => {
        (async function(){
            var loginstatus = await Service.getlogin();
            if (loginstatus) {
                navigation.navigate('user');
            }
        })()
    }, [])

    useEffect(() => {
        if (isError) {
            dispatch(clearState());
            showMessage({
                message: `Fail login : ${errorMessage}`,
                type: "danger",
                icon: "danger",
            });
        }
    }, [isError]);

    useEffect(() => {
        if (isLogin) {
            showMessage({
                message: "Login is success",
                type: "success",
                icon: "success",
            });
            dispatch(clearState());
            navigation.navigate('user');
        }
    }, [isLogin]);

    const handlerLogin = () => {
        if (formdata.Email && formdata.Password) {
            dispatch(clearState());
            dispatch(loginUser(formdata));
        }
        else {
            showMessage({
                message: "Field Required",
                type: "warning",
                icon: "warning",
            });
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.secondary }}>
            <ScrollView>
                <Div style={{ paddingHorizontal: 15 }}>
                    <Div style={{ marginTop: 20, marginBottom: 20 }}>
                        <H3 style={{ textAlign: "center" }}> Login </H3>
                    </Div>
                    <FormGroup>
                        <TextInput style={styles.input} value={formdata.Email} placeholderTextColor="white" placeholder="Enter Email ID" onChangeText={(value) => setFormdata({ ...formdata, Email: value })} />
                    </FormGroup>
                    <FormGroup>
                        <TextInput style={styles.input} value={formdata.Password} placeholderTextColor="white" placeholder="Enter Password" onChangeText={(value) => setFormdata({ ...formdata, Password: value })} secureTextEntry={true} />
                    </FormGroup>
                    <FormGroup>
                        <Button title="Login" onPress={handlerLogin} />
                    </FormGroup>
                </Div>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        color: "white",
        paddingHorizontal: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderStyle: "solid",
    }
});

export default Login;