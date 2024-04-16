import { createSlice } from '@reduxjs/toolkit';
import { contactsInitialState } from './contactsSlice';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: { 
        name: contactsInitialState.filters.name,
    },
    reducers: {
        changeFilter(state, action) {
            state.name = action.payload.inputValue;
        }
    }
});

export const selectNameFilter = state => state.filters.name;
export const { changeFilter } = filtersSlice.actions; 
export const filtersReducer = filtersSlice.reducer;
