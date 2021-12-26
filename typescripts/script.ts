import * as Physics from './Physics.js';

let main = document.getElementById('main');

if(main === null){
    throw 'Expected element with id \'main\' does not exist';
}


let canvas = document.createElement('canvas');
let ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
main.appendChild(canvas);