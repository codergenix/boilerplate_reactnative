import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { getAllUser, userSelector, setCurrentUser, addUser, setParams, clearState } from '../Store/Reducers/user';

const Users = ({ navigation }) => {
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState(null);
    const { users, currentUser, isAdded, isError, errorMessage } = useSelector(userSelector);
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.h2}> Users list</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    h4: {
        fontSize: 18,
    },
    h2: {
        textAlign: "center",
        fontSize: 23,
        color: "#000"
    },
});

export default Users;