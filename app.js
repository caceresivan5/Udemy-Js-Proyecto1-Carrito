/* VARIABLES */
const carrito = document.querySelector('.carrito');
const carritoTabla = document.querySelector('.carritoTabla');
const contenidocarrito = document.querySelector('#lista-carrito Tbody')
const cursosEnLinea = document.querySelector('.cursosEnLinea');
const cursosIncodeables = document.querySelector('.cursosIncodeables')


const CursosArray = [
    {id: 1, nombre: 'HTML5,CSS para Principiantes', profesor: 'Daniela Beltran D`Agostino', imagen:"img/HTML-CSS.png", precio: 3500},
    {id: 2, nombre: 'Flexbox - Grid', profesor: 'Jose Calamardo', imagen:"img/flex-grid.png", precio: 2500},
    {id: 3, nombre: 'Bootstrap 5', profesor: 'Tomas San Martin', imagen:"img/bootstrapOk.png", precio: 3700},
    {id: 4, nombre: 'JavaScript Moderno', profesor: 'Lionel Almeida', imagen:"img/JavaScript.png", precio: 4200},
    {id: 5, nombre: 'React Js para Principiantes', profesor: 'Ivan Caceres', imagen:"img/reactJs.png", precio: 4700},
    {id: 6, nombre: 'M.E.R.N', profesor: 'Mauricio', imagen:"img/MERNok.png", precio: 6500}

]

CursosArray.forEach((cursosArray)=>{
    const row = document.createElement('div');
   
    row.innerHTML = `
    <div class="card">
                <div class="cardImagen">
                    <img src=${cursosArray.imagen} alt="">
                </div>
                        <div class="cardInfo">
                            <div class="CardNombreCurso">
                            <p >${cursosArray.nombre}</p>
                            <p >${cursosArray.profesor} </p>
                        </div>
                            <div class="cardEstrellas">
                                <img class="estrellaLogo" src="img/estrella.png" alt="">
                                <img class="estrellaLogo" src="img/estrella.png" alt="">
                                <img class="estrellaLogo" src="img/estrella.png" alt="">
                                <img class="estrellaLogo" src="img/estrella.png" alt="">
                                <img class="estrellaLogo" src="img/estrella.png" alt="">
                            </div>
                            <p class="precio">${cursosArray.precio}</p>
                            <button class="agregarCurso" data-id="${cursosArray.id}">AGREGAR AL CARRITO</button>
                    </div>
                
            </div>
    
    `
    cursosIncodeables.appendChild(row);
});


let ArticulosCarrito = []; //array donde iran los articulos del carrito

cargarEventListeners();

function cargarEventListeners(){
    cursosIncodeables.addEventListener('click', agregarCurso);/*para agregar un curso */
    carrito.addEventListener('click' , eliminarCurso);
}

/*FUNCIONES*/

function agregarCurso(e){
    if(e.target.classList.contains('agregarCurso')){/*si el usuario presiono el boton con esa clase */
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);      
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('eliminar')){
        const cursoId = e.target.getAttribute('id-curso')
        ArticulosCarrito = ArticulosCarrito.filter(cursoEliminado => cursoEliminado.id !== cursoId);
        carritoHTML();
    }
}

/*TRAVERSING */
function leerDatosCurso(curso){
    
    const infoCurso ={
        imagen: curso.querySelector('.cardImagen img').src , /*src para extraer la imagen */
        nombre: curso.querySelector('.CardNombreCurso p').textContent, /*textContent para extraer el texto */
        precio: curso.querySelector('.card p:nth-child(3)').textContent,
        id: curso.querySelector('button').getAttribute('data-id'),
        cantidad:1

    }
    console.log(infoCurso)
    //reviso si existen dos cursos iguales
    const existe = ArticulosCarrito.some(cursoExiste => cursoExiste.id === infoCurso.id);
    if(existe){
        //actualizo la cantidad
        const cursos = ArticulosCarrito.map( cursoExiste =>{

            if( cursoExiste.id === infoCurso.id){
                cursoExiste.cantidad++;
                return cursoExiste
            }else{
                return cursoExiste;
            }
        });
        ArticulosCarrito = [...cursos];
    }else{
        //agregar elementos al array del carrito
        ArticulosCarrito = [...ArticulosCarrito, infoCurso]; //tomo una copia del array y le agrego el objeto infoCurso
    }
    carritoHTML();
       
}

//muestra en el html del carrito
function carritoHTML(){

    limpiarHTML();

    ArticulosCarrito.forEach( ( curso )=>{
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${curso.imagen} " style="width: 90%;" alt=""> </td>

        <td>${curso.nombre} </td>

         <td> ${curso.precio}</td>
         <td> ${curso.cantidad}</td>
         <td> <button class='eliminar' id-curso='${curso.id}' > x </button></td>

        `;

        //agrega html en el carrito
        contenidocarrito.appendChild(row);
       
    });
}

function limpiarHTML(){
    //contenidocarrito.innerHTML = '';
    while(contenidocarrito.firstChild){
        contenidocarrito.removeChild(contenidocarrito.firstChild);
    }
}