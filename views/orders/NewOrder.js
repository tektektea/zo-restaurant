import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {PADDING, RADIUS} from "../../utils/Dimensions";
import {CustomerTile} from "../customers/CustomerTIle";
import {Button, Input, Text} from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomerListDialog from "../customers/CustomerListDialog";
import OrderItemList from "./OrderItemList";
import ItemListDialog from "../items/ItemListDialog";
import PropTypes from 'prop-types';
import TaxesList from "../taxes/TaxesList";
import NumberFormat from "react-number-format";
import moment from "moment";
import {DateButton} from "../../controls/DateButton";
import {WHITE} from "../../utils/Colors";
import TaxListDialog from "../taxes/TaxListDialog";
import {OrderStatus} from "../../utils/Constant";
import Toaster from "../../controls/Toaster";

const styles = StyleSheet.create({

    body: {
        flex: 1,
        display: "flex",
        padding: PADDING,
        marginBottom: 80
    },
    firstRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-around",
        padding: 0
    },
    tile: {
        borderRadius: RADIUS,
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 2,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-around"
    },
    buttons: {
        position: "absolute",
        bottom: 0,
        backgroundColor: WHITE,
        elevation: 1,
        left: 0,
        display: "flex",
        flexDirection: "row",
    },
    amountDisplay: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end"
    }
});


class NewOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoice_no: "" + Math.floor(Date.now() / 1000),
            invoice_date: new Date(),
            customer: null,
            orders: [],
            taxes: [],

            error: "",
            openDatePicker: false
        }
    }

    selectCustomer = (customer) => {
        this.setState({customer, openCustomerList: false})
    };

    removeCustomer = (customer) => {
        this.setState({customer: null})
    };

    addOrderItem = (item) => {
        this.setState({openItemList: false});
        const {orders} = this.state;
        // let found=false
        // for (let i = 0; i < orders.length; i++) {
        //     if (item.name === orders[i].name) {
        //         let qty = orders[i].qty;
        //         orders[i].qty = ++qty;
        //         orders[i].amount = qty * item.price;
        //         found=true;
        //         break;
        //     }
        // }
        // if (!found) {
        //     orders.push({
        //         name:item.name,
        //         qty:1,
        //         amount:item.price
        //     })
        // }
        orders.push(item);
        this.setState({orders});

        this.calculateAmount()
    };

    calculateAmount = () => {
        const {orders, taxes} = this.state;
        const taxableAmount = orders.reduce((acc, item) => acc + eval(item.amount), 0);
        const taxPercent = taxes.reduce((acc, item) => acc + eval(item.percent), 0);
        const taxAmount = taxableAmount * (taxPercent / 100);
        const netAmount = taxableAmount - taxAmount;

        this.setState({taxableAmount, taxPercent, taxAmount, netAmount})
    };
    removeOrder = (index) => {
        const {orders} = this.state;
        delete orders[index];
        this.setState({orders});

        this.calculateAmount();
    };
    removeTax = (index) => {
        const {taxes} = this.state;
        delete taxes[index];
        this.setState({taxes});

        this.calculateAmount();
    };


    addTax = (tax) => {
        const {taxes} = this.state;
        taxes.push(tax);
        this.setState({taxes, openTax: false});

        this.calculateAmount();
    };
    gotoCashCounter = () => {
        const {gotoCashCounter} = this.props;
        const {invoice_no, invoice_date, customer,orders,taxes,taxableAmount,taxAmount,netAmount} = this.state;
        if (orders.length === 0) {
            this.setState({error:"Please make some order"})
            return
        }
        gotoCashCounter({invoice_no,
            invoice_date,
            customer,
            orders,
            taxes,
            taxableAmount,
            taxAmount,
            netAmount,
            status:OrderStatus.PAYABLE});
    };

    confirmOrder = () => {
        const {onConfirmOrder} = this.props;
        const {invoice_no, invoice_date, customer,orders,taxes,taxableAmount,taxAmount,netAmount} = this.state;
        if (orders.length === 0) {
            this.setState({error:"Please make some order"})
            return
        }
        onConfirmOrder({
            invoice_no,invoice_date,customer,orders,taxes,taxableAmount,taxAmount,netAmount,status:OrderStatus.PAYABLE
        })
    };

    render() {
        const {customer, invoice_no, invoice_date, orders,error, taxes} = this.state;
        const {openDatePicker, openCustomerList, openTax, openItemList} = this.state;
        const {taxableAmount, taxAmount, netAmount} = this.state;
        return (
            <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
                <View style={styles.row}>
                    <View style={[styles.tile, {flex: 1}]}>
                        <Input
                            onChangeText={val => this.setState({invoice_no: val})}
                            value={invoice_no}
                            label={"Invoice No"}
                            placeholder='Invoice No'
                        />

                        <DateButton containerStyle={{marginTop: 6}}
                                    onPress={() => this.setState({openDatePicker: true})} label={"Invoice Date"}
                                    value={moment(invoice_date).format("Do MMM YYYY")}/>
                        {openDatePicker && <DateTimePicker value={invoice_date}
                                                           mode={"date"}
                                                           display="default"
                                                           onChange={(event, d) => this.setState({
                                                               openDatePicker: false,
                                                               invoice_date: d
                                                           })}/>
                        }
                    </View>
                    <View style={[styles.tile, {flex: 1, marginLeft: 6}]}>
                        <CustomerTile pressAdd={() => this.setState({openCustomerList: true})}
                                      onRemove={this.removeCustomer} customer={customer}/>
                    </View>
                </View>
                <ScrollView style={styles.body}>
                    <View style={styles.row}>
                        {orders && <OrderItemList orders={orders} onRemove={this.removeOrder}/>}

                    </View>
                    <View style={styles.row}>
                        <Button onPress={() => this.setState({openItemList: true})} type={"clear"}
                                title={orders.length > 0 ? "Add more item" : "Click here to add item"}/>
                    </View>

                    <View style={styles.row}>
                        {taxes && <TaxesList taxes={taxes} onRemove={this.removeTax}/>}
                    </View>
                    <View style={[styles.row]}>
                        <Button onPress={() => this.setState({openTax: true})} type={"clear"}
                                title={taxes.length > 0 ? "Add more tax" : "Click here to add tax"}/>
                    </View>

                    <View style={styles.amountDisplay}>
                        <NumberFormat decimalScale={2} fixedDecimalScale={true} value={taxableAmount}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      renderText={value => <Text style={{padding: 4}}>Taxable
                                          Amount: {value}</Text>}
                                      prefix={'₹'}/>

                        <NumberFormat decimalScale={2} fixedDecimalScale={true} value={taxAmount}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      renderText={value => <Text style={{padding: 4}}>Tax Amount: {value}</Text>}
                                      prefix={'₹'}/>

                        <NumberFormat decimalScale={2} fixedDecimalScale={true} value={netAmount}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      renderText={value => <Text style={{padding: 4}}>Net Amount: {value}</Text>}
                                      prefix={'₹'}/>
                    </View>
                </ScrollView>
                <Toaster visible={Boolean(error)} message={error}/>
                <View style={styles.buttons}>
                    <Button containerStyle={{flex: 1, margin: 3}} raised={true} onPress={() => this.props.onBack()}
                            type={"outline"} title={"Back"}/>
                    <Button containerStyle={{flex: 2, margin: 3}} raised={true} onPress={this.confirmOrder}
                            type={"outline"} title={"Done"}/>
                    <Button containerStyle={{flex: 1, margin: 3}} raised={true} onPress={this.gotoCashCounter}
                            type={"outline"} title={"Payment"}/>
                </View>

                {openCustomerList && <CustomerListDialog open={openCustomerList}
                                                         onSelect={this.selectCustomer}
                                                         onClose={() => this.setState({openCustomerList: false})}/>}
                {openItemList && <ItemListDialog open={openItemList}
                                                 onSelect={this.addOrderItem}
                                                 onClose={() => this.setState({openItemList: false})}/>}

                {openTax && <TaxListDialog onSelect={this.addTax}
                                           open={openTax}
                                           onClose={() => this.setState({openTax: false})}/>}
            </ScrollView>

        );
    }
}

NewOrder.propTypes = {
    onBack: PropTypes.func.isRequired,
    onConfirmOrder: PropTypes.func.isRequired,
    gotoCashCounter: PropTypes.func.isRequired,
};
export default NewOrder;
