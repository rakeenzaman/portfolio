import { trigger, transition, style, animate, state, animation, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Experience } from './experience/experience.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Experience],
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
  ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('exp') exp!: ElementRef;
  @ViewChild('edu') edu!: ElementRef;
  @ViewChild('about') about!: ElementRef;
  title = 'portfolio';
  atTopOfWindow = true;
  isLoading = true;
  showScrollDown = false;

  cspireHovering = false;
  msuHovering = false;
  internshipHovering = false;

  divs = {aboutMe: 'about-me', education: 'education', experience: 'experience', projects: 'projects'};
  currentDiv = this.divs.aboutMe;

  ngAfterViewInit() {
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
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.body.style.overflow = '';
        this.showScrollDown = true;
      }, 3000);
    }
  }

  ngOnDestroy() {
    window.scrollTo(0, 0);
  }

  onScroll = () => {
    if (window.scrollY < 120) {
      this.atTopOfWindow = true;
    } else {
      this.atTopOfWindow = false;
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
          });
        },
        {rootMargin: '-49% 0% -49% 0%'}
    );
    observer.observe(this.about.nativeElement);
    observer.observe(this.exp.nativeElement);
    observer.observe(this.edu.nativeElement);
}
}
