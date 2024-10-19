
import { FeatureCollection, GeoJsonObject } from 'geojson';  // Importa tipos de GeoJSON
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';  // Importar Leaflet
import { HttpClient } from '@angular/common/http';
import 'leaflet/dist/leaflet.css';  // Importar estilo de Leaflet
import 'leaflet-minimap';
import { Target } from '@angular/compiler';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private geoJsonLayer!: L.GeoJSON;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initMap();

    // Cargar el archivo GeoJSON desde la carpeta assets
    this.http.get('../../assets/map.geojson').subscribe((geoJsonData: any) => {
      console.log(geoJsonData);

      this.geoJsonLayer = L.geoJSON(geoJsonData, {
        onEachFeature: this.onEachFeature  // Manejar cada característica del GeoJSON
      }).addTo(this.map);

      // Centrar el mapa en los límites del GeoJSON
      this.map.fitBounds(this.geoJsonLayer.getBounds());
    });
  }

  private initMap(): void {
    // Inicializar el mapa centrado en una coordenada específica
    this.map = L.map('map').setView([-1.2235437546592038, -78.61598713802806], 13);

    // Agregar capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // MiniMapa y otras capas
    var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '©OpenStreetMap, ©CartoDB',
      subdomains: 'abcd',
      maxZoom: 24
    });

    // Agregar el MiniMap
    var minimap = new (L.Control as any).MiniMap(carto_light, {
      toggleDisplay: true,
      minimized: false,
      position: "bottomleft"
    }).addTo(this.map);

    // Agregar escala al mapa
    L.control.scale({ imperial: false }).addTo(this.map);

  }


  // Función para manejar el PopUp y agregar etiquetas para cada feature del GeoJSON
  private onEachFeature(feature: any, layer: L.Layer): void {
    if (feature.properties && feature.properties.Alimentador) {
      // Mostrar un tooltip permanente con el nombre de la parroquia
      layer.bindTooltip(feature.properties.Alimentador, {
        permanent: true,       // Para que siempre esté visible
        direction: 'center',   // Centrar la etiqueta
        className: 'parish-label' // Opcional: puedes agregar una clase CSS para personalizar el estilo
      });
      // Crear el tooltip con el nombre de la parroquia y añadir estilos directamente

      // Opcional: También puedes mantener el popup si lo deseas al hacer clic
      layer.bindPopup(`<strong>Alimentador: </strong>${feature.properties.Alimentador}`);
    }
  }

  // para hacer zoom dende el combo se a elegido
  escoje(e: Event) {
    const target = e.target as HTMLSelectElement
    let coords = target.value.split(",").map(Number);;
    this.map.flyTo([coords[0], coords[1]], 13);
  }



}





