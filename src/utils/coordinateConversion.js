import proj4 from 'proj4';

export const CartesianToGeographic = (x,y) => {
  const northing = parseFloat(y);
  const easting = parseFloat(x);
  const sourceCRS = '+proj=utm +zone=31 +datum=WGS84';
  const targetCRS = '+proj=longlat +datum=WGS84';
  const lonlatCoords = proj4(sourceCRS, targetCRS, [easting, northing]);
  return [lonlatCoords[1],lonlatCoords[0]];
};