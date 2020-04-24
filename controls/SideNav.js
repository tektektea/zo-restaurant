import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Text,Icon} from "react-native-elements";
import { DrawerItems } from 'react-navigation-drawer';
import React from "react";
import {Avatar} from "react-native-elements";
import {PRIMARY} from "../utils/Colors";

const SideNav = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
        >
            <Icon containerStyle={{margin:10}} color={PRIMARY} size={64} name={"store"} type={"fontawesome"}/>
            <Text style={{alignSelf:"center"}} h4={true}>Menu</Text>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SideNav
