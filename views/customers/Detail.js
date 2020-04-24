import React, {Component} from 'react';
import {Card,Text} from "react-native-elements";
import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import {GRAY, PRIMARY, WHITE} from "../../utils/Colors";
import {OrderCard} from "../orders/OrderCard";
import {connect} from "react-redux";
import {getCustomerOrders} from "../../redux/actions/orderActions";
import {PADDING} from "../../utils/Dimensions";
import ButtonGrouper from "../../controls/ButtonGroup";

const styles = StyleSheet.create({
    divider: {
        height: 2,
        backgroundColor: GRAY,
    },
    title:{
        alignSelf:"center",
        marginTop:30,
        fontSize:18,
        color:GRAY
    },
    subtitle:{
        alignSelf:"center",
        fontSize:16,
        color:GRAY
    },
    caption:{
        alignSelf:"center",
        fontSize:14,
        color:GRAY
    }
});

class Detail extends Component {

    componentDidMount(): void {
        const {navigation,getCustomerOrders} = this.props;
        const {customer}=navigation.state.params
        getCustomerOrders(customer.id)
    }

    pressMenu = () => {

    };
    onPay = (order) => {

    };
    completeOrder = (order) => {

    };
    cancelOrder = (order) => {

    };
    keyExtractor = (index) => index.toString();

    render() {
        let {orders} = this.props;
        const {navigation} = this.props;
        const {customer}=navigation.state.params
        return (
            <ScrollView style={{backgroundColor:"#f4f4f4"}} >
                <View style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: WHITE,
                    elevation: 2
                }}>
                    <Text style={{flex: 1, fontWeight: "bold", fontSize: 20, color: "gray"}}>Orders</Text>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={true}
                    horizontal={true}
                    keyExtractor={(item, index) =>item.invoice_no}
                    data={orders}
                    renderItem={({item}) => <OrderCard cancelOrder={this.cancelOrder} onPay={this.onPay}
                                                       onComplete={this.completeOrder}
                                                       onPressMenu={this.pressMenu} order={item}/>}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.orderData.customerOrders
});
const mapDispatchToProps={
    getCustomerOrders
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);
