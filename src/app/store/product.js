import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";
import isOutdated from "../utils/isOutdated";

const productsService = createSlice({
    name: "product",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        productRequested: (state) => {
            state.isLoading = true;
        },

        productReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        productRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productReducer, actions } = productsService;
const { productRequested, productReceved, productRequestFiled, prod } = actions;

export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().product;
    if (isOutdated(lastFetch)) {
        console.log("lastFetch", lastFetch);
        dispatch(productRequested());
        try {
            const { content } = await productService.get();
            dispatch(productReceved(content));
        } catch (error) {
            dispatch(productRequestFiled(error.message));
        }
    }
};

export const getProducts = () => (state) => state.product.entities;
export const getProductsLoadingStatus = (id) => (state) =>
    state.product.isLoading;
export const getProductsbyId = (name) => (state) => {
    if (state.product.entities !== null) {
        return state.product.entities.filter(
            (word) => word._id == name && word
        );
    }
};
export const getProductsList = (name) => (state) => {
    if (state.product.entities !== null) {
        return state.product.entities.filter(
            (word) => word.category == name && word
        );
    }
};
export default productReducer;
