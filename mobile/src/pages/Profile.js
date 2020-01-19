import React from 'react';
import {StyleSheet, View} from 'react-native'
import {WebView} from "react-native-webview";

function Profile({navigation}) {

    const githubUserName = navigation.getParam('github_username');

    return <WebView style={styles.screen}
                    source={{uri: `https://github.com/${githubUserName}`}}/>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default Profile