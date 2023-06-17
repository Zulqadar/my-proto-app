import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button, Menu } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { ProfileImage } from '../../components/avatar';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeUser, selectUser } from '../../store/features/user/user-slice';
import { AuthState, LOGIN_MODE, removeAuthDetails } from '../../store/features/auth/auth-slice';
import { getAuthDetailsAsync, removeAuthDetailsAsync } from '../../async-storage';

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const userDetails = useAppSelector(selectUser);
    
    const [loginMode, setLoginMode] = useState<LOGIN_MODE>('Invalid');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        GoogleSignin.configure();
    }, [])

    useEffect(() => {
        getAuthDetailsAsync().then((authData: AuthState) => {
            setLoginMode(authData.loginMode || 'Invalid');
        })
    }, [])

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const handleNavigate = (navigationScreen: string) => {
        if (navigation && navigationScreen && navigationScreen !== '') {
            navigation.navigate(navigationScreen);
            closeMenu();
        }
    }

    const handleLogout = async () => {
        try {
            setVisible(false);
            if (loginMode === 'Google') {
                await GoogleSignin.signOut();
            }
            else if (loginMode === 'Facebook') {
                LoginManager.logOut();
            } else {
                Alert.prompt('Error on logout');
            }

            //remove Auth Details from storage
            removeAuthDetailsAsync();

            //remove auth details from stores
            dispatch(removeUser());
            dispatch(removeAuthDetails())

            //navigate to login screen
            handleNavigate('Login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ProfileImage uri={userDetails.pictureUrl || ''} size={50} name={userDetails.name} />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Button onPress={openMenu} style={styles.menuButton}>
                            <Text>
                                ☰
                            </Text>
                        </Button>
                    }
                >
                    <Menu.Item onPress={() => { handleNavigate('Bluetooth'); }} title="Scan Bluetooth Devices" />
                    <Menu.Item onPress={handleLogout} title="Logout" />
                    {/* <Menu.Item onPress={() => { }} title="Sort by Date" />
                    <Menu.Item onPress={() => { }} title="Sort by Size" /> */}
                </Menu>
            </View>
            <View style={styles.menu}>
                <Card style={styles.card}>
                    <Card.Title title="Create Request" />
                    <Card.Content>
                        <Text>Use this option to create any new request.</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => { handleNavigate('CreateRequest'); }}>Create</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="View Requests" />
                    <Card.Content>
                        <Text>Use this option to see all requests.</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => { handleNavigate('ViewRequest'); }}>View</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Approve Request" />
                    <Card.Content>
                        <Text>Use this option to approve requests.</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => { handleNavigate('ApproveRequest'); }}>Approve</Button>
                    </Card.Actions>
                </Card>
                {/* <Card style={styles.card}>
                    <Card.Title title="Menu Option 4" />
                    <Card.Content>
                        <Text>Option 4 content</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    username: {
        marginLeft: 10,
        fontSize: 16,
    },
    menuButton: {
        marginRight: -10,
        marginLeft: 10,
    },
    menu: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 20,
    },
    card: {
        width: '100%',
        marginBottom: 20,
    },
});

export default DashboardScreen;
