import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cod-qr',
  templateUrl: './cod-qr.page.html',
  styleUrls: ['./cod-qr.page.scss'],
})
export class CodQrPage implements OnInit {
  cod: string = null;


  constructor() { 
    this.cod='https://instagram.com/loretoloyola83?igshid=YTQwZjQ0NmI0OA==';
  }

  ngOnInit() {
  }

}
