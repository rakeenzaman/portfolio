import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
    trigger('btnLogoAnimation', [
      transition(':enter', [
        style({ width: '0px', opacity: 0}),
        animate('200ms ease-in-out', style({ width: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ width: '*', opacity: 1}),
        animate('200ms ease-in-out', style({ width: '0px', opacity: 0 }))
      ])
    ]),
  ]
})
export class Project {
  @Input() name = "Project Name";
  @Input() githubUrl = "";
  @Input() liveDemoUrl = "";
  @Input() languages = "";
  @Input() description = "This is a brief description of the project, highlighting its main features and technologies used.";
  @ViewChild('container') containerRef!: ElementRef;
  githubHovering: boolean = false;
  liveDemoHovering: boolean = false;


    mouseX: number = 0;
    mouseY: number = 0;
    isMouseOver: boolean = false;
    xDistanceFromCenter: number = 0;
    yDistanceFromCenter: number = 0;

    onMouseMove(event: MouseEvent): void {
      const rect = this.containerRef.nativeElement.getBoundingClientRect();
    
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
    
      this.mouseX = mouseX;
      this.mouseY = mouseY;
    
      this.xDistanceFromCenter = ((mouseX - rect.width / 2) / (rect.width / 2)) * 100;
      this.yDistanceFromCenter = ((mouseY - rect.height / 2) / (rect.height / 2)) * 100;
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

    getLanguagesArray(): string[] {
        return this.languages.split(',').map(lang => lang.trim());
    }
}
