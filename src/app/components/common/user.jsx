import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../utils/history";
import TextField from "../form/textField";
// import confing from "../../../../../server/config/default.json";
import {
    getCurrentUserData,
    updateUser,
    getIsLoggedIn
} from "../../store/users";
import { CountryDropdown } from "react-country-region-selector";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import LogOut from "../form/logOut";

const User = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    const [rend, setRend] = useState(false);

    const defaultData = {
        name: "",
        surname: "",
        city: "",
        regionCountyState: "",
        streetHouseApartment: "",
        postcode: ""
    };
    const [data, setData] = useState({
        ...currentUser,
        dat: { ...defaultData }
    });
    const [country, setCountry] = useState("");
    const [number, setNumber] = useState();
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            dat: { ...prevState.dat, [target.name]: target.value }
        }));
    };
    useEffect(() => {
        setData({
            ...currentUser
        });
        setNumber(currentUser.dat.tel);
        setCountry(currentUser.dat.country);
        setRend(false);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            updateUser({
                ...currentUser,
                dat: { ...data.dat, tel: number, country: country }
            })
        );
    };

    if (isLoggedIn) {
        return (
            <div>
                <div
                    onClick={() => {
                        setRend((prevStete) => !prevStete);
                    }}
                >
                    {currentUser.email == "kabbyy2@mail.com" && "admiin"}
                    {rend ? <LogOut /> : "log out"}
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.dat.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Фамилия"
                            name="surname"
                            value={data.dat.surname}
                            onChange={handleChange}
                        />

                        <div style={{ width: "180px" }}>
                            <PhoneInput
                                // labels={ru}
                                label="телефон"
                                name="tel"
                                value={number}
                                onChange={setNumber}
                                international
                                defaultCountry="RU"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="time" style={{ width: "180px" }}>
                            <CountryDropdown
                                label="Страна"
                                name="сountry"
                                value={country}
                                onChange={(val) => {
                                    setCountry(val);
                                }}
                            />
                        </div>
                        <TextField
                            label="Город"
                            name="city"
                            value={data.dat.city}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Край/Область/Регион"
                            name="regionCountyState"
                            value={data.dat.regionCountyState}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Улица, Дом, Квартира"
                            name="streetHouseApartment"
                            value={data.dat.streetHouseApartment}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Почтовый индекс"
                            name="postcode"
                            value={data.dat.postcode}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mx-auto"
                    >
                        Обновить
                    </button>
                </form>
            </div>
        );
    } else {
        history.push(`/`);
        return "load";
    }
};
export default User;
