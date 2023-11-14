import React from "react";
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ThemeProvider, Button, Image } from 'react-native-elements';
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
        <ScrollView contentContainerStyle={styles.container}>
             <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5219/5219574.png' }}
                style={{ width: 200, height: 200 }}
                containerStyle={{
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            />
            <Text style={{
                fontSize: 24,
                color: '#372948',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 20
            }}>Travel Naja</Text>
            <Text style={styles.headerText}>Best ever multiple universe globally sugoi travel reservation system</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title='Register'
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
                    title='Login'
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFECEF',
        elevation: 0
    },
    buttonContainer: {
        padding: 35,
        elevation: 0,
        width: '100%'
    },
    headerText: {
        marginBottom: 30,
        fontSize: 18,
        color: '#372948',
        textAlign: 'center',
        width: '70%'
    }
});

export default Register_personal_info;
