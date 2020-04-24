import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {PRIMARY} from "../utils/Colors";

const styles = StyleSheet.create({
    container: {
        margin: 4,
        borderRadius:3,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: '#fff',
        elevation: 6,
        flex: 1,
        height:40
    },
    text: {
        textAlign:"center",
        fontSize: 23,
        color: '#666',
    },
    special:{
        borderRadius:3,
        margin: 6,
        justifyContent:"center",
        backgroundColor: 'tomato',
        elevation: 6,
        flex: 1,
        height:40
    },
    operator:{
        borderRadius:3,
        margin: 6,
        justifyContent:"center",
        backgroundColor: PRIMARY,
        elevation: 6,
        flex: 1,
        height:40
    },
    specialText:{
        textAlign: 'center',
        fontSize: 23,
        color: '#fff',
    }
});
export const NumPad = ({onPress, value,style}) => {

    return (
        <View style={[styles.container,style]}>
            <TouchableHighlight style={{width:"100%",height:"100%",justifyContent:"center"}} onPress={() => onPress(value)}>
                <Text style={styles.text}>{value}</Text>
            </TouchableHighlight>
        </View>
    );
};
export const CashPad = ({onPress,sign, value}) => {

    return (
        <View style={styles.container}>
            <TouchableHighlight style={{width:"100%",height:"100%",justifyContent:"center"}} onPress={() => onPress(value)}>
                <Text style={styles.text}>{sign}{value}</Text>
            </TouchableHighlight>
        </View>
    );
};

export const SpecialPad = ({onPress, value}) => {

    return (
        <View style={styles.special}>
            <TouchableHighlight style={{width:"100%",height:"100%",justifyContent:"center"}} onPress={() => onPress(value)}>
                <Text style={styles.specialText}>{value}</Text>
            </TouchableHighlight>
        </View>
    );
};

export const OperatorPad = ({onPress, value}) => {

    return (
        <View style={styles.operator}>
            <TouchableHighlight style={{width:"100%",height:"100%",justifyContent:"center"}} onPress={() => onPress(value)}>
                <Text style={styles.specialText}>{value}</Text>
            </TouchableHighlight>
        </View>
    );
};
