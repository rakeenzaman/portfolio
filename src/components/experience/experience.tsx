import React from 'react';
import { useInView } from 'react-intersection-observer';
import './experience.scss';
import angular from "../../assets/angular.svg"
import react from "../../assets/react.svg"
import js from "../../assets/javascript.svg"
import css from "../../assets/css3.svg"
import html from "../../assets/html.svg"
import cpp from "../../assets/cplusplus.svg"
import java from "../../assets/java.svg"

function Experience() {
    const [ref, inView] = useInView({});

    return (
        <div>
            <div className="exp-header">
                Languages/Tools
            </div>
            <div className="experience" ref={ref}>
                <div className={`lang-container ${!inView ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={angular} />
                    </div>
                    <p className="lang-label">ANGULAR</p>
                </div>
                <div className={`lang-container ${!inView ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={react} />
                    </div>
                    <p className="lang-label">REACT</p>
                </div>
                <div className={`lang-container ${!inView ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={js} />
                    </div>
                    <p className="lang-label">JAVASCRIPT</p>
                </div>
                <div className={`lang-container ${!inView ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={css} />
                    </div>
                    <p className="lang-label">CSS</p>
                </div>
                <div className={`lang-container ${!inView ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={html} />
                    </div>
                    <p className="lang-label">HTML</p>
                </div>
                <div className={`lang-container ${!inView ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={cpp} />
                    </div>
                    <p className="lang-label">C++</p>
                </div>
                <div className={`lang-container ${!inView ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={java} />
                    </div>
                    <p className="lang-label">JAVA</p>
                </div>
            </div>
        </div>
    );
}

export default Experience;
