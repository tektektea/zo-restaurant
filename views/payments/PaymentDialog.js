import React, {Component} from 'react';
import {Button, Overlay} from "react-native-elements";
import {View,StyleSheet} from "react-native";
import Calculator from "../../controls/calculator/Calculator";

const styles=StyleSheet.create({
    container:{
        flex:1,
    }
})
class PaymentDialog extends Component {
    render() {
        const {open,onPay,onClose} = this.props;
        return (
            <Overlay fullScreen={true} isVisible={open}>
                <Calculator />
                <Button onPress={()=>onPay()} raised={true} type={"outline"} title={"Pay"}/>
                <Button onPress={()=>onClose()} buttonStyle={{backgroundColor:"tomato"}} titleStyle={{color:"#fff"}} raised={true} type={"outline"} title={"Close"}/>
            </Overlay>
        );
    }
}

export default PaymentDialog;
