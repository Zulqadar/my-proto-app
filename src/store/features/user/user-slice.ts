import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface UserState {
    userId?: string
    name?: string
    pictureUrl?: string
}

const initialState: UserState = {
    name: '',
    pictureUrl: '',
    userId: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name,
                state.pictureUrl = action.payload.pictureUrl,
                state.userId = action.payload.userId
        },
        removeUser: (state) => {
            state.name = '',
                state.pictureUrl = '',
                state.userId = ''
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export const { reducer } = userSlice;
export default userSlice.reducer