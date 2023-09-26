import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";
import isOutdated from "../utils/isOutdated";

const categoriesService = createSlice({
    name: "category",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoryRequested: (state) => {
            state.isLoading = true;
        },
        categoryReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        categoryRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoryReducer, actions } = categoriesService;
const { categoryRequested, categoryReceved, categoryRequestFiled } = actions;

export const loadcategoryList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().category;
    if (isOutdated(lastFetch)) {
        console.log("lastFetch", lastFetch);
        dispatch(categoryRequested());
        try {
            const { content } = await categoryService.get();
            dispatch(categoryReceved(content));
        } catch (error) {
            dispatch(categoryRequestFiled(error.message));
        }
    }
};
export const getCategory = () => (state) => state.category.entities;
export const getCategoryLoadingStatus = () => (state) =>
    state.category.isLoading;
export const getCategorybyId = (id) => (state) => {
    if (state.category.entities) {
        return state.category.entities.find((p) => p._id === id);
    }
};
export default categoryReducer;
