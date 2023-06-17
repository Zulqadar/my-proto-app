import { configureStore } from '@reduxjs/toolkit'
import { reducer as UserReducer } from './features/user/user-slice'
import { reducer as AuthReducer } from './features/auth/auth-slice'

export const store = configureStore({
    reducer: {
        user: UserReducer,
        auth: AuthReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch