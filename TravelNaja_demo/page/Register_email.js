import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ThemeProvider, Button, Input, Image } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../components/config';
import { ref, set, push, get } from 'firebase/database';

const Register_email = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const theme = {
        Button: {
            raised: true,
        },
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#ffffff'
        },
        errorText: {
            color: 'red',
        },
        inputContainer: {
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            paddingLeft: 20,
            borderColor: '#FFFFFF',
        },
        inputStyle: {
            marginLeft: 10,
        },
        iconStyle: {
            marginRight: 10,
        },
        headerText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 30
        }
    });

    const handleRegister = () => {
        // Check if email, username, and password are filled
        if (!email) {
            setEmailError(' Please fill in the email field');
            return;
        }
        if (!username) {
            setUsernameError('  Please fill in the username field');
            return;
        }
        if (!password) {
            setPasswordError('  Please fill in the password field');
            return;
        }

        // Check if the username contains specific characters
        const invalidUsernameChars = ['@', '#', '$', '%', '&'];
        if (invalidUsernameChars.some(char => username.includes(char))) {
            setUsernameError('  Username cannot contain specific character (@, #, $, %, or &)');
            return;
        }

        // Check if the password contains specific characters
        const invalidPasswordChars = ['!', '@', '#', '$', '%'];
        if (invalidPasswordChars.some(char => password.includes(char))) {
            setPasswordError('  Password cannot contain specific character (@, #, $, %, or &)');
            return;
        }

        // Create a new document in the User-account collection
        const postListRef = ref(db, 'User-account/', username);
        const newPostRef = push(postListRef);
        const newPostKey = newPostRef.key;

        // Set the initial data in the newly created document
        set(newPostRef, {
            email: email,
            username: username,
            password: password
        });

        // Navigate to the next page and pass the new document key
        navigation.navigate('Register_personal_info', {
            userId: newPostKey
        });

    };

    return (

        <ScrollView style={styles.container}>
            <View style={{
                paddingTop: 50,
                backgroundColor: '#372948',
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25
            }}>
                <Text style={styles.headerText}>Welcome to Travel Naja!</Text>
            </View>

            <View style={{
                padding: 35,
                marginTop: 10
            }}>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError('');
                    }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={20}
                            color='#9B9B9B'
                        />
                    }
                    labelStyle={{
                        color: '#372948'
                    }}
                    placeholder={'youremail@mail.com'}
                />
                <Text style={styles.errorText}>{emailError}</Text>

                <Input
                    label="Username"
                    value={username}
                    onChangeText={(text) => {
                        setUsername(text);
                        setUsernameError('');
                    }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    leftIcon={
                        <Icon
                            name='user'
                            size={20}
                            color='#9B9B9B'
                        />
                    }
                    labelStyle={{
                        color: '#372948'
                    }}
                    placeholder={'username'}
                />
                <Text style={styles.errorText}>{usernameError}</Text>

                {/* password input */}
                <Input
                    label="Password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError('');
                    }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={20}
                            color='#9B9B9B'
                        />
                    }
                    labelStyle={{
                        color: '#372948'
                    }}
                    placeholder={'password'}
                />
                <Text style={styles.errorText}>{passwordError}</Text>

                <Button
                    title='Next'
                    onPress={handleRegister}
                    buttonStyle={{
                        backgroundColor: '#372948',
                        padding: 10,
                        marginBottom: 20,
                        borderRadius: 50,
                    }}
                    titleStyle={{
                        color: '#ffffff',
                        fontSize: 18,
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default Register_email;
