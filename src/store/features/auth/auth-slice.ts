import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export type LOGIN_MODE = 'Facebook' | 'Google' | 'Other' | 'Invalid';

export interface AuthState {
    accessToken?: string
    idToken?: string
    userID?: string
    loginMode?: LOGIN_MODE
}

const initialState: AuthState = {
    accessToken: '',
    userID: '',
    loginMode: 'Invalid'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthDetails: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken,
                state.userID = action.payload.userID,
                state.loginMode = action.payload.loginMode
        },
        removeAuthDetails: (state) => {
            state.accessToken = '',
                state.idToken = '',
                state.loginMode = 'Invalid',
                state.userID = ''
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuthDetails, removeAuthDetails } = authSlice.actions
export const selectAuthDetails = (state: RootState) => state.auth
export const { reducer } = authSlice;
export default authSlice.reducer