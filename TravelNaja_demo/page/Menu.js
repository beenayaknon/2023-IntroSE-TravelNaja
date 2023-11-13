import React from "react";
import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Register_personal_info = () => {
    const navigation = useNavigation();

    const handleRegister = () => {
        navigation.navigate('Register_email');
    };

    const handleApplyGuide = () => {
        navigation.navigate('ApplyGuide');
    };

    const theme = {
        Button: {
            raised: true,
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        title='Register'
                        onPress={handleRegister}
                        buttonStyle={{
                            backgroundColor: '#8C472F',
                            padding: 15
                        }}
                    />
                    <Button
                        title='Apply-guide'
                        onPress={handleApplyGuide}
                        buttonStyle={{
                            marginTop: 10,
                            backgroundColor: '#512516',
                            padding: 15
                        }}
                    />
                </View>
            </ScrollView>
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '80%', // Adjust the width as needed
        marginTop: 50,
    },
});

export default Register_personal_info;
