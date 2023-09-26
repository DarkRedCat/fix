import productReduser from "./product";

import usersReducer from "./users";
import categoryReducer from "./category";
const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    users: usersReducer,
    product: productReduser,
    category: categoryReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
