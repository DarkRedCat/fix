import React, { createContext, useState, useEffect } from "react";
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
export const UserContext = createContext();
export const LangContext = createContext();

function App() {
    const isLoading = useSelector(getCategoryLoadingStatus());
    const category = useSelector(getCategory());
    const [click, setClick] = useState(null);
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
    }, []);

    const ChangeCurrency = (num, variableСurrency) => {
        let newNumm = 1;
        const cNumm = Number(num);

        if (variableСurrency == "USD") {
            newNumm = cNumm;
        } else if (variableСurrency == "EUR") {
            newNumm = (cNumm * currency.USD) / currency.EUR;
        } else if (variableСurrency == "UAH") {
            newNumm = (cNumm * currency.USD) / currency.UAH;
        } else if (variableСurrency == "RUB") {
            newNumm = cNumm * currency.USD;
        }

        return newNumm.toFixed(2);
    };

    return (
        <div
            onClick={(e) => {
                setClick(e.target);
            }}
        >
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
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/faq/"
                                        render={(props) => (
                                            <Faq
                                                textData={textData.faq}
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
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Route path="/user/" component={User} />

                                    <Route path="/" exact component={Main} />
                                    <Redirect to="/" />
                                </Switch>
                                <Footer
                                    category={category}
                                    textData={textData.header}
                                />
                            </LangContext.Provider>
                        </UserContext.Provider>
                    </>
                ) : (
                    "load"
                )}
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
