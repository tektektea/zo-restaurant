import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import {WHITE} from "../../utils/Colors";

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    display:{
        fontSize:24,
        backgroundColor:"#345",
        color:"#8bee92",
        borderRadius:6,
        padding:10,
        marginBottom: 10,
        textAlign:"right"
    },
    expression:{
        fontSize: 18,
        margin:10
    }
})
const Display = (props) => (
    <View  style={{flex:1}}>
        <Text style={styles.display}>{props.value}</Text>
        <Text  style={styles.expression}>{props.expression}</Text>
    </View>
);

Display.defaultProps = {
    expression: '',
    value: '0'
};

Display.propTypes = {
    expression: PropTypes.string,
    value: PropTypes.string
};

export default Display;
