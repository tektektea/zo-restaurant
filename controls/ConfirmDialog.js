import {Button, Overlay, Text} from "react-native-elements";
import {GRAY} from "../utils/Colors";
import React from "react";
import {StyleSheet, View} from "react-native";
import {MARGIN, PADDING} from "../utils/Dimensions";

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
export const ConfirmDialog = ({open, onClose,onConfirm, title, description}) => {
    return (
        <Overlay
            borderRadius={16}
            width={300}
            onBackdropPress={onClose}
            height={"auto"}
            isVisible={open}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{description}</Text>
                <View style={styles.divider}/>
            </View>
            <Button onPress={onConfirm} type={"clear"} title={"Confirm"}/>
            <Button onPress={onClose} type={"clear"} title={"Close"}/>
        </Overlay>
    )
};
