import {CREATE_CUSTOMER, DELETE_CUSTOMER, FETCH_CUSTOMER, UPDATE_CUSTOMER} from "../constant/constant";
import realmInstance from "../../schema";

export const createCustomer = (customer) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            realmInstance.write(() => {

                customer.id = realmInstance.objects('Customer').length + 1 + "";

                realmInstance.create('Customer', customer);
                let customers = realmInstance.objects('Customer');
                dispatch({
                    type: CREATE_CUSTOMER,
                    payload: customers
                });
                resolve("Customer created successfully")
            })
        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close()
        }
    })

};

export const updateCustomer = (customer) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            realmInstance.write(() => {

                realmInstance.create('Customer', customer, true);
                let customers = realmInstance.objects('Customer');
                dispatch({
                    type: UPDATE_CUSTOMER,
                    payload: customers
                });
                resolve("Customer updated successfully")
            })
        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close()
        }
    })
};

export const deleteCustomer = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            realmInstance.write(() => {
                let model = realmInstance.objectForPrimaryKey('Customer', id);
                if (model.isValid()) {
                    realmInstance.delete(model);
                    dispatch({
                        type: DELETE_CUSTOMER,
                        payload: id
                    });
                    resolve("Customer deleted successfully")
                }

            })
        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close()
        }
    })
};

export const all = () => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            realmInstance.write(() => {

                const customers = realmInstance.objects('Customer');
                dispatch({
                    type: FETCH_CUSTOMER,
                    payload: customers
                });
                resolve("fetch item successfully")
            })
        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close()
        }
    })

};

