import React from 'react';
import './education.scss';
import gradcap from "../../assets/grad_cap.svg"
import gsap from "gsap";
import { useGSAP } from '@gsap/react';


function Education() {

    useGSAP(() => {
        gsap.from(".education-container", { scale: 0.4, opacity: 0, stagger: 0.3, ease: "power3.out", delay: 0.45});
      });

    return (
        <div className="container">
            <div className="education-header">Education</div>
            <div className="degrees">
                <div className="education-container">
                    <div className="icon-container icon-1">
                        <img className="grad-cap-icon" src={gradcap} alt="github logo"/>
                    </div>
                    <div className="edu-title">Bachelor's</div>
                    <div className="edu-subtitle">Software Engineering</div>
                    <div className="edu-sub-subtitle">Mississippi State University, 2022</div>
                </div>
                <div className="education-container">
                    <div className="icon-container icon-2">
                        <img className="grad-cap-icon" src={gradcap} alt="github logo"/>
                    </div>
                    <div className="edu-title">Master's</div>
                    <div className="edu-subtitle">Computer Science</div>
                    <div className="edu-sub-subtitle">Mississippi State University, 2024</div>
                </div>
            </div>
        </div>
    );
}

export default Education;
