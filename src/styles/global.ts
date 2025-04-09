import { StyleSheet } from "react-native";

//Estilos globales para usar en los componentes
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#2f8fac",
        padding:10,

    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        marginVertical:10,
        textAlign:"center",
    },
    inputSearch:{
        backgroundColor:"#fff",
        padding:10,
        borderRadius:10,
        marginBottom:10,
        shadowColor:"#000",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        shadowRadius:4,
        elevation:5,
    },
});