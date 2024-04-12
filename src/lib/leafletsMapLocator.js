import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polygon,
    Circle,
    useMapEvents
  } from "react-leaflet";
  import React, { useState, useEffect, useRef } from "react";
  import "leaflet/dist/leaflet.css";
  import { calculatePolygonCenter } from "../utils/centerPointCoversion";
  import Logo from "../assets/dashboard/logo.svg";
  import Point from "../assets/marketplace/point.svg";
  import L from "leaflet";
  import { useProperty } from "../contexts/propertyContext";
  import { CartesianToGeographic } from "../utils/coordinateConversion";
  import {
    getRegisteredLands,
    getSingleRegisteredLands,
  } from "../services/landRegistry";


export const ExtendedBaseMap = () => {
    const location = [7.508854, 4.544375];
    const LocationMarker = () => {
      const map = useMapEvents({
        locationfound(e) {
          const { lat, lng } = e.latlng;
          const radius = e.accuracy;
  
          L.circle(e.latlng, {
            radius,
            fillColor: '',
            color: '#009FBD',
            fillOpacity: 0.5,
          }).addTo(map);
  
          L.marker(e.latlng).addTo(map).bindPopup('You are here').openPopup();
        },
        locationerror(e) {
          alert(`Unable to determine location: ${e.message}`);
        },
      });
  
      useEffect(() => {
        map.locate({ setView: true, watch: true, maxZoom: 16 });
      }, [map]);
  
      return null;
    };
  
    return (
      <MapContainer center={[0, 0]} zoom={13} style={{ height: '500px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    );
  };
  
  
