import React from 'react';
import StatusBar from "react-native-web/src/exports/StatusBar";

import Routes from './src/routes'

export default function App() {
    return (
        <>
            <StatusBar barStlye ="light-content" backgroundColor="#7d40e7"/>
            <Routes/>
        </>
    );
}