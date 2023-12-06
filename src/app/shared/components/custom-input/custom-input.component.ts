import { Component, Input, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!:string;
  @Input() autocomplete!: string;
  @Input() icon!:string;

 // para decir si la contraseña va estar o no oculta
  ispassword!:boolean;
  hide:boolean=true;

  constructor() { }

  ngOnInit() {
    if (this.type == 'password') this.ispassword= true;

  }


  showOrHidePassword(){

    this.hide= !this.hide;

    if (this.hide) this.type ='password';
    else this.type = 'text';
  }

}
