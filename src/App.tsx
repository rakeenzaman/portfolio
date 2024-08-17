import React, { useEffect } from 'react';
import './App.scss';
import { useInView } from 'react-intersection-observer';
import Experience from './components/experience/experience';
import Education from './components/education/education';
import WorkExperience from './components/work-experience/work-experience';
import github from "./assets/github.svg";
import email from "./assets/email.svg";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

function App() {

  useGSAP(() => {
    gsap.from("#hi",{y:-100, opacity: 0, ease: "power1.out", duration: 1});
    gsap.from(".about-me-container",{y:-100, opacity: 0, ease: "power1.out", delay: 0.1, duration: 1});
    gsap.from(".header-links",{y:-100, opacity: 0, ease: "power1.out", delay: 0.2, duration: 1, stagger: 0.2});
    gsap.from(".main-content",{y:-100, opacity: 0, ease: "power1.out", delay: 0.3, duration: 1});
  });

  function navigateToGithub() {
    window.open("https://github.com/rakeenzaman", "_blank");
  }


  const [headerRef, inView] = useInView({
    threshold: 0.5
  });


  useEffect(() => {
    setTimeout(()=>{document.getElementById("navbar")!.style.display = "flex"},500);
    setTimeout(()=>{window.scrollTo(0, 0)},100);
  }, []);

  return (
    <div className="App">
      <div id="navbar" className={`${!inView ? 'showNavbar' : 'hideNavbar'}`}>
        <p className="navbarHi">Hi, I'm Rakeen</p>
        <div className="git-link" onClick={navigateToGithub}>
          <img className="navbar-icon-logo" src={github} alt="github logo"/>
          <img className="navbar-icon-logo" src={email} alt="email logo"/>
        </div>
      </div >
      <div id="hi">Hi, I'm Rakeen</div>
      <div className="about-me-container">
        <div className="about-me about-me-desc">
          I'm a software developer with a year of professional experience developing in Angular. I have a Bachelor's in Software Engineering and a Master's in Computer Science from Mississippi State University. Thanks for checking out my portfolio!
        </div>
      </div>
      <div className="header-links" ref={headerRef}>
        <div className="header-link">
          <img className="header-link-icon" src={github} alt="github logo"/>
          <p className="header-link-desc">GitHub</p>
        </div>
        <div className="header-link">
          <img className="header-link-icon" src={email} alt="contact me"/>
          <p className="header-link-desc">Contact Me</p>
        </div>
      </div>
      <div className="main-content">
        <Education />
        <Experience />
        <WorkExperience />
      </div>
    </div>
  );
}

export default App;
