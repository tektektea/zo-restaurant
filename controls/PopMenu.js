import {ListItem, Overlay, Text} from "react-native-elements";
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
export const PopMenu = ({open, onClose, title, description, menus}) => {
    return (
        <Overlay
            borderRadius={16}
            width={250}
            onBackdropPress={onClose}
            height={"auto"}
            isVisible={open}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{description}</Text>
                <View style={styles.divider}/>
                {menus.map((item, index) => (
                    <ListItem key={index}
                              title={item.name}
                              topDivider={true}
                              onPress={() => item.onPress(item.name)}
                              leftIcon={{size: 18, name: item.icon, type: "font-awesome", color: GRAY}}
                              chevron={true}
                    />

                ))}
            </View>
        </Overlay>
    )
};
