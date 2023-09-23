import React, { useContext } from "react";
import { UserContext } from "../../App";
import history1 from "../../utils/history";

import { useRef } from "react";

import { gsap } from "gsap";

const timeline = gsap.timeline({});

const Cat = ({
    category,
    head,
    textData,
    lang,
    black_relocation_change,
    propsYakor
}) => {
    let cat = category[0].Category;
    let delArr = [...cat];
    delArr.splice(0, 10);
    let catNum = 0;
    const app = useRef(null);
    const df = useRef(null);
    const up = useRef(null);

    const t3 = useRef(timeline);

    const red = useContext(UserContext);
    const drop_down_menu_function = (el, app, act) => {
        const elClass = `.${el.current.classList[0]}`;
        if (act !== undefined) {
            const ctx = gsap.context(() => {
                t3.current
                    .to(elClass, {
                        duration: 0.1,
                        display: "block",
                        function() {
                            if (up.current) {
                                up.current.classList.add("up_active");
                            }
                        }
                    })
                    .to(elClass, {
                        opacity: 1
                    });
            }, app.current);
            return () => ctx.revert();
        } else {
            const ctx = gsap.context(() => {
                t3.current
                    .to(elClass, {
                        opacity: 0,
                        function() {
                            if (up.current) {
                                up.current.classList.remove("up_active");
                            }
                        }
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
    if (red !== null && df.current !== null) {
        if (df.current.parentElement.firstChild !== red.parentElement) {
            drop_down_menu_function(df, app);
        }
    }

    const renderCat = (i) => {
        if (head) {
            catNum = catNum + 1;

            if (catNum < 11) {
                return (
                    <div key={i} className="cat__section_2_li">
                        <div
                            onClick={() => {
                                if (
                                    history1.location.pathname.split("/")[2] !==
                                    i
                                ) {
                                    setTimeout(() => {
                                        black_relocation_change();
                                        propsYakor();
                                        setTimeout(() => {
                                            history1.push(`/cat/${i}/`);
                                        }, 450);
                                    }, 1000);
                                }
                            }}
                            className="li"
                        >
                            {textData.cat.map(
                                (k) => i == k[2] && lang(k, "dontProdDta")
                            )}
                        </div>
                    </div>
                );
            } else if (catNum == 11) {
                return (
                    <div key={i} className="cat__section_2_li" ref={app}>
                        <div
                            className="li"
                            onClick={(e) => {
                                df.current.classList.toggle("active");

                                drop_down_menu_function(
                                    df,
                                    app,
                                    df.current.classList[1]
                                );
                            }}
                        >
                            <div>
                                {textData.cat.map(
                                    (k) =>
                                        delArr[0] == k[2] &&
                                        lang(k, "dontProdDta")
                                )}
                            </div>
                            <div ref={up} className="up">
                                <img
                                    className="up1"
                                    src={require("../../../img/ar.png")}
                                />
                            </div>
                        </div>
                        <div ref={df} className="cat__section_2_li_end">
                            {delArr.map((ic) => (
                                <div
                                    key={ic}
                                    onClick={() => {
                                        if (
                                            history1.location.pathname.split(
                                                "/"
                                            )[2] !== i
                                        ) {
                                            setTimeout(() => {
                                                black_relocation_change();
                                                propsYakor();
                                                setTimeout(() => {
                                                    history1.push(`/cat/${i}/`);
                                                }, 450);
                                            }, 1000);
                                        }
                                    }}
                                >
                                    {textData.cat.map(
                                        (k) =>
                                            ic == k[2] && lang(k, "dontProdDta")
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div
                    key={i}
                    className="cat__section_2_li"
                    onClick={() => {
                        if (history1.location.pathname.split("/")[2] !== i) {
                            setTimeout(() => {
                                black_relocation_change();
                                propsYakor();
                                setTimeout(() => {
                                    history1.push(`/cat/${i}/`);
                                }, 450);
                            }, 1000);
                        }
                    }}
                >
                    <div className="li">
                        {textData.cat.map(
                            (k) => i == k[2] && lang(k, "dontProdDta")
                        )}
                    </div>
                </div>
            );
        }
    };
    return (
        <>
            <div className="cat__section_2_ul">
                {cat.map((i) => renderCat(i))}
                <div
                    className="cat__section_2_li"
                    onClick={() => {
                        setTimeout(() => {
                            if (
                                history1.location.pathname.split("/")[1] !==
                                "faq"
                            ) {
                                black_relocation_change();
                                propsYakor();
                                setTimeout(() => {
                                    history1.push(`/faq/`);
                                }, 450);
                            }
                        }, 1000);
                    }}
                >
                    <div className="li">FAQ</div>
                </div>

                {head && (
                    <div className="cat__section_2_li">
                        <div className="li">
                            {lang(textData.SubCat, "dontProdDta")}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default Cat;
