import React from "react";

import LoginForm from "./loginForm";

const Login = ({ data, fun }) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <>
                        <LoginForm textData={data} fun={fun} />
                    </>
                </div>
            </div>
        </div>
    );
};
export default Login;
