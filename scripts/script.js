let main = document.getElementById('main');
let canvas = document.createElement('canvas');
if (main === null) {
    throw 'Expected element with id \'main\' does not exist';
}
main.appendChild(canvas);
export {};
