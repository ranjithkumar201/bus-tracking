import { Component, AfterViewInit } from "@angular/core";
import * as L from 'leaflet';
import "leaflet-routing-machine";
//import { Draggable } from 'leaflet';
//import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";
//import * as ELG from "esri-leaflet-geocoder";
//import Geocoder from 'leaflet-control-geocoder';
import { Geocoder, geocoders } from "leaflet-control-geocoder";
//import * as geojson from 'geojson';
//import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
//import "leaflet-routing-machine/dist/leaflet-routing-machine.min.js";
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/bus.png';
const iconUrl = 'assets/bus.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
//  shadowUrl,
  iconSize: [25, 61],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;
//temp
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
   
  private map: any;
  private initMap(): void {
    this.map = L.map("map", {
      center: [13.0827, 80.2707],
      zoom: 17,
      attributionControl: false,
    });
    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        
        minZoom: 2,
      }
    );
    //38,95
    tiles.addTo(this.map);
    var myIcon = L.icon({
      iconUrl: "/assets/bus.png",
      iconSize: [25, 60],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });
              //const marker
    //L.marker([13.0827, 80.2707], { icon: myIcon }).addTo(this.map);
    // search location
    new Geocoder({
      geocoder: new geocoders.Nominatim(),
      position: "topright",
    }).addTo(this.map);
      //attribution
    L.control
      .attribution({
        prefix:
          '<span><a href="https://www.zogx.io", class="your_class"><img style="height:15px;width:45px;" src="assets/logo1.png"></img></a></span>',
      })
      .addTo(this.map);
      //waypoint
    L.Routing.control({
      waypoints: [L.latLng(13.0827, 80.2707),
         L.latLng(10.9176, 76.9877)],
         routeWhileDragging:true,
         showAlternatives:true,
         addWaypoints:true,
    }).addTo(this.map);
   this.map.flyTo([13.0827, 80.2707], 12);
  }
                                             
        constructor() {}
  ngAfterViewInit(): void {
    this.initMap();
  }

}
