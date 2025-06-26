import Constants from "expo-constants";
import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    loadingContent: {
        zIndex: 999,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },

    appContent: {
        flex: 1,
        backgroundColor: "#fafafa",
        paddingTop: Constants.statusBarHeight + 10,
        paddingHorizontal: 20
    },

    loginArea: {
        flexDirection: "column",
        justifyContent: "center"
    },

    input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#010101",
        color: "#000000",
        borderRadius: 5,
        paddingVertical: 5,
        paddingLeft: 5,
        width: "100%",
        marginBottom: 15,
        marginTop: 10
    },

    button: {
        backgroundColor: "#2274A5",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 7
    },

    textButton: {
        color: "#ffffff",
        fontSize: 18
    },

    textError: {
        fontSize: 14,
        marginTop: 20,
        textAlign: "center",
        color: "#EF476F"
    }
});