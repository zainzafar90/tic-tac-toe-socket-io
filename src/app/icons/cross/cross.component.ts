import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cross',
  template: `
    <svg class="x">
      <path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
      <path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>
    </svg>
  `,
  styleUrls: ['./cross.component.css']
})
export class CrossComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
