
document.addEventListener("DOMContentLoaded", function(event) 
{ 
/** ELEMENTS DU DOM **/
const partForm = document.getElementById('part-form');
const canvasForm = document.getElementById('canvas-form');

/** SLIDER **/
// Création de mon objet
const slider = new Slider();
console.log(slider);

/** MAP */
// Création de mon objet
const leafletMap = new LeafletMap(partForm);

/** FORM **/
//Récupération du formulaire
let formElt = document.getElementById('form');
// Création de mon objet
const reservation = new Reservation(formElt, partForm, canvasForm);

/** CANVAS **/
//Récupération du canvas
let canvasElt = document.getElementById('canvas');
// Création de mon objet
const canvas = new Canvas(canvasElt, partForm, canvasForm);

/** COUNTDOWN **/
const countdown = new Countdown(null,null,null,partForm);
});