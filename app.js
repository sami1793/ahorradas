const $ = (selector) => document.querySelector(selector);

// Funcionamiento menú burguer
$('#navbar-burguer').addEventListener('click', () =>{
    $('#navbar-burguer').classList.toggle("is-active")
    $('#navbar').classList.toggle("is-active")
})
// Se muestran las categorias del array categorias
const generateCategories = (categories) =>{
    for(let {name} of categories){
        $("#container-categories").innerHTML +=
        `<div class="level is-mobile">
        <span class="level-left tag is-primary is-light">${name}</span>
        <span class="level-right">
            <a class="level-item is-size-7">Editar</a>
            <a class="level-item is-size-7">Eliminar</a>
        </span>
    </div>`
    }
}
generateCategories(categories);