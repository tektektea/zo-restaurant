import realmInstance from "../../schema";
import {CREATE_TAX, DELETE_TAX, ERROR, FETCH_TAX, UPDATE_TAX} from "../constant/constant";


export const createTax = (tax) => dispatch => {
    return new Promise((resolve,reject)=>{
        tax.percent = parseFloat(tax.percent);
        try {
            realmInstance.write(() => {

                tax.id = realmInstance.objects('Tax').length + 1 + "";
                realmInstance.create('Tax', tax);
                let taxes=realmInstance.objects("Tax")
                dispatch({
                    type: CREATE_TAX,
                    payload: taxes
                })
                resolve("Tax created successfully")
            })
        } catch (e) {
            dispatch({
                type: CREATE_TAX,
                payload: tax
            });
            reject(e.toString())
        } finally {
            // realmInstance.close()
        }
    })

};

export const updateTax = (tax) => dispatch => {

    return new Promise((resolve,reject)=>{
        try {
            realmInstance.write(() => {

                realmInstance.create('Tax', tax, true);
                let taxes=realmInstance.objects('Tax')
                dispatch({
                    type: UPDATE_TAX,
                    payload: taxes
                })
                resolve("Tax updated successfully")
            })
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: e.toString()
            });
            reject(e.toString())
        } finally {
            // realmInstance.close()
        }
    })

};

export const deleteTax = (id) => dispatch => {
    return new Promise((resolve,reject)=>{
        try {
            realmInstance.write(() => {
                let model = realmInstance.objectForPrimaryKey('Tax', id);
                if (model.isValid()) {
                    realmInstance.delete(model);
                    let taxes=realmInstance.objects('Tax')
                    dispatch({
                        type: DELETE_TAX,
                        payload: taxes
                    });
                    resolve("Tax deleted successfully")
                }

            })
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: e.toString()
            });
            resolve(e.toString())
        } finally {
            // realmInstance.close()
        }
    })

};

export const all = () => dispatch => {
    return new Promise((resolve,reject)=>{
        try {
            let taxes = realmInstance.objects('Tax');
            dispatch({
                type: FETCH_TAX,
                payload: taxes
            })
            resolve("fetch item success")
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: e.toString()
            })
            reject(e.toString())
        } finally {
            // realmInstance.close();
        }
    })

};
