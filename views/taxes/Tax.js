import React from "react";
import {Button, Input, Overlay, Text} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import {MARGIN, PADDING} from "../../utils/Dimensions";
import {Formik} from "formik";
import * as yup from "yup";

const initialValue = {
    id: Date.now().toString(),
    name: "",
    percent: 0,
};
const validationSchema = yup.object().shape({
    id: yup.string(),
    name: yup.string().required("Name of tax is required"),
    percent: yup
        .number()
        .required("Percent is required")
        .min(0)
        .max(100)
        .positive("Percent must be positive number")
});
const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center"
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "100",
        alignSelf: "center"
    },
    container: {
        display: "flex",
        alignItems: "stretch",
        padding: PADDING,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    divider: {
        marginTop: MARGIN,
        marginBottom: MARGIN,
        height: 2
    }
});
const Tax = ({open, mode, tax=initialValue, onClose, onCreate}) => {


    return (
        <Overlay
            borderRadius={16}
            width={300}
            onBackdropPress={onClose}
            height={"auto"}
            isVisible={open}>
            <View style={styles.container}>
                <Text style={styles.title}>{mode === "edit" ? "Edit tax" : "Create Tax"}</Text>
                {/*<Text style={styles.subtitle}>Press add to add tax</Text>*/}

                <Formik initialValues={tax}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            values.id = tax.id;
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
                                defaultValue={tax.name}
                                containerStyle={{marginTop: 16}}
                                leftIcon={{name: "label", color: "gray", size: 20, type: "material-community"}}
                                label={"Name"}
                                value={values["name"]}
                                onChangeText={val => setFieldValue("name", val)}
                                onBlur={(e) => setFieldTouched('name')}
                                errorMessage={
                                    (errors.name && touched.name) ? errors.name : ""
                                }
                                placeholder={"ex: SGST"}
                            />
                            <Input
                                defaultValue={tax.percent+""}
                                containerStyle={{marginTop: 16}}
                                keyboardType={"phone-pad"}
                                leftIcon={{name: "percent", color: "gray", size: 20, type: "font-awesome"}}
                                label={"Percent"}
                                value={values.percent}
                                onChangeText={val => setFieldValue("percent", val)}
                                onBlur={(e) => setFieldTouched('percent')}
                                errorMessage={
                                    (errors.percent && touched.percent) ? errors.percent : ""
                                }
                                placeholder={"ex:18%"}
                            />

                            <View style={{marginTop: 10, justifyContent: "flex-end", flexDirection: "row"}}>
                                <Button raised={true} onPress={onClose} type={"clear"}
                                        title={"Close"}/>
                                <Button loading={isSubmitting} disabled={!isValid} raised={true}
                                        onPress={handleSubmit} type={"clear"}
                                        title={mode === "edit" ? "Update" : "Create"}/>
                            </View>


                        </>
                    )}

                </Formik>

            </View>
        </Overlay>
    );
};
export default Tax;
