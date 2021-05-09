// Constructor para Seguro
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function() {
    /*
         1 = americano 1.15
         2 = asiatico 1.05
         3 = europeo 1.35
    */
    let cantidad;
    const base = 2000;

    switch(this.marca){
         case '1':
              cantidad = base * 1.15;
              break;
         case '2':
              cantidad = base * 1.05;
              break;
         case '3':
              cantidad = base * 1.35;
              break;
        default:
            break;
    }

         // Leer el año
         const diferencia = new Date().getFullYear() - this.anio;
         // Cada año de diferencia hay que reducir 3% el valor del seguro
         cantidad -= ((diferencia * 3) * cantidad) / 100;
         /*
              Si el seguro es básico se múltiplica por 30% mas
              Si el seguro es completo 50% mas
         */
        if(this.tipo === 'basico') {
             cantidad *= 1.30;
        } else {
             cantidad *= 1.50;
        }
    
         return cantidad;

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

Interfaz.prototype.mostrarMensaje = function(mensaje, tipo){

    const div = document.createElement('div');
    if (tipo === 'error'){
        div.classList.add('mensje', 'error');
    }else{
        div.classList.add('menaje' , 'correcto');
    }

    div.classList.add('mensaje' , 'mt-10');
    div.textContent = mensaje;

    // insertar el HTML
    const formualario = document.querySelector('#cotizar-seguro');
    formualario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000)
}

Interfaz.prototype.mostrarResultado = (total, seguro) => {

    const {marca, anio, tipo} = seguro;

    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
    
        default:
            break;
    }

    //crear el resultado
    const div = document.createElement('div');
     div.classList.add('mt-10')
     // Insertar la informacion
     div.innerHTML = `
          <p class='header'>Tu Resumen: </p>
          <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span> </p>
          <p class="font-bold">Año: <span class="font-normal"> ${anio} </span> </p>
          <p class="font-bold">Tipo: <span class="font-normal"> ${tipo} </span> </p>
          <p class="font-bold"> Total: <span class="font-normal">$ ${total} </span> </p>
     `;

     const resuldatoDiv = document.querySelector('#resultado');
     resuldatoDiv.appendChild(div);

     const spinner = document.querySelector('#cargando');
     spinner.style.display = 'block';
     setTimeout( () =>  {
          spinner.style.display = 'none'
          resuldatoDiv.appendChild(div);
     }, 3000);
}

// Crear instancia de Interfaz
const interfaz = new Interfaz();

document.addEventListener('DOMContentLoaded', () => {
    interfaz.llenarOpciones(); //llena el select con los anios
});

eventListeners();
function eventListeners(){
    const formualario = document.querySelector('#cotizar-seguro');
    formualario.addEventListener('submit', cotizarSeguro);

}

function cotizarSeguro(e) {
  e.preventDefault();

  // leer la marca seleccionada del select
  const marca = document.querySelector("#marca").value;

  // leer el año seleccionado del <select>
  const year = document.querySelector("#year").value;

  // lee el valor del radio button
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  // Revisamos que los campos no esten vacios
  if (marca === "" || year === "" || tipo === "") {
        interfaz.mostrarMensaje("Todos los campos son obligatorios","error");
        return;
  }else {
    // Limpiar resultados anteriores
    const resultados = document.querySelector("#resultado div");
    if (resultados != null) {
      resultados.remove();
    }

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // Mostrar el resultado
    interfaz.mostrarResultado(total, seguro);
    interfaz.mostrarMensaje("Cotizando...", "exito");
  }
}