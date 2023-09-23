import React, { useContext } from "react";
import { LangContext } from "../../App";
import Cat from "./catigories";
const Footer = ({
    category,
    textData,
    black_relocation_change,
    black_relocation,
    propsYakor
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
        <div className="main_page__footer">
            <div className="footer__container">
                <Cat
                    category={category}
                    head={false}
                    textData={textData}
                    black_relocation_change={black_relocation_change}
                    propsYakor={propsYakor}
                    black_relocation={black_relocation}
                    lang={lang}
                />
            </div>
        </div>
    );
};
export default Footer;
