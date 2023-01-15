// Filtrar por Tipo
let filterType = (operations, type) =>{
    return operations.filter((operation) => operation.type === type);
}
//Filtrar por Categoria
let filterCategory = (operations, category) =>{
    return operations.filter((operation) => operation.category === category);
} 

//Ejecutar Filtros
let getOperationsFiltered = () => {
    let type = $('#type-filter-input').value;
    let category = $('#category-filter-input').value;

    let operationsFiltered = operations;

    if(type!=="Todos"){
        operationsFiltered = filterType(operationsFiltered, type);
        console.log(operationsFiltered)
    }

    if(category!=="Todas"){
        operationsFiltered = filterCategory(operationsFiltered, category);
        console.log(operationsFiltered)
    }
 
    return operationsFiltered;
}

$('#type-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsFiltered());
});

$('#category-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsFiltered());
});