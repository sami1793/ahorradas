const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

//Funcionamiento nav balance/categorias/reportes

let goToBalance = () => {
  $("#view-balance").classList.remove("oculto");
  $("#view-categories").classList.add("oculto");
  $("#view-reports").classList.add("oculto");

  $("#view-balance-operation-filter").classList.remove("oculto");
  $("#view-new-operation").classList.add("oculto");

  $("#view-edit-operation").classList.add("oculto");

  checkViewOperations();
};

let goToCategories = () => {
  $("#view-balance").classList.add("oculto");
  $("#view-categories").classList.remove("oculto");
  $("#view-reports").classList.add("oculto");

  $("#view-edit-category").classList.add("oculto");
  $("#view-category").classList.remove("oculto");
};

let goToReports = () => {
  $("#view-balance").classList.add("oculto");
  $("#view-categories").classList.add("oculto");
  $("#view-reports").classList.remove("oculto");

  if(operations.length>=3){
    showTotalsCategories(operations);
    showTotalsMonths(operations);
    showResume(operations);

    $('#with-reports').classList.remove('is-hidden');
    $('#without-reports').classList.add('is-hidden');
  }
  else{
    $('#with-reports').classList.add('is-hidden');
    $('#without-reports').classList.remove('is-hidden');
  }
};

$("#balance-link").addEventListener("click", goToBalance);
$("#categories-link").addEventListener("click", goToCategories);
$("#reports-link").addEventListener("click", goToReports);

//Fecha automatica
let getDateToday = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

let setDateTodayFilters = () => {
  $("#date-filter-input").value = getDateToday();
};

let setDateTodayNewOperation = () => {
  $("#date-new-operation-input").value = getDateToday();
};

setDateTodayFilters();

// Funcionamiento menú burguer
$("#navbar-burguer").addEventListener("click", () => {
  $("#navbar-burguer").classList.toggle("is-active");
  $("#navbar").classList.toggle("is-active");
});

//Funcionamiento Nueva Operacion
$("#new-operation-button").addEventListener("click", () => {
  setDateTodayNewOperation();
  cleanInputOperation();
  $("#view-new-operation").classList.remove("oculto");
  $("#view-balance-operation-filter").classList.add("oculto");

  $('#description-new-operation-input-help').classList.add('is-hidden');
  $('#amount-new-operation-input-help').classList.add('is-hidden');

  $('#description-new-operation-input').classList.remove('is-danger');
  $('#amount-new-operation-input').classList.remove('is-danger');

  $('#add-new-operation-button').disabled = false;


});


//Funcionamiento Ocultar Filtros
$("#link-hide-filters").addEventListener("click", () => {
  $("#filter-container").classList.toggle("oculto");
});

