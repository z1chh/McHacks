import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@google/markerclustererplus';

const apiOptions = {
  apiKey: "AIzaSyC1GMfeCxwUTTm_yWoSFEpSBPrpnIu2ZYo"
}

const loader = new Loader(apiOptions);

loader.load().then(() => {
  console.log('Maps JS API loaded');
  const map = displayMap();
  console.log("Map displayed !");
  const markers = addMarkers(map);
  clusterMarkers(map, markers);
  addPanToMarker(map, markers);
});

function displayMap() {
  var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ],
    },
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "road.highway",
          "stylers" : [{visibility: "off"}]
        }
      
  ];
  const mapOptions = {
    center: { lat: 45.508888, lng: -73.561668 },
    zoom: 14,
    minZoom: 13,
    // mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: myStyles
  };
  const mapDiv = document.getElementById('map');
  return new google.maps.Map(mapDiv, mapOptions);
}

function addMarkers(map) {
  // Here we would import markers from csv file, each one would 
  // be a json object
  const locations = {
    sophieSucree: { lat: 45.51530637108047, lng: -73.57575248002632 },
    
  }
  const markers = [];
  for (const location in locations) {
    
    const markerOptions = {
      map: map,
      position: locations[location],
      
    }
    const marker = new google.maps.Marker(markerOptions);
    
    markers.push(marker);
  }
  return markers;
}

function clusterMarkers(map, markers) {
  const clustererOptions = { imagePath: './img/m' };
  const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
}

function addPanToMarker(map, markers) {
  let circle;
  markers.map(marker => {
    marker.addListener('click', event => {
      // On Marker click, open modal window with json information
      // from object, pertaining to address, etc

      const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      map.panTo(location);
      if (circle) {
        circle.setMap(null);
      }
      circle = drawCircle(map, location);
    });
  });
}

function drawCircle(map, location) {
  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    map: map,
    center: location,
    radius: 300
  }
  const circle = new google.maps.Circle(circleOptions);
  return circle;
}

export default function App() {
    return (
    <>
    <div className="info-header">
      <div>
        <h1>Placeholder Name</h1>
        <p>Select a marker to see their health violations</p>
      </div>
      <div>
        <input type="button" value="New Report"/>
      </div>
    </div>
    <div className="map-container">
      <div id="map"></div>
    </div>
    </>
    );
}