import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, Alert, View } from 'react-native';
import { ThemeProvider, Button, Input } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../components/config';
import { ref, set, push, get, update } from 'firebase/database';

const Profile = ({ route }) => {
    const navigation = useNavigation();
    const { userId } = route.params;

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const userRef = ref(db, `User-account/${userId}`);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                setUserDetails(snapshot.val());
            } else {
                console.log('User details not found.');
            }
        });
    }, [userId]);

    if (!userDetails) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const handleNext = () => {
        navigation.navigate('Menu');
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#ffffff'
        },
        HeaderText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#372948',
        },
        infoText: {
            fontSize: 20,
            color: '#372948'
        },
        infoBlock: {
            borderBottomWidth: 1,
            borderBottomColor: '#F5F5F5',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 20,
        }
    });

    return (
        <ScrollView style={styles.container}>
            <View style={{
                paddingTop: 50,
                backgroundColor: '#372948',
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25
            }}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: 30
                }}>Profile</Text>
            </View>

            <View style={{
                padding: 35,
                marginTop: 10
            }}>
                <View style={{
                    backgroundColor: '#ffffff'
                }}>
                    <View style={styles.infoBlock}>
                        <Text style={styles.HeaderText}>Username</Text>
                        <Text style={styles.infoText}>{userDetails.username}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.HeaderText}>Email</Text>
                        <Text style={styles.infoText}>{userDetails.email}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.HeaderText}>First Name</Text>
                        <Text style={styles.infoText}>{userDetails.firstName}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.HeaderText}>Last Name</Text>
                        <Text style={styles.infoText}>{userDetails.lastName}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.HeaderText}>Mobile</Text>
                        <Text style={styles.infoText}>{userDetails.mobile}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.HeaderText}>Favorite Car</Text>
                        {userDetails.favoriteCar ? (
                            <Text style={styles.infoText}>{userDetails.favoriteCar}</Text>
                        ) : (
                            <Text style={styles.infoText}>-</Text>
                        )}
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.HeaderText}>Favorite Hotel</Text>
                        {userDetails.favoriteHotel ? (
                            <Text style={styles.infoText}>{userDetails.favoriteHotel}</Text>
                        ) : (
                            <Text style={styles.infoText}>-</Text>
                        )}
                    </View>

                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Button
                            title='Logout'
                            onPress={handleNext}
                            buttonStyle={{
                                backgroundColor: '#372948',
                                padding: 10,
                                marginBottom: 20,
                                borderRadius: 50,
                                marginTop: 20,
                                paddingLeft: 30,
                                paddingRight: 30,
                                alignItems: 'center'
                            }}
                            titleStyle={{
                                color: '#ffffff',
                                fontSize: 18,
                            }}
                        />
                    </View>
                </View>
            </View>


        </ScrollView >
    );
};

export default Profile;
