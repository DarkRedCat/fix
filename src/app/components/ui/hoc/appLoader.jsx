import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList
} from "../../../store/users";

import { loadProductsList } from "../../../store/product";
import { loadcategoryList } from "../../../store/category";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        dispatch(loadProductsList());
        dispatch(loadcategoryList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);
    if (usersStatusLoading) return "";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AppLoader;
