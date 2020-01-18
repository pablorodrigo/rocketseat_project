import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Routes from './src/routes'

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello android!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff3126',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontWeight: "bold",
        fontSize: 32,
        color: "#202cff"
    }
});
