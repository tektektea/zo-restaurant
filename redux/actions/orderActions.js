import {
    CHANGE_STATUS,
    CLEAR_REPORT,
    COUNT_PAYABLE,
    CREATE_ORDER,
    CUSTOMER_ORDER,
    DELETE_ORDER,
    ERROR,
    FETCH_PAYABLE_ORDER,
    ORDER_CHART,
    RANGE_ORDER,
    UPDATE_ORDER
} from "../constant/constant";
import realmInstance from "../../schema";
import {OrderStatus} from "../../utils/Constant";
import {PRIMARY} from "../../utils/Colors";

export const createOrder = (order) => dispatch => {

    return new Promise((resolve, reject) => {
        try {
            realmInstance.write(() => {
                realmInstance.create('Order', order);
                let orders = realmInstance.objects('Order');
                let payableOrders = orders.filtered('status = "payable" ');
                dispatch({
                    type: CREATE_ORDER,
                    payload: {
                        orders,
                        payableOrders
                    }
                });
                resolve("Order created successfully")
            })

        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close()
        }
    })


};

export const updateOrder = (order) => {

    try {
        realmInstance.write(() => {
            realmInstance.create('Order', order, true);
            dispatch({
                type: UPDATE_ORDER,
                payload: order
            })
        })

    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.toString()
        })
    } finally {
        // realmInstance.close();
    }
};

export const deleteOrder = (invoice_no) => dispatch => {

    return new Promise((resolve, reject) => {
        try {
            realmInstance.write(() => {
                let data = realmInstance.objectForPrimaryKey('Order', invoice_no);
                if (data.isValid()) {
                    realmInstance.delete(data);
                    let orders = realmInstance.objects('Order');
                    let payableOrders = orders.filtered('status = "payable"');
                    dispatch({
                        type: DELETE_ORDER,
                        payload: {
                            orders,
                            payableOrders
                        }
                    });
                    resolve("Order deleted successfully")
                }
            })

        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close();
        }
    })

};
export const changeStatus = (status, order) => dispatch => {

    return new Promise((resolve, reject) => {
        try {
            realmInstance.write(() => {
                realmInstance.create('Order', order, true);
                order.status = status;
                let orders = realmInstance.objects('Order');
                let payableOrders = orders.filtered('status = "payable"');
                dispatch({
                    type: CHANGE_STATUS,
                    payload: {
                        orders, payableOrders
                    },
                });
                resolve("Order update successfully")
            })

        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close();
        }
    })
};
export const fetchPayableOrder = () => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            realmInstance.write(() => {
                let orders = realmInstance.objects('Order').sorted("invoice_date",true);
                let payableOrders = orders.filtered('status = "payable"');
                dispatch({
                    type: FETCH_PAYABLE_ORDER,
                    payload: payableOrders
                });
                resolve("fetch payable order")
            })
        } catch (e) {
            reject(e.toString())
        }
    })

};

export const getCustomerOrders = (id) => dispatch => {
    try {
        realmInstance.write(() => {
            let orders = realmInstance.objects('Order');
            let customerOrders = orders.filtered('customer.id = $0', id);
            dispatch({
                type: CUSTOMER_ORDER,
                payload: customerOrders
            })
        })

    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.toString()
        })
    }
};
export const rangeOrders = (from, to) => dispatch => {
    try {
        realmInstance.write(() => {
            let orders = realmInstance.objects('Order');
            let found = orders.filtered('invoice_date > $0 AND invoice_date < $1', from, to);
            dispatch({
                type: RANGE_ORDER,
                payload: found
            })
        })

    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.toString()
        })
    }
};

export const getOrderChart = () => dispatch => {
    try {
        realmInstance.write(() => {
            let orders = realmInstance.objects('Order').sorted("invoice_date", false);
            let data = [];
            let payables = [];
            let paids = [];
            let sales = 0;
            let balanceDue = 0;
            orders.slice(0, 15)
                .forEach((item, index) => {
                    data.push(item.netAmount);
                    if (item.status === OrderStatus.PAYABLE) {
                        balanceDue += item.netAmount;
                        payables.push({
                            id: index,
                            svg: {fill: "tomato"},
                            amount: item.netAmount
                        })
                    } else {
                        sales += item.netAmount;
                        paids.push({
                            id: index,
                            svg: {fill: PRIMARY},
                            amount: item.netAmount
                        })
                    }
                });
            let comparedData = [
                {id:1,svg:{fill:PRIMARY},amount:sales},
                {id:2,svg:{fill:"tomato"},amount:balanceDue},
            ];

            dispatch({
                type: ORDER_CHART,
                payload: {
                    data,
                    comparedData,
                    sales,
                    balanceDue
                }
            })
        })

    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.toString()
        })
    }
};
export const countPayable = () => dispatch => {
    try {
        realmInstance.write(() => {
            let orders = realmInstance.objects('Order');
            let count = 0;
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].status === OrderStatus.PAYABLE) {
                    count++;
                }
            }

            dispatch({
                type: COUNT_PAYABLE,
                payload: count
            })
        })

    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.toString()
        })
    }
};

export const clearReport = () => ({
    type: CLEAR_REPORT
});


