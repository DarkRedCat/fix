import React from "react";
import Body from "../layouts/body";
import { Route, Switch, Redirect } from "react-router-dom";

const Сategory = ({ CurrentCurrency, ChangeCurrency, textData }) => {
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
                            {...props}
                        />
                    )}
                />
            </Switch>
        </>
    );
};
export default Сategory;
