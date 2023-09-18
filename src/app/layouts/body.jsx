import React, { useContext } from "react";
import { LangContext } from "../App";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { getProductsList } from "../store/product";

import Card from "../components/common/Card";

const Body = ({ CurrentCurrency, ChangeCurrency, textData }) => {
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

    return (
        <div className="category_page">
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
                <div className="category_page_container">
                    {data.map((e) => (
                        <Card
                            key={e._id}
                            CurrentCurrency={CurrentCurrency}
                            ChangeCurrency={ChangeCurrency}
                            fun={lang}
                            textData={textData}
                            {...e}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Body;
