import React from 'react';
import './work-experience.scss';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import check from '../../assets/check.svg'
import work from '../../assets/work.svg'
import { useInView } from 'react-intersection-observer';


function WorkExperience() {

    useGSAP(() => {
        gsap.from(".work-experience-container", { scale: 0.4, opacity: 0, stagger: 0.3, ease: "power3.out", delay: 0.45});
      });
    
    const [ref1, inView1] = useInView({});
    const [ref2, inView2] = useInView({});
    const [ref3, inView3] = useInView({});
    
    const firstCardStyle = {
        border: '3px solid #50ADFF',
        boxShadow: '0 0 14px #50ADFF'
    };

    return (
        <div className="container">
            <div className="header">Professional Experience</div>
            <div className="cards">
                <div ref={ref1} className={`experience-card ${!inView1 ? 'hidden' : 'show'}`} style={firstCardStyle}>
                    <div className="card-header">
                        <div className="header-left">
                            <div className="title">Frontend Software Developer</div>
                            <div className="subtitle">Web Development Team - C Spire Business</div>
                        </div>
                        <div className="header-right">
                            <div className="text">
                                <div className="title">C Spire - Ridgeland, MS</div>
                                <div className="subtitle">May 2023 - Current</div>
                            </div>
                            <img className="icon" alt="check" src={work} />
                        </div>
                    </div>
                    <div className="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus dolor tempore aut nobis architecto, iure odio fugiat voluptates perferendis repellendus error necessitatibus quidem ipsum deleniti. Atque quisquam similique unde distinctio?
                    </div>
                </div>
                <div ref={ref2} className={`experience-card ${!inView2 ? 'hidden' : 'show'}`}>
                    <div className="card-header">
                        <div className="header-left">
                            <div className="title">Graduate Teaching Assistant</div>
                            <div className="subtitle">Intermediate Computer Programming (C++)</div>
                        </div>
                        <div className="header-right">
                            <div className="text">
                                <div className="title">Mississippi State University</div>
                                <div className="subtitle">August 2022 - May 2023</div>
                            </div>
                            <img className="icon" alt="check" src={check} />
                        </div>
                    </div>
                    <div className="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus dolor tempore aut nobis architecto, iure odio fugiat voluptates perferendis repellendus error necessitatibus quidem ipsum deleniti. Atque quisquam similique unde distinctio?
                    </div>
                </div>
                <div ref={ref3} className={`experience-card ${!inView3 ? 'hidden' : 'show'}`}>
                    <div className="card-header">
                        <div className="header-left">
                            <div className="title">Software Developer Intern</div>
                            <div className="subtitle">Web Development Team - DevOps</div>
                        </div>
                        <div className="header-right">
                            <div className="text">
                                <div className="title">C Spire - Ridgeland, MS</div>
                                <div className="subtitle">June 2022 - July 2022 (8 Weeks)</div>
                            </div>
                            <img className="icon" alt="check" src={check} />
                        </div>
                    </div>
                    <div className="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus dolor tempore aut nobis architecto, iure odio fugiat voluptates perferendis repellendus error necessitatibus quidem ipsum deleniti. Atque quisquam similique unde distinctio?
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkExperience;
