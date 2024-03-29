import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons'


const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) => 
          setChats(
              snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
              }))
          )
        ); 
        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
       navigation.setOptions({
           title: 'Signal',
           headerStyle: { backgroundColor: '#fff'},
           headerTitleStyle: { color: 'black', fontWeight: 'bold', },
           headerTintColor: 'black',
           headerLeft: () => (
               <View style={{ marginLeft: 20 }}>
                   <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                   <Avatar rounded source={{ uri: auth?.currentUser?.photoURL}}/>
                   </TouchableOpacity>
               </View>
           ),
           headerRight: () => (
               <View style={{
                   flexDirection: 'row',
                   justifyContent: 'space-between',
                   width: 80,
                   marginRight: 20
               }}>
                   <TouchableOpacity activeOpacity={0.5}>
                   <EvilIcons name='camera' size={30} color='black'/>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                   <EvilIcons name='pencil' size={30} color='black'/>
                   </TouchableOpacity>
               </View>
           )
       })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data: {chatName}}) => (                    
               <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView>            
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
