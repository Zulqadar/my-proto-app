import { NativeStackNavigationOptions } from "@react-navigation/native-stack"
import React from "react"

import {
    ApproveRequestScreen,
    BluetoothScreen,
    CreateRequestScreen,
    HomeScreen,
    InitialScreen,
    LoginScreen,
    ViewRequestScreen
} from '../screens';

export interface Routes {
    name: string
    component: React.ComponentType<{ navigation?: any }>
    options: NativeStackNavigationOptions
    isDisabled?: boolean
    restProps?: any
}

export const routes: Routes[] = [
    {
        component: InitialScreen,
        name: 'Initial',
        options: { headerShown: false }
    },
    {
        component: HomeScreen,
        name: 'Home',
        options: { headerShown: false }
    },
    {
        component: LoginScreen,
        name: 'Login',
        options: { headerShown: false }
    },
    {
        component: BluetoothScreen,
        name: 'Bluetooth',
        options: { headerTitle: 'Scan Bluetooth Devices' }
    },
    {
        component: CreateRequestScreen,
        name: 'CreateRequest',
        options: { headerTitle: 'Create Request' }
    },
    {
        component: ViewRequestScreen,
        name: 'ViewRequest',
        options: { headerTitle: 'View Requests' }
    },
    {
        component: ApproveRequestScreen,
        name: 'ApproveRequest',
        options: { headerTitle: 'Approve Requests' }
    }
]