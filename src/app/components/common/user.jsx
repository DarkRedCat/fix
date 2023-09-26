import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../utils/history";
import TextField from "../form/textField";
import {
    getCurrentUserData,
    updateUser,
    getIsLoggedIn
} from "../../store/users";
import { CountryDropdown } from "react-country-region-selector";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import LogOut from "../form/logOut";
import history1 from "../../utils/history";

import { gsap } from "gsap";

const timeline = gsap.timeline({});

const User = ({ black_relocation }) => {
    const currentUser = useSelector(getCurrentUserData());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const [rend, setRend] = useState(false);
    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [number, setNumber] = useState();
    const tl = useRef(timeline);
    const app = useRef(null);
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
    useEffect(() => {
        setData({
            ...currentUser
        });
        setNumber(currentUser.dat.tel);
        setCountry(currentUser.dat.country);
        setRend(false);
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            dat: { ...prevState.dat, [target.name]: target.value }
        }));
    };

    const [vizible_input, setVizible_input] = useState({
        up: true,
        down: true
    });
    const modification_user_data = (i) => {
        setVizible_input((prevState) => ({
            ...prevState,
            [i]: !prevState[i]
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setVizible_input((prevState) => ({
            up: true,
            down: true
        }));
        dispatch(
            updateUser({
                ...currentUser,
                dat: { ...data.dat, tel: number, country: country }
            })
        );
    };

    //--------------------
    const [red, setRed] = useState(true);
    const black_relocation_close_function_first_page_launch = () => {
        const ctx = gsap.context(() => {
            tl.current

                .to(".black_relocation", {
                    duration: 0,
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
    useEffect(() => {
        setRed((prevState) => !prevState);
    }, [history1]);
    useEffect(() => {
        if (red) {
            black_relocation_close_function_first_page_launch();
        } else {
            black_relocation_close_function();
        }
    }, [black_relocation]);
    if (isLoggedIn) {
        return (
            <div style={{ position: "relative" }}>
                <div ref={app}>
                    <div className="black_relocation"></div>
                </div>
                <div className="userContainer">
                    <div className="userContainer__title">
                        <h1>My profile</h1>
                    </div>
                    <div className="userContainer_box">
                        <div className="userContainer_box_l">
                            <div>
                                <div> Personal data</div>
                                <div>- My orders</div>
                            </div>
                            <div
                                onClick={() => {
                                    setRend((prevStete) => !prevStete);
                                }}
                            >
                                {rend ? <LogOut /> : "log out"}
                            </div>
                        </div>
                        <div className="userContainer_box_r">
                            <div>
                                <div>
                                    <h3
                                        style={{
                                            display: "inline-block",
                                            margin: " 10px"
                                        }}
                                    >
                                        Personal data
                                    </h3>
                                    <h5
                                        style={{ display: "inline-block" }}
                                        onClick={() =>
                                            modification_user_data("up")
                                        }
                                    >
                                        Change
                                    </h5>
                                </div>
                                <div className="userContainer_box_r_up">
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            {vizible_input.up ? (
                                                <>
                                                    <div className="mb-4">
                                                        <label>Имя</label>
                                                        <div className="refss">
                                                            {data.dat.name}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label>Фамилия</label>
                                                        <div className="refss">
                                                            {data.dat.surname}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 mb-2">
                                                        <label>number</label>
                                                        <div className="refss2 ">
                                                            {number}
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
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
                                                                    fontSize:
                                                                        "12px"
                                                                }}
                                                            >
                                                                number
                                                            </label>
                                                            <PhoneInput
                                                                // labels={ru}
                                                                label="телефон"
                                                                name="tel"
                                                                value={number}
                                                                onChange={
                                                                    setNumber
                                                                }
                                                                international
                                                                defaultCountry="RU"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary w-100 mx-auto"
                                                    >
                                                        Обновить
                                                    </button>
                                                </>
                                            )}
                                        </form>
                                    </div>
                                </div>
                                <div>
                                    <h3
                                        style={{
                                            display: "inline-block",
                                            marginTop: "50px",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        Delivery address
                                    </h3>
                                    <h5
                                        style={{ display: "inline-block" }}
                                        onClick={() =>
                                            modification_user_data("down")
                                        }
                                    >
                                        Change
                                    </h5>
                                </div>
                                <div className="userContainer_box_r_down">
                                    <form onSubmit={handleSubmit}>
                                        {vizible_input.down ? (
                                            <>
                                                <div className="mb-4">
                                                    <label>country</label>
                                                    <div className="refss">
                                                        {country}
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label>Город</label>
                                                    <div className="refss">
                                                        {data.dat.city}
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label>
                                                        Край/Область/Регион
                                                    </label>
                                                    <div className="refss">
                                                        {
                                                            data.dat
                                                                .regionCountyState
                                                        }
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label>
                                                        Улица, Дом, Квартира
                                                    </label>
                                                    <div className="refss">
                                                        {
                                                            data.dat
                                                                .streetHouseApartment
                                                        }
                                                    </div>
                                                </div>
                                                <div className="mb-4 ">
                                                    <label>postcode</label>
                                                    <div className="refss refss3">
                                                        {data.dat.postcode}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
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
                                                    value={
                                                        data.dat
                                                            .regionCountyState
                                                    }
                                                    onChange={handleChange}
                                                />
                                                <TextField
                                                    label="Улица, Дом, Квартира"
                                                    name="streetHouseApartment"
                                                    value={
                                                        data.dat
                                                            .streetHouseApartment
                                                    }
                                                    onChange={handleChange}
                                                />
                                                <TextField
                                                    label="Почтовый индекс"
                                                    name="postcode"
                                                    value={data.dat.postcode}
                                                    onChange={handleChange}
                                                />
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100 mx-auto"
                                                >
                                                    Обновить
                                                </button>
                                            </>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        history.push(`/`);
        return "";
    }
};

export default User;
