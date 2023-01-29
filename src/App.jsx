import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@google/markerclustererplus';
import jsonData1 from './assets/location_array.json';
// import jsonData2 from './assets/test_viol_data.json';

const allPlaces = JSON.parse(JSON.stringify(jsonData1));
console.log(allPlaces.length);
// const allViolations = JSON.parse(JSON.stringify(jsonData2));

const apiOptions = {
  apiKey: "AIzaSyC1GMfeCxwUTTm_yWoSFEpSBPrpnIu2ZYo"
}

const places = [
  {
    business_id: 23,
    name: "Sophie Sucree",
    address: "123 Main St.",
    owner: "John Smith",
    category: "Bakery",
    ville: "Outremont",
    status: "Open",
    location: {
      lat: 45.51530637108047,
      lng: -73.57575248002632
    }
  }
]

const violations = [
  {
    business_id: 23,
    violation_fine: "500 CAD",
    violation_date: "23/01/2005",
  },
  {
    business_id: 23,
    violation_fine: "600 CAD",
    violation_date: "23/06/2002",
  }
  
]

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
    streetViewControl:false,
    fullscreenControl:false,
    // mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: myStyles
  };
  const mapDiv = document.getElementById('map');
  return new google.maps.Map(mapDiv, mapOptions);
}

function addMarkers(map) {
  // Here we would import markers from csv file, each one would 
  // be a json object

  const markers = [];
  for (const place in allPlaces) {
    const image =
    "/img/newMarker.png";
    const markerOptions = {
      map: map,
      position: allPlaces[place].location[0],
      icon: image
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
  // let circle;
  markers.map(marker => {
    marker.addListener('click', event => {
      // On Marker click, open modal window with json information
      // from object, pertaining to address, etc
      var placeToOutput;
      
      for(const place in allPlaces){

        if(allPlaces[place].location[0].lat === event.latLng.lat() && allPlaces[place].location[0].lng === event.latLng.lng()){
          placeToOutput = allPlaces[place];
          break;
        }
      }
    
      // Here add another string with all the violations information
      let titleString = `
      <table class="styled-table">
        <thead>
            <tr>
                <th>Name</th>
                <th><p>`+placeToOutput.name+`</p></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Address</td>
                <td><p>`+placeToOutput.address+`</p></td>
            </tr>
            <tr>
                <td>Town</td>
                <td><p>`+placeToOutput.ville+`</p></td>
            </tr>
            <tr>
                <td>Owner</td>
                <td><p>`+placeToOutput.owner+`</p></td>
            </tr>
            <tr>
                <td>Category</td>
                <td><p>`+placeToOutput.category+`</p></td>
            </tr>
            <tr>
                <td>Status</td>
                <td><p>`+placeToOutput.status+`</p></td>
            </tr>
            
        </tbody>
      </table>
      `;
      // let titleString = "<p>"+placeToOutput.name+"<br>"+placeToOutput.address+"</p>";
      let modalContentDiv = document.getElementsByClassName("modal-content")[0];
      let modalDiv = document.getElementsByClassName("modal")[0];
      
      modalDiv.style.display = "block";

      modalContentDiv.innerHTML = titleString;

      const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };

      map.panTo(location);
      // if (circle) {
      //   circle.setMap(null);
      // }
      // circle = drawCircle(map, location);
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

function closeModal(){
  document.getElementsByClassName("modal")[0].style.display = "none";
}
// Modal div should have an x button to close it
// a section for the title description, and a section for the violations 
export default function App() {
    return (
    <>
    <div className="content-container">
      <div className="flex-center">
        <div className="info-header">
          <div>
            <h1>Placeholder Name</h1>
            <p>Select a marker to see their health violations</p>
          </div>
          <div className='flex-row'>
            <input type="text" className="searchBar" placeholder="Search"/>
            <input type="button" className="submitReport" value="New Report"/>
          </div>
        </div>
      </div>
      <div className="functionality-container">
        <div className="map-container">
          <div id="map"></div>
        </div>
        <div className="modal">
          <input
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
                value="&#x2715;"
          />
          <div className="modal-content">
            
            <div className="description"></div>
            <div className="violations"></div>
          </div>      
        </div>
      </div>
    </div>
    </>
    );
}