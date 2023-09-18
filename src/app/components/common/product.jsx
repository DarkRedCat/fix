import React, { useEffect, useState, useContext } from "react";
import { LangContext } from "../../App";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductsbyId, getProductsList } from "../../store/product";
import Modal from "./modal";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import history from "../../utils/history";
SwiperCore.use([Pagination, Navigation]);

const Product = ({
    clickSendButton,
    CurrentCurrency,
    ChangeCurrency,
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
    const locationName = location.pathname
        .replace("/product/", "")
        .replace("/", "");

    const data = useSelector(getProductsbyId(locationName)) || "null";
    const allData = useSelector(getProductsList(data[0].category)) || "null";

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
    const defaultData = {
        AllSize: [],
        size: "S",
        quantity: 1
    };
    const [prodData, setProdData] = useState({ [locationName]: defaultData });

    useEffect(() => {
        setProdData({ [locationName]: defaultData });
    }, [location]);

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
                        <img src={text.img} alt="" />
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
                <div className="prod_container">
                    <h1 className="prod_container_title">{lang(data.name)}</h1>
                    <div className="prod_container_body">
                        <div className="prod_container_l">
                            <div
                                style={{ height: "100px" }}
                                onClick={() => {
                                    history.push(`/product/${data._id}`);
                                }}
                            >
                                <img
                                    style={{ height: "100%" }}
                                    src={data.img[0]}
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
                            <div className="container_r_buntons">
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
                                    {lang(textData.SizeGrid, "dontProdDta")}
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
                                    {lang(
                                        textData.Taking_care_of_the_item,
                                        "dontProdDta"
                                    )}
                                </div>
                            </div>
                            <div className="container_r_size">
                                {data.size.map((r) => (
                                    <div
                                        key={r}
                                        onClick={() => {
                                            ChangeProdData(r, data._id, [
                                                "size"
                                            ]);
                                        }}
                                    >
                                        {r}
                                    </div>
                                ))}
                            </div>
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
                                className="container_r_button"
                                onClick={() => {
                                    sendForm(data);
                                }}
                            >
                                {lang(textData.button, "dontProdDta")}
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

    return (
        <div>
            {data !== "null" && allData !== "null" ? (
                <div className="prod_container">
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
                                        <img src={i} alt="1" />
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
                                    {lang(textData.SizeGrid, "dontProdDta")}
                                </div>
                                <div className="buntons_wrap">
                                    <Modal
                                        cl={"not_main"}
                                        fun={renderTable(
                                            data[0].dimension_grid
                                        )}
                                    />
                                    {lang(
                                        textData.Taking_care_of_the_item,
                                        "dontProdDta"
                                    )}
                                </div>
                            </div>
                            <div className="container_r_size">
                                {data[0].size.map((r) => (
                                    <div
                                        key={r}
                                        onClick={() => {
                                            ChangeProdData(r, data[0]._id, [
                                                "size"
                                            ]);
                                        }}
                                    >
                                        {r}
                                    </div>
                                ))}
                            </div>
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
                                <div>{prodData[data[0]._id].quantity || 1}</div>
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
                            </div>
                        </div>
                    </div>
                    <div className="prod_container_footer">
                        <h1 className="prod_container_title">
                            {lang(textData.recommend, "dontProdDta")}
                        </h1>
                        <div className="prod_container_footer">
                            <Swiper
                                dir="rtl"
                                navigation={true}
                                loop={true}
                                loopFillGroupWithBlank={true}
                                slidesPerView={4}
                                className="mySwiper swiper_container"
                            >
                                {allData.map((m) => (
                                    <SwiperSlide key={m._id}>
                                        <div
                                            className="footer_swiper"
                                            onClick={() => {
                                                setProdData((prevState) => ({
                                                    ...prevState,
                                                    [m._id]: {
                                                        ...defaultData,
                                                        ...prevState[m._id]
                                                    }
                                                }));

                                                setSmallCardData(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        one: m
                                                    })
                                                );
                                                setAct((prevState) => {
                                                    if (prevState.one == null) {
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
                                                <img src={m.img[0]} alt="" />
                                            </div>
                                            <div className="footer_swiper_name">
                                                {lang(m.name)}
                                            </div>
                                            <div className="footer_swiper_cost">
                                                {ChangeCurrency(
                                                    m.Cost,
                                                    CurrentCurrency
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            ) : (
                "load"
            )}
        </div>
    );
};
export default Product;
