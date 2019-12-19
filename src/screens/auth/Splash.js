import React,{useState,useRef,useEffect} from 'react';
import { View, Dimensions, StyleSheet, Image, ImageBackground } from 'react-native'
import { loadUserData } from '../../utils/db.js'
import { colors } from '../../res/style/colors'
import { moderateScale } from '../../res/style/scalingUnit'
import Logo from "../../res/assets/images/logo.png"
import BackgroundImg from '../../res/assets/images/background.png'

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const Splash = props => {

    useEffect(() => {
     
        loadUserData((err, result) => {
            if(result){
                let jsonData = JSON.parse(result)
                props.navigation.navigate("App")
            } else 
                props.navigation.replace("LoginScreen")
        })
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    
    return(
        <View
            style={[
                styles.container, 
                { justifyContent: 'center', alignItems: 'center'}
            ]}
        >
            <ImageBackground style={styles.backImage} source={BackgroundImg} />
            <Image style={{width:50, height:50, resizeMode:'contain'}} source={Logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:colors.primary,
        flex:1, 
    },
    backImage : {
        width:SCREEN_WIDTH+20,
        height:moderateScale(300),
        resizeMode:'cover',
        position:"absolute", 
        alignSelf:'center'
    },
})
export default Splash