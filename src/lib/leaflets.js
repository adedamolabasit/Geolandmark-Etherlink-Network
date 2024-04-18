import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
  useMapEvents,
} from "react-leaflet";
import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { calculatePolygonCenter } from "../utils/centerPointCoversion";
import { STATE } from "../utils/stateConstants";
import Logo from "../assets/dashboard/logo.svg";
import Point from "../assets/marketplace/point.svg";
import L from "leaflet";
import { CartesianToGeographic } from "../utils/coordinateConversion";
import { getRegisteredLands } from "../services/landRegistry";
import { fetchMaplData } from "../services/pinata";
import { useAuth } from "../contexts/authContext";

export const BaseMap = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);
  const [status, setStatus] = useState(STATE.IDLE);
  // const fetchLandsRegistry = async () => {
  //   const response = await getRegisteredLands();
  //   console.log(response.data.data.records, "resMap");
  //   setFetchedData(response.data.data.records);
  // };
  // useEffect(() => {
  //   fetchLandsRegistry();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(STATE.LOADING);
        const data = await fetchMaplData();
        setFetchedData(data);
        setStatus(STATE.SUCCESS);
        console.log(data, "retrieved data");
      } catch (error) {
        setStatus(STATE.ERROR);
        console.error("Error fetching pinned data:", error);
      }
    };

    fetchData();
  }, []);
  // const getAllCoordinates = fetchedData.map((data) => {
  //   return data.geographicCoordinates.map((cord) => {
  //     const point = Object.values(cord)[0];
  //     return [point.px, point.py];
  //   });
  // });
  // const convertedCooordinate = getAllCoordinates.map((cord) => {
  //   const geographicCoordinates = cord.map((point) =>
  //     CartesianToGeographic(point[0], point[1])
  //   );
  //   return geographicCoordinates;
  // });
  console.log(fetchedData, "uuuuuuuu");
  let convertedCoordinates;
  if (status === STATE.SUCCESS) {
    convertedCoordinates = fetchedData.map((data) => {
      console.log(data, "ffe");
      return data.landParcel.geographicCoordinates.map((cord) => {
        const point = Object.values(cord)[0];
        const cartesianPoint = [point.px, point.py];
        const geographicPoint = CartesianToGeographic(
          cartesianPoint[0],
          cartesianPoint[1]
        );
        return {
          spatial: geographicPoint,
          nonSpatial: data,
        };
      });
    });
  }

  console.log(convertedCoordinates, "gdgeg");
  let zoom = 10;
  const location = [7.508854, 4.544375];

  const icon = L.icon({
    iconUrl: Logo,
    iconSize: [26, 26],
    iconAnchor: [6, 24],
    popupAnchor: [0, -15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: [13, 28],
  });
  let epcotCenter = [7.466648, 4.566644];
  const handleMarkerClick = (position, zoomLevel) => {
    if (mapInstance) {
      mapInstance.setView(position, zoomLevel);
    }
  };

  return (
    <>
      {status === STATE.LOADING ? (
        "loading.."
      ) : (
        <div className="w-full h-[80vh] bg-gray-100  rounded-[2vh] border border-4 border-[#009FBD">
          <MapContainer
            center={location}
            zoom={zoom}
            className="h-full rounded-[40px] "
          >
            {/* Add the map tile layer */}
            <TileLayer
              url="https://tile.openstreetmap.org/${z}/${x}/${y}.png"
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
            />
            {/* Add a Polygon */}
            <Circle center={epcotCenter} color="magenta" radius={10000} />
            {convertedCoordinates?.map((data, index) => {
              const cordCent = calculatePolygonCenter(
                data.map((coord) => coord.spatial)
              );

              return (
                <React.Fragment key={index}>
                  <Polygon
                    positions={data.map((coord) => coord.spatial)}
                    pathOptions={{ color: "red" }}
                  />
                  <Marker
                    icon={icon}
                    position={data[1].spatial}
                    onClick={() =>
                      handleMarkerClick(
                        data.map((coord) => coord.spatial),
                        18
                      )
                    }
                  >
                    <Popup key={index}>
                      {data.map((attr, innerIndex) =>
                        attr.nonSpatial.id === innerIndex ? (
                          <div key={innerIndex}>
                            <h6 className="text-red-600">
                              {attr.nonSpatial.address}
                            </h6>
                            hey, {attr.nonSpatial.address}
                          </div>
                        ) : null
                      )}
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
            {/* Add a marker */}
          </MapContainer>
        </div>
      )}
    </>
  );
};

export const ExtendedBaseMap = () => {
  const LocationMarker = () => {
    const map = useMapEvents({
      locationfound(e) {
        const { lat, lng } = e.latlng;
        const radius = e.accuracy;

        L.circle(e.latlng, {
          radius,
          fillColor: "green",
          color: "green",
          fillOpacity: 0.5,
        }).addTo(map);

        L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
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
    <MapContainer center={[0, 0]} zoom={13} style={{ height: "500px" }}>
      <TileLayer url="https://tile.openstreetmap.org/${z}/${x}/${y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export const ExtendedBaseMaps = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    const { current } = mapRef;
    console.log(mapRef.current);
    if (current && current.leafletElement) {
      const map = current.leafletElement;
      if (map.on) {
        map.on("locationfound", handleOnLocationFound);
        map.on("locationerror", handleOnLocationError);
      }

      return () => {
        if (map.off) {
          map.off("locationfound", handleOnLocationFound);
          map.off("locationerror", handleOnLocationError);
        }
      };
    }
  }, [mapRef.current]);

  function handleOnLocationFound(event) {
    const { current } = mapRef;
    let circle;
    if (current && current.leafletElement) {
      const map = current.leafletElement;
      const latlng = event.latlng;
      const radius = event.accuracy;
      circle = L.circle(latlng, {
        radius,
        fillColor: "green",
        color: "green",
        fillOpacity: 0.5,
      });
      circle.addTo(map);
    }
    console.log(circle, "circle", current);
  }

  function handleOnLocationError(error) {
    alert(`Unable to determine location: ${error.message}`);
  }

  const fetchLandsRegistry = async () => {
    const response = await getRegisteredLands();
    console.log(response.data.data.records, "resMap");
    setFetchedData(response.data.data.records);
  };

  useEffect(() => {
    fetchLandsRegistry();
  }, []);

  const getAllCoordinates = fetchedData.map((data) => {
    return data.geographicCoordinates.map((cord) => {
      const point = Object.values(cord)[0];
      return [point.px, point.py];
    });
  });

  const convertedCooordinate = getAllCoordinates.map((cord) => {
    const geographicCoordinates = cord.map((point) =>
      CartesianToGeographic(point[0], point[1])
    );
    return geographicCoordinates;
  });

  console.log(getAllCoordinates, "allCoordinates", convertedCooordinate);

  const zoom = 10;
  const location = [7.508854, 4.544375]; // Coordinates for the map center (Nigeria)

  const icon = L.icon({
    iconUrl: Logo,
    iconSize: [14, 14],
    iconAnchor: [6, 24],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  const epcotCenter = [7.466648, 4.566644];

  return (
    <div className="relative z-0w-full h-[89.63vh] bg-gray-100  rounded-[2vh] border border-4 border-[#009FBD">
      <MapContainer
        center={location}
        zoom={zoom}
        className="h-full rounded-[40px] "
        ref={mapRef}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/${z}/${x}/${y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {convertedCooordinate.map((coordinate, index) => {
          const cordCent = calculatePolygonCenter(coordinate);
          return (
            <React.Fragment key={index}>
              <Polygon positions={coordinate} pathOptions={{ color: "red" }} />
              <Marker icon={icon} position={coordinate[1]} />
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export const SingleBaseMap = ({data}) => {
  console.log(data,"totell")

  const zoom = 24;
  const icon = L.icon({
    iconUrl: Logo,
    iconSize: [26, 26],
    iconAnchor: [6, 24],
    popupAnchor: [0, -15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: [13, 28],
  });
  const cartesianCoordinatesData = [
    [
      data.landParcel?.geographicCoordinates[0]?.point1?.px,
      data.landParcel?.geographicCoordinates[0]?.point1?.py,
    ],
    [
      data.landParcel?.geographicCoordinates[1]?.point2?.px,
      data.landParcel?.geographicCoordinates[1]?.point2?.py,
    ],
    [
      data.landParcel?.geographicCoordinates[2]?.point3?.px,
      data.landParcel?.geographicCoordinates[2]?.point3?.py,
    ],
    [
      data.landParcel?.geographicCoordinates[3]?.point4?.px,
      data.landParcel?.geographicCoordinates[3]?.point4?.py,
    ],
  ];
  const convertedCooordinate = cartesianCoordinatesData.map((cord) => {
    const geographicCoordinate = CartesianToGeographic(cord[0], cord[1]);
    return geographicCoordinate;
  });
  const polygonCenter = calculatePolygonCenter(convertedCooordinate);
  const epcotCenter = [polygonCenter[1], polygonCenter[0]];
  const location = [polygonCenter[1], polygonCenter[0]]; // Coordinates for the map center (Nigeria)
  return (
    <>
      
        <div className="w-full h-full bg-gray-100  rounded-[2vh]">
          <MapContainer
            center={location}
            zoom={zoom}
            className="h-full rounded-[40px]"
          >
            <TileLayer
              url="https://tile.openstreetmap.org/${z}/${x}/${y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <Polygon
              positions={convertedCooordinate}
              pathOptions={{ color: "red" }}
            />
            <Marker icon={icon} position={epcotCenter}>
              <Popup>
                {data.ownership.fullName},
                {data.owner?.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
    </>
  );
};
