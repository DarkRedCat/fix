import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "./textField";
import CheckBoxField from "./checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";

const LoginForm = ({ textData, fun }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const loginError = useSelector(getAuthErrors());
    const history = useHistory();
    const dispath = useDispatch();
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfog = {
        email: {
            isRequired: {
                message: fun(textData.erEmail, "dontProdDta")
            }
        },
        password: {
            isRequired: {
                message: fun(textData.erPassword, "dontProdDta")
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/user/";

        dispath(login({ payload: data, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={fun(textData.Email, "dontProdDta")}
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label={fun(textData.Password, "dontProdDta")}
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                {fun(textData.Remain_in_the_system, "dontProdDta")}
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
