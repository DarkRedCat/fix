import React, { useRef, useContext } from "react";
import { LangContext } from "../../App";
import { gsap } from "gsap";

const timeline = gsap.timeline({});

const Faq = ({ textData }) => {
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

    const dropdown_wto = useRef(null);
    const dropdown_one = useRef(null);
    const textBlock = useRef(null);
    const textBlock2 = useRef(null);

    const tl = useRef(timeline);
    const text = useRef(null);

    const animate = (act, num) => {
        if (act !== undefined) {
            const ctx = gsap.context(() => {
                tl.current.to(".dropdown_text", {
                    duration: 1,
                    height: "auto"
                });
            }, num.current);
            return () => ctx.revert();
        } else {
            const ctx = gsap.context(() => {
                tl.current.to(".dropdown_text", {
                    duration: 1,
                    height: "0px"
                });
            }, num.current);
            return () => ctx.revert();
        }
    };
    const renderText = (data, reF) => {
        if (reF.current !== null) {
            reF.current.innerHTML = `<div>${data}</div>`;
        }
    };

    return (
        <div className="main_page container">
            <div className="faq_page__body">
                <div className="dropdown dropdown_one" ref={dropdown_one}>
                    <div
                        className="dropdown_sub-conteiner"
                        onClick={() => {
                            dropdown_one.current.classList.toggle(
                                "dropdown__active"
                            );
                            animate(
                                dropdown_one.current.classList[2],
                                dropdown_one
                            );
                        }}
                    >
                        <div className="dropdown_title">
                            <h3>
                                {lang(
                                    textData.General_questions_title,
                                    "dontProdDta"
                                )}
                            </h3>
                        </div>

                        <div className="dropdown_ar">
                            <img
                                className="up1"
                                src={require("../../../img/ar2.png")}
                            />
                        </div>
                    </div>

                    <div className="dropdown_text" ref={textBlock}>
                        {renderText(
                            lang(textData.General_questions, "dontProdDta"),
                            textBlock
                        )}
                    </div>
                </div>

                <div className="dropdown dropdown_wto" ref={dropdown_wto}>
                    <div
                        className="dropdown_sub-conteiner"
                        onClick={() => {
                            dropdown_wto.current.classList.toggle(
                                "dropdown__active"
                            );
                            animate(
                                dropdown_wto.current.classList[2],
                                dropdown_wto
                            );
                        }}
                    >
                        <div className="dropdown_title">
                            <h3>
                                {" "}
                                {lang(
                                    textData.Delivery_and_payment_title,
                                    "dontProdDta"
                                )}
                            </h3>
                        </div>

                        <div className="dropdown_ar">
                            <img
                                className="up1"
                                src={require("../../../img/ar2.png")}
                            />
                        </div>
                    </div>

                    <div className="dropdown_text" ref={textBlock2}>
                        {renderText(
                            lang(textData.Delivery_and_payment, "dontProdDta"),
                            textBlock2
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Faq;
