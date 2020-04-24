import React from 'react';
import {Button, Input, Overlay, Text} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import {Formik} from "formik";
import * as yup from 'yup'
import {PADDING} from "../../utils/Dimensions";

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
    name: "",
    description: "",
    contact: ""
};
const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    contact: yup
        .string(),
    description: yup.string()
});
const Customer = ({customer=initialValue,mode,open, onClose, onCreate}) => {

    return (
        <>
            <Overlay isVisible={open}
                     width={300}
                     borderRadius={6}
                     height={"auto"}
                     onBackdropPress={onClose}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>{mode === "edit" ? "Update Customer" : "Create Customer"}</Text>

                    <Formik initialValues={customer}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                values.id=customer.id
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
                                    defaultValue={customer.name}
                                    containerStyle={{marginTop: 16}}
                                    leftIcon={{name: "food", color: "gray", size: 20, type: "material-community"}}
                                    label={"Name"}
                                    value={values["name"]}
                                    onChangeText={val => setFieldValue("name", val)}
                                    onBlur={(e) => setFieldTouched('name')}
                                    errorMessage={
                                        (errors.name && touched.name) ? errors.name : ""
                                    }
                                    placeholder={"Customer name"}
                                />
                                <Input
                                    defaultValue={customer.contact}
                                    containerStyle={{marginTop: 16}}
                                    keyboardType={"phone-pad"}
                                    leftIcon={{name: "phone", color: "gray", size: 20, type: "material-community"}}
                                    label={"Contact"}
                                    value={values["contact"]}
                                    onChangeText={val => setFieldValue("contact", val)}
                                    onBlur={(e) => setFieldTouched('contact')}
                                    errorMessage={
                                        (errors.contact && touched.contact) ? errors.contact : ""
                                    }
                                    placeholder={"989877676"}
                                />
                                <Input
                                    defaultValue={customer.description}
                                    multiline={true}
                                    numberOfLines={3}
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

                                <View style={{marginTop: 10, justifyContent: "flex-end", flexDirection: "row"}}>
                                    <Button raised={true} onPress={onClose} type={"clear"}
                                            title={"Close"}/>
                                    <Button loading={isSubmitting} disabled={!isValid} raised={true}
                                            onPress={handleSubmit} type={"clear"}
                                            title={mode === "edit"?"Update":"Create"}/>
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

export default Customer;
