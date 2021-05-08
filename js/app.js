// Constructor para Seguro
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

// Todo lo que se muestra
function Interfaz() {}


// llena las opcines de los anios
Interfaz.prototype.llenarOpciones = function () {
    const max = new Date().getFullYear(),
         min = max - 20;

    const selectAnios = document.querySelector('#year');
    for(let i = max; i > min; i--) {
         let option = document.createElement('option');
         option.value = i;
         option.innerHTML = i;
         selectAnios.appendChild(option);
    }   
}

// Crear instancia de Interfaz
const interfaz = new Interfaz();

document.addEventListener('DOMContentLoaded', () => {
    interfaz.llenarOpciones()
});