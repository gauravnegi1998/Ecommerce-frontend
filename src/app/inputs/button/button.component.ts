import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {

  @Input() type: 'button' | 'submit' = 'button';
  @Input() class: string = 'buttonClass';
  @Input() name: string = 'button';
  @Output() _onClick = new EventEmitter<any>();

  ngOnInit(): void {

  }



}
