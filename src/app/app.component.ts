import { trigger, transition, style, animate, state, animation, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Experience } from './experience/experience.component';
import { Project } from './project/project.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Experience, Project],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0px', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('300ms ease-in-out', style({ height: '0px', opacity: 0 }))
      ])
    ]),
    trigger('expandCollapseSmall', [
      transition(':enter', [
        style({ height: '0px', opacity: 0}),
        animate('200ms 100ms ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1}),
        animate('200ms ease-in-out', style({ height: '0px', opacity: 0 }))
      ])
    ]),
    trigger('header', [
      state('true', style({ height: '101vh', marginTop: '0px' })),
      state('false', style({ height: '300px', marginTop: '300px' })),
      transition('true <=> false', [
        animate('1s cubic-bezier(0,.31,.02,1)')
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('dynamicTransition', [
      state('true', style({ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' })),
      state('false', style({ opacity: 0, transform: 'translateY(100px)', filter: 'blur(5px)' })),
      transition('false => true', [
        animate('1s {{ delay }}ms cubic-bezier(0,.31,.02,1)')
      ]),
      transition('true => false', [
        animate('0.5s cubic-bezier(0,.31,.02,1)')
      ])
    ]),
    trigger('welcomeAnimation', [
      transition(':enter', [
        style({ opacity: 0, width: '0', transform: 'translateX(0px)', filter: 'blur(5px)' }),
        animate('1000ms ease-in-out', style({ opacity: 1, width: '*', transform: 'translateX(0)', filter: 'blur(0px)' }))
      ]),
    ]),
    trigger('alertTextAnimation', [
      transition(':enter', [
        style({ opacity: 0, width: '0', transform: 'translateX(0px)', filter: 'blur(5px)', marginLeft: '0px' }),
        animate('700ms 600ms ease-in-out', style({ opacity: 1, width: '*', transform: 'translateX(0)', filter: 'blur(0px)', marginLeft: '12px' }),)
      ]),
    ]),
  ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('exp') exp!: ElementRef;
  @ViewChild('skills') skills!: ElementRef;
  @ViewChild('edu') edu!: ElementRef;
  @ViewChild('about') about!: ElementRef;
  @ViewChild('projects') projects!: ElementRef;
  title = 'portfolio';
  atTopOfWindow = true;
  isLoading = true;
  showScrollDown = false;

  cspireHovering = false;
  msuHovering = false;
  internshipHovering = false;
  skillsHovering = false;

  showCursor = false;
  isHoveringSomething = false;

  divs = {aboutMe: 'about-me', education: 'education', experience: 'experience', skills: 'skills', projects: 'projects'};
  currentDiv = this.divs.aboutMe;

  showEmailTooltip = false;

  showWelcomeMsg = false;
  scrollPercentage = 0;

  ngAfterViewInit() {
    this.isLoading = false;
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.isLoading = false;
      setTimeout(() => {
        this.initObserver();
      }, 0);
    }, 1000);
    console.log('App component initialized');
    window.scrollTo(0, 0);
    console.log(window.scrollY);
    window.addEventListener('scroll', this.onScroll);

    if (window.scrollY < 120) {
      //document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.body.style.overflow = '';
        this.showScrollDown = true;
      }, 3000);
    }

    const cursor = document.getElementById("cursor");

    document.body.onpointermove = event => {
        this.showCursor = true;
        const { clientX, clientY } = event;

        cursor?.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        
        }, {duration: 1000, fill: "forwards"})

    }

    setTimeout(() => {
      this.showWelcomeMsg = true;
    }, 1500);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollPercentage = parseInt(((scrollTop / scrollHeight) * 100).toFixed(0));
      if (this.scrollPercentage > 10) {
        document.getElementById('background')!.style.setProperty('opacity', `0.${Math.abs(this.scrollPercentage - 100)}`);
      }
      if (this.scrollPercentage > 90) {
        document.getElementById('background')!.style.setProperty('opacity', `0.1`);
      }
      console.log(`0.${Math.abs(this.scrollPercentage - 100)}`);
    });
  }

  ngOnDestroy() {
    window.scrollTo(0, 0);
  }

  onScroll = () => {
    if (window.scrollY < 120) {
      this.atTopOfWindow = true;
    } else {
      this.atTopOfWindow = false;
      console.log('not at top of window');
    }
  };

  initObserver() {
      const threshold = 0.1;
      const observer = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                if (entry.target === this.about.nativeElement && entry.isIntersecting) {
                  this.currentDiv = this.divs.aboutMe;
                }
                if (entry.target === this.exp.nativeElement && entry.isIntersecting) {
                  this.currentDiv = this.divs.experience;
                }
                if (entry.target === this.edu.nativeElement && entry.isIntersecting) {
                  this.currentDiv = this.divs.education;
                }
                if (entry.target === this.projects.nativeElement && entry.isIntersecting) {
                  this.currentDiv = this.divs.projects;
                }
                if (entry.target === this.skills.nativeElement && entry.isIntersecting) {
                  this.currentDiv = this.divs.skills;
                }
            });
          },
          {rootMargin: '-36% 0% -62% 0%'}
      );
      observer.observe(this.about.nativeElement);
      observer.observe(this.exp.nativeElement);
      observer.observe(this.edu.nativeElement);
      observer.observe(this.projects.nativeElement);
      observer.observe(this.skills.nativeElement);
  }

  emailClicked() {
    if (!this.showEmailTooltip) {
      navigator.clipboard.writeText('email@email.com');
      this.showEmailTooltip = true;
      setTimeout(() => {
        this.showEmailTooltip = false;
      }, 5000);
    }
  }

  gitHubClicked = () => window.open('https://github.com/rakeenzaman');
  hoverOn = () => this.isHoveringSomething = true;
  hoverOff = () => this.isHoveringSomething = false;
}
