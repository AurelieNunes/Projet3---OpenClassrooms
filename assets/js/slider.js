class Slider {
    constructor(){
        /*Récupération du tableau (Nodelist)*/
        //recupération du conteneur
        this.slides=document.querySelectorAll(".slide-picture");
        this.totalSlides = this.slides.length;
        /*Compteur du slide*/
        this.index = 0;
        this.previous = document.getElementById('previous');
        this.next = document.getElementById('next');
        this.break = document.getElementById('break');
        this.play = document.getElementById('play');
        /*Gere les events*/
        this.interval = null;
        this.event();
    }

    /*Fonction pour aller à l'image suivante */
    changeSlideNext(){
        let indexNext = null;
        if (this.index < this.totalSlides -1) {
            indexNext = this.index+1;
        } else {
            indexNext = 0;
        }

        this.slides[this.index].classList.remove('slide-active');
        this.slides[indexNext].classList.add('slide-active');
        this.index = indexNext;
    }

    /*Fonction pour aller à l'image précédente */
    changeSlidePrevious(){
        let indexPrev = null;
        if (this.index <= 0) {
            indexPrev = this.totalSlides-1;
        } else {
            indexPrev = this.index-1;
        }
        this.slides[this.index].classList.remove('slide-active');
        this.slides[indexPrev].classList.add('slide-active');
        this.index = indexPrev;
    }

    /*Automatisation de la lecture */
    start() {
        this.displayButton(this.break, 'block');
        this.displayButton(this.play,'none');
        this.interval = setInterval(() => {
            this.changeSlideNext(+1)
        }, 5000);
    };

    stop() {
        clearInterval(this.interval)
        this.displayButton(this.break, 'none');
        this.displayButton(this.play,'block');
    };

    displayButton(button,style){
        button.style.display=style;
    };

    /* Evenement */
    event() {
        this.start();

        //Bouton Pause
        this.break.addEventListener('click', () => {
            this.stop();
        });

        //Bouton Play
        this.play.addEventListener('click', () => {
            this.start();
        });

        //Aller au slider précedent
        this.previous.addEventListener('click', () => {
                this.changeSlidePrevious();
        });

        //Aller au slider suivant
        this.next.addEventListener('click', ()=>{
            this.changeSlideNext();
        });

        //Evenement touche clavier
        document.addEventListener('keyup', (event) => {
            if (event.key === 37) {
                this.changeSlidePrevious();
            }
            if (event.key === 39) {
                this.changeSlideNext();
            }
        });
    }
}