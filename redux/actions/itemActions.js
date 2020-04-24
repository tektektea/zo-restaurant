import {CREATE_ITEM, DELETE_ITEM, FETCH_ITEM, UPDATE_ITEM} from "../constant/constant";
import realmInstance from "../../schema";

export const createItem = (item) => dispatch => {
    return new Promise((resolve, reject) => {
        item.price = parseFloat(item.price);
        try {
            realmInstance.write(() => {

                item.id = realmInstance.objects('Item').length + 1 + "";
                realmInstance.create('Item', item);
                let items = realmInstance.objects('Item');
                resolve("Item created successfully");
                dispatch({
                    type: CREATE_ITEM,
                    payload: items
                })
            })
        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close()
        }
    })

};

export const updateItem = (item) => dispatch => {
    return new Promise((resolve, reject) => {
        item.price = parseFloat(item.price);

        try {
            realmInstance.write(() => {

                realmInstance.create('Item', item, true);
                let items = realmInstance.objects('Item');
                dispatch({
                    type: UPDATE_ITEM,
                    payload: items
                });
                resolve("Item updated successfully")
            })
        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close()
        }
    })
};

export const deleteItem = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            realmInstance.write(() => {

                let model = realmInstance.objectForPrimaryKey('Item', id);
                if (model.isValid()) {
                    realmInstance.delete(model);
                    const items = realmInstance.objects('Item');
                    dispatch({
                        type: DELETE_ITEM,
                        payload: items
                    });
                    resolve("Item deleted successfully")
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
            let items = realmInstance.objects('Item');
            dispatch({
                type: FETCH_ITEM,
                payload: items
            });
            resolve("Fetch item success")
        } catch (e) {
            reject(e.toString())
        } finally {
            // realmInstance.close();
        }
    })

};
