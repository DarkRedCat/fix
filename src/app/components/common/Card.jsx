import React, { useContext } from "react";
import history from "../../utils/history";
import { LangContext } from "../../App";

const Card = ({
    _id,
    Cost,
    name,
    CurrentCurrency,
    ChangeCurrency,
    black_relocation_change,
    propsYakor,

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
    return (
        <>
            <div
                className="card_container"
                onClick={() => {
                    black_relocation_change();
                    propsYakor();
                    setTimeout(() => {
                        history.push(`/product/${_id}`);
                    }, 450);
                }}
            >
                <div className="card_container__head">
                    <div className="card_container__head_size">
                        {ChangeCurrency(Cost, CurrentCurrency)}
                    </div>
                    <img
                        className="card_img"
                        src={require("../../img/pays.webp")}
                    />
                    <div className="card_container__head_box">
                        {lang(textData.read_more, "dontProdDta")}...
                    </div>
                </div>
                <div className="card_container__foot">
                    <div>{lang(name)} </div>
                </div>
            </div>
        </>
    );
};
export default Card;
