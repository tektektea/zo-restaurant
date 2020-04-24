import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, ToastAndroid, View} from "react-native";
import {ListItem, Text} from "react-native-elements";
import {OrderCard} from "./OrderCard";
import moment from "moment";
import ButtonGrouper from "../../controls/ButtonGroup";
import {PRIMARY, WHITE} from "../../utils/Colors";
import {PADDING} from "../../utils/Dimensions";
import {PopMenu} from "../../controls/PopMenu";
import {connect} from "react-redux";
import {changeStatus, deleteOrder, fetchPayableOrder} from "../../redux/actions/orderActions";
import {OrderStatus} from "../../utils/Constant";
import PaymentDialog from "../payments/PaymentDialog";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4"
    }
});
const List = ({orders, onPressMenu}) => {
    const keyExtractor = (index) => index.toString();
    const renderItem = (item) => (
        <ListItem
            key={item.invoice_no}
            title={"Invoice No:#" + item.invoice_no}
            subtitle={moment(item.invoice_date).format("Do MMM YYYY hh:mm A")}
            bottomDivider
            rightIcon={{name: "md-more", iconStyle: {padding: 6}, type: "ionicon", onPress: () => onPressMenu(item)}}
        />
    );

    return (
        <>
            <View style={styles.container}>
                {/*<Text h4={true}>Select Food</Text>*/}
                <FlatList
                    keyExtractor={(item, index) => keyExtractor(index)}
                    data={orders}
                    renderItem={({item}) => renderItem(item)}
                />
            </View>
        </>
    )

};
const Grid = ({orders, cancelOrder, onPay, onComplete, onPressMenu}) => {
    const keyExtractor = (index) => index.toString();

    return (
        <>
            <ScrollView>
                {/*<Text h4={true}>Select Food</Text>*/}
                <FlatList
                    showsHorizontalScrollIndicator={true}
                    horizontal={true}
                    keyExtractor={(item, index) => keyExtractor(index)}
                    data={orders}
                    renderItem={({item}) => <OrderCard cancelOrder={cancelOrder} onPay={onPay} onComplete={onComplete}
                                                       onPressMenu={onPressMenu} order={item}/>}
                />
            </ScrollView>
        </>
    )

};

class RecentOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedBtn: "list",
            selectedOrder: null
        }
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.error) {
            ToastAndroid.show(nextProps.error, ToastAndroid.SHORT)
        }
        if (nextProps.success) {
            ToastAndroid.show(nextProps.success, ToastAndroid.SHORT)
        }
        return {
            error: nextProps.error
        }
    };


    componentDidMount(): void {
        const {fetchPayableOrder} = this.props;
        fetchPayableOrder()
            .then(msg => console.log(msg))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    }

    showMenu = (selectedOrder) => {
        this.setState({showOption: true, selectedOrder})
    };
    onPay = (order) => {
        this.setState({
            selectedOrder:order,
            openPaymentDialog:true,
        })
    };

    cancelOrder = (order) => {
        const {deleteOrder} = this.props;
        deleteOrder(order.invoice_no)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };
    payOrder = (order) => {
        this.setState({openPaymentDialog: false})
        const {changeStatus} = this.props;
        changeStatus(OrderStatus.PAID, order)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };

    onMenuItemPressed = (menu) => {
        const {selectedOrder} = this.state;
        this.setState({showOption: false});
        switch (menu) {
            case 'Payment':
                break;
            case 'Cancel':
                this.cancelOrder(selectedOrder);
                break;
            case 'Mark as paid':
                this.payOrder(selectedOrder);
                break;
        }
    };

    render() {
        const {selectedBtn, openPaymentDialog, selectedOrder, showOption} = this.state;
        const {orders} = this.props;
        const menus = [
            {name: "Payment", icon: "money", onPress: this.onMenuItemPressed},
            {name: "Cancel", icon: "close", onPress: this.onMenuItemPressed},
            {name: "Mark as paid", icon: "align-center", onPress: this.onMenuItemPressed},
        ];
        return (
            <View style={{flex: 1, margin: 0, backgroundColor: "#f4f4f4"}}>

                <View style={{
                    flexDirection: "row",
                    padding: PADDING,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: WHITE,
                    elevation: 1
                }}>
                    <Text style={{flex: 1, fontWeight: "bold", fontSize: 20, color: "gray"}}>Recent Orders</Text>
                    <ButtonGrouper icons={[{name: "list", color: "gray"}, {name: "grid", color: "gray"}]}
                                   onPressed={(selectedBtn) => this.setState({selectedBtn})}
                                   selectedBtn={selectedBtn}
                                   tintColor={PRIMARY}
                    />
                </View>
                {selectedBtn === "list" && <List onPressMenu={this.showMenu} orders={orders}/>}
                {selectedBtn === "grid" &&
                <Grid onPay={(item) => this.onPay(item)} cancelOrder={this.cancelOrder} onComplete={this.payOrder}
                      onPressMenu={this.showMenu} orders={orders}/>}

                {showOption && <PopMenu title={"Menu"}
                                        description={"Choose an action"}
                                        open={showOption}
                                        menus={menus}
                                        onClose={() => this.setState({showOption: false})}/>}

                {openPaymentDialog && <PaymentDialog
                                                    onPay={()=>this.payOrder(selectedOrder)}
                                                     onClose={()=>this.setState({openPaymentDialog:false})}
                                                     open={openPaymentDialog}/>}


            </View>

        );
    }
}

const mapStateToProps = state => ({
    orders: state.orderData.payableOrders,
});
const mapDispatchToProps = {
    fetchPayableOrder,
    deleteOrder,
    changeStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentOrders);
