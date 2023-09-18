import React, { useState } from "react";

import RegisterForm from "./registerForm";

const Register = ({ data, fun }) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <>
                        <h3 className="mb-4">Register</h3>
                        <RegisterForm Textdata={data} fun={fun} />
                    </>
                </div>
            </div>
        </div>
    );
};
export default Register;
