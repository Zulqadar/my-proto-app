import React, { FC } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { SplashScreen } from "./splash"

export interface InitialScreenProps {
    navigation?: any
}

export const InitialScreen = ({ navigation }: InitialScreenProps) => {

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <SplashScreen navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center'
    }
})