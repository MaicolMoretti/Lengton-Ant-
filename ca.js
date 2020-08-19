/**
 * Cellular Automata 1D. Rappresentazione di un automa cellulare seguendo la regola 30. 
 */

const screen = document.getElementById("screenca");

//imposto le dimensioni del mio schermo
const SCREEN_W = 300;
const SCREEN_H = 300;

screen.width = 400;
screen.height = 400;
//imposto le dimensioni della griglia (nella quale la mia formica si muove)
const W = 50;
const H = 50;
const ctx = screen.getContext("2d"); 





/**
 * Il mondo è una griglia con dentro dei "false" che posso impostare a true.
*/
class World {
    constructor(w, h){
        this.w = w;
        this.h = h;
        this.cells = new Array(w*h).fill(false);
        this.set(true, 0, Math.floor(this.w/2));
    }

    //se ho una matrice così
    // false, false 
    // false, false
    // la trasformo in un array di questo genere
    // false, false, false, false
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



//creo un nuovo mondo
let world = new World(H, W);



//Generazione di un disegno casuale (matrice casuale iniziale)
//for (let i = 0; i<20; i++){
 //   world.set(true, Math.floor(Math.random()*H), Math.floor(Math.random()*W));
//}

ctx.scale(SCREEN_W / W, SCREEN_H/H);

let curRow = 1;

//cerchiamo di creare un mappa. 
/**
 * la regola che ho impostato è: se ho 3 false il risultato è false.
 */
const rules = new Map();
rules.set([false, false, false], false);
rules.set([false, false, true], true);
rules.set([false, true, false], true);
rules.set([false, true, true], true);
rules.set([true, false, true], true);
rules.set([false, false, true], true);
rules.set([true, true, false], true);
rules.set([true, true, true], false);


function update() {
    for(let i= 0; i < W-2; i++ ){
        const w = [ world.get(curRow-1, i), world.get(curRow-1, i+1), world.get(curRow-1, i+2)];
        //world.set(rules.get(w), curRow, i+1);
        if(w[0] === false && w[1] === false && w[2] === false) {
            world.set(false, curRow, i+1);
        }
            else if (w[0] === true && w[1] === true && w[2] === true) 
                world.set(false, curRow, i+1);
            else 
            world.set(true, curRow, i+1);
        }
        curRow++;
    }
    


//Funzione che stampa a video tutta la "griglia" che tutto il resto 
function draw() {
    for(let i= 0; i < H; i++ ) {
        for(let j= 0; j < W; j++ ){
            if(world.get(i, j)) {
                ctx.fillStyle = "red";
                ctx.fillRect(j, i, 1, 1);
            }
        }
    }
}

//imposta la velocità con cui viene disegnata la formica di Langton
setInterval(() => {
    //ctx.clearRect(0,0, SCREEN_W, SCREEN_H);
    draw();
    update();
}, 100);





