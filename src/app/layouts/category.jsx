import React from "react";
import Body from "../layouts/body";
import { Route, Switch } from "react-router-dom";

const Сategory = ({
    CurrentCurrency,
    ChangeCurrency,
    textData,
    black_relocation,
    black_relocation_change,
    propsYakor
}) => {
    return (
        <>
            <Switch>
                <Route
                    path="/cat/:cat"
                    render={(props) => (
                        <Body
                            CurrentCurrency={CurrentCurrency}
                            ChangeCurrency={ChangeCurrency}
                            textData={textData}
                            black_relocation={black_relocation}
                            black_relocation_change={black_relocation_change}
                            propsYakor={propsYakor}
                            {...props}
                        />
                    )}
                />
            </Switch>
        </>
    );
};
export default Сategory;
