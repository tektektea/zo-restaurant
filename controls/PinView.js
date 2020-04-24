import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ELEVATION, MARGIN, PADDING} from "../utils/Dimensions";
import {Icon} from "react-native-elements";
import {PRIMARY} from "../utils/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
    },
    pinView: {
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: MARGIN,
        padding: PADDING,
        justifyContent: "center"
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    btn: {
        width: 60,
        elevation: ELEVATION,
        height: 60,
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    btnWrapper: {
        margin: 20,
        width: 60,
        height: 60,
        backgroundColor: "blue",
        borderRadius: 50,
    },
    btnTitle: {
        fontSize: 30,
        alignSelf: "center"
    },
    btnContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center",
    },
    emptyDot: {
        borderRadius: 20,
        height: 40,
        width: 40,
        margin: MARGIN,
        borderWidth: 2,
        borderColor: "#4d4d4d",
        backgroundColor: "#d0d0d0"
    },
    filledDot: {
        height: 40,
        width: 40,
        margin: MARGIN,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#4d4d4d",
        backgroundColor: PRIMARY
    },
    error: {
        color: "tomato",
        fontWeight: "700"
    }
});
const PinView = ({size = 6, error = "err", onComplete}) => {


    const [input, setInput] = useState(Array(size).fill("-"));
    const [pressCount, setPressCount] = useState(0);

    const handleErase = () => {
        if (0 < pressCount) {
            let temp = input;
            temp[pressCount - 1] = "-";
            setInput(temp);
            setPressCount(pressCount - 1);

        }
    };
    const handleBtnPress = (val) => {

        if (size > pressCount) {
            let temp = input;
            temp[pressCount] = val;
            setInput(temp);

            if (pressCount + 1=== size) {
                onComplete(input);
                setInput(Array(size).fill("-"));
                setPressCount(0)
                return
            }

            setPressCount(pressCount + 1);
        }
    };
    const renderInput = () => {
        // let inputs = [];
        // for (let i = 0; i < size; i++) {
        //     console.log("input",input)
        //     console.log("single input",!!input.charAt(i))
        //     inputs.push(
        //
        //     )
        // }
        return input.map(ch => <View style={ch === "-" ? styles.emptyDot : styles.filledDot}/>)
        // return inputs;
    };

    return (
        <View style={styles.container}>
            {/*Pin view*/}
            <View style={[styles.pinView]}>
                {renderInput()}
                {pressCount !== 0 ? <Icon containerStyle={{padding: 10, marginLeft: 10}} name={"backspace"} size={30}
                                          onPress={() => handleErase()} color={"#d9322a"}
                                          type={"font-awesome5"}/> : null}
            </View>
            <View style={styles.btnContainer}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleBtnPress("7")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>7</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleBtnPress("8")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>8</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleBtnPress("9")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>9</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleBtnPress("4")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>4</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleBtnPress("5")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>5</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleBtnPress("6")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>6</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleBtnPress("1")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>1</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleBtnPress("2")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>2</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleBtnPress("3")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>

                    <TouchableOpacity onPress={() => handleBtnPress("0")} style={styles.btnWrapper}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>0</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.row}>

                    <Text style={styles.error}>{error}</Text>

                </View>


            </View>


            {/*Pin input btn*/}
            {/*<View style={[styles.btnContainer]}>*/}


        </View>

    )
};

export default PinView
