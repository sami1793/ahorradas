const $ = (selector) => document.querySelector(selector);

//Funcionamiento nav balance/categorias/reportes

let goToBalance = () => {
  $("#view-balance").classList.remove("oculto");
  $("#view-categories").classList.add("oculto");
  $("#view-reports").classList.add("oculto");

  $("#view-balance-operation-filter").classList.remove("oculto");
  $("#view-new-operation").classList.add("oculto");

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
};

$("#balance-link").addEventListener("click", goToBalance);
$("#categories-link").addEventListener("click", goToCategories);
$("#reports-link").addEventListener("click", goToReports);

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
  $("#category-new-operation-input").innerHTML = ""; //refresco el desplegable categories
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
    if (!isClosedEditCategory) {
      let newCategory = $("#new-category-input").value;

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

//Limpiar inputs operaciones
let cleanInputOperation = () => {
  $("#description-new-operation-input").value = "";
  $("#amount-new-operation-input").value = "";
  $("#type-new-operation-input").value = "";
  $("#category-new-operation-input").value = "";
  $("#date-new-operation-input").value = "";
};

// Mostrar Operaciones
const showOperations = (operations) => {
  $("#list-operations-container").innerHTML = " ";
  let totalGanancias = 0;
  let totalGastos = 0;
  for (let { id, description, amount, type, category, date } of operations) {
    
    let classAmount;
    let signo='+';
    if(type==="Gasto"){
      classAmount = "has-text-danger";
      signo = '-';
      totalGastos += Number(amount) 
    }
    else if(type=="Ganancia"){
      classAmount = "has-text-success";
      signo = '';
      totalGanancias += Number(amount)
    }
    $("#list-operations-container").innerHTML += 
    `<div class="column is-3-tablet is-6-mobile">
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
                <a class=" is-size-7 mr-2 ">Editar</a>
                <a class=" is-size-7" onclick="deleteOperation(${id})">Eliminar</a>
            </p>
    </div>`;    
  }
  showBalance(totalGastos, totalGanancias);
};

//Agregar Nueva operación
let addNewOperation = () => {
  $("#add-new-operation-button").addEventListener("click", () => {
    addOperation();
    cleanInputOperation();
    showOperations(operations);
    goToBalance();
  });
};
addNewOperation();

//Cancelar Nueva Operacion
let cancelNewOperation = () => {
  $('#cancel-new-operation-button').addEventListener('click', () =>{
    cleanInputOperation();
    goToBalance()
  })
}
cancelNewOperation();

//Verificar si hay operaciones y poner vista
let checkViewOperations = () => {
  if(operations.length){
    $('#without-operations-container').classList.add('is-hidden');
    $('#with-operations-container').classList.remove('is-hidden');
  }
  else{
    $('#without-operations-container').classList.remove('is-hidden');
    $('#with-operations-container').classList.add('is-hidden');
  }
}

//Borrar Operacion
let deleteOperation = (id) => {
  operations = operations.filter((operation) => operation.id !== id);
  console.log(operations);
  showOperations(operations); //refrescar operaciones
  checkViewOperations();
}
//Mostrar Balance
let showBalance = (gastos, ganancias) =>{
  $('#gastosBalance').innerHTML = gastos;
  $('#gananciasBalance').innerHTML = ganancias;
  $('#totalBalance').innerHTML = ganancias-gastos;
}



