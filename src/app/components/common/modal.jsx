import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const timeline = gsap.timeline({});
const timeline2 = gsap.timeline({});
const timeline3 = gsap.timeline({});

const Modal = ({ fun, act, cl, className1 }) => {
    const className2 = className1 || "";
    const modal = useRef(null);
    const modalM = useRef(null);
    const tl = useRef(timeline);
    const t2 = useRef(timeline2);
    const t3 = useRef(timeline3);
    const modalDocum1 = document.querySelectorAll(".modal_cont_log");
    const modalDocum2 = document.querySelectorAll(".modal_cont_log2");
    const CloseModalImg = document.querySelectorAll(".close");

    const animate = (app, active) => {
        if (active !== undefined) {
            const ctx = gsap.context(() => {
                tl.current.to(".modal_area", {
                    duration: 0.5,
                    display: "block",
                    opacity: 1
                });
                t3.current.to(".modal_cont", {
                    duration: 0.5,
                    transform: "scale(1)",
                    display: "block",
                    opacity: 1
                });
            }, app.current);

            return () => ctx.revert();
        } else {
            const ctx = gsap.context(() => {
                tl.current.to(".modal_area", {
                    duration: 0.5,
                    display: "none",
                    opacity: 0
                });
                t3.current.to(".modal_cont", {
                    duration: 0.5,
                    transform: "scale(0.9)",
                    display: "none",
                    opacity: 0
                });
            }, app.current);

            return () => ctx.revert();
        }
    };
    const animate2 = (app) => {
        const ctx = gsap.context(() => {
            t3.current.to(".modal_cont", {
                duration: 0.1,
                transform: "scale(1.3)"
            });
        }, app.current);

        return () => ctx.revert();
    };
    const closeModal = (app) => {
        animate(app);
        animate2(app);
        setTimeout(() => {
            document.body.classList.remove("no_scroll");
        }, 1000);
    };
    useEffect(() => {
        animate2(modal);
    }, []);
    useEffect(() => {
        if (act !== undefined && act !== null) {
            if (modalM.current !== null) {
                document.querySelector(".modal_notMain");
                animate(modalM, "act");

                document.body.classList.add("no_scroll");
                modalM.current.classList.add("modal_active");
            }
            if (modal.current !== null) {
                document.querySelector(".modal_notMain");
                animate(modal, "act");

                document.body.classList.add("no_scroll");
                modal.current.classList.add("modal_active");
                if (modal.current.classList[2] !== "modal_cont_log") {
                    const red = { current: modalDocum1[0] };
                    closeModal(red);
                }
                if (modal.current.classList[2] !== "modal_cont_log2") {
                    const red = { current: modalDocum2[0] };

                    closeModal(red);
                }
            }
        }
    }, [act]);

    return (
        <>
            {act === undefined && (
                <div
                    className="modal_button"
                    onClick={() => {
                        if (modal.current !== null) {
                            animate(modal, "act");
                            modal.current.classList.add("modal_active");
                            document.body.classList.add("no_scroll");
                        }
                    }}
                ></div>
            )}
            {cl == "main" ? (
                <div className="modal " ref={modalM}>
                    <div
                        className="modal_area"
                        onClick={() => {
                            closeModal(modalM);
                        }}
                    ></div>

                    <div className={`modal_cont modal_main_cont`}>
                        <div
                            className="modal_cont_x"
                            onClick={() => {
                                closeModal(modalM);
                            }}
                        >
                            x
                        </div>

                        <div className="modal_cont_text">
                            {fun !== undefined && fun}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`modal modal_notMain  ${className2}`}
                    ref={modal}
                >
                    <div
                        className="modal_area"
                        onClick={() => {
                            closeModal(modal);
                        }}
                    ></div>

                    <div className={`modal_cont ${className2}`}>
                        <div
                            className="modal_cont_x"
                            onClick={() => {
                                closeModal(modal);
                            }}
                        >
                            x
                        </div>

                        <div className="modal_cont_text">
                            {fun !== undefined && fun}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Modal;
