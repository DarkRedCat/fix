import React, { useEffect, useState, Component, useContext } from "react";
import { LangContext } from "../../App";
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

const Checkout = ({ textData, CurrentCurrency, ChangeCurrency }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    const cart = JSON.parse(localStorage.getItem("cart"));
    const [cart2, setCart2] = useState(
        localStorage.getItem("cart") != null
            ? JSON.parse(localStorage.getItem("cart"))
            : []
    );
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
    }, []);
    const handleSubmit = () => {
        console.log(1);
    };
    const langNum = useContext(LangContext);
    const lang = (data, dontProdDta) => {
        if (dontProdDta == "dontProdDta") {
            return data[langNum];
        } else {
            if (data !== null) {
                return data.replace("['", "").replace("']", "").split("', '")[
                    langNum
                ];
            } else {
                return "";
            }
        }
    };
    const finalCost = (i) => {
        let finalCost = 0;
        let delivery = 0;

        Object.keys(cart2).map((i) => {
            finalCost += cart2[i].cost * cart2[i].quantity;
        });
        (delivery = (finalCost / 2 / 100) * 10).toFixed(2);

        if (i == "delivery") {
            return delivery;
        }
        if (i == "finalCost") {
            return finalCost.toFixed(2);
        }
        if (i == "Total_due") {
            return (delivery + finalCost).toFixed(2);
        }
    };

    if (isLoggedIn) {
        return (
            <div>
                {Object.keys(cart2).map((i) => (
                    <div key={i}>
                        <div>{lang(cart2[i].name)}</div>
                        <div>
                            {lang(textData.Size, "dontProdDta")} {cart2[i].size}
                        </div>
                        <div>
                            {lang(textData.Quantity, "dontProdDta")}{" "}
                            {cart2[i].quantity}
                        </div>
                        <div>
                            {" "}
                            {ChangeCurrency(
                                cart2[i].cost * cart2[i].quantity,
                                CurrentCurrency
                            )}{" "}
                        </div>
                    </div>
                ))}
                <div>
                    {lang(textData.Cost_of_the_items, "dontProdDta")}
                    {ChangeCurrency(finalCost("finalCost"), CurrentCurrency)}
                </div>
                <div>
                    {" "}
                    {lang(textData.Delivery_cost, "dontProdDta")}{" "}
                    {ChangeCurrency(finalCost("delivery"), CurrentCurrency)}
                </div>
                <div>
                    {" "}
                    {lang(textData.Total_due, "dontProdDta")}{" "}
                    {ChangeCurrency(finalCost("Total_due"), CurrentCurrency)}
                </div>
                <div>
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
                            купить
                        </button>
                    </form>
                </div>
                ;
            </div>
        );
    } else {
        history.push(`/`);
        return "load";
    }
};
export default Checkout;
