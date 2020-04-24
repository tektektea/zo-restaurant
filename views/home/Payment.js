import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {NumPad, OperatorPad, SpecialPad} from '../../controls/NumPad';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import {DateButton} from "../../controls/DateButton";
import {MARGIN} from "../../utils/Dimensions";
import {PRIMARY} from "../../utils/Colors";
import Calculator from "../../controls/calculator/Calculator";

const initialValues = {
    paid: 0,
    due: 0,
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: 0
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 6,
    },
    numField: {
        backgroundColor: '#d0d0d0',
        color: '#6af873',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 15,
    },
    numRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: "#f4f4f4",
        alignItems: "stretch",
        justifyContent: "space-between"
    },
    key: {
        flex: 1,
        margin: 6,
        padding: 8,
        alignContent: 'center',
        justifyContent: 'center',

    },
    keyText: {
        fontSize: 22,
        alignSelf: 'center',
    },
    value: {
        marginRight: 16,
        color: '#5ba776',
        fontSize: 26,
    },
    flexTwo: {
        flex: 2,
    },
    divider: {
        backgroundColor: '#939393',
        opacity: 0,
        height: 2,
        marginVertical: 16,
        elevation: 3,
    },
    clear: {
        backgroundColor: 'tomato',
    },
    paidContainer: {
        padding: 10,
        elevation: 3,
        backgroundColor: 'tomato',
        alignItems: 'center',
    },
    paidText: {
        color: '#fff',
    },
    tenderContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 4,
        marginVertical: 6,
        paddingVertical: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    history: {
        margin: MARGIN,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold"
    },
    tenderLabel: {
        fontSize: 18,
    },
    greenText: {
        color: '#5ba776',
        fontWeight: 'bold',
    },
    buttons: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        flex: 1,
        alignSelf: "stretch"
    }

});

var op = []; //array for storing numbers
var decimal = true; // to access decimal dot

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 0,
            result: 0,
            decimals: ".00"
        }
    }

    pusher = (num) => { //will add the button value to op

        if (op.length <= 23) {
            op += num;
            this.setState({display: op})
        } else {
            this.setState({display: '# of max chars reached'})
        }

    };

    pusher2 = (num) => { // to only have 1 operation chained
        let last = op.charAt(op.length - 1);

        if (op.length <= 23) {

            if ((last === "+") || (last === '*') || (last === '-') || (last === '/') || (last === '.')) {
            } else {
                op += num;
                decimal = true;
                this.setState({display: op})
            }
        } else {
            this.setState({display: '# of max chars reached'})
        }
    };

    pusher3 = (num) => {
        if (op.length <= 23) {
            op += num;
            op = op.replace(/\-+/g, '-');
            decimal = true;
            this.setState({display: op})
        } else {
            this.setState({display: '# of max chars reached'})
        }

    };

    pusher4 = (num) => { // function for the '.'
        if (op.length <= 23) {
            if (decimal) {
                op += num;
                this.setState({display: op});
                decimal = false; // when '.', sets decimal to false
            }
        } else {
            this.setState({display: '# of max chars reached'})
        }

    };

    result = (event) => { // will execute the operation inside op

        let result = eval(op).toFixed(2);
        let ind = result.indexOf('.');

        if (String(result).length <= 11) {
            this.setState({
                result: result.slice(0, ind),
                decimals: result.slice(ind)
            })

        } else {
            this.setState({result: 'error', decimals: ""})
        }
    };

    reset = () => {
        op = [];
        decimal = true;
        this.setState({result: 0, display: 0, decimals: '.00'});
    };

    delete = () => {
        if (op.length > 0) {
            op.splice(0, 1);
            this.setState({display:op})
        }

    };

    render() {
        const {order, onPaid} = this.props;
        const {result, display, decimals} = this.state;
        const amount = order.netAmount;
        return (

            <View style={styles.wrapper}>
                <Calculator/>
            </View>

        );
    }
}

Payment.propTypes = {
    order: PropTypes.array.isRequired,
    onPay: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired
};
export default Payment;
