const $ = (selector) => document.querySelector(selector);

//Funcionamiento nav balance/categorias/reportes

let goToBalance = () =>{
  $("#view-balance").classList.remove("oculto");
  $("#view-categories").classList.add("oculto");
  $("#view-reports").classList.add("oculto");

  $("#view-balance-operation-filter").classList.remove("oculto");
  $("#view-new-operation").classList.add("oculto");
} 

$("#balance-link").addEventListener("click", goToBalance);

$("#categories-link").addEventListener("click", () => {
  $("#view-balance").classList.add("oculto");
  $("#view-categories").classList.remove("oculto");
  $("#view-reports").classList.add("oculto");
  $("#view-edit-category").classList.add("oculto");
  $("#view-category").classList.remove("oculto");
});
$("#reports-link").addEventListener("click", () => {
  $("#view-balance").classList.add("oculto");
  $("#view-categories").classList.add("oculto");
  $("#view-reports").classList.remove("oculto");
});

// Funcionamiento menú burguer
$("#navbar-burguer").addEventListener("click", () => {
  $("#navbar-burguer").classList.toggle("is-active");
  $("#navbar").classList.toggle("is-active");
});

//Funcionamiento Nueva Operacion
$("#new-operation-button").addEventListener("click", () => {
  $("#view-new-operation").classList.remove("oculto");
  $("#view-balance-operation-filter").classList.add("oculto");
});
//Funcionamiento Ocultar Filtros
$("#link-hide-filters").addEventListener("click", () => {
  $("#filter-container").classList.toggle("oculto");
});

// Mostrar las categorias del array
const generateCategories = (categories) => {
  $("#container-categories").innerHTML = ""; //refresco el array
  $('#category-new-operation-input').innerHTML='';//refresco el desplegable categories
  for (let { name, id } of categories) {
    $("#container-categories").innerHTML += `<div class="level is-mobile">
        <span class="level-left tag is-primary is-light">${name}</span>
        <span class="level-right">
            <a class="level-item is-size-7" onclick="openEditCategory(${id})">Editar</a>
            <a class="level-item is-size-7" onclick="deleteCategory(${id})">Eliminar</a>
        </span>
    </div>`;
    //Actualizo Desplegable Categorias
    $('#category-new-operation-input').innerHTML += 
    `<option>${name}</option>`
  }
};
generateCategories(categories);

//----Agregar categorias------
let addCategory = () => {
  $("#add-category-button").addEventListener("click", () => {
    let sizeCategory = categories.length;
    let lastIdCategory = categories[sizeCategory - 1].id;
    categories.push({
      name: `${$("#category-input").value}`,
      id: lastIdCategory + 1,
    });
    generateCategories(categories); //vuelvo a mostrar categorias
    $("#category-input").value = "";
  });
};

addCategory();

//----Remover categoria------
let deleteCategory = (id) => {
  categories = categories.filter((category) => category.id !== id);
  console.log(categories);
  generateCategories(categories); //volver a mostrar categorias
};

//----Editar categoria------
let openEditCategory = (id) => {
  $("#new-category-input").value = "";
  $("#view-edit-category").classList.remove("oculto");
  $("#view-category").classList.add("oculto");
  editCategory(id);
};

let editCategory = (id) => {
  $("#edit-category-button").addEventListener("click", () => {
    let newCategory = $("#new-category-input").value;

    categories.map((c) => {
      if (c.id === id) {
        c.name = newCategory;
      }
    });

    // vuelvo a la vista anterior
    generateCategories(categories);
    $("#view-edit-category").classList.add("oculto");
    $("#view-category").classList.remove("oculto");
  });
};

//Cancelar editar categoria
let cancelEditCategory = () => {
  $("#cancel-edit-category-button").addEventListener("click", () => {
    $("#view-edit-category").classList.add("oculto");
    $("#view-category").classList.remove("oculto");
  });
};


// **************************
// ********OPERACIONES*******
// **************************
let operations = [];

//Agregar operacion
let addOperation = () =>{
  let descriptionInfo = $('#description-new-operation-input').value
  let amountInfo = $('#amount-new-operation-input').value
  let typeInfo = $('#type-new-operation-input').value
  let categoryInfo = $('#category-new-operation-input').value
  let dateInfo = $('#date-new-operation-input').value

  let sizeOperations = operations.length;
  let lastIdOperations;
  if(sizeOperations>=1)
    lastIdOperations = operations[sizeOperations - 1].id;
  else 
    lastIdOperations = 0;

  operations.push({
    id: lastIdOperations + 1,
    description: descriptionInfo,
    amount: amountInfo,
    type : typeInfo,
    category : categoryInfo,
    date : dateInfo
  })
}
let cleanInputOperation = () =>{
  $('#description-new-operation-input').value ='';
  $('#amount-new-operation-input').value ='';
  $('#type-new-operation-input').value ='';
  $('#category-new-operation-input').value ='';
  $('#date-new-operation-input').value ='';
}
$('#add-new-operation-button').addEventListener('click', ()=>{
  addOperation();
  cleanInputOperation();
  goToBalance();
})

