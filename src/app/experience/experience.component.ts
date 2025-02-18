import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
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
  ]
})
export class Experience {
  cspireHovering = false;
  msuHovering = false;
  internshipHovering = false;
}
