import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/models/marker.model';


 declare var google;
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  map = null;

  constructor() { }
  


  loadMap(){
    const mapEle: HTMLElement =document.getElementById('map');

    const myLatLng= {lat:-33.532315367216306,lng:-70.5571344932541}

    this.map = new google.maps.Map(mapEle,{
      center : myLatLng,
      zoom : 12
    });
    google.maps.event.addListenerOnce(this.map,'idle',()=>{
      mapEle.classList.add('show-map');
      const marker ={
        position: {
          lat:-33.532315367216306,
          lng:-70.5571344932541
        },
        title : 'Sta. Julia 3451, La Florida, Región Metropolitana, Chile'
      }
      this.addMarker(marker);
    });


  }
  

  ngOnInit() {
    this.loadMap();
  }

  addMarker(marker:Marker){
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title:marker.title
    });

  }

}
