import React from 'react'
import { Text, View,StyleSheet,FlatList,ScrollView } from 'react-native'
import {colors} from '../../../res/style/colors'
import {fontSizes} from '../../../res/style/fontSize'
import {fonts} from '../../../res/style/fonts'
import { missedCall,calls } from "./../../../res/data/data"
import CallChat from '../../../components/CallComponent/CallChat'
import {withNavigation} from 'react-navigation'

const Calls = (props) =>{
  
   const { navigation } = props;

    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
          <View style={styles.createGroupWrapper}>
           <Text style={[styles.createGroupText,{color:'tomato'}]}>Missed Call</Text>
           {
            <FlatList
            data={missedCall}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CallChat uri={item.avatar} navigation={navigation} typeCall={item.typeCall} type={item.type} userName={item.name} time={item.time} />          
            )}/>
           }
          </View>
          <View style={styles.createGroupWrapper}>
           <Text style={[styles.createGroupText]}>Other Call</Text>
           {
            <FlatList
            data={calls}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CallChat uri={item.avatar} navigation={navigation}  typeCall={item.typeCall} type={item.type} userName={item.name} time={item.time} />          
            )}/>
           }
          </View>
          <View style={{padding:70}}/>
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor : colors.white,
    paddingBottom : 10,
    marginBottom : 70
  },
  createGroupText : {
    color : colors.primary,
    fontSize : fontSizes.small,
    fontFamily : fonts.Medium,
    padding:10,
    paddingHorizontal:14
  },
   
})

export default withNavigation(Calls)