import React, { useContext } from "react";
import { UserContext } from "../../App";
import history1 from "../../utils/history";

import { useRef } from "react";

const Cat = ({ category, head, textData, lang }) => {
    let cat = category[0].Category;
    let delArr = [...cat];
    delArr.splice(0, 10);
    let catNum = 0;
    const app = useRef(null);
    const df = useRef(null);
    const up = useRef(null);

    const red = useContext(UserContext);

    if (red !== null && df.current !== null) {
        if (df.current.parentElement.firstChild !== red.parentElement) {
            df.current.classList.remove("cat__section_2_li_end_active");
            up.current.classList.remove("up_active");
        }
    }

    const renderCat = (i) => {
        if (head) {
            catNum = catNum + 1;

            if (catNum < 11) {
                return (
                    <div key={i} className="cat__section_2_li">
                        <div
                            onClick={() => history1.push(`/cat/${i}/`)}
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
                    <div key={i} className="cat__section_2_li">
                        <div
                            ref={app}
                            className="li"
                            onClick={(e) => {
                                df.current.classList.toggle(
                                    "cat__section_2_li_end_active"
                                );
                                up.current.classList.toggle("up_active");
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
                                    onClick={(e) => {
                                        history1.push(`/cat/${ic}/`);
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
                    onClick={() => history1.push(`/cat/${i}/`)}
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
                    onClick={() => history1.push(`/faq/`)}
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
