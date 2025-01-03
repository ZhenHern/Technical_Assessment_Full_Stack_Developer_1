import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Item {
    id: number;
    name: string;
    description?: string;
    price: number;
}

interface ItemsState {
    items: Item[];
    loading: boolean;
    showForm: boolean;
    showDeleteModal: boolean;
    itemToDelete: Item | null;
    itemToEdit: Item | null;
    connectionError: boolean;
}

const initialState: ItemsState = {
    items: [],
    loading: true,
    showForm: false,
    showDeleteModal: false,
    itemToDelete: null,
    itemToEdit: null,
    connectionError: false
}

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Item[]>) {
            state.items = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setShowForm(state, action: PayloadAction<boolean>) {
            state.showForm = action.payload;
        },
        setShowDeleteModal(state, action: PayloadAction<boolean>) {
            state.showDeleteModal = action.payload;
        },
        setItemToDelete(state, action: PayloadAction<Item | null>) {
            state.itemToDelete = action.payload;
        },
        setItemToEdit(state, action: PayloadAction<Item | null>) {
            state.itemToEdit = action.payload;
        },
        setConnectionError(state, action: PayloadAction<boolean>) {
            state.connectionError = action.payload;
        },
    },
});

export const {
    setItems,
    setLoading,
    setShowForm,
    setShowDeleteModal,
    setItemToEdit,
    setItemToDelete,
    setConnectionError
} = itemsSlice.actions;

export default itemsSlice.reducer;