import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import FindBusReducer from './FindBus/reducer';

export const store = configureStore({
    reducer: {
        FindBus: FindBusReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
