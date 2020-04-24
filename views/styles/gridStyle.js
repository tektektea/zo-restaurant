import {StyleSheet} from "react-native";
import {GRAY, WHITE} from "../../utils/Colors";
import {ELEVATION, MARGIN, PADDING, RADIUS} from "../../utils/Dimensions";

export const GRID_STYLE=StyleSheet.create({
    container: {
        flex:1,
    },
    searchBar:{
        flex:1,
    },
    row:{
        display: "flex",
        flexDirection: "row",
        alignSelf:"stretch",
        justifyContent: "space-between",
        alignItems:"center"
    },
    content: {
        margin:16,
        padding:16,
        backgroundColor:WHITE,
        elevation:ELEVATION
    },
    itemContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start",
        elevation: ELEVATION,
        borderRadius:RADIUS,
        padding: PADDING,
        margin: MARGIN,
    },
    title:{
        fontSize:18,
        color:GRAY,
        fontWeight:"bold"
    },
    caption:{
        fontSize:12,
        color:GRAY,
    },
    footer:{
        fontSize:14,
        color:GRAY,
        fontWeight:"bold"
    }
});
