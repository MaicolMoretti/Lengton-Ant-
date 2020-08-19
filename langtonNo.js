const screen = document.getElementById("screen");

//imposto le dimensioni del mio schermo
const SCREEN_W = 300;
const SCREEN_H = 300;

screen.width = 400;
screen.height = 400;
//imposto le dimensioni della griglia (nella quale la mia formica si muove)
const W = 50;
const H = 50;
const ctx = screen.getContext("2d"); 


alert("Inizio?");

/**come posso rappresentare una griglia? Ad esempio potrebbe essere una lista di liste oppure un array bidimensionale.
 * In ogni caso, tutto il contenuto della mia griglia potrebbe essere messo all'interno di una classe
*/
class World {
    constructor(w, h){
        this.w = w;
        this.h = h;
        this.cells = new Array(w*h).fill(false);
        console.log(this.cells);
    }

    //se ho una matrice così
    // 1 2 
    // 3 4
    // la trasformo in un array di questo genere
    // 1, 2, 3, 4
    set(value, row, col){
       return this.cells[col + row*this.w] = value;
    }

    get(row, col){
        return this.cells[col + row*this.w];
    }

    toString(){
        return console.log(this.cells);
    }
}


    const UP = 0;
    const LEFT = 1;
    const DOWN = 2;
    const RIGHT = 3;

    

class LangtonAnt {

    constructor(world){
        this.world = world;
        this.row = Math.floor(world.h / 2);
        this.col = Math.floor(world.w / 2);
        this.dir = UP;
    }

    read(){
       return this.world.get(this.row, this.col);
    }

    left(){
        this.dir += 1;
    }

    right() {
        this.dir -=1;
    }

    getDirection() {
        return this.dir % 4;
    }

    changeColor(){
        return this.world.set(!this.read(), this.row, this.col)
    }

    /**
     * imposta la direzione in cui deve andare la formica
     */
    advance() {
        const dir = this.getDirection();
        if(dir === UP) {
            this.row -= 1;
        } else if (dir === DOWN) {
            this.row += 1;
        }else if (dir === LEFT) {
            this.col -= 1;
        }else if (dir === RIGHT) {
            this.col += 1;
        }
        
    }

        /**
        * Fai muovere la formica e fai cambire il colore della cella 
        */
       
        move() {
        const color = this.read();
        this.changeColor();
        console.log("READ: ", color);
        if(color) { //true
            this.right();
            this.advance();
            console.log("RIGHT");
        } else {
            this.left();
            this.advance();
            console.log("LEFT");
        }
    }


}


let world = new World(H, W);

//Vado a definire la mia formica
// x, y  rappresentano la posizione (iniziale) della mia formica 
// dir rappresenta la direzione nella quale si muoverà --> 0:sx, 1: alto, 2:dx, 3:basso

let ant = new LangtonAnt(world);






//Generazione di un disegno casuale (matrice casuale iniziale)
//for (let i = 0; i<20; i++){
 //   world.set(true, Math.floor(Math.random()*H), Math.floor(Math.random()*W));
//}

ctx.scale(SCREEN_W / W, SCREEN_H/H);


//Funzione che stampa a video tutta la "griglia" che tutto il resto 
function draw() {
    for(let i = 0; i < H; i++) {
        for(let j= 0; j < W; j++ ){
            if(world.get(i, j)) {
                ctx.fillStyle = "red";
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
    ctx.fillStyle = "green";
    ctx.fillRect(ant.row, ant.col, 1, 1);
}

setInterval(() => {
    ctx.clearRect(0,0, SCREEN_W, SCREEN_H);
    draw();
    ant.move();
}, 50);

