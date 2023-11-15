import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ThemeProvider, Button, Image, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";

const Register_personal_info = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        navigation.navigate('Register_email');
    };

    const handleApplyGuide = () => {
        navigation.navigate('ApplyGuide');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{
                fontSize: 24,
                color: '#372948',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 10
            }}>Travel Naja</Text>
            <Text style={styles.headerText}>Sign in</Text>
           
            <View style={styles.buttonContainer}>
                <Input
                    label="Username"
                    value={username}
                    onChangeText={(text) => {
                        setUsername(text);
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

                {/* password input */}
                <Input
                    label="Password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
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

                <Button
                    title='Sign in'
                    buttonStyle={{
                        backgroundColor: '#ffffff',
                        padding: 10,
                        borderWidth: 2,
                        borderColor: '#372948',
                        elevation: 0,
                        marginBottom: 20,
                        borderRadius: 50
                    }}
                    titleStyle={{
                        color: '#372948',
                        fontSize: 18,
                        borderRadius: 50
                    }}
                />

                <Button
                    title='Create account'
                    onPress={handleRegister}
                    buttonStyle={{
                        backgroundColor: '#372948',
                        padding: 10,
                        elevation: 0,
                        marginBottom: 20,
                        borderRadius: 50
                    }}
                    titleStyle={{
                        color: '#ffffff',
                        fontSize: 18
                    }}
                />

                <Button
                    title='Apply Local Guide'
                    onPress={handleApplyGuide}
                    buttonStyle={{
                        backgroundColor: '#372948',
                        padding: 10,
                        elevation: 0,
                        marginBottom: 20,
                        borderRadius: 50
                    }}
                    titleStyle={{
                        color: '#ffffff',
                        fontSize: 18
                    }}
                />
            </View>
            <Text style={styles.footerText}>By signing in and applying local guide, I agree to Travel Naja's Term of Use and Privacy Policy</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        elevation: 0
    },
    buttonContainer: {
        padding: 35,
        width: '100%'
    },
    headerText: {
        fontSize: 18,
        color: '#372948',
        textAlign: 'center',
        width: '85%'
    },
    footerText: {
        fontSize: 16,
        color: '#372948',
        textAlign: 'center',
        width: '85%'
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
    }
});

export default Register_personal_info;
