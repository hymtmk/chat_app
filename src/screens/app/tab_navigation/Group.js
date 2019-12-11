import React from 'react'
import { Text, View,StyleSheet,ScrollView,FlatList } from 'react-native'
import {colors} from '../../../res/style/colors'
import {fontSizes} from '../../../res/style/fontSize'
import {fonts} from '../../../res/style/fonts'
import { groupDetails } from "./../../../res/data/data"
import GroupChat from '../../../components/GroupComponents/GroupChat'
import MaterialIcon from '../../../components/Shared/MaterialIcon'
import {withNavigation} from 'react-navigation'

const Group = (props) => {
 
   return (
      <View style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.createGroupWrapper}>
           <Text style={styles.createGroupText}>Create New Group</Text>
           <View style={styles.createGroupActionContainer}>
            <View style={styles.firstRow}>
             <View style={styles.groupIconWrapper}>
              <MaterialIcon name="account-group" size={24} color={colors.white}/>
             </View>
             <Text style={styles.newGroupText}>New Group</Text>
            </View>
           </View>
          </View>
          <View>
           <Text style={[styles.createGroupText,{paddingHorizontal:14}]}>Your Groups</Text>
           {
            <FlatList
             data={groupDetails}
             keyExtractor={(item) => item.id.toString()}
             renderItem={({ item }) => (
              <GroupChat uri={item.avatar} userName={item.name} message={item.message} />
            )}/>
           }
        
          </View>
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor : colors.white
  },
  createGroupWrapper : {
    padding : 10,
    paddingHorizontal:14
  },
  createGroupText : {
    color : colors.primary,
    fontSize : fontSizes.small,
    fontFamily : fonts.Medium
  },
  createGroupActionContainer : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingVertical : 10
  },
  groupIconWrapper : {
    backgroundColor : colors.primary,
    width : 50,
    height : 50,
    borderRadius : 50/2,
    justifyContent : 'center',
    alignItems : 'center'
  },
  newGroupText : {
    fontSize : fontSizes.small,
    color : colors.black,
    fontFamily : fonts.SemiBold,
    marginLeft : 20
  },
  firstRow : {
    flexDirection : 'row',
    alignItems : 'center'
  },
  secondRow : {
    flexDirection : 'row',
    padding : 10,
  },
  icon : {
    marginLeft : 10
  },
})

export default withNavigation(Group)