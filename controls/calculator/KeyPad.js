import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from "react-native";
import {NumPad, OperatorPad, SpecialPad} from "../NumPad";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column"
    },
    row:{
        flexDirection: "row"
    }
});
const Keypad = (props) => {


    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <SpecialPad value={"CE"} onPress={()=>props.onClearAll()}/>
                <SpecialPad value={"C"} onPress={()=>props.onClear()}/>
                <SpecialPad value={"<"} onPress={()=>props.onDelete()}/>
                <OperatorPad value={"/"} onPress={()=>props.onDivide()}/>

            </View>
            <View style={styles.row}>

                <NumPad value={"7"} onPress={e=>props.onDigit("7")}/>
                <NumPad value={"8"} onPress={e=>props.onDigit("8")}/>
                <NumPad value={"9"} onPress={e=>props.onDigit("9")}/>

                <OperatorPad value={"*"} onPress={()=>props.onMultiply()}/>
            </View>
            <View style={styles.row}>

                <NumPad value={"4"} onPress={e=>props.onDigit("4")}/>
                <NumPad value={"5"} onPress={e=>props.onDigit("5")}/>
                <NumPad value={"6"} onPress={e=>props.onDigit("6")}/>
                <OperatorPad value={"-"} onPress={()=>props.onSubtract()}/>

            </View>
            <View style={styles.row}>

                <NumPad value={"1"} onPress={e=>props.onDigit("1")}/>
                <NumPad value={"2"} onPress={e=>props.onDigit("2")}/>
                <NumPad value={"3"} onPress={e=>props.onDigit("3")}/>
                <OperatorPad value={"+"} onPress={()=>props.onAdd()}/>
            </View>
            <View style={styles.row}>

                <SpecialPad value={"+/-"} onPress={()=>props.onToggleSign()}/>
                <NumPad value={"0"} onPress={e=>props.onDigit("0")}/>

                <SpecialPad value={"."} onPress={()=>props.onDecimalPoint()} />
                <SpecialPad value={"="} onPress={()=>props.onEquals()}/>


            </View>
        </View>
    );
};

Keypad.defaultProps = {
    onDigit: digit => alert(digit),
    onClear: () => alert('clear'),
    onClearAll: () => alert('clear-all'),
    onDelete: () => alert('delete'),
    onAdd: () => alert('add'),
    onEquals: () => alert('equals'),
    onDecimalPoint: () => alert('.'),
    onSubtract: () => alert('subtract'),
    onToggleSign: () => alert('+/-'),
    onDivide: () => alert('/'),
    onMultiply: () => alert('*')
};

Keypad.propTypes = {
    onDigit: PropTypes.func,
    onClear: PropTypes.func,
    onClearAll: PropTypes.func,
    onDelete: PropTypes.func,
    onAdd: PropTypes.func,
    onEquals: PropTypes.func,
    onDecimalPoint: PropTypes.func,
    onSubtract: PropTypes.func,
    onDivide: PropTypes.func,
    onMultiply: PropTypes.func,
    onToggleSign: PropTypes.func
};

export default Keypad;
