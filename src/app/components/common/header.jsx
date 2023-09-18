import React, { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../App";
import Cat from "./catigories";
import pick from "lodash/pick";

import Login from "../form/login";
import Modal from "./modal";
import { gsap } from "gsap";
import Register from "../form/register";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import { getProductsbyId } from "../../store/product";

import { LangContext } from "../../App";

import history from "../../utils/history";

const timeline = gsap.timeline({});
const timeline2 = gsap.timeline({});

const Header = ({
    category,
    changeSendButton,
    CurrentCurrency,
    ChangeCurrentCurrency,
    currency,
    ChangeCurrency,
    ChangeCurrentLang,
    textData
}) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
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

    /*------------------ */
    const end1 = useRef(null);
    const end2 = useRef(null);
    const ed = useRef(null);
    const pocet = useRef(null);
    const red = useContext(UserContext);
    const tl = useRef(timeline);
    const t2 = useRef(timeline2);

    const animate = (act) => {
        if (act !== undefined) {
            const ctx = gsap.context(() => {
                tl.current.to(".pocet-one", {
                    duration: 1,
                    ease: "power3.out",

                    right: 0
                });
            }, pocet.current);
            return () => ctx.revert();
        } else {
            const ctx = gsap.context(() => {
                tl.current.to(".pocet-one", {
                    duration: 1,
                    ease: "power3.out",

                    right: "-300px"
                });
            }, pocet.current);
            return () => ctx.revert();
        }
    };
    const animate2 = (act) => {
        if (act !== undefined) {
            const ctx = gsap.context(() => {
                t2.current.to(".pocet-two", {
                    duration: 1,
                    opacity: 1
                });
            }, pocet.current);
            return () => ctx.revert();
        } else {
            const ctx = gsap.context(() => {
                t2.current.to(".pocet-two", {
                    duration: 1,
                    opacity: 0
                });
            }, pocet.current);
            return () => ctx.revert();
        }
    };
    const closePoc = () => {
        animate();
        animate2();
        setTimeout(() => {
            document.body.classList.remove("no_scroll");
            pocet.current.classList.remove("pocet-active");
        }, 1000);
    };
    if (red !== null && end1.current !== null && end2.current !== null) {
        if (
            end2.current.parentElement.offsetParent !== red.parentElement ||
            end2.current.parentElement.offsetParent !== red.parentElement
        ) {
            end1.current.classList.remove("box-right_li_end_active");
            end2.current.classList.remove("box-right_li_end_active");
        }
    }
    const no_scroll = () => {
        document.body.classList.toggle("no_scroll");
        pocet.current.classList.toggle("pocet-active");
        animate(pocet);
        animate2(pocet);
    };
    const renderLogin = (i) => {
        if (i == "login") {
            return (
                <>
                    <Login data={textData} fun={lang} />

                    <div
                        className="buntons_wrap"
                        onClick={() => {
                            setAct((prevState) => {
                                if (prevState.one == null) {
                                    return {
                                        ...prevState,
                                        one: true
                                    };
                                }
                                if (typeof prevState.one == "boolean") {
                                    return {
                                        ...prevState,

                                        one: !prevState.one
                                    };
                                }
                            });
                        }}
                    >
                        {lang(textData.Or_registration, "dontProdDta")}
                    </div>
                </>
            );
        } else {
            return <Register data={textData} fun={lang} />;
        }
    };

    const [act, setAct] = useState({
        one: null,
        two: null,
        free: null,
        four: null,
        five: null
    });
    const [smallCardData, setSmallCardData] = useState({
        one: null,
        two: null,
        three: null
    });

    const ff = useRef(null);
    const hieDiv = () => {
        if (ff.current.firstChild.lastChild !== null) {
            document.querySelector(".modal_cont_log").childNodes[1].style.top =
                ed.current.getBoundingClientRect().top + 50 + "px";
        }
    };

    const cart = JSON.parse(localStorage.getItem("cart"));
    const [cart2, setCart2] = useState(
        localStorage.getItem("cart") != null
            ? JSON.parse(localStorage.getItem("cart"))
            : []
    );

    useEffect(() => {
        if (changeSendButton !== null) {
            no_scroll();
            setCart2({ ...JSON.parse(localStorage.getItem("cart")) });
        }
    }, [changeSendButton]);
    const ChangeProdData = (value, id, type) => {
        if (type[0] == "size") {
            setCart2((prevState) => ({
                ...prevState,
                [id]: {
                    ...prevState[id],
                    size: value
                }
            }));
        }
        if (type[0] == "quantity") {
            if (type[1] == "+") {
                setCart2((prevState) => ({
                    ...prevState,
                    [id]: {
                        ...prevState[id],
                        quantity: value + 1
                    }
                }));
            } else if (type[1] == "-") {
                setCart2((prevState) => ({
                    ...prevState,
                    [id]: {
                        ...prevState[id],
                        quantity: value > 1 ? value - 1 : value
                    }
                }));
            }
        }
    };
    const Finalcost = () => {
        let Finalcost = 0;
        Object.keys(cart2).map(
            (i) => (Finalcost += cart2[i].cost * cart2[i].quantity)
        );

        return ChangeCurrency(Finalcost, CurrentCurrency);
    };
    const renderPoketCard = (data, id) => {
        return (
            <div className="pocet_container">
                <div className="pocet_container_img">
                    <div
                        style={{ height: "100px" }}
                        onClick={() => {
                            setSmallCardData((prevState) => ({
                                ...prevState,
                                one: id
                            }));
                            setAct((prevState) => {
                                if (prevState.free == null) {
                                    return {
                                        ...prevState,
                                        free: true
                                    };
                                }
                                if (typeof prevState.free == "boolean") {
                                    return {
                                        ...prevState,
                                        free: !prevState.free
                                    };
                                }
                            });
                        }}
                    >
                        <img style={{ height: "100%" }} src={data.img} alt="" />
                    </div>
                </div>
                <div className="pocet_container_r">
                    <div
                        className="pocet_container_r_del"
                        onClick={() => {
                            const k = Object.keys(cart2).filter(
                                (i) => i !== id
                            );
                            setCart2(pick(cart2, k));
                            localStorage.setItem(
                                "cart",
                                JSON.stringify(pick(cart2, k))
                            );
                        }}
                    >
                        del
                    </div>
                    <div className="pocet_container_r_name">
                        {" "}
                        {lang(data.name)}
                    </div>
                    <div className="pocet_container_r_size">
                        {data.AllSize.map((r) => (
                            <div
                                key={r}
                                onClick={() => {
                                    ChangeProdData(r, id, ["size"]);
                                }}
                            >
                                {r}
                            </div>
                        ))}
                    </div>
                    <div className="pocet_container_r_quantity">
                        <div
                            onClick={() => {
                                ChangeProdData(cart2[id].quantity, id, [
                                    "quantity",
                                    "-"
                                ]);
                            }}
                        >
                            -
                        </div>
                        <div>{cart2[id].quantity}</div>
                        <div
                            onClick={() => {
                                ChangeProdData(cart2[id].quantity, id, [
                                    "quantity",
                                    "+"
                                ]);
                            }}
                        >
                            +
                        </div>
                    </div>

                    <div className="pocet_container_r_cost">
                        {ChangeCurrency(
                            data.cost * cart2[id].quantity,
                            CurrentCurrency
                        )}
                    </div>
                </div>
            </div>
        );
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
                    <div>{lang(text.text)}</div>
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
                    <h3> {lang(textData.mod_one, "dontProdDta")}</h3>

                    {lang(text)}
                </>
            );
        } else {
            return "";
        }
    };
    const renderCard = (id) => {
        const data0 = useSelector(getProductsbyId(id)) || "null";
        const data = data0[0];

        if (id !== "null" && id !== null) {
            return (
                <div className="prod_container">
                    <h1 className="prod_container_title"> {lang(data.name)}</h1>
                    <div className="prod_container_body">
                        <div className="prod_container_l">
                            <div
                                className="close"
                                style={{ height: "100px" }}
                                onDoubleClick={() => {
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
                                {" "}
                                {ChangeCurrency(data.Cost, CurrentCurrency)}
                            </div>
                            <div className="container_r_text">
                                {lang(data.text)}{" "}
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
                                            two: data.Caring_for_a_thing
                                        }));
                                        setAct((prevState) => {
                                            if (prevState.five == null) {
                                                return {
                                                    ...prevState,
                                                    five: true
                                                };
                                            }
                                            if (
                                                typeof prevState.five ==
                                                "boolean"
                                            ) {
                                                return {
                                                    ...prevState,
                                                    five: !prevState.five
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
                                            if (prevState.four == null) {
                                                return {
                                                    ...prevState,
                                                    four: true
                                                };
                                            }
                                            if (
                                                typeof prevState.four ==
                                                "boolean"
                                            ) {
                                                return {
                                                    ...prevState,
                                                    four: !prevState.four
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
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="main_page__header">
            <Modal
                fun={renderCard(smallCardData.one)}
                act={act.free}
                cl={"main"}
            />
            <Modal fun={renderText(smallCardData.two)} act={act.five} />
            <Modal fun={renderTable(smallCardData.three)} act={act.four} />

            <div ref={ff}>
                <Modal
                    fun={renderLogin("login")}
                    act={act.two}
                    className1={"modal_cont_log"}
                />
            </div>
            <div ref={ff}>
                <Modal fun={renderLogin()} act={act.one} />
            </div>

            <div className="pocet" ref={pocet}>
                <div className="pocet-one">
                    <div
                        className="pocet_head"
                        onClick={() => {
                            closePoc();
                        }}
                    >
                        <div></div>
                        <div>
                            {" "}
                            {lang(textData.Continue_shopping, "dontProdDta")}
                        </div>
                    </div>
                    <div className="pocet_body">
                        <div className="pocet_body_title">
                            <h2>
                                {lang(textData.My_purchases, "dontProdDta")}
                            </h2>
                        </div>
                        <div>
                            {localStorage.getItem("cart") !== null &&
                            Object.keys(cart2).length !== 0
                                ? Object.keys(cart2).map((key) => (
                                      <div key={key}>
                                          {renderPoketCard(cart[key], key)}
                                      </div>
                                  ))
                                : ""}
                        </div>
                    </div>
                    <div className="pocet_button_block">
                        <div className="block_cod">
                            <span>
                                {lang(textData.Promocode, "dontProdDta")}
                            </span>
                            <input type="text" />
                            <button>
                                {lang(textData.Apply, "dontProdDta")}
                            </button>
                        </div>
                        <div className="block_line"></div>
                        <div className="block_size">
                            <div>{lang(textData.TotalDue, "dontProdDta")}</div>
                            <div>{Finalcost()}</div>
                        </div>
                        <div className="block_button">
                            <div onClick={() => console.log(cart2)}>
                                {lang(textData.CheckOut, "dontProdDta")}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="pocet-two"
                    onClick={() => {
                        closePoc();
                    }}
                ></div>
            </div>

            <div className="header_container">
                <div className="header_container__section_1">
                    <span></span>
                    <div className="header_container__section_1_center-box"></div>
                </div>
                <div className="header_container__section_2">
                    <Cat
                        category={category}
                        head={true}
                        textData={textData}
                        lang={lang}
                    />
                </div>
                <div className="header_container__section_3">
                    <div className="header_container__section_3-box-right">
                        <div className="section_3-box-right">
                            <div className="box-right_ul">
                                <div
                                    className="box-right_li"
                                    onClick={() => {
                                        end1.current.classList.toggle(
                                            "box-right_li_end_active"
                                        );
                                        end2.current.classList.remove(
                                            "box-right_li_end_active"
                                        );
                                    }}
                                >
                                    {CurrentCurrency}
                                    <div
                                        ref={end1}
                                        className="box-right_li_end_1"
                                    >
                                        {currency !== undefined &&
                                            currency !== null &&
                                            Object.keys(currency).map((i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        ChangeCurrentCurrency(
                                                            i
                                                        );
                                                    }}
                                                >
                                                    {i}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div
                                    className="box-right_li"
                                    onClick={() => {
                                        end2.current.classList.toggle(
                                            "box-right_li_end_active"
                                        );
                                        end1.current.classList.remove(
                                            "box-right_li_end_active"
                                        );
                                    }}
                                >
                                    {["RUS", "UKR", "ENG"][langNum]}
                                    <div
                                        ref={end2}
                                        className="box-right_li_end_2"
                                    >
                                        {["RUS", "UKR", "ENG"].map((i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    ChangeCurrentLang(i);
                                                }}
                                            >
                                                {i}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="box-right_li " ref={ed}>
                                    <div
                                        className="buntons_wrap"
                                        onClick={() => {
                                            if (!isLoggedIn) {
                                                hieDiv();
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
                                            } else {
                                                history.push(`/user/`);
                                            }
                                        }}
                                    >
                                        <img
                                            src={require("../../../img/user.png")}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="box-right_li"
                                    onClick={() => {
                                        no_scroll();
                                    }}
                                >
                                    <img
                                        src={require("../../../img/bas.png")}
                                    />
                                    {Finalcost() == 0.0 ? "" : Finalcost()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
