class Canvas {
    constructor(canvasElt, partForm, canvasForm) {
        this.partForm = partForm;
        this.canvasForm = canvasForm;
        this.canvasElt = canvasElt;
        this.ctx = this.canvasElt.getContext('2d');
        this.buttonsSetCanvas = document.getElementById('buttons-set-canvas');
        this.buttonCanvas = document.getElementById('button-canvas');
        this.clearButton = document.getElementById('retry');
        this.canvasElt.width = 250;
        this.canvasElt.height = 150;
        this.drawing = false;

        window.innerWidth > 800 ? this.initPc() : this.initMobile();
    }

    initMobile() {
        this.canvasElt.addEventListener('touchstart', e => {
            let position = this.getFingerPosition(e);
            this.ctx.beginPath(); //créer un nouveau dessin
            console.log('ok')
            this.ctx.moveTo(position.posX, position.posY);
        });

        this.canvasElt.addEventListener('touchmove', e => {
            console.log('hop')
            e.preventDefault(); //arrêt du scroll
            let position = this.getFingerPosition(e);
            this.ctx.lineTo(position.posX, position.posY); //créer ligne
            this.ctx.stroke(); //afficher ligne
        });

        //quand on arrête de dessiner, on fait apparaitre les boutons
        this.canvasElt.addEventListener('touchend', () => {
            this.setButtonsSetCanvas('1', 'flex');
            this.setCanvasForm('1', 'flex');
            this.canvasForm.style.flexDirection = 'column';
        });

        //lorsque l'on clique sur recommencer, le canvas se nettoie
        this.clearButton.addEventListener('click', () => {
            this.clear();
        });

        //lorsque l'on clique sur valider, les boutons disparaissent ainsi que le canvas
        this.buttonCanvas.addEventListener('click', () => {
            this.clear();
            this.setButtonsSetCanvas('0', 'none');
            this.setPartForm('0', 'none');
            this.setCanvasForm('0', 'none');
        })
    };

    initPc() {
        //lorsque l'on click avec la souris pour commencer à dessiner
        this.canvasElt.addEventListener('mousedown', e => {
            console.log('okpc')
            let positionMouse = this.getMousePosition(e);
            this.drawing = true;
            this.ctx.beginPath(); //créer un nouveau dessin
            this.ctx.moveTo(positionMouse.positionX, positionMouse.positionY);
            
        });

        //lorsque l'on bouge la souris
        this.canvasElt.addEventListener('mousemove', e => {
            console.log('hoppc')
            if (!this.drawing) {
                return
            }
            let positionMouse = this.getMousePosition(e);
            this.ctx.lineTo(positionMouse.positionX, positionMouse.positionY); //créer ligne
            this.ctx.stroke(); //afficher ligne  
        });

        //quand on arrête de dessiner, on fait apparaitre les boutons
        this.canvasElt.addEventListener('mouseup', () => {
            this.drawing = false;
            this.setButtonsSetCanvas('1', 'flex');
            this.setCanvasForm('1', 'flex');
            this.canvasForm.style.flexDirection = 'column';
        });

        //lorsque l'on clique sur recommencer, le canvas se nettoie
        this.clearButton.addEventListener('click', () => {
            this.clear();
        });

        //lorsque l'on clique sur valider, les boutons disparaissent ainsi que le canvas
        this.buttonCanvas.addEventListener('click', () => {
            this.clear();
            this.setButtonsSetCanvas('0', 'none');
            this.setPartForm('0', 'none');
            this.setCanvasForm('0', 'none');
        })
    };

    //fonction pour réinitialiser le canvas
    clear() {
        this.setButtonsSetCanvas('0', 'none');
        this.ctx.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
    };

    getFingerPosition = (e) => {
        //supprimer le décalage
        let rect = this.canvasElt.getBoundingClientRect();
        const position = {
            posX: e.touches[0].clientX - rect.left,
            posY: e.touches[0].clientY - rect.top
        };
        return position
    };

    getMousePosition = (e) => {
        let rect = this.canvasElt.getBoundingClientRect();
        const positionMouse = {
            positionX: e.clientX - rect.left,
            positionY: e.clientY - rect.top
        };
        return positionMouse
    }

    setButtonsSetCanvas = (opacity, display) => {
        this.buttonsSetCanvas.style.opacity = opacity;
        this.buttonsSetCanvas.style.display = display;
    }

    setPartForm = (opacity, display) => {
        this.partForm.style.opacity = opacity;
        this.partForm.style.display = display;
    }
    
    setCanvasForm = (opacity, display) => {
        this.canvasForm.style.opacity = opacity;
        this.canvasForm.style.display = display;
    }
}
