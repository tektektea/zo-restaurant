import {CREATE_TABLE, DELETE_TABLE, ERROR, FETCH_TABLE, UPDATE_TABLE} from "../constant/constant";
import realmInstance from "../../schema";


export const createTable = (table) => dispatch => {
    return new Promise((resolve,reject)=>{
        try {
            realmInstance.write(() => {

                table.id = realmInstance.objects('Table').length + 1 + "";
                realmInstance.create('Table', table);
                let tables=realmInstance.objects('Table')
                dispatch({
                    type: CREATE_TABLE,
                    payload: tables
                })
                resolve("Table created successfully")
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

export const updateTable = (table) => dispatch => {
    return new Promise((resolve,reject)=>{
        try {
            realmInstance.write(() => {

                realmInstance.create('Table', table, true);
                let tables=realmInstance.objects('Table');

                dispatch({
                    type: UPDATE_TABLE,
                    payload: tables
                })
                resolve("Table updated successfully")
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

export const deleteTable = (id) => dispatch => {
    return new Promise((resolve,reject)=>{
        try {
            realmInstance.write(() => {

                let model = realmInstance.objectForPrimaryKey('Table', id);
                if (model.isValid()) {

                    realmInstance.delete(model);
                    let tables = realmInstance.objects('Table');
                    dispatch({
                        type: DELETE_TABLE,
                        payload: tables
                    })
                    resolve("Table deleted successfully")
                }
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

export const all = () => dispatch => {
    return new Promise((resolve,reject)=>{
        try {
            let tables = realmInstance.objects('Table');
            dispatch({
                type: FETCH_TABLE,
                payload: tables
            })
            resolve("table fetch successfully")
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
