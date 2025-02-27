import { trigger, transition, style, animate, state } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Experience } from './experience/experience.component';

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
      state('true', style({ height: '101vh', marginTop: '0px', transform: 'scale(1.5)' })),
      state('false', style({ height: '300px', marginTop: '300px' })),
      transition('true <=> false', [
        animate('500ms cubic-bezier(0,.31,.02,1)')
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
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('exp') exp!: ElementRef;
  title = 'portfolio';
  atTopOfWindow = true;
  isLoading = true;
  showScrollDown = false;

  ngOnInit() {
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.isLoading = false;
    }, 1000);
    console.log('App component initialized');
    window.scrollTo(0, 0);
    console.log(window.scrollY);
    window.addEventListener('scroll', this.onScroll);
    window.onbeforeunload = function(event)
    {
      setTimeout(()=>{window.scrollTo(0, 0)},0);
    };

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
    console.log(window.scrollY);
  };

  ngAfterViewInit() {
    const threshold = 0.2;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  console.log(entry);
                    console.log('Element is fully visible in screen');
                    //observer.disconnect();
                } else {
                    console.log('Element is not fully visible in screen');
                }
            });
        },
        { threshold }
    );
    observer.observe(this.exp.nativeElement);
}
}
