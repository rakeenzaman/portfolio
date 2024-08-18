import React from 'react';
import './projects.scss';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import check from '../../assets/check.svg'
import work from '../../assets/work.svg'
import { useInView } from 'react-intersection-observer';


function Projects() {

    useGSAP(() => {
        gsap.from(".work-experience-container", { scale: 0.4, opacity: 0, stagger: 0.3, ease: "power3.out", delay: 0.45});
      });
    
    const [ref1, inView1] = useInView({});
    const [ref2, inView2] = useInView({});
    const [ref3, inView3] = useInView({});
    
    return (
        <div className="container">
            <div className="header">Projects</div>
            <div className="cards">
                <div ref={ref1} className={`project-card ${!inView1 ? 'hidden' : 'show'}`}>
                    <div className="project-header">
                        <div className="title">C++ Control Flow Visualizer</div>
                        <div className="langs">
                            <div className="lang">C++</div>
                            <div className="lang">Javascript</div>
                            <div className="lang">CSS</div>
                            <div className="lang">Clang</div>
                            <div className="lang">Node.js</div>
                        </div>
                    </div>
                    <div className="desc">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo maxime magnam vero laudantium ipsum amet, accusamus quibusdam exercitationem veritatis tempora quidem delectus ipsa? Quasi nesciunt, aut at nihil alias culpa.
                    </div>
                    <div className="buttons">
                        <div className="button">Live Demo</div>
                        <div className="button">GitHub Repo</div>
                    </div>
                </div>
                <div ref={ref2} className={`project-card ${!inView2 ? 'hidden-reverse' : 'show'}`}>
                    <div className="project-header">
                        <div className="title">Fiber Internet Ecommerce Flow Concept</div>
                        <div className="langs">
                            <div className="lang">Angular</div>
                            <div className="lang">Typescript</div>
                            <div className="lang">SCSS</div>
                        </div>
                    </div>
                    <div className="desc">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo maxime magnam vero laudantium ipsum amet, accusamus quibusdam exercitationem veritatis tempora quidem delectus ipsa? Quasi nesciunt, aut at nihil alias culpa.
                    </div>
                    <div className="buttons">
                        <div className="button">Live Demo</div>
                        <div className="button">GitHub Repo</div>
                    </div>
                </div>
                <div ref={ref3} className={`project-card ${!inView3 ? 'hidden' : 'show'}`}>
                    <div className="project-header">
                        <div className="title">Portfolio</div>
                        <div className="langs">
                            <div className="lang">React</div>
                            <div className="lang">Typescript</div>
                            <div className="lang">SCSS</div>
                        </div>
                    </div>
                    <div className="desc">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo maxime magnam vero laudantium ipsum amet, accusamus quibusdam exercitationem veritatis tempora quidem delectus ipsa? Quasi nesciunt, aut at nihil alias culpa.
                    </div>
                    <div className="buttons">
                        <div className="button">GitHub Repo</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
