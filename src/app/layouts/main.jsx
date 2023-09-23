import React, { useRef, useState, useEffect } from "react";

import { gsap } from "gsap";

const timeline = gsap.timeline({});

const Main = ({ black_relocation }) => {
    const tl = useRef(timeline);
    const app = useRef(null);

    const black_relocation_close_function_first_page_launch = () => {
        const ctx = gsap.context(() => {
            tl.current

                .to(".black_relocation_2", {
                    duration: 0,
                    display: "block",
                    opacity: 1
                })
                .to(".black_relocation_2", {
                    duration: 1.5,

                    opacity: 0
                })
                .to(".black_relocation_2", {
                    duration: 0,

                    display: "none"
                });
        }, app.current);
        return () => ctx.revert();
    };

    const black_relocation_close_function = () => {
        const ctx = gsap.context(() => {
            tl.current
                .to(".black_relocation_2", {
                    duration: 0,
                    opacity: 0,
                    display: "none"
                })
                .to(".black_relocation_2", {
                    duration: 0.5,
                    display: "block",
                    opacity: 1
                })
                .to(".black_relocation_2", {
                    duration: 1.5,
                    opacity: 0
                })
                .to(".black_relocation_2", {
                    duration: 0,

                    display: "none"
                });
        }, app.current);
        return () => ctx.revert();
    };
    const [red, setRed] = useState(true);
    useEffect(() => {
        setRed((prevState) => !prevState);
    }, [location.pathname.split("/")[1]]);
    useEffect(() => {
        if (red) {
            black_relocation_close_function_first_page_launch();
            const red = document.querySelector(".header_container");
            red.style.background = "none";
        } else {
            black_relocation_close_function();
            const red = document.querySelector(".header_container");
            setTimeout(() => {
                red.style.background = "#111113";
            }, 400);
        }
    }, [black_relocation]);

    return (
        <div className="main_page container">
            <div ref={app}>
                <div className="black_relocation_2"></div>
            </div>
            <div className="main_page__body">
                <div className="main_page__body-content_img"></div>
                <div className="main_page__body-content">
                    <p>ЕСТЬ ТОЛЬКО</p>
                    <span>БЕЛЫЙ</span> <p>И ЧЕРНЫЙ. ВСЕ ОСТАЛЬНОЕ ОТТЕНКИ.</p>
                </div>
            </div>
        </div>
    );
};

export default Main;
