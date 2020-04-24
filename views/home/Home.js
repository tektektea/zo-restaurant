import React, {Component} from 'react';
import {ToastAndroid, View} from "react-native";
import StepIndicator from "react-native-step-indicator";
import ChooseTable from "./ChooseTable";
import NewOrder from "../orders/NewOrder";
import Payment from "./Payment";
import {ELEVATION, PADDING} from "../../utils/Dimensions";
import {WHITE} from "../../utils/Colors";
import {INDICATOR_STYLE} from "../styles/IndicatorStyle";
import {createOrder} from "../../redux/actions/orderActions";
import {connect} from "react-redux";
import {OrderStatus} from "../../utils/Constant";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            table: null,
            order: null
        }
    }

    selectTable = (table) => {
        this.setState({table, activeStep: 1})
    };

    cashCounter = (order) => {
        this.setState({order, activeStep: 2})
    };
    reset = () => {
        this.setState({
            activeStep: 0,
            table: null,
        })
    };

    confirmOrder = (order) => {
        // this.setState({activeStep: 2});
        const {createOrder} = this.props;
        order.table = this.state.table;
        createOrder(order)
            .then(msg => {
                this.setState({activeStep:0})
                ToastAndroid.show(msg, ToastAndroid.SHORT)
            })
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))

    };
    onPay = (order) => {
        const {createOrder} = this.props;
        order.status = OrderStatus.PAID;
        createOrder(order)
            .then(msg => {
                this.setState({activeStep:0})
                ToastAndroid.show(msg, ToastAndroid.SHORT)
            })
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };

    render() {
        const labels = ["Choose Table", "Order", "Payment"];
        const {activeStep, order} = this.state;
        const {error, success} = this.props;
        return (
            <View style={{flex: 1}}>

                <View
                    style={{backgroundColor: WHITE, justifyContent: "center", elevation: ELEVATION, padding: PADDING}}>
                    <StepIndicator
                        stepCount={3}
                        direction={"horizontal"}
                        customStyles={INDICATOR_STYLE}
                        currentPosition={activeStep}
                        labels={labels}
                    />
                </View>
                <View style={{
                    display: "flex",
                    alignItems: "stretch",
                    padding: PADDING,
                    backgroundColor: "#f4f4f4",
                    flex: 1
                }}>

                    {activeStep === 0 &&
                    <ChooseTable doSkip={() => this.setState({activeStep: 1})} onSelectTable={this.selectTable}/>}
                    {/*{activeStep===1 && <Test/>}*/}
                    {activeStep === 1 &&
                    <NewOrder onBack={() => this.setState({activeStep: 0})} gotoCashCounter={this.cashCounter}
                              onConfirmOrder={this.confirmOrder}/>}
                    {activeStep === 2 &&
                    <Payment order={order} back={() => this.setState({activeStep: 1})} onPay={this.onPay}/>}
                </View>

            </View>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = {
    createOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
