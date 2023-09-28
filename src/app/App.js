import React, { createContext, useState, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import AppLoader from "./components/ui/hoc/appLoader";
import { useSelector } from "react-redux";
import Header from "./components/common/header";
import Main from "./layouts/main";
import Сategory from "./layouts/category";
import Footer from "./components/common/footer";
import Product from "./components/common/product";

import { getCategory, getCategoryLoadingStatus } from "./store/category";
import Faq from "./components/common/faq";
import User from "./components/common/user";
import Checkout from "./components/common/checkout";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import val from "./utils/val";
import textData from "./textData.json";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "gsap/CustomEase";
export const UserContext = createContext();
export const LangContext = createContext();
const timeline = gsap.timeline({});
const timeline2 = gsap.timeline({});
function App() {
    const tl = useRef(timeline);
    const t2 = useRef(timeline2);
    const isLoading = useSelector(getCategoryLoadingStatus());
    const [firstRender, setFirstRender] = useState(false);
    const category = useSelector(getCategory());
    const [click, setClick] = useState(null);
    const [ActLi, setActLi] = useState(null);
    const [changeSendButton, setChangeSendButton] = useState(null);
    const clickSendButton = () => {
        setChangeSendButton((prevState) => {
            if (prevState == null) {
                return true;
            }
            if (typeof prevState == "boolean") {
                return !prevState;
            }
        });
    };

    //***************************************************************** */

    const [currency, SetCurrency] = useState(null);
    const [CurrentCurrency, SetCurrentCurrency] = useState("USD");
    const [CurrentLang, SetCurrentLang] = useState(0);

    const ChangeCurrentLang = (lang) => {
        let val = 0;
        if (lang == "RUS") {
            val = 0;
        } else if (lang == "ENG") {
            val = 2;
        } else if (lang == "UKR") {
            val = 1;
        }
        SetCurrentLang(val);
        localStorage.setItem(
            "data",
            JSON.stringify({
                data: {
                    ...JSON.parse(d).data,
                    lang: val
                }
            })
        );
    };
    const ChangeCurrentCurrency = (i) => {
        SetCurrentCurrency(i);
        localStorage.setItem(
            "data",
            JSON.stringify({
                data: {
                    ...JSON.parse(d).data,
                    CurrentCurrency: i
                }
            })
        );
    };
    const d = localStorage.getItem("data");
    useEffect(() => {
        val().then((res) => {
            SetCurrency(res);
        });

        if (d == null) {
            localStorage.setItem(
                "data",
                JSON.stringify({
                    data: {
                        lang: CurrentLang,
                        CurrentCurrency: CurrentCurrency
                    }
                })
            );
        } else {
            SetCurrentLang(JSON.parse(d).data.lang);
            SetCurrentCurrency(JSON.parse(d).data.CurrentCurrency);
        }
        document.body.classList.add("no_scroll_black");
    }, []);
    const FunSetFirstRender = () => {
        setFirstRender(true);
    };
    const ChangeCurrency = (num, variableСurrency) => {
        let newNumm = 1;
        const cNumm = Number(num);

        if (variableСurrency == "USD") {
            newNumm = cNumm + " " + "USD";
        } else if (variableСurrency == "EUR") {
            newNumm =
                ((cNumm * currency.USD) / currency.EUR).toFixed(2) +
                " " +
                "EUR";
        } else if (variableСurrency == "UAH") {
            newNumm =
                ((cNumm * currency.USD) / currency.UAH).toFixed(2) +
                " " +
                "UAH";
        } else if (variableСurrency == "RUB") {
            newNumm = (cNumm * currency.USD).toFixed(2) + " " + "RUB";
        }

        return newNumm;
    };
    //***************************************************************** */

    const [black_relocation, setBlack_relocation] = useState(true);
    const black_relocation_change = () => {
        setBlack_relocation((prevState) => !prevState);
    };

    const [close_pocetCat, setClose_pocetCat] = useState(true);
    const setClose_pocetCat_change = () => {
        setClose_pocetCat((prevState) => !prevState);
    };
    //***************** */
    const yakor = useRef(null);
    const yakorFun = (yakor) => {
        const topOffset = 50;
        const elementPosition = yakor.current.getBoundingClientRect().top;
        const offsePosition = elementPosition - topOffset;
        window.scrollBy({ top: offsePosition, behavior: "smooth" });
    };

    const propsYakor = () => {
        yakorFun(yakor);
    };
    useEffect(() => {
        propsYakor();
    }, []);

    ///--------------------------------------------
    const [redsad, asdasds] = useState(null);

    const dersaq = (i) => {
        const der = document.body
            .querySelectorAll(".Container_box")[1]
            .getBoundingClientRect();

        if (i == "top") {
            return [der.top];
        }
        if (i == "left") {
            return der.left + der.width / 2;
        }
    };

    const app = useRef(null);
    const black_relocation_close_function_first_page_launch = (left, top) => {
        const ctx = gsap.context(() => {
            tl.current
                .to(".Container_box", {
                    duration: 1,
                    opacity: 1
                })

                .to(".Container_box", {
                    duration: 0.5,
                    transform: "scale(1) translate(-50% ,0)",
                    top: `${top}px`,
                    left: `${left}px`
                })

                .to(".black_relocation_3", {
                    duration: 0.5,
                    opacity: 0
                })
                .to(".black_relocation_3", {
                    duration: 0,
                    display: "none"
                })
                .to(".Container_box", {
                    duration: 0,
                    display: "none",
                    function() {
                        document.body.classList.remove("no_scroll_black_2");
                    }
                });
        }, app.current);
        return () => ctx.revert();
    };
    const getPosDiv = () => {
        black_relocation_close_function_first_page_launch(
            dersaq("left"),
            dersaq("top")
        );
    };

    return (
        <div
            onClick={(e) => {
                setClick(e.target);
            }}
        >
            <div ref={app}>
                <div className="black_relocation_3">
                    <div className="Container_box">
                        {" "}
                        <div className="box_title">
                            <h1>White</h1>
                            <h1>Black</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section ref={yakor}></section>
            <AppLoader>
                {!isLoading && currency !== null ? (
                    <>
                        <UserContext.Provider value={click}>
                            <LangContext.Provider value={CurrentLang}>
                                <Header
                                    category={category}
                                    changeSendButton={changeSendButton}
                                    CurrentCurrency={CurrentCurrency}
                                    ChangeCurrentCurrency={
                                        ChangeCurrentCurrency
                                    }
                                    ChangeCurrentLang={ChangeCurrentLang}
                                    currency={currency}
                                    ChangeCurrency={ChangeCurrency}
                                    textData={textData.header}
                                    black_relocation={black_relocation}
                                    black_relocation_change={
                                        black_relocation_change
                                    }
                                    close_pocetCat={close_pocetCat}
                                    setClose_pocetCat_change={
                                        setClose_pocetCat_change
                                    }
                                    propsYakor={propsYakor}
                                    ActLi={ActLi}
                                    setActLi={setActLi}
                                    getPosDiv={getPosDiv}
                                />
                                <Switch>
                                    <Route
                                        path="/cat/:red"
                                        render={(props) => (
                                            <Сategory
                                                CurrentCurrency={
                                                    CurrentCurrency
                                                }
                                                textData={textData.other}
                                                ChangeCurrency={ChangeCurrency}
                                                black_relocation={
                                                    black_relocation
                                                }
                                                black_relocation_change={
                                                    black_relocation_change
                                                }
                                                propsYakor={propsYakor}
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/checkout"
                                        render={(props) => (
                                            <Checkout
                                                CurrentCurrency={
                                                    CurrentCurrency
                                                }
                                                ChangeCurrency={ChangeCurrency}
                                                textData={textData.checkout}
                                                black_relocation={
                                                    black_relocation
                                                }
                                                black_relocation_change={
                                                    black_relocation_change
                                                }
                                                propsYakor={propsYakor}
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/faq/"
                                        render={(props) => (
                                            <Faq
                                                textData={textData.faq}
                                                black_relocation={
                                                    black_relocation
                                                }
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/product/:id"
                                        render={(props) => (
                                            <Product
                                                clickSendButton={
                                                    clickSendButton
                                                }
                                                CurrentCurrency={
                                                    CurrentCurrency
                                                }
                                                textData={textData.prod}
                                                ChangeCurrency={ChangeCurrency}
                                                black_relocation={
                                                    black_relocation
                                                }
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/user/"
                                        render={(props) => (
                                            <User
                                                black_relocation_change={
                                                    black_relocation_change
                                                }
                                                black_relocation={
                                                    black_relocation
                                                }
                                                {...props}
                                            />
                                        )}
                                    />

                                    <Route
                                        path="/"
                                        exact
                                        render={(props) => (
                                            <Main
                                                black_relocation={
                                                    black_relocation
                                                }
                                                FunSetFirstRender={
                                                    FunSetFirstRender
                                                }
                                                setActLi={setActLi}
                                                firstRender={firstRender}
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Redirect to="/" />
                                </Switch>
                                <Footer />
                            </LangContext.Provider>
                        </UserContext.Provider>
                    </>
                ) : (
                    ""
                )}
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
