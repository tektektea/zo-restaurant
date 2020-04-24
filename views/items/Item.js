import React from 'react';
import {Button, Input, Overlay, Text} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import {Formik} from "formik";
import * as yup from 'yup'
import {PADDING} from "../../utils/Dimensions";
import moment from "moment";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "stretch",
        padding: PADDING,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 18
    }
});


const initialValue = {
    id: Date.now().toString(),
    name: "",
    description: "",
    price: 0
};
const validationSchema = yup.object().shape({
    name: yup.string().required(),
    price: yup
        .number()
        .required("Price is required")
        .positive("Price must be positive number"),
    description: yup.string()
});
const Item = ({item=initialValue,open, onClose, onCreate,mode}) => {

    return (
        <>
            <Overlay isVisible={open}
                     width={300}
                     borderRadius={6}
                     height={"auto"}
                     onBackdropPress={()=>onClose()}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>{mode==="edit"?"Update Item":"Create Item"}</Text>

                    <Formik initialValues={item}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                values.id=item.id;
                                if (!values.price) {
                                    values.price=item.price
                                }
                                onCreate(values);
                                actions.setSubmitting(false);
                            }}>
                        {({
                              values, setFieldValue,
                              isSubmitting,
                              setFieldTouched,
                              isValid, errors, touched, handleSubmit
                          }) => (
                            <>
                                <Input
                                    defaultValue={item.name}
                                    containerStyle={{marginTop: 16}}
                                    leftIcon={{name: "food", color: "gray", size: 20, type: "material-community"}}
                                    label={"Name"}
                                    value={values["name"]}
                                    onChangeText={val => setFieldValue("name", val)}
                                    onBlur={(e) => setFieldTouched('name')}
                                    errorMessage={
                                        (errors.name && touched.name) ? errors.name : ""
                                    }
                                    placeholder={"ex: Sawhchiar"}
                                />
                                <Input
                                    defaultValue={item.price+""}
                                    keyboardType={"phone-pad"}
                                    containerStyle={{marginTop: 16}}
                                    leftIcon={{name: "tag", color: "gray", size: 20, type: "material-community"}}
                                    label={"Price"}
                                    value={values["price"]}
                                    onChangeText={val => setFieldValue("price", val)}
                                    onBlur={(e) => setFieldTouched('price')}
                                    errorMessage={
                                        (errors.price && touched.price) ? errors.price : ""
                                    }
                                    placeholder={"ex: \u20B9 10"}
                                />
                                <Input
                                    defaultValue={item.description}
                                    containerStyle={{marginTop: 16}}
                                    leftIcon={{name: "note", color: "gray", size: 20, type: "material-community"}}
                                    label={"Description"}
                                    value={values["description"]}
                                    onChangeText={val => setFieldValue("description", val)}
                                    onBlur={(e) => setFieldTouched('description')}
                                    errorMessage={
                                        (errors.description && touched.description) ? errors.description : ""
                                    }
                                    placeholder={`Description`}
                                />

                                <View style={{marginTop:10,justifyContent: "flex-end", flexDirection: "row"}}>
                                    <Button raised={true} onPress={onClose} type={"clear"}
                                            title={"Close"}/>
                                    <Button loading={isSubmitting} disabled={!isValid} raised={true}
                                            onPress={handleSubmit} type={"clear"}
                                            title={mode==="edit"?"Update":"Create"}/>
                                </View>
                            </>
                        )}

                    </Formik>

                </View>
            </Overlay>

        </>
    );

};

// List.propTypes = {
//     customers: PropTypes.array.isRequired
// };

export default Item;
