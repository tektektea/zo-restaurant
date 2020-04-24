import React from 'react';
import {Button, Icon, Input, Overlay} from "react-native-elements";
import {GRAY} from "../../utils/Colors";
import {Formik} from "formik";
import {StyleSheet, Text, View} from "react-native";
import * as yup from "yup";
import {PADDING} from "../../utils/Dimensions";

const styles = StyleSheet.create({

    container: {
        display: "flex",
        alignItems: "stretch",
        padding: PADDING,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    formItem:{
        marginTop:6
    }
});

const initialValue = {
    name: "",
    address: "",
    contact: "",
    web: "",
    description: "",
};
const validationSchema = yup.object().shape({
    name: yup.string().required("Name of restaurant is required"),
    address: yup.string().required("Address is required"),
    contact: yup.string().required("Contact is required"),
    web: yup.string().url(),
    description: yup.string(),

});
const Restaurant = ({restaurant, open, onClose, onChange}) => {
    if (!restaurant) {
        restaurant = initialValue
    }
    return (
        <Overlay isVisible={open} width={350} height={"auto"}>
            <Formik initialValues={restaurant}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        onChange(values);
                        actions.setSubmitting(false);
                    }}>
                {({
                      values, setFieldValue,
                      isSubmitting,
                      setFieldTouched,
                      isValid, errors, touched, handleSubmit
                  }) => (
                    <View title={"Configuration"} containerStyle={styles.container}>

                        <Text style={{alignSelf:"center",fontSize: 21,margin:10}}>Restaurant Profile</Text>
                        <Input
                            containerStyle={styles.formItem}
                            label={"Name"}
                            placeholder=' Name'
                            value={values["name"]}
                            onChangeText={val => setFieldValue("name", val)}
                            onBlur={(e) => setFieldTouched('name')}
                            errorMessage={
                                (errors.name && touched.name) ? errors.name : ""
                            }
                            leftIcon={
                                <Icon
                                    color={GRAY}
                                    type={"ionicon"}
                                    name='md-restaurant'
                                    size={20}
                                />
                            }
                        />
                        <Input
                            containerStyle={styles.formItem}
                            multiline={true}
                            numberOfLines={3}
                            label={"Address"}
                            placeholder='Address'
                            value={values["address"]}
                            onChangeText={val => setFieldValue("address", val)}
                            onBlur={(e) => setFieldTouched('address')}
                            errorMessage={
                                (errors.address && touched.address) ? errors.address : ""
                            }
                            leftIcon={
                                <Icon
                                    color={GRAY}
                                    type={"ionicon"}
                                    name='ios-pin'
                                    size={20}
                                />
                            }
                        />
                        <Input
                            containerStyle={styles.formItem}
                            label={"Contact"}
                            placeholder='Contact'
                            value={values["contact"]}
                            onChangeText={val => setFieldValue("contact", val)}
                            onBlur={(e) => setFieldTouched('contact')}
                            errorMessage={
                                (errors.contact && touched.contact) ? errors.contact : ""
                            }
                            leftIcon={
                                <Icon
                                    color={GRAY}
                                    type={"font-awesome"}
                                    name='phone'
                                    size={20}
                                />
                            }
                        />
                        <Input
                            containerStyle={styles.formItem}
                            label={"Website"}
                            placeholder='Website url'
                            value={values["web"]}
                            onChangeText={val => setFieldValue("web", val)}
                            onBlur={(e) => setFieldTouched('web')}
                            errorMessage={
                                (errors.web && touched.web) ? errors.web : ""
                            }
                            leftIcon={
                                <Icon
                                    color={GRAY}
                                    type={"material-community"}
                                    name='web'
                                    size={20}
                                />
                            }
                        />
                        <Input
                            containerStyle={styles.formItem}
                            label={"Description"}
                            placeholder='Description'
                            value={values["description"]}
                            onChangeText={val => setFieldValue("description", val)}
                            onBlur={(e) => setFieldTouched('description')}
                            errorMessage={
                                (errors.description && touched.description) ? errors.description : ""
                            }
                            leftIcon={
                                <Icon
                                    color={GRAY}
                                    type={"material-community"}
                                    name='note'
                                    size={20}
                                />
                            }
                        />

                        <Button raised={true} onPress={onClose} type={"clear"}
                                title={"Close"}/>
                        <Button loading={isSubmitting} disabled={!isValid} raised={true}
                                onPress={handleSubmit} type={"clear"}
                                title={"Update"}/>


                    </View>
                )}</Formik>
        </Overlay>

    );
};

export default Restaurant;
