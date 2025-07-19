import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
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
export class Project {

    mouseX: number = 0;
    mouseY: number = 0;
    isMouseOver: boolean = false;
    xDistanceFromCenter: number = 0;
    yDistanceFromCenter: number = 0;

    onMouseMove(event: MouseEvent) {
        event.stopPropagation();

        const rect = (event.target as HTMLElement).getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;

        this.xDistanceFromCenter = ((this.mouseX - rect.width / 2) / (rect.width / 2)) * 100;
        this.yDistanceFromCenter = ((this.mouseY - rect.height / 2) / (rect.height / 2)) * 100;
    }

    rotationPercentage() {
        const distance = Math.sqrt(Math.pow(this.xDistanceFromCenter, 2) + Math.pow(this.yDistanceFromCenter, 2));
        return Math.min(distance / 141.42, 1);
    }

    onMouseEnter() {
        this.isMouseOver = true;
    }

    onMouseLeave() {
        this.isMouseOver = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.xDistanceFromCenter = 0;
        this.yDistanceFromCenter = 0;
    }
}
