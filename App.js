/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar} from 'react-native';
import AppRoute from "./routes/Routes";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'
import {Persistor, Store} from "./redux/store";


const App: () => React$Node = () => {
    return (
        <Provider store={Store}>
            {/*<PersistGate loading={null} persistor={Persistor}>*/}
                <>
                    <StatusBar backgroundColor={"#2089dc"} translucent={true} showHideTransition={"fade"}/>
                    <AppRoute/>
                </>
            {/*</PersistGate>*/}
        </Provider>

    )
};

export default App;
