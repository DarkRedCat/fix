import React, { useEffect, useState, useContext, useRef } from "react";
import {
    getCurrentUserData,
    updateUser,
    getIsLoggedIn
} from "../../store/users";
import { LangContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { CountryDropdown } from "react-country-region-selector";
import { gsap } from "gsap";
import history from "../../utils/history";
import TextField from "../form/textField";
import PhoneInput from "react-phone-number-input";
import LogOut from "../form/logOut";
import "react-phone-number-input/style.css";
const timeline = gsap.timeline({});

const Checkout = ({
    textData,
    CurrentCurrency,
    ChangeCurrency,
    black_relocation,
    propsYakor
}) => {
    const currentUser = useSelector(getCurrentUserData());
    const cart = JSON.parse(localStorage.getItem("cart"));
    const [country, setCountry] = useState("");
    const [number, setNumber] = useState();
    const langNum = useContext(LangContext);
    const tl = useRef(timeline);
    const app = useRef(null);
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
        dat: {
            ...defaultData
        }
    });
    useEffect(() => {
        setData({
            dat: {
                ...defaultData
            },
            ...currentUser
        });
        if (currentUser) {
            setNumber(currentUser.dat.tel);
            setCountry(currentUser.dat.country);
        }
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            dat: { ...prevState.dat, [target.name]: target.value }
        }));
    };
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
    // --------------------------------
    const black_relocation_close_function_first_page_launch = () => {
        const ctx = gsap.context(() => {
            tl.current

                .to(".black_relocation", {
                    duration: 0,
                    display: "block",
                    opacity: 1
                })
                .to(".black_relocation", {
                    duration: 3,

                    opacity: 0
                })
                .to(".black_relocation", {
                    duration: 0,

                    display: "none"
                });
        }, app.current);
        return () => ctx.revert();
    };
    const black_relocation_close_function = () => {
        const ctx = gsap.context(() => {
            tl.current
                .to(".black_relocation", {
                    duration: 0,
                    opacity: 0,
                    display: "none"
                })
                .to(".black_relocation", {
                    duration: 0.5,
                    display: "block",
                    opacity: 1
                })
                .to(".black_relocation", {
                    duration: 1.5,

                    opacity: 0
                })
                .to(".black_relocation", {
                    duration: 0,

                    display: "none"
                });
        }, app.current);
        return () => ctx.revert();
    };
    const [red, setRed] = useState(true);
    useEffect(() => {
        setRed((prevState) => !prevState);
    }, [location.pathname.split("/")[1]]);
    useEffect(() => {
        if (red) {
            black_relocation_close_function_first_page_launch();
        } else {
            black_relocation_close_function();
        }
    }, [black_relocation]);
    const handleSubmit = () => {};
    // --------------------------------
    return (
        <div>
            <div ref={app}>
                <div className="black_relocation"></div>
            </div>
            <div className="Checkout_container">
                <div className="Checkout_container_title">Checkout</div>
                <div className="Checkout_container_body">
                    <div className="Checkout_container_body_l">
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

                                    <div
                                        style={{
                                            width: "100%"
                                        }}
                                        className={"phoneDiv"}
                                    >
                                        <div>
                                            <label
                                                style={{
                                                    fontSize: "12px"
                                                }}
                                            >
                                                number
                                            </label>
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
                                </div>
                                <div>
                                    <div className="time">
                                        <label
                                            style={{
                                                fontSize: "12px"
                                            }}
                                        >
                                            сountry
                                        </label>
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
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    купить
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="Checkout_container_body_r">
                        <h1>Your order</h1>
                        <div>
                            <div className="Checkout_r_pocet_con">
                                <div>
                                    {" "}
                                    {Object.keys(cart2).map((i) => (
                                        <div key={i}>
                                            <div>
                                                <div className="Checkout_r_pocet_con_name">
                                                    {lang(cart2[i].name)}
                                                </div>
                                                <div>
                                                    {lang(
                                                        textData.Size,
                                                        "dontProdDta"
                                                    )}{" "}
                                                    {cart2[i].size}
                                                </div>
                                                <div>
                                                    {lang(
                                                        textData.Quantity,
                                                        "dontProdDta"
                                                    )}{" "}
                                                    {cart2[i].quantity}
                                                </div>
                                                <div className="Checkout_r_pocet_con_cost">
                                                    {" "}
                                                    {ChangeCurrency(
                                                        cart2[i].cost *
                                                            cart2[i].quantity,
                                                        CurrentCurrency
                                                    )}{" "}
                                                </div>
                                            </div>
                                            <div
                                                className="border_bottom"
                                                style={{
                                                    border: "1px solid #111113"
                                                }}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {lang(
                                        textData.Cost_of_the_items,
                                        "dontProdDta"
                                    )}{" "}
                                    {ChangeCurrency(
                                        finalCost("finalCost"),
                                        CurrentCurrency
                                    )}
                                </div>
                                <div>
                                    {" "}
                                    {lang(
                                        textData.Delivery_cost,
                                        "dontProdDta"
                                    )}{" "}
                                    {ChangeCurrency(
                                        finalCost("delivery"),
                                        CurrentCurrency
                                    )}
                                </div>
                            </div>
                            <div className="Checkout_r_pocet_con_total">
                                <div>
                                    {" "}
                                    {lang(
                                        textData.Total_due,
                                        "dontProdDta"
                                    )}{" "}
                                    {ChangeCurrency(
                                        finalCost("Total_due"),
                                        CurrentCurrency
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Checkout;
