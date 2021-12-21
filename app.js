/* VARIABLES */
const carrito = document.querySelector('.carrito');
const carritoTabla = document.querySelector('.carritoTabla');
const contenidocarrito = document.querySelector('#lista-carrito Tbody')
const cursosEnLinea = document.querySelector('.cursosEnLinea');


let ArticulosCarrito = []; //array donde iran los articulos del carrito

cargarEventListeners();

function cargarEventListeners(){
    cursosEnLinea.addEventListener('click', agregarCurso);/*para agregar un curso */
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
    })
}

function limpiarHTML(){
    //contenidocarrito.innerHTML = '';
    while(contenidocarrito.firstChild){
        contenidocarrito.removeChild(contenidocarrito.firstChild);
    }
}