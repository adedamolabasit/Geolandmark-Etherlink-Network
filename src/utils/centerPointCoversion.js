
  
  export const calculatePolygonCenter = (coordinates) => {
    const totalPoints = coordinates.length;
    let sumLat = 0;
    let sumLng = 0;
  
    for (const [lat, lng] of coordinates) {
      sumLat += lat;
      sumLng += lng;
    }
  
    const centerLat = sumLat / totalPoints;
    const centerLng = sumLng / totalPoints;
  
    return [centerLng, centerLat];
  };
  