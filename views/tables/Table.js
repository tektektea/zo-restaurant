import React from 'react';
import {Button, Input, Overlay, Text} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import {PADDING} from "../../utils/Dimensions";
import {Formik} from "formik";
import * as yup from "yup";
import moment from "moment";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "stretch",
        padding: PADDING,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: PADDING
    },
    title:{
        alignSelf:"center",
        fontSize:18,
        margin:16,
        fontWeight:"bold"
    }
});

const initialValue = {
    id: moment().millisecond().toString(),
    name: "",
    description: "",
};
const validationSchema = yup.object().shape({
    id: yup.string(),
    name: yup.string().required(),
    description: yup.string()
});
const Table = ({open,mode,table=initialValue, onCreate, onClose}) => {


    return (
        <>
            <Overlay isVisible={open}
                     width={300}
                     height={"auto"}
                     onBackdropPress={onClose}
                     borderRadius={16}
            >
                <View style={styles.container}>
                <Text style={styles.title}>Table</Text>

                    <Formik initialValues={table}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                values.id=table.id
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
                                    defaultValue={table.name}
                                    containerStyle={{marginTop: 16}}
                                    leftIcon={{name: "food", color: "gray", size: 20, type: "material-community"}}
                                    label={"Name"}
                                    value={values["name"]}
                                    onChangeText={val => setFieldValue("name", val)}
                                    onBlur={(e) => setFieldTouched('name')}
                                    errorMessage={
                                        (errors.name && touched.name) ? errors.name : ""
                                    }
                                    placeholder={"ex: 1/One"}
                                />

                                <Input
                                    defaultValue={table.description}
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

export default Table;
