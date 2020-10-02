class Canvas {
    constructor(){
        this.partForm = document.getElementById('part-form');
        this.canvasForm = document.getElementById('canvas-form');
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.buttonsCanvas = document.getElementById('buttons-canvas');
        this.buttonSubmitCanvas = document.getElementById('button-canvas');
        this.clearButton = document.getElementById('retry');
        this.canvas.width = 250;
        this.canvas.height = 150;
        this.drawing = false;

        this.initMobile();
        this.initPc();
    }

    initMobile(){
        this.canvas.addEventListener('touchstart', e => {
            let position = this.getFingerPosition(e);
            this.ctx.beginPath();//créer un nouveau dessin
            this.ctx.moveTo(position.posX, position.posY);
        });

        this.canvas.addEventListener('touchmove', e => {
            e.preventDefault();//arrêt du scroll
            let position = this.getFingerPosition(e);
            this.ctx.lineTo(position.posX, position.posY);//créer ligne
            this.ctx.stroke();//afficher ligne
        });

        //quand on arrête de dessiner, on fait apparaitre les boutons
        this.canvas.addEventListener('touchend', () => {
            this.setButtonsCanvas('1','flex');
            this.canvasForm.style.display='flex';
            this.canvasForm.style.flexDirection='column';
        });

        //lorsque l'on clique sur recommencer, le canvas se nettoie
        this.clearButton.addEventListener('click', () => {
            this.clear();
        });

        //lorsque l'on clique sur valider, les boutons disparaissent ainsi que le canvas
        this.buttonSubmitCanvas.addEventListener('click', () => {
            this.clear();
            this.setButtonsCanvas('0','none');
            this.partForm.style.opacity = '0';
            this.partForm.style.display = 'none';
            this.canvasForm.style.opacity ='0';
            this.canvasForm.style.display = 'none';
        })
    };

    initPc (){

        //lorsque l'on click avec la souris pour commencer à dessiner
        this.canvas.addEventListener('mousedown', e => {
            let positionMouse = this.getMousePosition(e);
            this.drawing=true;
            this.ctx.beginPath();//créer un nouveau dessin
            this.ctx.moveTo(positionMouse.positionX, positionMouse.positionY);
        });

        //lorsque l'on bouge la souris
        this.canvas.addEventListener('mousemove', e => {
            if (!this.drawing){
                return
            }
            let positionMouse = this.getMousePosition(e);
            this.ctx.lineTo(positionMouse.positionX,positionMouse.positionY);//créer ligne
            this.ctx.stroke();//afficher ligne
        });

        //quand on arrête de dessiner, on fait apparaitre les boutons
        this.canvas.addEventListener('mouseup', () => {
            this.drawing = false;
            this.setButtonsCanvas('1','flex');
            this.canvasForm.style.display='flex';
            this.canvasForm.style.flexDirection='column';
        });

        //lorsque l'on clique sur recommencer, le canvas se nettoie
        this.clearButton.addEventListener('click', () => {
            this.clear();
        });

        //lorsque l'on clique sur valider, les boutons disparaissent ainsi que le canvas
        this.buttonSubmitCanvas.addEventListener('click', () => {
            this.clear();
            this.setButtonsCanvas('0','none');
            this.partForm.style.opacity = '0';
            this.partForm.style.display = 'none';
            this.canvasForm.style.opacity ='0';
            this.canvasForm.style.display = 'none';

        })
    };

    //fonction pour réinitialiser le canvas
    clear(){
        this.setButtonsCanvas('0', 'none');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    getFingerPosition = (e) => {
        //supprimer le décalage
        let rect = this.canvas.getBoundingClientRect();
        const position = {
            posX : e.touches[0].clientX - rect.left,
            posY : e.touches[0].clientY - rect.top
        };
        return position
    };

    getMousePosition = (e) => {
        let rect = this.canvas.getBoundingClientRect();
        const positionMouse = {
            positionX : e.clientX - rect.left,
            positionY : e.clientY - rect.top
        };
        return positionMouse
    }

    setButtonsCanvas = (opacity,display) => {
        this.buttonsCanvas.style.opacity = opacity;
        this.buttonsCanvas.style.display = display;
    };
}

const canvas = new Canvas;