document.addEventListener('DOMContentLoaded', function() {
    try {
        // Координаты просп. Кабанбай Батыра, 13 (Астана)
        const restaurantCoords = [51.1605, 71.4704]; // Широта и долгота
        
      
        const map = L.map('map').setView(restaurantCoords, 17); //
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        fetch('5fcbd266-abb5-4fe4-afaa-5b0b86ab2a8f')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

   
        const restaurantIcon = L.icon({
            iconUrl: 'images/map-icons/restaurant-marker.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });

       
        L.marker(restaurantCoords, {
            icon: restaurantIcon
        }).addTo(map)
        .bindPopup(`
            <div class="custom-popup">
                <h4>GILDED FLAME</h4>
                <p><i class="fas fa-map-marker-alt"></i> просп. Кабанбай Батыра, 13</p>
                <p><i class="fas fa-clock"></i> 11:00 - 23:00</p>
                <p><i class="fas fa-phone"></i> +7 (7172) 123-456</p>
            </div>
        `).openPopup();

       
        const routeBtn = L.control({position: 'topright'});
        routeBtn.onAdd = function() {
            const div = L.DomUtil.create('div', 'route-btn');
            div.innerHTML = `<button class="btn btn-danger btn-sm">
                <i class="fas fa-route"></i> Маршрут
            </button>`;
            div.onclick = () => {
                window.open(`https://yandex.ru/maps/?rtext=~${restaurantCoords.join(',')}`);
            };
            return div;
        };
        routeBtn.addTo(map);

    } catch (error) {
        console.error("Ошибка загрузки карты:", error);
        document.getElementById('map').innerHTML = `
            <div class="alert alert-warning">
                <p>Адрес: просп. Кабанбай Батыра, 13, Астана</p>
                <p>Телефон: +7 (7172) 123-456</p>
            </div>
        `;
    }
    async function initMap() {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { Autocomplete } = await google.maps.importLibrary("places");
  const { AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker");

  const mapOptions = {
    center: { lat: 28.43268, lng: 77.0459 }, 
    zoom: 16,
    mapStyle: 'https://maps.googleapis.com/maps/api/js/examples/styles/minimal_hosting.json', 
    mapId: "f8b9e6163e48e501"
  };

  const map = new Map(document.getElementById("map"), mapOptions);

  const landmarksSelect = document.getElementById('landmarks');
  const combinedAddressInput = document.getElementById('combined-address');
  let formattedAddress = "";

  const geocoder = new google.maps.Geocoder(); 

  let marker = new AdvancedMarkerElement({
    map,
    position: mapOptions.center,
    gmpDraggable: true
  });
  let infoWindow;
  const descriptorMarkers = []; 

  const addressInput = document.getElementById('address-autocomplete');
  const aptSuiteInput = document.getElementById('apt-suite');
  const cityInput = document.getElementById('city');
  const stateProvinceInput = document.getElementById('state-province');
  const zipPostalCodeInput = document.getElementById('zip-postal-code');
  const countryInput = document.getElementById('country');

  const autocomplete = new google.maps.places.Autocomplete(addressInput, {
    fields: ['place_id', 'address_components', 'formatted_address', 'geometry', 'name']
    
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      console.error("No details available for input: '" + place.name + "'");
      return;
    }

    marker.position = place.geometry.location;

    map.setCenter(place.geometry.location);

  
    fillInAddress(place); 
    formattedAddress = place.formatted_address;


    addressDescriptorPlaceIdLookup(place.place_id);

    infoWindow = new InfoWindow({
      content: place.name,
      headerDisabled: true     
    });

    infoWindow.open(map, marker); 

  });

  function fillInAddress(place) { 

    aptSuiteInput.value = '';
    cityInput.value = '';
    stateProvinceInput.value = '';
    zipPostalCodeInput.value = '';
    countryInput.value = '';
    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'street_number': {
          addressInput.value = `${component.long_name} `;
          break;
        }

        case 'route': {
          addressInput.value += component.short_name;
          break;
        }

        case 'premise': {
          aptSuiteInput.value = component.short_name;
          break;
        }

        case 'subpremise': {
          aptSuiteInput.value = component.short_name;
          break;
        }

        case 'locality':
          cityInput.value = component.long_name;
          break;
        case 'administrative_area_level_1': {
          stateProvinceInput.value = component.short_name;
          break;
        }
        case 'postal_code': {
          zipPostalCodeInput.value = component.long_name;
          break;
        }
        case 'country':
          countryInput.value = component.long_name;
          break;
      }
    }

    M.updateTextFields(); 
  }

  function addressDescriptorPlaceIdLookup(placeId) {
    geocoder.geocode({
      'placeId': placeId,
      'extraComputations': ['ADDRESS_DESCRIPTORS'],
      'fulfillOnZeroResults': true
    }, function(results, status) {
      if (status == 'OK') {
        let addressDescriptor = results[0].address_descriptor;
        if(addressDescriptor) {
          const descriptors = results[0].address_descriptor.landmarks;
          landmarksSelect.innerHTML = '<option value="" disabled selected>Choose your Landmark</option>';

         
          descriptorMarkers.forEach(marker => marker.setMap(null));
          descriptorMarkers.length = 0;

          descriptors.forEach((descriptor, index) => {

            const option = document.createElement('option');
            option.value = descriptor.display_name; 
            option.text = descriptor.spatial_relationship + " " + descriptor.display_name;
            landmarksSelect.appendChild(option);

            const descriptorMarkerContent = document.createElement('div');
            if (index === 0) {
              descriptorMarkerContent.className = 'descriptor-marker highlighted';
            } else {
              descriptorMarkerContent.className = 'descriptor-marker';
            }
            
            descriptorMarkerContent.textContent = ++index;

            geocoder.geocode({ placeId: descriptor.place_id }, (results, status) => {
              if (status === "OK") {

                
                const landmarkInfoWindow = new InfoWindow({
                  content: descriptor.display_name,
                  headerDisabled: true
                });

                const _marker = new AdvancedMarkerElement({
                  map: map,
                  position: results[0].geometry.location,
                  content: descriptorMarkerContent
                });
                descriptorMarkers.push(_marker); 
                _marker.content.addEventListener("mouseover", () => {
                  landmarkInfoWindow.open(map, _marker);
                });
                _marker.content.addEventListener("mouseout", () => {
                  landmarkInfoWindow.close();
                });

              } else {
                console.error("Error geocoding landmark:", status);
              }
            });
          });

        
          if (landmarksSelect.options.length > 1) {
            landmarksSelect.selectedIndex = 1; 
            updateCombinedAddress();
            M.FormSelect.init(landmarksSelect); 
          }
        } else {
          
          removeOptions(landmarksSelect);
        
          combinedAddressInput.value = "";
          alert("No Landmarkers available");         
        }

      } else {
        window.alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

 
  function updateCombinedAddress() {
    const address = formattedAddress;
    const landmark = landmarksSelect.options[landmarksSelect.selectedIndex].text;
 
    combinedAddressInput.value = `${address}\n${landmark}`;
    M.updateTextFields();
  }

  
  landmarksSelect.addEventListener('change', () => {
    updateCombinedAddress();

  
    const selectedIndex = landmarksSelect.selectedIndex - 1; 
    descriptorMarkers.forEach((marker, index) => {
      if (selectedIndex === (parseInt(marker.content.textContent)-1)) {
        marker.content.classList.add("highlighted");
      } else {
        marker.content.classList.remove("highlighted");
      }
    });
  });  


  
  marker.addListener('dragend', () => {
    const newPosition = marker.position;
    geocoder.geocode({ 
      location: newPosition, 
      'extraComputations': ["ADDRESS_DESCRIPTORS"],
      'fulfillOnZeroResults': true 
    }, (results, status) => {
      if (status === "OK") {
       
        if (results[0]) {
          const place = results[0];
         
          fillInAddress(place);
          formattedAddress = place.formatted_address;
       
          updateCombinedAddress();
         
          addressDescriptorPlaceIdLookup(place.place_id);
          map.setCenter(newPosition);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  });

}

function removeOptions(selectElement) {
  var instance = M.FormSelect.getInstance(selectElement); 
  instance.destroy(); 

  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
    selectElement.remove(i);
  }

 
  instance = M.FormSelect.init(selectElement);
}


initMap();
});

