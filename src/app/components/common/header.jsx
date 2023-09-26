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
    black_relocation_change,
    black_relocation,
    propsYakor,
    close_pocetCat,
    setClose_pocetCat_change,
    textData
}) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const langNum = useContext(LangContext);
    /*------------------ */
    const [windowWidth, setWindowWidth] = React.useState(window.screen.width);
    React.useEffect(() => {
        window.onresize = () => {
            setWindowWidth(window.screen.width);
        };

        return () => {
            window.onresize = false;
        };
    }, [windowWidth]);
    /*------------------ */

    const ed = useRef(null);
    const ff = useRef(null);
    const end1 = useRef(null);
    const end2 = useRef(null);
    const pocet = useRef(null);
    const pocetCat = useRef(null);
    const tl = useRef(timeline);
    const t2 = useRef(timeline2);
    const box_right_ul = useRef(null);
    const red = useContext(UserContext);

    const cart = JSON.parse(localStorage.getItem("cart"));

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
    const [cart2, setCart2] = useState(
        localStorage.getItem("cart") != null
            ? JSON.parse(localStorage.getItem("cart"))
            : []
    );

    useEffect(() => {
        document.body.classList.remove("no_scroll");
    }, []);
    useEffect(() => {
        OpenClosePocet(pocet, "cl");
        OpenClosePocet(pocetCat, "cl");
    }, [close_pocetCat]);
    useEffect(() => {
        if (changeSendButton !== null) {
            OpenClosePocet(pocet, "cl");
            OpenClosePocet(pocetCat, "cl");
            setCart2({ ...JSON.parse(localStorage.getItem("cart")) });
        }
    }, [changeSendButton]);

    //---------------------
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
    const hieDiv = () => {
        if (ff.current.firstChild.lastChild !== null) {
            document.querySelector(".modal_cont_log").childNodes[1].style.top =
                ed.current.getBoundingClientRect().top + 50 + "px";
        }
    };
    const OpenClosePocet = (app, cl) => {
        if (cl !== "cl") {
            const ctx = gsap.context(() => {
                t2.current.to(".pocet-two", {
                    function() {
                        document.body.classList.add("no_scroll");
                    },
                    duration: 0,
                    display: "block"
                });
                tl.current.to(".pocet-one", {
                    right: 0
                });
                t2.current.to(".pocet-two", {
                    opacity: 1
                });
            }, app.current);
            return () => ctx.revert();
        } else {
            const ctx = gsap.context(() => {
                tl.current.to(".pocet-one", {
                    duration: 0.6,
                    right: "-300px"
                });
                t2.current.to(".pocet-two", {
                    opacity: 0
                });
                t2.current.to(".pocet-two", {
                    duration: 0,
                    display: "none",
                    function() {
                        document.body.classList.remove("no_scroll");
                    }
                });
            }, app.current);
            return () => ctx.revert();
        }
    };
    const drop_down_menu_function = (el, app, act, time) => {
        const elClass = `.${el.current.classList[0]}`;

        if (act !== undefined) {
            const ctx = gsap.context(() => {
                time.current
                    .to(elClass, {
                        duration: 0,
                        display: "block"
                    })
                    .to(elClass, {
                        duration: 0.5,
                        opacity: 1
                    });
            }, app.current);
            return () => ctx.revert();
        } else {
            const ctx = gsap.context(() => {
                time.current
                    .to(elClass, {
                        duration: 0.5,

                        opacity: 0
                    })
                    .to(elClass, {
                        duration: 0,
                        display: "none",
                        onComplete: function () {
                            if (el.current) {
                                el.current.classList.remove("active");
                            }
                        }
                    });
            }, app.current);
            return () => ctx.revert();
        }
    };
    const renderLogin = (i) => {
        if (i == "login") {
            return (
                <>
                    <Login data={textData} fun={lang} />
                    <div style={{ color: "#dedede", margin: "10px" }}>-or-</div>
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
                        <div>
                            {" "}
                            {/* {lang(textData.Or_registration, "dontProdDta")} */}
                            Quick sign up
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <Register data={textData} fun={lang} />
                    <div style={{ color: "#dedede", marginBottom: "10px" }}>
                        -or-
                    </div>
                    <div
                        className="buntons_wrap"
                        onClick={() => {
                            setAct((prevState) => {
                                if (prevState.two == null) {
                                    return {
                                        ...prevState,
                                        two: true
                                    };
                                }
                                if (typeof prevState.two == "boolean") {
                                    return {
                                        ...prevState,

                                        two: !prevState.two
                                    };
                                }
                            });
                        }}
                    >
                        Quick sign in
                    </div>
                </>
            );
        }
    };
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
                <div>
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
                        +
                    </div>
                    <div className="pocet_container_img">
                        <div
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
                            <img
                                style={{ height: "100px" }}
                                // src={data.img}
                                src={require("../../img/pays.webp")}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="pocet_container_r">
                        <div className="pocet_container_r_name">
                            {" "}
                            {lang(data.name)}
                        </div>
                        <div className="pocet_container_r_size">
                            <div>Size:</div>

                            <div>
                                {data.AllSize.map((r) => {
                                    if (cart2[id].size == r) {
                                        return (
                                            <div
                                                key={r}
                                                onClick={() => {
                                                    ChangeProdData(r, id, [
                                                        "size"
                                                    ]);
                                                }}
                                            >
                                                <div className="r">{r}</div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                key={r}
                                                onClick={() => {
                                                    ChangeProdData(r, id, [
                                                        "size"
                                                    ]);
                                                }}
                                            >
                                                {r}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        <div className="pocet_container_r_quantity">
                            <div>Quantity:</div>
                            <div>
                                <div>{cart2[id].quantity}</div>
                                <div style={{ margin: "0 10px " }}>|</div>
                                <div
                                    onClick={() => {
                                        ChangeProdData(cart2[id].quantity, id, [
                                            "quantity",
                                            "+"
                                        ]);
                                    }}
                                >
                                    +
                                </div>{" "}
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
                            </div>
                        </div>

                        <div className="pocet_container_r_cost">
                            {ChangeCurrency(
                                (data.cost * cart2[id].quantity).toFixed(2),
                                CurrentCurrency
                            )}
                        </div>
                    </div>
                </div>
                <div></div>
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
                <div className="prod_container  prod_container_mod">
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
                                    <div className="modal_bun">
                                        {" "}
                                        {lang(
                                            textData.Taking_care_of_the_item,
                                            "dontProdDta"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    //---------------------
    if (red !== null && pocetCat.current !== null) {
        if (red.offsetParent == pocetCat.current.childNodes[0]) {
            OpenClosePocet(pocetCat, "cl");
        }
    }
    if (red !== null && end1.current !== null && end2.current !== null) {
        if (
            end2.current.parentElement.offsetParent !== red.parentElement ||
            end2.current.parentElement.offsetParent !== red.parentElement
        ) {
            if (end2.current !== red.parentElement) {
                drop_down_menu_function(end2, box_right_ul, undefined, t2);
            }
            if (end1.current !== red.parentElement) {
                drop_down_menu_function(end1, box_right_ul, undefined, tl);
            }
        }
    }

    return (
        <div
            className="main_page__header"
            style={{
                zIndex: 101,

                width: "100%"
            }}
        >
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
                <Modal
                    fun={renderLogin()}
                    act={act.one}
                    className1={"modal_cont_log2"}
                />
            </div>
            <div className="pocet" ref={pocet}>
                <div className="pocet-one">
                    <div
                        className="pocet_head"
                        onClick={() => {
                            OpenClosePocet(pocet, "cl");
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
                            <div
                                onClick={() => {
                                    setTimeout(() => {
                                        if (
                                            history.location.pathname.split(
                                                "/"
                                            )[1] !== "checkout"
                                        ) {
                                            OpenClosePocet(pocet, "cl");
                                            OpenClosePocet(pocetCat, "cl");
                                            black_relocation_change();
                                            propsYakor();

                                            setTimeout(() => {
                                                history.push(`/checkout/`);
                                            }, 450);
                                        }
                                    }, 1000);
                                }}
                            >
                                {lang(textData.CheckOut, "dontProdDta")}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="pocet-two"
                    onClick={() => {
                        OpenClosePocet(pocet, "cl");
                    }}
                ></div>
            </div>
            <div className="pocet pocetCat" ref={pocetCat}>
                <div className="pocet-one">
                    <div
                        style={{ textAlign: "right" }}
                        onClick={() => {
                            OpenClosePocet(pocetCat, "cl");
                        }}
                    >
                        Clear X
                    </div>
                    <div className="pocet_body">
                        <Cat
                            category={category}
                            head={true}
                            textData={textData}
                            black_relocation_change={black_relocation_change}
                            propsYakor={propsYakor}
                            setClose_pocetCat_change={setClose_pocetCat_change}
                            lang={lang}
                            small={true}
                        />
                    </div>
                </div>
                <div
                    className="pocet-two"
                    onClick={() => {
                        OpenClosePocet(pocetCat, "cl");
                    }}
                ></div>
            </div>
            <div>
                {windowWidth > 1100 ? (
                    <div className="header_container">
                        <div className="header_container__section_1">
                            <span></span>
                            <div
                                onClick={() => {
                                    if (history.location.pathname !== "/") {
                                        setTimeout(() => {
                                            black_relocation_change();
                                            propsYakor();
                                            setTimeout(() => {
                                                history.push(`/`);
                                            }, 450);
                                        }, 1000);
                                    }
                                }}
                                className="header_container__section_1_center-box"
                            >
                                {" "}
                                <div className="Container_box">
                                    {" "}
                                    <div className="box_title">
                                        <h1>White</h1>
                                        <h1>Black</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header_container__section_2">
                            <Cat
                                category={category}
                                head={true}
                                textData={textData}
                                black_relocation_change={
                                    black_relocation_change
                                }
                                propsYakor={propsYakor}
                                lang={lang}
                                small={false}
                            />
                        </div>
                        <div className="header_container__section_3">
                            <div className="header_container__section_3-box-right">
                                <div className="section_3-box-right">
                                    <div
                                        className="box-right_ul"
                                        ref={box_right_ul}
                                    >
                                        <div
                                            className="box-right_li"
                                            onClick={() => {
                                                end1.current.classList.add(
                                                    "active"
                                                );

                                                drop_down_menu_function(
                                                    end2,
                                                    box_right_ul,
                                                    undefined,
                                                    t2
                                                );
                                                drop_down_menu_function(
                                                    end1,
                                                    box_right_ul,
                                                    end1.current.classList[1],
                                                    tl
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
                                                    Object.keys(currency).map(
                                                        (i) => (
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
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                        <div
                                            className="box-right_li"
                                            onClick={() => {
                                                end2.current.classList.add(
                                                    "active"
                                                );
                                                drop_down_menu_function(
                                                    end1,
                                                    box_right_ul,
                                                    undefined,
                                                    tl
                                                );
                                                drop_down_menu_function(
                                                    end2,
                                                    box_right_ul,
                                                    end2.current.classList[1],
                                                    t2
                                                );
                                            }}
                                        >
                                            {["RUS", "UKR", "ENG"][langNum]}
                                            <div
                                                ref={end2}
                                                className="box-right_li_end_2"
                                            >
                                                {["RUS", "UKR", "ENG"].map(
                                                    (i) => (
                                                        <div
                                                            key={i}
                                                            onClick={() => {
                                                                ChangeCurrentLang(
                                                                    i
                                                                );
                                                            }}
                                                        >
                                                            {i}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="box-right_li " ref={ed}>
                                            <div
                                                className="buntons_wrap"
                                                onClick={() => {
                                                    if (!isLoggedIn) {
                                                        hieDiv();
                                                        setAct((prevState) => {
                                                            if (
                                                                prevState.two ==
                                                                null
                                                            ) {
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
                                                        if (
                                                            history.location
                                                                .pathname !==
                                                            "/user/"
                                                        ) {
                                                            setTimeout(() => {
                                                                black_relocation_change();
                                                                propsYakor();
                                                                setTimeout(
                                                                    () => {
                                                                        history.push(
                                                                            `/user/`
                                                                        );
                                                                    },
                                                                    450
                                                                );
                                                            }, 1000);
                                                        }
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={require("../../img/user.png")}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="box-right_li"
                                            onClick={() => {
                                                OpenClosePocet(pocet);
                                            }}
                                        >
                                            <img
                                                src={require("../../img/bas.png")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="header_container">
                        <div className="header_container__section_3">
                            <div
                                className="header_container__section_3-box-left"
                                onClick={() => {
                                    if (history.location.pathname !== "/") {
                                        setTimeout(() => {
                                            black_relocation_change();
                                            propsYakor();
                                            setTimeout(() => {
                                                history.push(`/`);
                                            }, 450);
                                        }, 1000);
                                    }
                                }}
                            >
                                <div className="Container_box">
                                    {" "}
                                    <div className="box_title">
                                        <h1>White</h1>
                                        <h1>Black</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="header_container__section_3-box-right">
                                <div className="section_3-box-right">
                                    <div
                                        className="box-right_ul"
                                        ref={box_right_ul}
                                    >
                                        <div
                                            className="box-right_li"
                                            onClick={() => {
                                                end1.current.classList.add(
                                                    "active"
                                                );

                                                drop_down_menu_function(
                                                    end2,
                                                    box_right_ul,
                                                    undefined,
                                                    t2
                                                );
                                                drop_down_menu_function(
                                                    end1,
                                                    box_right_ul,
                                                    end1.current.classList[1],
                                                    tl
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
                                                    Object.keys(currency).map(
                                                        (i) => (
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
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                        <div
                                            className="box-right_li"
                                            onClick={() => {
                                                end2.current.classList.add(
                                                    "active"
                                                );
                                                drop_down_menu_function(
                                                    end1,
                                                    box_right_ul,
                                                    undefined,
                                                    tl
                                                );
                                                drop_down_menu_function(
                                                    end2,
                                                    box_right_ul,
                                                    end2.current.classList[1],
                                                    t2
                                                );
                                            }}
                                        >
                                            {["RUS", "UKR", "ENG"][langNum]}
                                            <div
                                                ref={end2}
                                                className="box-right_li_end_2"
                                            >
                                                {["RUS", "UKR", "ENG"].map(
                                                    (i) => (
                                                        <div
                                                            key={i}
                                                            onClick={() => {
                                                                ChangeCurrentLang(
                                                                    i
                                                                );
                                                            }}
                                                        >
                                                            {i}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="box-right_li " ref={ed}>
                                            <div
                                                className="buntons_wrap"
                                                onClick={() => {
                                                    if (!isLoggedIn) {
                                                        hieDiv();
                                                        setAct((prevState) => {
                                                            if (
                                                                prevState.two ==
                                                                null
                                                            ) {
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
                                                        if (
                                                            history.location
                                                                .pathname !==
                                                            "/user/"
                                                        ) {
                                                            setTimeout(() => {
                                                                black_relocation_change();
                                                                propsYakor();
                                                                setTimeout(
                                                                    () => {
                                                                        history.push(
                                                                            `/user/`
                                                                        );
                                                                    },
                                                                    450
                                                                );
                                                            }, 1000);
                                                        }
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={require("../../img/user.png")}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="box-right_li"
                                            onClick={() => {
                                                OpenClosePocet(pocet);
                                            }}
                                        >
                                            <img
                                                src={require("../../img/bas.png")}
                                            />
                                        </div>
                                        <div
                                            className="box-right_li"
                                            onClick={() => {
                                                OpenClosePocet(pocetCat);
                                            }}
                                            style={{
                                                transform: " rotate(-90deg)"
                                            }}
                                        >
                                            |||
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
