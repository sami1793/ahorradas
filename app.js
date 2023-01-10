const $ = (selector) => document.querySelector(selector);

//Funcionamiento nav balance/categorias/reportes
$('#balance-link').addEventListener('click', ()=>{
    $('#view-balance').classList.remove('oculto');
    $('#view-categories').classList.add('oculto');
    $('#view-reports').classList.add('oculto');

    $('#view-balance-operation-filter').classList.remove('oculto');
    $('#view-new-operation').classList.add('oculto')
})
$('#categories-link').addEventListener('click', ()=>{
    $('#view-balance').classList.add('oculto');
    $('#view-categories').classList.remove('oculto');
    $('#view-reports').classList.add('oculto');
})
$('#reports-link').addEventListener('click', ()=>{
    $('#view-balance').classList.add('oculto');
    $('#view-categories').classList.add('oculto');
    $('#view-reports').classList.remove('oculto');
})

// Funcionamiento menú burguer
$('#navbar-burguer').addEventListener('click', () => {
  $('#navbar-burguer').classList.toggle('is-active');
  $('#navbar').classList.toggle('is-active');
});

//Funcionamiento Nueva Operacion
$('#new-operation-button').addEventListener('click',()=>{
    $('#view-new-operation').classList.remove('oculto');
    $('#view-balance-operation-filter').classList.add('oculto');
})
//Funcionamiento Ocultar Filtros
$('#link-hide-filters').addEventListener('click', () =>{
    $('#filter-container').classList.toggle('oculto');
})

// Mostrar las categorias del array
const generateCategories = (categories) => {
  $("#container-categories").innerHTML = ""; //refresco el array
  for (let { name, id } of categories) {
    $("#container-categories").innerHTML += `<div class="level is-mobile">
        <span class="level-left tag is-primary is-light">${name}</span>
        <span class="level-right">
            <a class="level-item is-size-7">Editar</a>
            <a class="level-item is-size-7" onclick="deleteCategory(${id})">Eliminar</a>
        </span>
    </div>`;
  }
};
generateCategories(categories);

//----Agregar categorias------
let addCategory = () => {
  $("#add-category-button").addEventListener("click", () => {
    let sizeCategory = categories.length;
    let lastIdCategory = categories[sizeCategory-1].id
    categories.push({ name: `${$("#category-input").value}` , id: lastIdCategory + 1});
    generateCategories(categories); //vuelvo a mostrar categorias
    $("#category-input").value="";
  });
};

addCategory();

//----Remover categoria------
let deleteCategory = (id) =>{
    categories = categories.filter((category)  =>
        category.id !== id);
    console.log(categories)
    generateCategories(categories);//volver a mostrar categorias
}