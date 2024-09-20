import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textfield',
  standalone: false,
  templateUrl: './Textfield.component.html',
  styleUrl: './Textfield.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
  @Input('label') inputLabel: string = "Field";
  @Input() icon: boolean = false;
  @Input() type: string = "text"
  @Input() name: string = "field";
  @Input() placeholder: string = "Enter";
  @Input() id: string = "";
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = "";
  @Output() onChange = new EventEmitter<any>();

  constructor() { }

  onChangeFormInputValue = (_: any) => { };
  onTouchFormInputValue = (_: any) => { };


  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChangeFormInputValue = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchFormInputValue = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }


  _handleChange(event: any) {
    console.log(event)
    this.onChangeFormInputValue(event)
    this.onChange.emit(event);
  }
}
