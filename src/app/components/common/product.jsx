import React, { useEffect, useState, useContext, useRef } from "react";
import { LangContext } from "../../App";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductsbyId, getProductsList } from "../../store/product";
import Modal from "./modal";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import history from "../../utils/history";
SwiperCore.use([Pagination, Navigation]);

import { gsap } from "gsap";

const timeline = gsap.timeline({});

const Product = ({
    clickSendButton,
    CurrentCurrency,
    ChangeCurrency,
    black_relocation,
    textData
}) => {
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
    const location = useLocation();
    const [windowWidth, setWindowWidth] = React.useState(window.screen.width);
    const locationName = location.pathname
        .replace("/product/", "")
        .replace("/", "");
    const defaultData = {
        AllSize: [],
        size: "S",
        quantity: 1
    };
    const [prodData, setProdData] = useState({ [locationName]: defaultData });
    const data = useSelector(getProductsbyId(locationName)) || "null";
    const allData = useSelector(getProductsList(data[0].category)) || "null";
    const tl = useRef(timeline);
    const app = useRef(null);
    React.useEffect(() => {
        window.onresize = () => {
            setWindowWidth(window.screen.width);
        };

        return () => {
            window.onresize = false;
        };
    }, [windowWidth]);

    const [act, setAct] = useState({
        one: null,
        two: null,
        three: null
    });
    const [smallCardData, setSmallCardData] = useState({
        one: null,
        two: null,
        three: null
    });

    useEffect(() => {
        setProdData({ [locationName]: defaultData });
    }, [location]);
    const modDiv = useRef(null);
    //--------------------------
    const sendForm = (data) => {
        let prodDataUpdate = {
            ...prodData[data._id],
            AllSize: [...data.size],
            img: data.img[0],
            name: data.name,
            cost: data.Cost
        };

        if (localStorage.getItem("cart") !== undefined) {
            const cart = JSON.parse(localStorage.getItem("cart"));
            localStorage.setItem(
                "cart",
                JSON.stringify({ ...cart, [data._id]: prodDataUpdate })
            );
        } else {
            localStorage.setItem(
                "cart",
                JSON.stringify({ [data._id]: prodDataUpdate })
            );
        }
        setTimeout(() => {
            modDiv.current.childNodes[0].classList.remove("modal_active");
        }, 1000);

        clickSendButton();
    };
    const renderTable = (text) => {
        if (text !== null) {
            const rendertable = (table) => {
                return Object.keys(table).map((item) => (
                    <tr key={item}>
                        <td>{item}</td>
                        {table[item].map((i) => (
                            <td key={i}>{i}</td>
                        ))}
                    </tr>
                ));
            };

            return (
                <div className="modal_skroll">
                    <div> {lang(text.text)}</div>
                    <div className="img_m">
                        {" "}
                        <img
                            //  src={text.img}
                            src={require("../../img/pays.webp")}
                            alt=""
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>(см)</th>
                                <th>a</th>
                                <th>b</th>
                                <th>c</th>
                            </tr>
                        </thead>

                        <tbody>{rendertable(text.table)}</tbody>
                    </table>
                </div>
            );
        }
    };
    const renderText = (text) => {
        if (text !== undefined) {
            return (
                <>
                    <h3>Стандарные правила ухода</h3>

                    {text}
                </>
            );
        } else {
            return "";
        }
    };
    const renderCard = (data) => {
        if (data !== null) {
            return (
                <div className="prod_container  prod_container_mod">
                    <div></div>
                    <h1 className="prod_container_title">{lang(data.name)}</h1>
                    <div className="prod_container_body">
                        <div className="prod_container_l_mod">
                            <div
                                onClick={() => {
                                    history.push(`/product/${data._id}`);
                                }}
                            >
                                <img
                                    // src={data.img[0]}
                                    src={require("../../img/pays.webp")}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="prod_container_r">
                            <div className="container_r_cost">
                                {ChangeCurrency(data.Cost, CurrentCurrency)}
                            </div>
                            <div className="container_r_text">
                                {" "}
                                {lang(data.text)}
                            </div>
                            <div className="container_r_composition">
                                {lang(data.composition)}
                            </div>
                            <div className="container_r_buntons container_r_buntons_mod">
                                <div
                                    className="buntons_wrap"
                                    onClick={() => {
                                        setSmallCardData((prevState) => ({
                                            ...prevState,
                                            two: lang(data.Caring_for_a_thing)
                                        }));
                                        setAct((prevState) => {
                                            if (prevState.two == null) {
                                                return {
                                                    ...prevState,
                                                    two: true
                                                };
                                            }
                                            if (
                                                typeof prevState.two ==
                                                "boolean"
                                            ) {
                                                return {
                                                    ...prevState,
                                                    two: !prevState.two
                                                };
                                            }
                                        });
                                    }}
                                >
                                    <div className="modal_bun">
                                        {" "}
                                        {lang(textData.SizeGrid, "dontProdDta")}
                                    </div>
                                </div>
                                <div
                                    className="buntons_wrap"
                                    onClick={() => {
                                        setSmallCardData((prevState) => ({
                                            ...prevState,
                                            three: data.dimension_grid
                                        }));
                                        setAct((prevState) => {
                                            if (prevState.three == null) {
                                                return {
                                                    ...prevState,
                                                    three: true
                                                };
                                            }
                                            if (
                                                typeof prevState.three ==
                                                "boolean"
                                            ) {
                                                return {
                                                    ...prevState,
                                                    three: !prevState.three
                                                };
                                            }
                                        });
                                    }}
                                >
                                    <div className="modal_bun">
                                        {" "}
                                        {lang(
                                            textData.Taking_care_of_the_item,
                                            "dontProdDta"
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="container_r_size">
                                {data.size.map((r) => {
                                    if (prodData[data._id].size == r) {
                                        return (
                                            <div
                                                key={r}
                                                className="container_r_size_active"
                                                onClick={() => {
                                                    ChangeProdData(
                                                        r,
                                                        data._id,
                                                        ["size"]
                                                    );
                                                }}
                                            >
                                                <span> {r} </span>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                key={r}
                                                onClick={() => {
                                                    ChangeProdData(
                                                        r,
                                                        data._id,
                                                        ["size"]
                                                    );
                                                }}
                                            >
                                                <span> {r} </span>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            <div className="container_r_footer">
                                <div className="container_r_quantity">
                                    <div
                                        onClick={() => {
                                            ChangeProdData(
                                                prodData[data._id].quantity,
                                                data._id,
                                                ["quantity", "-"]
                                            );
                                        }}
                                    >
                                        -
                                    </div>
                                    <div>{prodData[data._id].quantity}</div>
                                    <div
                                        onClick={() => {
                                            ChangeProdData(
                                                prodData[data._id].quantity,
                                                data._id,
                                                ["quantity", "+"]
                                            );
                                        }}
                                    >
                                        +
                                    </div>
                                </div>
                                <div
                                    className="container_r_button close"
                                    onClick={() => {
                                        sendForm(data);
                                    }}
                                >
                                    {lang(textData.button, "dontProdDta")}
                                    <img
                                        className="up1 container_r_button_img"
                                        src={require("../../img/ar2.png")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };
    const ChangeProdData = (value, id, type) => {
        if (type[0] == "size") {
            setProdData((prevState) => ({
                ...prevState,
                [id]: {
                    ...prevState[id],
                    size: value
                }
            }));
        }
        if (type[0] == "quantity") {
            if (type[1] == "+") {
                setProdData((prevState) => ({
                    ...prevState,
                    [id]: {
                        ...prevState[id],
                        quantity: value + 1
                    }
                }));
            } else if (type[1] == "-") {
                setProdData((prevState) => ({
                    ...prevState,
                    [id]: {
                        ...prevState[id],
                        quantity: value > 1 ? value - 1 : value
                    }
                }));
            }
        }
    };
    const invers = (text, red) => {
        const newText = text.split(" ");

        if (red) {
            return `${newText[1]}`;
        } else {
            return `${newText[0]}`;
        }
    };
    //--------------------------
    const black_relocation_close_function_first_page_launch = () => {
        const ctx = gsap.context(() => {
            tl.current

                .to(".black_relocation", {
                    duration: 0,
                    display: "block",
                    opacity: 1,
                    function() {
                        document.body.classList.add("no_scroll_black");
                    }
                })
                .to(".black_relocation", {
                    duration: 3,

                    opacity: 0
                })
                .to(".black_relocation", {
                    duration: 0,

                    display: "none",
                    function() {
                        document.body.classList.remove("no_scroll_black");
                    }
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
                    display: "none",
                    function() {
                        document.body.classList.add("no_scroll_black");
                    }
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

                    display: "none",
                    function() {
                        document.body.classList.remove("no_scroll_black");
                    }
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

    return (
        <div>
            <div ref={app}>
                <div className="black_relocation"></div>
            </div>
            {data !== "null" && allData !== "null" ? (
                <div className="prod_container" ref={modDiv}>
                    <Modal
                        fun={renderCard(smallCardData.one)}
                        act={act.one}
                        cl={"main"}
                    />
                    <Modal fun={renderText(smallCardData.two)} act={act.two} />
                    <Modal
                        fun={renderTable(smallCardData.three)}
                        act={act.three}
                    />
                    <h1 className="prod_container_title">
                        {lang(data[0].name)}
                    </h1>
                    <div className="prod_container_body">
                        <div className="prod_container_l">
                            <Swiper
                                dir="rtl"
                                navigation={true}
                                pagination={{
                                    clickable: true
                                }}
                                loop={true}
                                loopFillGroupWithBlank={true}
                                className="mySwiper swiper_container"
                            >
                                {data[0].img.map((i) => (
                                    <SwiperSlide key={Math.random()}>
                                        <img
                                            //  src={i}
                                            src={require("../../img/pays.webp")}
                                            alt="1"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="prod_container_r">
                            <div className="container_r_cost">
                                {ChangeCurrency(data[0].Cost, CurrentCurrency)}
                            </div>
                            <div className="container_r_text">
                                {lang(data[0].text)}
                            </div>
                            <div className="container_r_composition">
                                {lang(data[0].composition)}
                            </div>
                            <div className="container_r_buntons">
                                <div className="buntons_wrap">
                                    <Modal
                                        cl={"not_main"}
                                        fun={renderText(
                                            lang(data[0].Caring_for_a_thing)
                                        )}
                                    />
                                    <div className="modal_bun">
                                        {lang(textData.SizeGrid, "dontProdDta")}
                                    </div>
                                </div>
                                <div className="buntons_wrap">
                                    <Modal
                                        cl={"not_main"}
                                        fun={renderTable(
                                            data[0].dimension_grid
                                        )}
                                    />

                                    <div className="modal_bun">
                                        {lang(
                                            textData.Taking_care_of_the_item,
                                            "dontProdDta"
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="container_r_size">
                                {data[0].size.map((r) => {
                                    if (prodData[data[0]._id].size == r) {
                                        return (
                                            <div
                                                key={r}
                                                className="container_r_size_active"
                                                onClick={() => {
                                                    ChangeProdData(
                                                        r,
                                                        data[0]._id,
                                                        ["size"]
                                                    );
                                                }}
                                            >
                                                <span> {r} </span>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                key={r}
                                                onClick={() => {
                                                    ChangeProdData(
                                                        r,
                                                        data[0]._id,
                                                        ["size"]
                                                    );
                                                }}
                                            >
                                                <span> {r} </span>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            <div className="container_r_footer">
                                <div className="container_r_quantity">
                                    <div
                                        onClick={() => {
                                            ChangeProdData(
                                                prodData[data[0]._id].quantity,
                                                data[0]._id,
                                                ["quantity", "-"]
                                            );
                                        }}
                                    >
                                        -
                                    </div>
                                    <div>
                                        {prodData[data[0]._id].quantity || 1}
                                    </div>
                                    <div
                                        onClick={() => {
                                            ChangeProdData(
                                                prodData[data[0]._id].quantity,
                                                data[0]._id,
                                                ["quantity", "+"]
                                            );
                                        }}
                                    >
                                        +
                                    </div>
                                </div>
                                <div
                                    className="container_r_button"
                                    onClick={() => {
                                        sendForm(data[0]);
                                    }}
                                >
                                    {lang(textData.button, "dontProdDta")}
                                    <img
                                        className="up1 container_r_button_img"
                                        src={require("../../img/ar2.png")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="prod_container_footer">
                        <h1 className="prod_container_title">
                            {lang(textData.recommend, "dontProdDta")}
                        </h1>
                        <div className="prod_container_footer">
                            {windowWidth > 1300 ? (
                                <Swiper
                                    dir="rtl"
                                    navigation={true}
                                    loop={true}
                                    loopFillGroupWithBlank={true}
                                    slidesPerView={
                                        allData.length > 2 && allData.length < 4
                                            ? allData.length
                                            : allData.length < 2
                                            ? 2
                                            : allData.length > 4
                                            ? 4
                                            : allData.length
                                    }
                                    className="mySwiper swiper_container"
                                >
                                    {allData.map((m) => (
                                        <SwiperSlide key={m._id}>
                                            <div
                                                className="footer_swiper"
                                                onClick={() => {
                                                    setProdData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            [m._id]: {
                                                                ...defaultData,
                                                                ...prevState[
                                                                    m._id
                                                                ]
                                                            }
                                                        })
                                                    );

                                                    setSmallCardData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            one: m
                                                        })
                                                    );
                                                    setAct((prevState) => {
                                                        if (
                                                            prevState.one ==
                                                            null
                                                        ) {
                                                            return {
                                                                ...prevState,
                                                                one: true
                                                            };
                                                        }
                                                        if (
                                                            typeof prevState.one ==
                                                            "boolean"
                                                        ) {
                                                            return {
                                                                ...prevState,
                                                                one: !prevState.one
                                                            };
                                                        }
                                                    });
                                                }}
                                            >
                                                <div className="footer_swiper_img">
                                                    <img
                                                        // src={m.img[0]}
                                                        src={require("../../img/pays.webp")}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="footer_swiper_cost_container">
                                                    <div className="footer_swiper_cost">
                                                        <div>
                                                            {`${invers(
                                                                ChangeCurrency(
                                                                    m.Cost,
                                                                    CurrentCurrency
                                                                ),
                                                                "red"
                                                            )}`}
                                                        </div>
                                                        <div>
                                                            {`${invers(
                                                                ChangeCurrency(
                                                                    m.Cost,
                                                                    CurrentCurrency
                                                                )
                                                            )}`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="footer_swiper_name">
                                                    {lang(m.name)}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : windowWidth > 900 ? (
                                <Swiper
                                    dir="rtl"
                                    navigation={true}
                                    loop={true}
                                    loopFillGroupWithBlank={true}
                                    slidesPerView={2}
                                    className="mySwiper swiper_container"
                                >
                                    {allData.map((m) => (
                                        <SwiperSlide key={m._id}>
                                            <div
                                                className="footer_swiper"
                                                onClick={() => {
                                                    setProdData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            [m._id]: {
                                                                ...defaultData,
                                                                ...prevState[
                                                                    m._id
                                                                ]
                                                            }
                                                        })
                                                    );

                                                    setSmallCardData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            one: m
                                                        })
                                                    );
                                                    setAct((prevState) => {
                                                        if (
                                                            prevState.one ==
                                                            null
                                                        ) {
                                                            return {
                                                                ...prevState,
                                                                one: true
                                                            };
                                                        }
                                                        if (
                                                            typeof prevState.one ==
                                                            "boolean"
                                                        ) {
                                                            return {
                                                                ...prevState,
                                                                one: !prevState.one
                                                            };
                                                        }
                                                    });
                                                }}
                                            >
                                                <div className="footer_swiper_img">
                                                    <img
                                                        // src={m.img[0]}
                                                        src={require("../../img/pays.webp")}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="footer_swiper_cost_container">
                                                    <div className="footer_swiper_cost">
                                                        <div>
                                                            {`${invers(
                                                                ChangeCurrency(
                                                                    m.Cost,
                                                                    CurrentCurrency
                                                                ),
                                                                "red"
                                                            )}`}
                                                        </div>
                                                        <div>
                                                            {`${invers(
                                                                ChangeCurrency(
                                                                    m.Cost,
                                                                    CurrentCurrency
                                                                )
                                                            )}`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="footer_swiper_name">
                                                    {lang(m.name)}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : windowWidth > 400 ? (
                                <Swiper
                                    dir="rtl"
                                    navigation={true}
                                    loop={true}
                                    loopFillGroupWithBlank={true}
                                    slidesPerView={1}
                                    className="mySwiper swiper_container"
                                >
                                    {allData.map((m) => (
                                        <SwiperSlide key={m._id}>
                                            <div
                                                className="footer_swiper"
                                                onClick={() => {
                                                    setProdData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            [m._id]: {
                                                                ...defaultData,
                                                                ...prevState[
                                                                    m._id
                                                                ]
                                                            }
                                                        })
                                                    );

                                                    setSmallCardData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            one: m
                                                        })
                                                    );
                                                    setAct((prevState) => {
                                                        if (
                                                            prevState.one ==
                                                            null
                                                        ) {
                                                            return {
                                                                ...prevState,
                                                                one: true
                                                            };
                                                        }
                                                        if (
                                                            typeof prevState.one ==
                                                            "boolean"
                                                        ) {
                                                            return {
                                                                ...prevState,
                                                                one: !prevState.one
                                                            };
                                                        }
                                                    });
                                                }}
                                            >
                                                <div className="footer_swiper_img">
                                                    <img
                                                        // src={m.img[0]}
                                                        src={require("../../img/pays.webp")}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="footer_swiper_cost_container">
                                                    <div className="footer_swiper_cost">
                                                        <div>
                                                            {`${invers(
                                                                ChangeCurrency(
                                                                    m.Cost,
                                                                    CurrentCurrency
                                                                ),
                                                                "red"
                                                            )}`}
                                                        </div>
                                                        <div>
                                                            {`${invers(
                                                                ChangeCurrency(
                                                                    m.Cost,
                                                                    CurrentCurrency
                                                                )
                                                            )}`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="footer_swiper_name">
                                                    {lang(m.name)}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <Swiper
                                    dir="rtl"
                                    navigation={true}
                                    loop={true}
                                    loopFillGroupWithBlank={true}
                                    slidesPerView={1}
                                    className="mySwiper swiper_container"
                                >
                                    {allData.map((m) => (
                                        <SwiperSlide key={m._id}>
                                            <div
                                                className="footer_swiper"
                                                onClick={() => {
                                                    setProdData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            [m._id]: {
                                                                ...defaultData,
                                                                ...prevState[
                                                                    m._id
                                                                ]
                                                            }
                                                        })
                                                    );

                                                    setSmallCardData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            one: m
                                                        })
                                                    );
                                                    setAct((prevState) => {
                                                        if (
                                                            prevState.one ==
                                                            null
                                                        ) {
                                                            return {
                                                                ...prevState,
                                                                one: true
                                                            };
                                                        }
                                                        if (
                                                            typeof prevState.one ==
                                                            "boolean"
                                                        ) {
                                                            return {
                                                                ...prevState,
                                                                one: !prevState.one
                                                            };
                                                        }
                                                    });
                                                }}
                                            >
                                                <div className="footer_swiper_img">
                                                    <img
                                                        // src={m.img[0]}
                                                        src={require("../../img/pays.webp")}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="footer_swiper_cost_container">
                                                    <div className="footer_swiper_cost">
                                                        <div>
                                                            {`${invers(
                                                                ChangeCurrency(
                                                                    m.Cost,
                                                                    CurrentCurrency
                                                                ),
                                                                "red"
                                                            )}`}
                                                        </div>
                                                        <div>
                                                            {`${invers(
                                                                ChangeCurrency(
                                                                    m.Cost,
                                                                    CurrentCurrency
                                                                )
                                                            )}`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="footer_swiper_name">
                                                    {lang(m.name)}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
export default Product;
