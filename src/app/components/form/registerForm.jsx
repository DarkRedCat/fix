import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "./textField";

import CheckBoxField from "./checkBoxField";
import { useDispatch } from "react-redux";

import { signUp } from "../../store/users";

const RegisterForm = ({ Textdata, fun }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        licence: false
    });

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
                message: fun(Textdata.erEmail, "dontProdDta")
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        password: {
            isRequired: {
                message: fun(Textdata.Email_is_introduced, "dontProdDta")
            },
            isCapitalSymbol: {
                message: fun(Textdata.least_one_capital_letter, "dontProdDta")
            },
            isContainDigit: {
                message: fun(Textdata.least_one_number, "dontProdDta")
            },
            min: {
                message: fun(Textdata.minim_of_8_characters, "dontProdDta"),
                value: 8
            }
        },

        licence: {
            isRequired: {
                message: fun(Textdata.You_cannot_use, "dontProdDta")
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
        const newData = {
            ...data
        };

        dispatch(signUp(newData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />

            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                <a>лицензионное соглашение</a>
            </CheckBoxField>
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

export default RegisterForm;
