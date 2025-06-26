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

    header: {
        //backgroundColor: "#2A2B2A",
        height: 60,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#eae7e7",
        borderBottomWidth: 1,
        marginBottom: 10
    },

    headerLogo: {
        height: 60,
        width: 60,
        //backgroundColor: "#fff",
        //borderRadius: 50
    },

    headerText: {
        color: "#D86F74",
        //fontFamily: "serif",
        fontSize: 18,
        fontWeight: "bold"
    },

    appContent: {
        flex: 1,
        backgroundColor: "#fafafa",
        paddingTop: Constants.statusBarHeight
    },

    formContent: {
        paddingHorizontal: 20
    },

    label: {
        fontSize: 14,
        color: "#5a5c61",
        marginTop: 15,
        marginBottom: 5
    },

    input: {
        fontSize: 16,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#010101",
        color: "#000000",
        borderRadius: 5,
        paddingVertical: 5,
        paddingLeft: 5,
        width: "100%",
        marginTop: 5,
        textAlignVertical: "top"
    },

    contentSelect: {
        borderWidth: 1,
        borderColor: "#010101",
        borderStyle: "solid",
        borderRadius: 5
    },

    select: {
        height: 50
    },

    textError: {
        fontSize: 14,
        marginTop: 20,
        textAlign: "center",
        color: "#EF476F"
    },

    audioContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },

    audioContentStatus: {
        fontStyle: "italic"
    },

    audioContentButtons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    audioButton: {
        backgroundColor: "#D86F74",
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 50,
        marginLeft: 10,
        color: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },

    audioButtonText: {
        color: "#fafafa"
    },

    uploadButtonText: {
        color: "#fafafa"
    },

    sendButton: {
        backgroundColor: "#AD2F36",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },

    textButton: {
        color: "#ffffff",
        fontSize: 18
    },

    filesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 7
    },

    uploadFileRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 15
    },

    labelUploadFile: {
        fontSize: 14,
        color: "#5a5c61"
    },

    updloadButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D86F74",
        borderRadius: 50,
        padding: 6,
        marginLeft: 10
    },

    uploadButtonsView: {
        flexDirection: "row"
    },

    flagContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10
    },

    flag: {
        width: 20,
        height: 20,
        marginLeft: 10,
        borderRadius: 20
    }
});