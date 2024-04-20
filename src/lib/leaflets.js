import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
} from "react-leaflet";
import React, { useState} from "react";
import "leaflet/dist/leaflet.css";
import { calculatePolygonCenter } from "../utils/centerPointCoversion";
import { STATE } from "../utils/stateConstants";
import Logo from "../assets/dashboard/logo.svg";
import L from "leaflet";
import { CartesianToGeographic } from "../utils/coordinateConversion";
import { useNavigate } from "react-router-dom";

export const BaseMap = (props) => {
  const [status, setStatus] = useState(STATE.IDLE);
  const navigate = useNavigate()

  let convertedCoordinates;
 

  convertedCoordinates = props.fetchedData.map((data) => {
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
  // const handleMarkerClick = (position, zoomLevel) => {
  //   console.log(position, "lobe");
  //   if (mapInstance) {
  //     mapInstance.setView(position, zoomLevel);
  //   }
  // };



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
                  {data.map((attr, innerIndex) => (
                    <Marker
                      key={attr.nonSpatial.owner.parcelNumber} // Use a unique key based on parcelNumber
                      icon={icon}
                      position={attr.spatial} // Assuming attr.spatial is correct spatial data
                      onClick={() =>
                        handleMarkerClick(attr.nonSpatial.owner.parcelNumber)
                      }
                    >
                      {/* {selectedParcelId ===
                        attr.nonSpatial.owner.parcelNumber && ( */}
                      <Popup>
                        <div
                          style={{
                            width: "300px",
                            maxHeight: "400px",
                            overflowY: "auto",
                            overflowX: "hidden",
                          }}
                          className="bg-black rounded-md px-4 py-4 w-full"
                        >
                          <div className="flex gap-2 bg-white px-2 py-2 rounded-md">
                            <div className="text-black text-lg text-bold">
                              Powered by
                            </div>
                            <img
                              src="https://testnet-explorer.etherlink.com/assets/network_logo.svg"
                              alt="texos"
                            />
                          </div>
                          <h6 className="mt-4 text-[#009FBD]">
                            Token Information
                          </h6>
                          <table className="table-auto">
                            <tbody>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold">
                                  TokenId:
                                </td>
                                <td className="text-white truncate ">
                                  {attr.nonSpatial.owner.fullName}
                                </td>
                              </tr>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold">
                                  Token Url:
                                </td>
                                <td className="text-white">
                                  {attr.nonSpatial.owner.address}
                                </td>
                              </tr>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold ">
                                  Date Minted:
                                </td>
                                <td className="text-white">
                                  {attr.nonSpatial.owner.emailAddress}
                                </td>
                              </tr>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold">
                                  Email:
                                </td>
                                <td className="text-white">
                                  {attr.nonSpatial.owner.emailAddress}
                                </td>
                              </tr>
                              {/* Add more rows for additional information */}
                            </tbody>
                          </table>
                          <h6 className="mt-4 text-[#009FBD]">
                            Property Information
                          </h6>
                          <table className="table-auto">
                            <tbody>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold ">
                                  {" "}
                                  Asset Type:
                                </td>
                                <td className="text-white truncate mt-2">
                                  Land Parcel
                                </td>
                              </tr>

                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold">
                                  ParcelId:
                                </td>
                                <td className="text-white truncate mt-2">
                                  {attr?.nonSpatial?.owner?.parcelNumber}
                                </td>
                              </tr>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold">
                                  Area:
                                </td>
                                <td className="text-white truncate mt-2">
                                  {attr?.nonSpatial?.owner?.value}
                                </td>
                              </tr>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold">
                                  Estimated Value:
                                </td>
                                <td className="text-white truncate mt-2">
                                  {attr?.nonSpatial?.owner?.area}
                                </td>
                              </tr>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold">
                                  Address:
                                </td>
                                <td className="text-white truncate mt-2">
                                  {attr?.nonSpatial?.owner?.address}
                                </td>
                              </tr>
                              {/* Add more rows for property details */}
                            </tbody>
                          </table>
                          <h6 className="mt-4 text-[#009FBD]">
                            Geographic Coordinates Information
                          </h6>
                          <table className="table-auto">
                            <tbody>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold ">
                                  {" "}
                                  Latitude:
                                </td>
                                <td className=" text-white truncate mt-2">
                                  {
                                    attr?.nonSpatial?.landParcel
                                      ?.geographicCoordinates[0]?.point1?.px
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="text-[#865DFF] font-medium text-bold ">
                                  Longtitude:
                                </td>
                                <td className="text-white truncate mt-2">
                                  {
                                    attr?.nonSpatial?.landParcel
                                      ?.geographicCoordinates[0]?.point1?.py
                                  }
                                </td>
                              </tr>
                              {/* Add more rows for property details */}
                            </tbody>
                          </table>
                          <div className="w-full justify-center mt-6 ml-6">
                            {/* <button
                              onClick={() =>
                                handleView(
                                  attr?.nonSpatial?.owner?.parcelNumber
                                )
                              }
                              className="bg-[#009FBD] font-bold w-[45.35vw] md:w-[15.68vw] h-[4.72vh] md:rounded-[0.53rem] rounded-[0.22rem] text-white "
                            >
                              <h1 className="text-white">More Information</h1>
                            </button> */}
                          </div>
                        </div>
                      </Popup>
                      {/* )} */}
                    </Marker>
                  ))}
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


export const SingleBaseMap = ({ data }) => {
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
              {data.ownership.fullName},{data.owner?.address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};
