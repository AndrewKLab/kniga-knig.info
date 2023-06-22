import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { coursesPromoService } from '../_services';
import { thunkFetch } from '../_helpers';
import { CoursePromo } from '../_interfaces';

export interface coursesPromoSliceInterface {
    get_one_by_id_loading: boolean,
    get_one_by_id_success_message: null | string,
    get_one_by_id_error_message: null | string,
    get_one_by_id_error_data: null | object,
    get_one_by_id_course_promo: null | CoursePromo,
}

const getOneById = createAsyncThunk('auth/getOneById', async (params: object, { rejectWithValue }) => await thunkFetch(async () => await coursesPromoService.getOneById(params), { rejectWithValue }))

const coursesPromoSlice = createSlice({
    name: 'courses_promo',
    initialState: {
        get_one_by_id_loading: false,
        get_one_by_id_success_message: null,
        get_one_by_id_error_message: null,
        get_one_by_id_error_data: null,
        get_one_by_id_course_promo: null,
    } as coursesPromoSliceInterface,
    reducers: {},
    extraReducers: (builder) => {
        //get_one_by_id
        builder.addCase(getOneById.pending, (state) => {
            state.get_one_by_id_loading = true
            state.get_one_by_id_success_message = null
            state.get_one_by_id_error_message = null
            state.get_one_by_id_error_data = null
            state.get_one_by_id_course_promo = null
        })
        builder.addCase(getOneById.fulfilled, (state, action) => {
            state.get_one_by_id_loading = false;
            state.get_one_by_id_success_message = action?.payload?.message ? action.payload.message : null;
            state.get_one_by_id_error_message = null;
            state.get_one_by_id_error_data = null;
            state.get_one_by_id_course_promo = action?.payload?.course_promo
        })
        builder.addCase(getOneById.rejected, (state, action: any) => {
            state.get_one_by_id_loading = false;
            state.get_one_by_id_success_message = null;
            state.get_one_by_id_error_message = action?.payload?.message ? action.payload.message : null;
            state.get_one_by_id_error_data = action?.payload?.data ? action.payload.data : null;
            state.get_one_by_id_course_promo = null
        })
    },
});

export const coursesPromoActions = {
    getOneById,
};
export default coursesPromoSlice.reducer;