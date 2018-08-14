import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle',
  template: `
    <svg class="o">
      <circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200"
        stroke-linecap="round"></circle>
    </svg>
  `,
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
