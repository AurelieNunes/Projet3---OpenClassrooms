class Reservation {
    constructor(formElt, partForm, canvasForm) {
        this.formElt = formElt;
        this.partForm = partForm;
        this.name = document.getElementById('name');
        this.surname = document.getElementById('surname');
        this.canvasForm = canvasForm;
        this.clientName = null;
        this.clientSurname = null;
        this.sessionStorage = null;
        this.getInfos();
        this.init();
    }

    getInfos() {
        //récupère les valeurs du local storage
        this.clientName = localStorage.getItem('clientName');
        this.clientSurname = localStorage.getItem('clientSurname');
        //si clientName et clientSurname ne sont pas null, pré remplis les champs
        if (this.clientName && this.clientSurname) {
            this.name.setAttribute('value', this.clientName);
            this.surname.setAttribute('value', this.clientSurname);
        }

        this.formElt.addEventListener('submit', e => {
            e.preventDefault();
            this.clientName = this.name.value;
            this.clientSurname = this.surname.value;
            
            if(this.clientName.trim()!== '' || this.clientSurname.trim()!=='') {
                this.setCanvasForm('1','flex');         
                this.setPartForm('0','none');
                //créer localstorage à l'envoi du formulaire
                this.setItemLocalStorage('clientName', this.clientName);
                this.setItemLocalStorage('clientSurname',this.clientSurname);
                // Ici on ne connait pas le nom de la station, mais le nom et le prénom. Donc on envoie null, et nom et prénom
                new Countdown(this.stationName, this.clientName, this.clientSurname).init();
            }            
        })   
    }
    setCanvasForm = (opacity, display) => {
        this.canvasForm.style.opacity = opacity;
        this.canvasForm.style.display = display;
    }

    setPartForm = (opacity, display) => {
        this.partForm.style.opacity = opacity;
        this.partForm.style.display = display;
    }

    setItemLocalStorage(key, value){
        localStorage.setItem(`${key}`, value);
    }

    init(){
        this.sessionStorage = sessionStorage.getItem('timeStorage');
        if(this.sessionStorage){
           window.addEventListener('load', ()=> {
            //instance de countdown en appelant la fonction countdownFromSessionStorage()
            new Countdown(sessionStorage.getItem('stationName')).countdownFromSessionStorage();
           })
        }
    }
}
