window.addEventListener('scroll', () => {
    let animacion = document.querySelector('.animado');
    let positionObj = animacion.getBoundingClientRect().top;
    let tamanioPantalla = window.innerHeight / 2;
    if(positionObj < tamanioPantalla){
        animacion.style.animation = 'mover 1s ease-out'
    }
})