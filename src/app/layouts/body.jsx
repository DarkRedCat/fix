import React, { useContext, useState, useRef, useEffect } from "react";
import { LangContext } from "../App";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { getProductsList } from "../store/product";

import Card from "../components/common/Card";
const timeline = gsap.timeline({});
const Body = ({
    CurrentCurrency,
    ChangeCurrency,
    black_relocation_change,
    textData,
    propsYakor,
    black_relocation
}) => {
    const location = useLocation();
    const locationName = location.pathname
        .replace("/cat/", "")
        .replace("/", "");
    let data = useSelector(getProductsList(locationName)) || [];

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

    const tl = useRef(timeline);
    const app = useRef(null);

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
        <div className="category_page">
            <div ref={app}>
                <div className="black_relocation"></div>
            </div>

            <div className=" category_page__body">
                <div className="category_page__title">
                    <h1>
                        {data.length !== 0
                            ? textData.cat.map(
                                  (m) =>
                                      m[2] == locationName &&
                                      lang(m, "dontProdDta")
                              )
                            : 404}
                    </h1>
                </div>
                <div
                    className={`category_page_container  ${
                        data.length < 3 ? "category_page_container_js_c" : ""
                    } `}
                >
                    {data.map((e) => (
                        <Card
                            key={e._id}
                            CurrentCurrency={CurrentCurrency}
                            ChangeCurrency={ChangeCurrency}
                            fun={lang}
                            black_relocation_change={black_relocation_change}
                            textData={textData}
                            propsYakor={propsYakor}
                            {...e}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Body;
