import { coursesPromoSliceInterface } from '../../public/_store';
import rootReducer from '../_reducers';
import { configureStore } from '@reduxjs/toolkit';

export interface stateInterface {
    courses_promo: coursesPromoSliceInterface;
}

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

