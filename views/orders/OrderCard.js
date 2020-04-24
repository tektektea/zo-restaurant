import React from "react";
import {Button, Card, ListItem, Text} from 'react-native-elements'
import {Dimensions, StyleSheet, View} from "react-native";
import NumberFormat from "react-number-format";
import moment from "moment";
import {OrderStatus} from "../../utils/Constant";
import {RADIUS} from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: RADIUS,
        width: Dimensions.get("window").width - 30
    },
    right: {
        alignSelf: "flex-end",
        fontSize: 16,
        fontWeight: "bold"
    },
    tile: {
        margin: 16
    }
});
export const OrderCard = ({order, cancelOrder, onPay, onComplete, onPressMenu}) => {
    const actionButtons = () => {
        if (order.status === OrderStatus.PAID) {
            return <Button containerStyle={{margin: 3, flex: 1}} type={"outline"}
                           onPress={() => cancelOrder(order)} title={"Cancel"} raise/>
        } else {
            return <>
                <Button containerStyle={{margin: 3, flex: 1}} type={"outline"}
                        onPress={() => cancelOrder(order)} title={"Cancel"} raise/>
                <Button containerStyle={{margin: 3, flex: 1}} type={"outline"} onPress={() => onComplete(order)}
                        title={"Done"} raise/>
                <Button containerStyle={{margin: 3, flex: 1}} type={"outline"} onPress={() => onPay(order)}
                        title={"Payment"} raise/>
            </>
        }
    };
    return (
        <Card title={"INVOICE NO: #" + order.invoice_no} containerStyle={styles.container}>
            <Text> Invoice Date: {moment(order.invoice_date).format("Do MMM YYYY")}</Text>

            {Boolean(order.table) &&
            <Text style={{margin: 6, fontWeight: "bold", fontSize: 16}}>Table: {order.table}</Text>}
            {Boolean(order.customer) &&
            <Text style={{margin: 6, fontWeight: "bold", fontSize: 16}}>Customer: {order.customer.name}</Text>}
            <Text style={{margin: 6, fontSize: 16, fontWeight: "bold"}}>Line Items</Text>

            {order.orders && order.orders.map((item, i) => (
                <ListItem key={i}
                          topDivider={true}
                          containerStyle={{padding: 10}}
                          onPress={() => onPressMenu(item)}
                          rightElement={
                              <NumberFormat decimalScale={2} value={item.amount} displayType={'text'}
                                            thousandSeparator={true}
                                            renderText={value => <Text style={styles.right}>{value}</Text>}
                                            prefix={'₹'}/>
                          }
                          title={item.item}
                          subtitle={"qty "+item.qty}
                />
            ))}

            <Text style={{fontSize: 16, fontWeight: "bold"}}>Amount Detail</Text>
            <View style={styles.tile}>
                <NumberFormat decimalScale={2} value={order.taxableAmount} displayType={'text'} thousandSeparator={true}
                              renderText={value => <Text style={styles.right}>Taxable Amount {value}</Text>}
                              prefix={'₹'}/>
                <NumberFormat decimalScale={2} value={order.taxAmount} displayType={'text'} thousandSeparator={true}
                              renderText={value => <Text style={styles.right}>Tax {value}</Text>}
                              prefix={'₹'}/>
                <NumberFormat decimalScale={2} value={order.netAmount} displayType={'text'} thousandSeparator={true}
                              renderText={value => <Text style={styles.right}>Net Amount {value}</Text>}
                              prefix={'₹'}/>
            </View>

            <View style={{
                display: "flex",
                flexDirection: "row"
            }}>
                {actionButtons()}
            </View>
        </Card>
    )
};
