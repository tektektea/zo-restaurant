import {itemReducer} from "./reducers/ItemReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {customerReducer} from "./reducers/customerReducer";
import {tableReducer} from "./reducers/tableReducer";
import {authReducer} from "./reducers/authReducer";
import {settingReducer} from "./reducers/settingReducer";
import {logger} from "redux-logger";
import {persistReducer, persistStore} from 'redux-persist'
import AsyncStorage from "@react-native-community/async-storage";
import {taxReducer} from "./reducers/taxReducer";
import {orderReducer} from "./reducers/orderReducer";
import thunk from "redux-thunk";
import {dashboardReducer} from "./reducers/dashboardReducer"; // defaults to localStorage for web


const reducer = combineReducers({
    itemData: itemReducer,
    orderData: orderReducer,
    customerData: customerReducer,
    tableData: tableReducer,
    authData: authReducer,
    settingData: settingReducer,
    taxData: taxReducer,
    dashboardData: dashboardReducer
});
// const Store = createStore(reducer, applyMiddleware(logger));


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const Store = createStore(reducer, applyMiddleware(logger, thunk));
export const Persistor = persistStore(Store);

