class LeafletMap {
  constructor() {
    this.map = '';
    this.latCity = 43.6;
    this.lngCity = 1.43;
    this.apiKey = 'abd66f165c4efa8460a47fb0ec73559fe93eb879';
    this.city = 'toulouse';
    this.marker = '';
    this.partForm = document.getElementById('part-form');
    this.form = document.getElementById('form');
    this.addressStation = document.getElementById('address');
    this.detailStation = document.getElementById('details-station');
    this.nameStation = document.getElementById('name-station');
    this.statut = document.getElementById('statut');
    this.dispoBikes = document.getElementById('dispo-bikes');
    this.standsBikes = document.getElementById('stands-bikes');
    this.clientInfo = document.getElementById('client-info');
    this.resetConfirm = document.getElementById('reset-confirm');
    this.initMap();
    this.loadStation();
  }

  /*Fonction Charger map*/

  initMap() {
    this.map = L.map('mapid').setView([this.latCity, this.lngCity], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  /*Charger station */

  loadStation() {
    fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=${this.city}&apiKey=${this.apiKey}`)
      .then(response => response.json())
      .then(data => {
        /*parcourir tableau */
        data.forEach(station => {

          let latitude = station.position.lat;
          let longitude = station.position.lng;
          //Nom de la station
          let stationName = station.name;
          //Etat de la station Open or Close
          let status = station.status;
          //Adresse de la station
          let address = station.address;
          //Nombre de supports à vélo disponibles
          let availableBikeStands = station.available_bike_stands;
          //Nombre de vélos disponibles
          let availableBikes = station.available_bikes;
          //Nombre de supports à vélo totaux
          // let bikeStands = station.bike_stands;

          //Paramètrage des markers
          const LeafIcon = L.Icon.extend({
            options: {
              iconSize: [50, 50],
              iconAnchor: [25, 50],
              popupAnchor: [0, -50]
            }
          });

          //Personnalisation des markers
          const newIconGreen = new LeafIcon({
            iconUrl: 'assets/images/marker_green.png'
          })
          const newIconRed = new LeafIcon({
            iconUrl: 'assets/images/marker_red.png'
          })
          const newIconBlue = new LeafIcon({
            iconUrl: 'assets/images/marker_blue.png'
          })
          const newIconOrange = new LeafIcon({
            iconUrl: 'assets/images/marker_orange.png'
          })

          //Conditions différents markers
          if (status === 'OPEN' && availableBikeStands > 1 && availableBikes > 1) {
            this.marker = L.marker([latitude, longitude], {
              icon: newIconGreen
            }).addTo(this.map)
          } else if (status === 'CLOSE') {
            this.marker = L.marker([latitude, longitude], {
              icon: newIconRed
            }).addTo(this.map)
          } else if (status === "OPEN" && availableBikeStands > 0 && availableBikes < 1) {
            //Si la station est ouverte ET que Nbre de supports de vélo >0 ET que le Nbre de vélo dispo est <1 alors marqueur orange 
            this.marker = L.marker([latitude, longitude], {
              icon: newIconOrange
            }).addTo(this.map)
          }
          //Si la station est ouverte ET que Nbre de supports de vélo <1 ET que le Nbre de vélo dispo est >0 alors marqueur bleu
          else if (status === "OPEN" && availableBikeStands < 1 && availableBikes > 0) {
            this.marker = L.marker([latitude, longitude], {
              icon: newIconBlue
            }).addTo(this.map)
          }

          //Si la station est ouverte ET qu'il y a au moins 1 vélo de dispo alors le formulaire apparait
          this.marker.addEventListener('click', () => {
            sessionStorage.setItem('stationName', stationName);
            this.partForm.style.display = 'block';
            this.detailStation.style.display = 'block';
            this.resetConfirm.style.display = 'none';

            if (status === 'OPEN' && availableBikes > 0) {
              this.clientInfo.style.display = 'block';
              this.clientInfo.style.opacity = '1';
              this.nameStation.innerHTML = stationName;
              this.addressStation.innerHTML = address;
              this.statut.innerHTML = status;
              this.dispoBikes.innerHTML = availableBikes;
              this.standsBikes.innerHTML = availableBikeStands;
            } else {
              this.nameStation.innerHTML = stationName;
              this.addressStation.innerHTML = address;
              this.statut.innerHTML = status;
              this.dispoBikes.innerHTML = availableBikes;
              this.standsBikes.innerHTML = availableBikeStands;
              this.clientInfo.style.display = 'none';
              this.clientInfo.style.opacity = '0';
              this.statut.innerHTML = "Aucuns vélos disponibles actuellement, merci de choisir une autre station";
            }
          })



        new Countdown(stationName).init();


          // if (status === "CLOSE" || status === "OPEN" && availableBikeStands > 0 && availableBikes < 1) {
          //   this.clientInfo.style.display='none';
          // } else {
          //   this.clientInfo.style.display='block'
          // }
          // this.marker.bindPopup(`<b> Nom de la Station </b><br> ${name} <br><b><br> Statut : ${status} </b><br><b>Adresse</b><br> ${address} </b><br><b>Nbres de places disponibles</b><br>${availableBikeStands}<br><b>Nbres de vélos disponibles</b><br> ${availableBikes} </br> Merci de choisir une autre station`);}
          // } else {
          //   this.marker.bindPopup(`<b> Nom de la Station </b><br> ${name} <br><b><br> Statut : ${status} </b><br><b>Adresse</b><br> ${address} </b><br><b>Nbres de places disponibles</b><br>${availableBikeStands}<br><b>Nbres de vélos disponibles</b><br> ${availableBikes} </br>`);
          // }
          //Affichage des Popups
          // let complement= '';
          //           if (status === "CLOSE" || status === "OPEN" && availableBikeStands > 0 && availableBikes < 1)
          //               complement = `Merci de choisir une autre station`;

          //           this.marker.bindPopup(`<b> Nom de la Station </b><br> ${name} <br><b><br> Statut : ${status} </b><br><b>Adresse</b><br> ${address} </b><br><b>Nbres de places disponibles</b><br>${availableBikeStands}<br><b>Nbres de vélos disponibles</b><br> ${availableBikes} </br> ${complement}`);

        })
      })
  }
}
const leafletMap = new LeafletMap()