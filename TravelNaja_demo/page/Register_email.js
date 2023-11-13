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
            flex: 1,
            padding: 35
        },
        errorText: {
            color: 'red',
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
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5219/5219574.png' }}
                    style={{ width: 200, height: 200 }}
                    containerStyle={{
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                />
                <Input
                    label="Email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError(''); // Clear error when user starts typing
                    }}
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={20}
                            color='#9B9B9B'
                        />
                    }
                    placeholder={'  youremail@mail.com'}
                />
                <Text style={styles.errorText}>{emailError}</Text>

                {/* username input */}
                <Input
                    label="Username"
                    value={username}
                    onChangeText={(text) => {
                        setUsername(text);
                        setUsernameError(''); // Clear error when user starts typing
                    }}
                    leftIcon={
                        <Icon
                            name='user'
                            size={20}
                            color='#9B9B9B'
                        />
                    }
                    placeholder={'  username'}
                />
                <Text style={styles.errorText}>{usernameError}</Text>

                {/* password input */}
                <Input
                    label="Password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError(''); // Clear error when user starts typing
                    }}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={20}
                            color='#9B9B9B'
                        />
                    }
                    placeholder={'  password'}
                />
                <Text style={styles.errorText}>{passwordError}</Text>

                <Button
                    title='Register'
                    onPress={handleRegister}
                    buttonStyle={{
                        backgroundColor: '#8C472F'
                    }}
                />
            </ScrollView>
        </ThemeProvider>
    );
};

export default Register_email;