// Mostrar las categorias del array
const generateCategories = (categories) => {
  $("#container-categories").innerHTML = ""; //refresco el array
  $("#category-new-operation-input").innerHTML = ""; //refresco el desplegable categories de nueva operacion
  $("#category-edit-operation-input").innerHTML = ""; //refresco el desplegable edit operaciones 
  $("#category-filter-input").innerHTML = "<option>Todas</option> "; //refresco el desplegable categorias de filtros
  for (let { name, id } of categories) {
    $("#container-categories").innerHTML += `<div class="level is-mobile">
        <span class="level-left tag is-primary is-light">${name}</span>
        <span class="level-right">
            <a class="level-item is-size-7" onclick="openEditCategory(${id})">Editar</a>
            <a class="level-item is-size-7" onclick="deleteCategory(${id})">Eliminar</a>
        </span>
    </div>`;
    //Actualizo Desplegable Categorias
    $("#category-new-operation-input").innerHTML += `<option>${name}</option>`;
    $("#category-edit-operation-input").innerHTML += `<option>${name}</option>`;
    $("#category-filter-input").innerHTML += `<option>${name}</option>`;
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
  generateCategories(categories); //volver a mostrar categorias
};

let previousCategory;

//----Editar categoria------
let openEditCategory = (id) => {
  $("#new-category-input").value = "";
  $("#view-edit-category").classList.remove("oculto");
  $("#view-category").classList.add("oculto");
  for (const category of categories) {
    if (category.id === id) previousCategory = category.name;
  }
  editCategory(id);
};

let editCategory = (id) => {
  let isClosedEditCategory = false;

  $("#cancel-edit-category-button").addEventListener("click", () => {
    isClosedEditCategory = true;
    cancelEditCategory();
  });

  //Prevengo por si hace click en el nav
  $("#balance-link").addEventListener("click", () => {
    isClosedEditCategory = true;
  });
  $("#categories-link").addEventListener("click", () => {
    isClosedEditCategory = true;
  });
  $("#reports-link").addEventListener("click", () => {
    isClosedEditCategory = true;
  });

  $("#edit-category-button").addEventListener("click", functionEditCategory, {
    once: true, //este atributo hace que solo se ejecute una vez
  });

  function functionEditCategory(e) {

    let newCategory = $("#new-category-input").value;
   
   

    //Actualizo valor en categorias
    if (!isClosedEditCategory) {
      //Actualizo valor en operaciones
      operations.map((o) =>{
        if(o.category === previousCategory){
          console.log("entro");
          o.category = newCategory
          showOperations(operations)
        }
      })
      categories.map((c) => {
        if (c.id === id) {
          c.name = newCategory;
        }
      });
    }

    // vuelvo a la vista principal de Categorias
    generateCategories(categories);
    goToCategories();
  }
};

//Cancelar editar categoria
let cancelEditCategory = () => {
  $("#cancel-edit-category-button").addEventListener("click", () => {
    goToCategories();
    return true;
  });
};

// *********************************
// ********OPERACIONES**************
// *********************************
let operations = [];

//Agregar operacion
let addOperation = () => {
  let descriptionInfo = $("#description-new-operation-input").value;
  let amountInfo = $("#amount-new-operation-input").value;
  let typeInfo = $("#type-new-operation-input").value;
  let categoryInfo = $("#category-new-operation-input").value;
  let dateInfo = $("#date-new-operation-input").value;

  let sizeOperations = operations.length;
  let lastIdOperations;
  if (sizeOperations >= 1) lastIdOperations = operations[sizeOperations - 1].id;
  else lastIdOperations = 0;

  operations.push({
    id: lastIdOperations + 1,
    description: descriptionInfo,
    amount: amountInfo,
    type: typeInfo,
    category: categoryInfo,
    date: dateInfo,
  });
};


//Resetear inputs operaciones
let cleanInputOperation = () => {
  $("#description-new-operation-input").value = "Descripción..";
  $("#amount-new-operation-input").value = 100;
  $("#type-new-operation-input").value = "Gasto";
  setDateTodayNewOperation();
};

//Resetear inputs editar operaciones
let cleanInputEditOperation = (id) => {
  let previousDescription="";
  let previousAmount="";
  let previousType="";
  let previousCategory="";
  let previousDate="";

  operations.map((o) =>{
    if(o.id === id){
      previousDescription = o.description;
      previousAmount = o.amount;
      previousType = o.type;
      previousCategory = o.category;
      previousDate = o.date;
    }
  })

  $("#description-edit-operation-input").value = previousDescription;
  $("#amount-edit-operation-input").value = previousAmount;
  $("#type-edit-operation-input").value = previousType;
  $("#category-edit-operation-input").value = previousCategory;
  $("#date-edit-operation-input").value = previousDate;
};

// Mostrar Operaciones
const showOperations = (operations) => {
  $("#list-operations-container").innerHTML = " ";
  let totalGanancias = 0;
  let totalGastos = 0;
  for (let { id, description, amount, type, category, date } of operations) {
    let classAmount;
    let signo = "+";
    if (type === "Gasto") {
      classAmount = "has-text-danger";
      signo = "-";
      totalGastos += Number(amount);
    } else if (type == "Ganancia") {
      classAmount = "has-text-success";
      signo = "";
      totalGanancias += Number(amount);
    }
    $(
      "#list-operations-container"
    ).innerHTML += `<div class="column is-3-tablet is-6-mobile">
        <span class="has-text-weight-semibold">
        ${description}
        </span>
    </div>
    <div class="column is-3-tablet is-6-mobile has-text-right-mobile">
        <span class="tag is-primary is-light">${category}</span>
    </div>
    <div class="column is-2-tablet is-hidden-mobile">
        <span>${date}</span>
    </div>
    <div class="column is-2-tablet is-6-mobile">
        <span class=${classAmount}>
            <span>${signo}$</span>
            <span>${amount}</span>
        </span>
    </div>
    <div class="column is-2-tablet is-6-mobile has-text-right-mobile">
            <p class="is-fullwidth">
                <a class=" is-size-7 mr-2 " onclick = "openEditOperation(${id})">Editar</a>
                <a class=" is-size-7" onclick="deleteOperation(${id})">Eliminar</a>
            </p>
    </div>`;
  }
  showBalance(totalGastos, totalGanancias);
};

//Agregar Nueva operación
$("#add-new-operation-button").addEventListener("click", () => {
    // $('#add-new-operation-form').addEventListener("submit", (e)=>{
    addOperation();
    cleanInputOperation();
    showOperations(operations);
    goToBalance();
    // e.preventDefalut();
});


//Cancelar Nueva Operacion
let cancelNewOperation = () => {
  $("#cancel-new-operation-button").addEventListener("click", () => {
    cleanInputOperation();
    goToBalance();
  });
};
cancelNewOperation();


//Verificar si hay operaciones y poner vista
let checkViewOperations = () => {
  if (operations.length) {
    $("#without-operations-container").classList.add("is-hidden");
    $("#with-operations-container").classList.remove("is-hidden");
  } else {
    $("#without-operations-container").classList.remove("is-hidden");
    $("#with-operations-container").classList.add("is-hidden");
  }
};

//Funcionamiento Editar Operacion
let openEditOperation = (id) => {
  cleanInputEditOperation(id);
  $("#view-edit-operation").classList.remove("oculto");
  $("#view-balance-operation-filter").classList.add("oculto");

  editOperation(id);
};

let editOperation = (id)=>{
  let isClosedEditOperation = false;

  $("#cancel-edit-operation-button").addEventListener("click", () => {
    isClosedEditOperation = true;
    cancelEditOperation();
  });

   //Prevengo por si hace click en el nav
   $("#balance-link").addEventListener("click", () => {
    isClosedEditOperation = true;
  });
  $("#categories-link").addEventListener("click", () => {
    isClosedEditOperation = true;
  });
  $("#reports-link").addEventListener("click", () => {
    isClosedEditOperation = true;
  });

  $("#add-edit-operation-button").addEventListener("click", functionEditOperation, {
    once: true, //este atributo hace que solo se ejecute una vez
  });

  function functionEditOperation(e) {

    //Actualizo valor en operaciones
    if (!isClosedEditOperation) {

      let newDescription = $('#description-edit-operation-input').value;
      let newAmount = $('#amount-edit-operation-input').value;
      let newType = $('#type-edit-operation-input').value;
      let newCategory = $('#category-edit-operation-input').value;
      let newDate = $("#date-edit-operation-input").value;

      operations.map((o) =>{
        if(o.id === id){
          o.description = newDescription;
          o.amount = newAmount;
          o.type = newType;
          o.category = newCategory;
          o.date = newDate;

          showOperations(operations)
        }
      })
      
    }
    // vuelvo a la vista principal de Operaciones
    // generateCategories(categories);
    goToBalance();
  }

} 


//Cancelar editar operacion
let cancelEditOperation = () => {
  $("#cancel-edit-operation-button").addEventListener("click", () => {
    goToBalance();
    // return true;
  });
};


//Borrar Operacion
let deleteOperation = (id) => {
  operations = operations.filter((operation) => operation.id !== id);
  showOperations(operations); //refrescar operaciones
  checkViewOperations();
};
//Mostrar Balance
let showBalance = (gastos, ganancias) => {
  $("#gastosBalance").innerHTML = gastos;
  $("#gananciasBalance").innerHTML = ganancias;
  $("#totalBalance").innerHTML = ganancias - gastos;
};

// -----Control de inputs------
//Control inputs en Nueva Operacion
$("#amount-new-operation-input").addEventListener('input', (e)=>{
  if(e.target.value<1){
    $('#amount-new-operation-input').classList.add('is-danger');
    $('#amount-new-operation-input-help').classList.remove('is-hidden');
    $('#add-new-operation-button').disabled = true;
  }
  else{
    $('#amount-new-operation-input').classList.remove('is-danger');
    $('#amount-new-operation-input-help').classList.add('is-hidden');
    if($("#description-new-operation-input").value){
      $('#add-new-operation-button').disabled = false;
    }
  }
})

$("#description-new-operation-input").addEventListener('input', (e)=>{
  if(!e.target.value){
    $('#description-new-operation-input').classList.add('is-danger');
    $('#description-new-operation-input-help').classList.remove('is-hidden');
    $('#add-new-operation-button').disabled = true;
  }
  else{
    $('#description-new-operation-input').classList.remove('is-danger');
    $('#description-new-operation-input-help').classList.add('is-hidden');
    if($("#amount-new-operation-input").value>=1){
      $('#add-new-operation-button').disabled = false;
    }
  }
})


//Control inputs en Editar Operacion
$("#amount-edit-operation-input").addEventListener('input', (e)=>{
  if(e.target.value<1){
    $('#amount-edit-operation-input').classList.add('is-danger');
    $('#amount-edit-operation-input-help').classList.remove('is-hidden');
    $('#add-edit-operation-button').disabled = true;
  }
  else{
    $('#amount-edit-operation-input').classList.remove('is-danger');
    $('#amount-edit-operation-input-help').classList.add('is-hidden');
    if($("#description-edit-operation-input").value){
      $('#add-edit-operation-button').disabled = false;
    }
  }
})

$("#description-edit-operation-input").addEventListener('input', (e)=>{
  if(!e.target.value){
    $('#description-edit-operation-input').classList.add('is-danger');
    $('#description-edit-operation-input-help').classList.remove('is-hidden');
    $('#add-edit-operation-button').disabled = true;
  }
  else{
    $('#description-edit-operation-input').classList.remove('is-danger');
    $('#description-edit-operation-input-help').classList.add('is-hidden');
    if($("#amount-edit-operation-input").value>=1){
      $('#add-edit-operation-button').disabled = false;
    }
  }
})
