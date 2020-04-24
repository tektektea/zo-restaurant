import {
    CHANGE_STATUS,
    CLEAR_REPORT, COUNT_PAYABLE,
    CREATE_ORDER, CUSTOMER_ORDER,
    DELETE_ORDER, ERROR,
    FETCH_PAYABLE_ORDER, ORDER_CHART,
    RANGE_ORDER,
    UPDATE_ORDER
} from "../constant/constant";
import {OrderStatus} from "../../utils/Constant";
import moment from "moment";

const orderData = {
    payableOrders: [],
    orders: [],
    customerOrders: [],
    reports: [],
    orderChartData: [],
    orderPieData: [],
    sales:0,
    balanceDue: 0,
    error: "",
    payableCount:0,
    success: ""
};
export const orderReducer = (state = orderData, action) => {

    const data = action.payload;
    switch (action.type) {
        case CREATE_ORDER:
            const {orders, payableOrders} = action.payload;
            return {
                ...state,
                payableOrders,
                orders,
                error: "",
                success: "Order created successfully"
            };
        case UPDATE_ORDER:
            return {...state};
        case DELETE_ORDER:
            return {
                ...state,
                orders: action.payload.orders,
                payableOrders:action.payload.payableOrders,
                success: "Order Deleted successfully",
                error: ""
            };
        case FETCH_PAYABLE_ORDER:
            return {
                ...state,
                payableOrders: action.payload,
                success: "",
                error: ""
            };
        case RANGE_ORDER:
            return {
                ...state,
                reports: action.payload,
                error: "",
                success: ""
            };
        case CLEAR_REPORT:
            return {
                ...state,
                reports: [],
                error: "",
                success: ""
            };

        case CHANGE_STATUS:
            return {
                ...state,
                payableOrders: action.payload.payableOrders,
                orders: action.payload.orders,
                success: "Order Updated successfully",
                error: ""
            };


        case ORDER_CHART:
            return {
                ...state,
                orderChartData: action.payload.data,
                orderPieData:action.payload.comparedData,
                sales:action.payload.sales,
                balanceDue:action.payload.balanceDue
            }
        case COUNT_PAYABLE:
            return {
                ...state,
                payableCount: action.payload
            }
        case CUSTOMER_ORDER:
            return {
                ...state,
                customerOrders:action.payload
            };
        case ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return {...state}

    }
};
