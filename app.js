const $ = (selector) => document.querySelector(selector);

// Funcionamiento menú burguer
$("#navbar-burguer").addEventListener("click", () => {
  $("#navbar-burguer").classList.toggle("is-active");
  $("#navbar").classList.toggle("is-active");
});
// Mostrar las categorias del array
const generateCategories = (categories) => {
  $("#container-categories").innerHTML = ""; //refresco el array
  for (let { name } of categories) {
    $("#container-categories").innerHTML += `<div class="level is-mobile">
        <span class="level-left tag is-primary is-light">${name}</span>
        <span class="level-right">
            <a class="level-item is-size-7">Editar</a>
            <a class="level-item is-size-7 id="eliminar-categoria">Eliminar</a>
        </span>
    </div>`;
  }
};
generateCategories(categories);

//----Agregar categorias------
let addCategory = (categoryObjet) => {
  $("#add-category-button").addEventListener("click", () => {
    categories.push(categoryObjet);
    generateCategories(categories); //vuelvo a actualizar la info
  });
};

//---Leer categoria y agregarla------
let categoryInput = () => {
  $("#category-input").addEventListener("change", (e) => {
    addCategory({ name: `${e.target.value}` });
    e.target.value = ""; //lo limpio
  });
};

categoryInput();
