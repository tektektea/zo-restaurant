import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {GRAY, WHITE} from "../../utils/Colors";
import {ELEVATION, MARGIN, PADDING, RADIUS} from "../../utils/Dimensions";
import {Button, Icon} from "react-native-elements";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        backgroundColor: WHITE,
        elevation: ELEVATION,
        borderRadius: RADIUS,
        margin: MARGIN,
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    second: {
        // width: "100%",
        flex: 2,
        display: "flex",
        margin: MARGIN,
        flexDirection: "column",
    },
    third: {
        // width: "100%",
        flex: 1,
        display: "flex",
        margin: MARGIN,
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: GRAY
    },
    caption: {
        fontSize: 12,
        fontWeight: "100",
        color: GRAY
    },
    label: {
        fontSize: 28,
        fontWeight: "bold",
        color: GRAY
    },

    largeIcon: {
        padding: 16,
        backgroundColor: "#f4f4f4",
        justifyContent: "center"
    }
});

export const InfoView = ({title, caption,label, icon, action}) => {
    return (
        <View style={styles.container}>
            <Icon size={icon.size ? icon.size : 40}
                  containerStyle={[styles.largeIcon, icon.backgroundColor]}
                  type={icon.type ? icon.type : "font-awesome"}
                  onPress={icon.onPress}
                  color={icon.color ? icon.color : "#fff"}
                  name={icon.name}
                  style={icon.style ? icon.style : {padding: PADDING, margin: 10}}/>

            <View style={styles.second}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.caption}>{caption}</Text>
            </View>
            <View style={styles.third}>
                <Text style={styles.label}>{label}</Text>
                <Button onPress={action.onPress} titleStyle={{fontSize: 14}}
                        type={"clear"} title={action.text ? action.text : ""}/>
            </View>
        </View>
    );
};

export const CardInfo = ({title, caption}) => {
    return (
        <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: WHITE,
            borderRadius: RADIUS,
            flex: 1,
            margin: MARGIN,
            padding: PADDING,
            elevation: ELEVATION
        }}>
            <Text style={{
                fontSize: 21,
            }}>{caption}</Text>


            <Text style={{
                fontSize: 16,
                margin: MARGIN,
                color: GRAY
            }}>{title}</Text>

        </View>
    );
};
