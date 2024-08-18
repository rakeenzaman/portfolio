import React from 'react';
import { useInView } from 'react-intersection-observer';
import './experience.scss';
import angular from "../../assets/angular.svg"
import react from "../../assets/react.svg"
import js from "../../assets/javascript.svg"
import ts from "../../assets/typescript.svg"
import css from "../../assets/css3.svg"
import html from "../../assets/html.svg"
import cpp from "../../assets/cplusplus.svg"
import java from "../../assets/java.svg"
import github from "../../assets/github_large.svg"
import gitlab from "../../assets/gitlab.svg"
import jenkins from "../../assets/jenkins.svg"
import figma from "../../assets/figma.svg"
import python from "../../assets/python.svg"

function Experience() {
    const [ref1, inView1] = useInView({});
    const [ref2, inView2] = useInView({});
    const [ref3, inView3] = useInView({});

    return (
        <div className="container">
            <div className="exp-header">
                Languages/Tools
            </div>
            <div className="experience" ref={ref1}>
                <div className={`lang-container ${!inView1 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={angular} />
                    </div>
                    <p className="lang-label">ANGULAR</p>
                </div>
                <div className={`lang-container ${!inView1 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={ts} />
                    </div>
                    <p className="lang-label">TS/JS</p>
                </div>
                <div className={`lang-container ${!inView1 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={css} />
                    </div>
                    <p className="lang-label">CSS</p>
                </div>
                <div className={`lang-container ${!inView1 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={html} />
                    </div>
                    <p className="lang-label">HTML</p>
                </div>
            </div>
            <div className="experience" ref={ref2}>
                <div className={`lang-container ${!inView2 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={react} />
                    </div>
                    <p className="lang-label">REACT</p>
                </div>
                <div className={`lang-container ${!inView2 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={cpp} />
                    </div>
                    <p className="lang-label">C++</p>
                </div>
                <div className={`lang-container ${!inView2 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={java} />
                    </div>
                    <p className="lang-label">JAVA</p>
                </div>
                <div className={`lang-container ${!inView2 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={python} />
                    </div>
                    <p className="lang-label">PYTHON</p>
                </div>
            </div>
            <div className="experience" ref={ref3}>
                <div className={`lang-container ${!inView3 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={github} />
                    </div>
                    <p className="lang-label">GITHUB</p>
                </div>
                <div className={`lang-container ${!inView3 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={gitlab} />
                    </div>
                    <p className="lang-label">GITLAB</p>
                </div>
                <div className={`lang-container ${!inView3 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={jenkins} />
                    </div>
                    <p className="lang-label">JENKINS</p>
                </div>
                <div className={`lang-container ${!inView3 ? 'hidden no-delay' : 'show'}`}>
                    <div className="lang">
                        <img alt="description" src={figma} />
                    </div>
                    <p className="lang-label">FIGMA</p>
                </div>
            </div>
        </div>
    );
}

export default Experience;
