import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@google/markerclustererplus';
import jsonData1 from './assets/location_array.json';
import jsonData2 from './assets/violations.json';
import { useState } from "react";

const allPlaces = JSON.parse(JSON.stringify(jsonData1));
const allViolations = JSON.parse(JSON.stringify(jsonData2));

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

var globalMap;

loader.load().then(() => {
  console.log('Maps JS API loaded');
  const map = displayMap();
  globalMap = map;
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

function convertDate(date){
  return date.slice(0,4)+"/"+date.slice(4,6)+"/"+date.slice(6,8);
}

function addPanToMarker(map, markers) {
  // let circle;
  markers.map(marker => {
    marker.addListener('click', event => {
      // On Marker click, open modal window with json information
      // from object, pertaining to address, etc
      var placeToOutput;

      let placeViolations = new Array(); 
      
      for(const place in allPlaces){

        if(allPlaces[place].location[0].lat === event.latLng.lat() && allPlaces[place].location[0].lng === event.latLng.lng()){
          placeToOutput = allPlaces[place];
          break;
        }
      }

      for(const violation in allViolations){
        if(allViolations[violation].business_id === placeToOutput.business_id){
          placeViolations.push(allViolations[violation]);
          
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

      var violationString;
      var totalViolationString = '';
      var currViolation;

      for(const confViolation in placeViolations){
        currViolation = placeViolations[confViolation];
        violationString = `
        <div class="violation-card">
          <div class="info-row">
            <div class="info-col left">
              <p class="label">Date</p>
              <p class="value">`+convertDate(currViolation.date)+`</p>
            </div>
            <div class="info-col right">
              <p class="label">Date Judgement</p>
              <p class="value">`+convertDate(currViolation.date_jugement)+`</p>
            </div>
          </div>
          <div class="info-row left">
            <div class="info-col1">
              <p class="label">Fine</p>
              <p class="value">$`+currViolation.montant+`</p>
            </div>
            <div class="info-col right">
              <p class="label">Status Date</p>
              <p class="value">`+convertDate(currViolation.date_statut)+`</p>
            </div>
          </div>
          <div class="info-row">
            <div class="info-col left">
              <p class="label">business_id</p>
              <p class="value">`+currViolation.business_id+`</p>
            </div>
            <div class="info-col right">
              <p class="label">case_id</p>
              <p class="value">`+currViolation.id_poursuite+`</p>
            </div>
          </div>
          <div class="info-row">
            `+currViolation.description+`
          </div>
        </div>
      `;

        totalViolationString += violationString;
      }

      let descriptionDiv = document.getElementsByClassName("description")[0];
      let modalDiv = document.getElementsByClassName("modal")[0];
      let violationsDiv = document.getElementsByClassName("violations")[0];

      modalDiv.style.display = "block";

      descriptionDiv.innerHTML = titleString;
      violationsDiv.innerHTML = totalViolationString;

      const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };

      map.panTo(location);

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

function navigateToPlace(location){
  document.getElementById("search-bar").value = "";
  console.log("Navigating to "+location);
  globalMap.panTo(location);
}

// a section for the title description, and a section for the violations 
export default function App() {
   const [query, setQuery] = useState("");
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
            
              <input type="text" id="search-bar" className="searchBar" placeholder="Search" onChange={event => setQuery(event.target.value)} />
              <div className="search-output">
              {
                jsonData1.filter(post => {
                  if(query === "") {
                    return "";
                  }
                else if (post.name.toLowerCase().includes(query.toLowerCase())){
                  
                  return post;
                }
              }).slice(0,4).map((post, index) => (
                <div className="box" onClick={() => { navigateToPlace(post.location[0]); }} key={index}>
                  <p>{post.name}</p>
                  <p className="search-label">{post.address}</p>
                </div>
              ))
              }
            </div>
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