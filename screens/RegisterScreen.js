import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect ,useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAvoidingView,TouchableOpacity  } from 'react-native';
import { Button, Input, Image, Text } from 'react-native-elements'
import { auth } from '../firebase'
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    }, [navigation])

    const register = () => {   
        auth.createUserWithEmailAndPassword(email,password).then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            })
        }).catch((error) => alert(error.message))        
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{marginBottom:50}}>
                Create a Signal account
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                placeholder='Full name'  
                autofocus              
                type="text"
                value={name}
                onChangeText={(text) => setName(text)}
                />
                 <Input 
                placeholder='Email'
                type="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                />
                 <Input 
                placeholder='Password'
                type="password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                />
                 <Input 
                placeholder='Profile Picture URL (optional)'
                type="text"
                value={imageUrl}
                onChangeText={(text) => setImageUrl(text)}
                onSubmitEditing={register}
                />
            </View>
            <Button 
            containerStyle={styles.button}
            onPress={register} 
            raised 
            title='Register'/>
            <View style={{ height: 20}}/>  

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'

    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
