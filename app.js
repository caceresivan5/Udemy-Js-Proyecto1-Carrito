/* VARIABLES */

const carritoTabla = document.querySelector('.carritoTabla');
const contenidocarrito = document.querySelector('#lista-carrito Tbody')
const cursosEnLinea = document.querySelector('.cursosEnLinea');

let ArticulosCarrito = []; //array donde iran los articulos del carrito

cargarEventListeners();

function cargarEventListeners(){
    cursosEnLinea.addEventListener('click', agregarCurso);/*para agregar un curso */
}

/*FUNCIONES*/

function agregarCurso(e){
    if(e.target.classList.contains('agregarCurso')){/*si el usuario presiono el boton con esa clase */
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        
    }
}

/*TRAVERSING */
function leerDatosCurso(curso){
    console.log(curso);
    
    const infoCurso ={
        imagen: curso.querySelector('.cardImagen img').src , /*src para extraer la imagen */
        nombre: curso.querySelector('.CardNombreCurso p').textContent, /*textContent para extraer el texto */
        precio: curso.querySelector('.card p:nth-child(3)').textContent
    }
    console.log(infoCurso)
    //agregar elementos al array del carrito

    ArticulosCarrito = [...ArticulosCarrito, infoCurso]; //tomo una copia del array y le agrego el objeto infoCurso

    carritoHTML();

    console.log(ArticulosCarrito);
}

//muestra en el html del carrito
function carritoHTML(){

    limpiarHTML(); //para limpiar y no repetir

    ArticulosCarrito.forEach( ( curso )=>{
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        ${curso.nombre}               
         </td>
         <td>
         <img src="${curso.imagen} " style="width: 100%;" alt="">
                      
         </td>
         <td>
        ${curso.precio}               
         </td>
        
        `;
        //agrega html en el carrito
        contenidocarrito.appendChild(row);
    })
}

function limpiarHTML(){
    contenidocarrito.innerHTML = '';
}