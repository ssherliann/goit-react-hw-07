import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const handlePending = (state) => {
    state.contacts.loading = true;
};

const handleRejected = (state, action) => {
    state.contacts.loading = false;
    state.contacts.error = action.payload;
};

export const contactsInitialState = {
    contacts: {
        items: [],
        loading: false,
        error: null,
    },
    filters: {
        name: '',
    },
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitialState,
    extraReducers: (builder) => {
    builder
        .addCase(fetchContacts.pending, handlePending)
        .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
        })
        .addCase(fetchContacts.rejected, handleRejected)

        .addCase(addContact.pending, handlePending)
        .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
        })
        .addCase(addContact.rejected, handleRejected)

        .addCase(deleteContact.pending, handlePending)
        .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = null;
        state.contacts.items = state.contacts.items.filter(
            (contact) => contact.id !== action.payload
        );
        })
        .addCase(deleteContact.rejected, handleRejected);
    },
});

const selectContactsState = (state) => state.contacts;
const selectFiltersState = (state) => state.filters;

export const selectFilteredContacts = createSelector(
    [selectContactsState, selectFiltersState],
    (contactsState, filtersState) => {
        const { items } = contactsState.contacts;
        const { name } = filtersState;

        if (items.length > 0 && name.trim() !== '') {
            return items.filter((contact) =>
            contact.name.toLowerCase().includes(name.trim().toLowerCase())
        );
        }
        return items;
    }
);

export const selectContacts = (state) => state.contacts.contacts.items;
export const contactsReducer = contactsSlice.reducer;