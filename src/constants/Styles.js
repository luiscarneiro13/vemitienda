import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 0,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        marginTop: '-30%',
        height: 30
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop:3
    },
    titleBtn: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        height: 50
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    styleView:{},
    buttonPlus: {
        borderRadius: 10,
        height: 40,
        borderColor: '#053e66',
    },
    buttonDelete: {
        borderRadius: 10,
        height: 40,
    }
})

