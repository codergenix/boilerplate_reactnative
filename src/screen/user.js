import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View as Div, Text, TextInput, Button, Modal, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";

import { getAllUser, userSelector, setCurrentUser, deleteUser, updateUser, addUser, setParams, clearState } from '../Store/Reducers/user';
import { Color, Row, Col, FormGroup, H3, H4, H5, Label } from '../Components/html';
import Service from '../Utils/service';

const Users = ({ navigation }) => {
    const dispatch = useDispatch();
    const { users, currentUser, isUpdated, isDeleted, isAdded, isError, errorMessage } = useSelector(userSelector);

    const [modalVisible, setModalVisible] = useState(false);
    const [formdata, setFormdata] = useState({});

    useEffect(() => {
        dispatch(clearState());
        dispatch(getAllUser());
    }, []);

    useEffect(() => {
        (async function () {
            var loginstatus = await Service.getlogin();
            if (!loginstatus) {
                navigation.navigate('login');
            }
        })()
    }, [])

    useEffect(() => {
        if (isError) {
            dispatch(clearState());
            showMessage({
                message: `Fail User : ${errorMessage}`,
                type: "danger",
                icon: "danger",
            });
        }
    }, [isError]);

    useEffect(() => {
        if (isAdded === true) {
            showMessage({
                message: "User Added success",
                type: "success",
                icon: "success",
            });
            closeModal();
        }
        dispatch(setParams({ isAdded: '' }));
    }, [isAdded]);

    useEffect(() => {
        if (isUpdated) {
            showMessage({
                message: "User Updated success",
                type: "success",
                icon: "success",
            });
            dispatch(setParams({ isUpdated: '' }));
            closeModal();
        }
    }, [isUpdated]);

    useEffect(() => {
        if (isDeleted) {
            showMessage({
                message: "User Deleted success",
                type: "success",
                icon: "success",
            });
            dispatch(setParams({ isDeleted: '' }));
            closeModal();
        }
    }, [isDeleted]);

    const rowclick = (obj) => {
        setFormdata(obj);
        dispatch(setCurrentUser(obj));
        setModalVisible(true);
    }

    const handlerDeleteUser = () => {
        let deleteData = {
            "id": formdata.id
        }
        dispatch(deleteUser(deleteData));
        closeModal();
    }
    const handlerUpdateUser = () => {
        dispatch(updateUser(formdata));
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => rowclick(item)}>
            <Div style={styles.tr} >
                <H5>{item.FirstName} {item.LastName}</H5>
                <Label>{item.Email}</Label>
            </Div>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.secondary }}>
            <Div style={{ paddingHorizontal: 15 }}>
                <H3> Users list </H3>
                <FlatList
                    data={users}
                    renderItem={Item}
                    keyExtractor={item => item.id}
                />
            </Div>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <Div style={styles.modalBackdrop}>
                    <Div style={styles.modalBody}>
                        <Row>
                            <Col><H4> User Detail </H4></Col>
                            <Col style={{ flex: 0 }}><Button title="x" onPress={closeModal} /></Col>
                        </Row>
                        <FormGroup>
                            <TextInput
                                style={styles.input}
                                value={formdata.FirstName}
                                placeholderTextColor="white" placeholder="Enter FirstName"
                                onChangeText={(value) => setFormdata({ ...formdata, FirstName: value })} />
                        </FormGroup>
                        <FormGroup>
                            <TextInput
                                style={styles.input}
                                value={formdata.LastName}
                                placeholderTextColor="white" placeholder="Enter LastName"
                                onChangeText={(value) => setFormdata({ ...formdata, LastName: value })} />
                        </FormGroup>
                        <FormGroup>
                            <TextInput
                                style={styles.input}
                                value={formdata.Email}
                                placeholderTextColor="white" placeholder="Enter Email"
                                onChangeText={(value) => setFormdata({ ...formdata, Email: value })} />
                        </FormGroup>
                        <FormGroup>
                            <TextInput
                                style={styles.input}
                                value={formdata.Description}
                                placeholderTextColor="white" placeholder="Enter Description"
                                onChangeText={(value) => setFormdata({ ...formdata, Description: value })}
                                editable
                                multiline
                                numberOfLines={4}
                            />
                        </FormGroup>
                        <Row>
                            <Col><Button color="red" title="Delete" onPress={handlerDeleteUser} /></Col>
                            <Col><Button title="Update" onPress={handlerUpdateUser} /></Col>
                        </Row>
                    </Div>
                </Div>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    tr: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        borderStyle: "solid"
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalBody: {
        width: "80%",
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: Color.secondary2,
    },
    input: {
        color: "white",
        paddingHorizontal: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderStyle: "solid",
    }
});

export default Users;