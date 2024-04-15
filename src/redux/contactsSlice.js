import { createSlice, createSelector } from '@reduxjs/toolkit'; 
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const handlePending = state => {
    state.loading = true;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};


export const contactsInitialState = {
    contacts: {
        items: [],
        loading: false,
        error: null,
    },
    filters: {
        name: ""
    }
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload;
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
                state.loading = false;
                state.error = null;
                const index = state.items.findIndex(
                    contact => contact.id === action.payload.id
                );
                state.items.splice(index, 1);
            })
            .addCase(deleteContact.rejected, handleRejected)
    }
});

export const selectFilteredContacts = createSelector(
    state => state.contacts.contacts.items, 
    state => state.contacts.filters.name, 
    (contacts, nameFilter) => {
        if (nameFilter.trim() === "") {
            return contacts; 
        }
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }
);

export const selectContacts = state => state.contacts.contacts.items;
export const contactsReducer = contactsSlice.reducer;


