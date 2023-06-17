import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, FlatList, Platform, StyleSheet, View } from 'react-native';
import { List, Divider, Text, Button } from 'react-native-paper';
import BleManager, { Peripheral } from 'react-native-ble-manager';

export interface BluetoothScreenProps {
    navigation?: any
}

export const BluetoothScreen = ({ navigation }: BluetoothScreenProps) => {
    const [isScanning, setIsScanning] = useState(false);
    const [devices, setDevices] = useState<Peripheral[]>([]);

    const startScan = () => {
        setIsScanning(true);
        BleManager.start({ showAlert: false })
            .then(() => {
                if (Platform.OS === 'android') {
                    // On Android, check if Bluetooth is turned on
                    BleManager.checkState()
                        .then((state) => {
                            if (state === 'off') {
                                // If Bluetooth is turned off, prompt user to turn it on
                                Alert.alert(
                                    'Bluetooth Required',
                                    'Please turn on Bluetooth to scan for nearby devices',
                                    [{ text: 'OK', onPress: () => { navigation.goBack(); } }],
                                    { cancelable: false }
                                );
                            } else {
                                // Bluetooth is turned on, start scanning for devices
                                BleManager.scan([], 5, true)
                                    .then((results) => {
                                        console.log('Scan results:', results);
                                        setIsScanning(false);
                                    })
                                    .catch((error) => {
                                        console.error('Scan error:', error);
                                        setIsScanning(false);
                                    });
                            }
                        })
                        .catch((error) => {
                            console.error('Bluetooth state check error:', error);
                            setIsScanning(false);
                        });
                } else {
                    // On iOS, just start scanning for devices
                    BleManager.scan([], 5, true)
                        .then((results) => {
                            console.log('Scan results:', results);
                            setIsScanning(false);
                        })
                        .catch((error) => {
                            console.error('Scan error:', error);
                            setIsScanning(false);
                        });
                }
            })
            .catch((error) => {
                console.error('Bluetooth initialization error:', error);
                setIsScanning(false);
            });

        BleManager.getDiscoveredPeripherals()
            .then((devicesList) => {
                console.log('Nearby devices:', devices);
                setDevices(devicesList);
            })
            .catch((error) => {
                console.error('Device list error:', error);
                setDevices([]);
            });
    }
    useEffect(() => {
        startScan();
        return () => {
            BleManager.stopScan()
                .then(() => {
                    console.log('Scan stopped');
                })
                .catch((error) => {
                    console.error('Scan stop error:', error);
                });
        };
    }, []);

    const scanAgain = () => {
        startScan();
    }

    const renderItem = ({ item }: { item: Peripheral }) => (
        <>
            <List.Item
                title={item.name || 'Unknown device'}
                description={item.id}
                onPress={() => console.log(`Pressed device: ${item.id}`)}
            />
            <Divider />
        </>
    );

    return (
        <View style={styles.container}>
            {devices.length > 0 && (
                <>
                    <FlatList
                        data={devices}
                        renderItem={renderItem}
                        keyExtractor={(item) => item?.id}
                        style={styles.container}
                    />
                    <Button mode="contained" onPress={() => scanAgain()}>
                        Scan Devices
                    </Button>
                </>
            )}

            {!isScanning && devices.length == 0 && (
                <>
                    <Text>No Devices Found</Text>
                    <Button mode="contained" onPress={() => scanAgain()}>
                        Scan Devices
                    </Button>
                </>
            )}

            {isScanning && (
                <Text>Scanning...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        marginHorizontal: 16,
    },
});

// export const BluetoothScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//     const [isScanning, setIsScanning] = useState(false);
//     const [devices, setDevices] = useState<Peripheral[]>([]);
//     const [isConnected, setIsConnected] = useState(false);
//     const [device, setDevice] = useState(null);

//     useEffect(() => {
//         // Scan for devices
//         setIsScanning(true);
//         BleManager.scan([], 5, true)
//             .then((results) => {
//                 console.log('Scan results:', results);
//                 setIsScanning(false);
//             })
//             .catch((error) => {
//                 console.error('Scan error:', error);
//                 setIsScanning(false);
//             });

//         // Get list of nearby devices
//         BleManager.getDiscoveredPeripherals()
//             .then((devicesList) => {
//                 console.log('Nearby devices:', devices);
//                 setDevices(devicesList);
//             })
//             .catch((error) => {
//                 console.error('Device list error:', error);
//                 setDevices([]);
//             });
//     }, []);

//     const connectToDevice = (deviceID: string) => {
//         // Connect to a specific device
//         // const  = '00:11:22:33:44:55';
//         BleManager.connect(deviceID)
//             .then(() => {
//                 console.log('Connected to device:', deviceID);
//                 setIsConnected(true);
//             })
//             .catch((error) => {
//                 console.error('Connection error:', error);
//                 setIsConnected(false);
//             });
//     }


//     return (
//         <View style={styles.container}>

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 16,
//         marginTop: -50
//     },
// });