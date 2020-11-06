class Countdown {
    constructor(stationName, clientName, clientSurname, partForm) {
        this.stationName = stationName;
        this.clientName = clientName;
        this.clientSurname = clientSurname;
        this.partForm = partForm;
        console.log(this.partForm,partForm)
        this.buttonCanvas = document.getElementById('button-canvas');
        this.display = document.getElementById('dispo-time');
        this.stationNameHtml = document.getElementById('station-name');
        this.clientNameHtml = document.getElementById('name-reservation');
        this.clientSurnameHtml = document.getElementById('surname-reservation');
        this.timer = document.getElementById('timer');
        this.resetReservation = document.getElementById('reset-reservation');
        this.resetConfirm = document.getElementById('reset-confirm');
        this.intervalId = null;
        this.timeStorage = null;
            //partie 1
        if (sessionStorage.getItem('timeStorage')){
            //partie2
            this.time = sessionStorage.getItem('timeStorage');
        } else {
            //partie 3
            this.time = 1200;
        }
        //this.time = sessionStorage.getItem('timeStorage')?sessionStorage.getItem('timeStorage'):1200;
        console.log(this.time)
        this.minutes = Math.floor(this.time / 60)
        this.secondes = Math.floor(this.time - (this.minutes * 60));
        
    }

    init(){
        this.buttonCanvas.addEventListener('click', () => this.launchCountdown(this.time));
        // Si stationName n'est pas null alors on l'envoie dans le sessionStorage (ce if n'est donc executé qu'à la premiere instance de Countdown ( Countdown(name).init()))
        if (this.stationName, this.clientSurname, this.clientName) {
            sessionStorage.setItem('clientName', this.clientName);
            sessionStorage.setItem('clientSurname', this.clientSurname);
        }
    }

    launchCountdown = (time) => {
        this.intervalId = sessionStorage.getItem('intervalId');
        //Dans le cas ou on lance le compteur, alors le stationName est null. 
        //On le défini via le sessionStorage précédemment utilisé (ligne 19)
        this.stationName = sessionStorage.getItem('stationName');
        this.clientName = sessionStorage.getItem('clientName');
        this.clientSurname = sessionStorage.getItem('clientSurname');
        this.display.textContent = `Votre vélo est réservé pour une durée de ${this.minutes} min et ${this.secondes} s`;
        if(this.intervalId){
            clearInterval(this.intervalId);
        }
        this.setTimer('1','flex');
        this.timer.style.flexDirection ='column';  
        this.intervalId = setInterval(() => {
            time--;
            this.minutes = Math.floor(time / 60);
            this.secondes = Math.floor(time - (this.minutes * 60)); 
            if(this.minutes===0 && this.secondes===0){
                clearInterval(this.intervalId);
                this.display.innerHTML = "Votre réservation est annulée";
                sessionStorage.clear();
                return;
            };  
            sessionStorage.setItem('timeStorage', time);
            this.display.textContent = `Votre vélo est réservé pour une durée de ${this.minutes} min et ${this.secondes} s`;
        }, 1000)
        this.stationNameHtml.innerHTML = `${this.stationName}`;
        sessionStorage.setItem('intervalId',this.intervalId);
        this.clientNameHtml.innerHTML = `${this.clientName}`;
        this.clientSurnameHtml.innerHTML = `${this.clientSurname}`;

        this.resetReservation.addEventListener('click', ()=> {
            clearInterval(this.intervalId);
            this.setTimer('0','none');
            this.setResetConfirm('1','block');
            sessionStorage.clear();
            return;       
        })
        
    }

    setTimer=(opacity, display)=>{
        this.timer.style.opacity = opacity;
        this.timer.style.display = display;
    }

    setResetConfirm=(opacity,display)=>{
        this.resetConfirm.style.opacity = opacity;
        this.resetConfirm.style.display= display;
    } 

    countdownFromSessionStorage(){
        this.launchCountdown(sessionStorage.getItem('timeStorage'));
    }
}