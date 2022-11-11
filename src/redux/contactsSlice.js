import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { fetchContacts, addContact, deleteContact } from './operations';

// builder use//

const contactsInitState = {
  items: [],
  isLoading: false,
  error: null,
};

const extraActions = [fetchContacts, addContact, deleteContact];
const getExtraActions = type =>
  extraActions.map(extraAction => extraAction[type]);

const fetchContactsSuccessReducer = (state, action) => {
  state.items = action.payload;
};

const addContactSuccessReducer = (state, action) => {
  state.items.push(action.payload);
};

const deleteContactSuccessReducer = (state, action) => {
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
};

const anyPendingReducer = state => {
  state.isLoading = true;
};

const anyFulfilledReducer = state => {
  state.isLoading = false;
  state.error = null;
};

const anyRejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitState,
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, fetchContactsSuccessReducer)
      .addCase(addContact.fulfilled, addContactSuccessReducer)
      .addCase(deleteContact.fulfilled, deleteContactSuccessReducer)
      .addMatcher(isAnyOf(...getExtraActions('pending')), anyPendingReducer)
      .addMatcher(isAnyOf(...getExtraActions('fulfilled')), anyFulfilledReducer)
      .addMatcher(isAnyOf(...getExtraActions('rejected')), anyRejectedReducer),
});

export const contactsReducer = contactsSlice.reducer;

// no builder case//

// const contactsInitState = {
//   items: [],
//   isLoading: false,
//   error: null,
// };
// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: contactsInitState,
//   extraReducers: {
//     [fetchContacts.pending]: handlePending,
//     [fetchContacts.rejected]: handleRejected,
//     [fetchContacts.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.contacts = action.payload;
//     },
//     [addContact.pending]: handlePending,
//     [addContact.rejected]: handleRejected,
//     [addContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.entities.push(action.payload);
//     },
//     [deleteContact.pending]: handlePending,
//     [deleteContact.rejected]: handleRejected,
//     [deleteContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       const index = state.entities.findIndex(
//         contact => contact.id === action.payload.id
//       );
//       state.contacts.splice(index, 1);
//     },
//   },
// });

// export const contactsReducer = contactsSlice.reducer;
