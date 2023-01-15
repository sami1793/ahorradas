// Filtrar por Tipo
let filterType = (operations, type) =>{
    return operations.filter((operation) => operation.type === type);
}
//Filtrar por Categoria
let filterCategory = (operations, category) =>{
    return operations.filter((operation) => operation.category === category);
} 

//Ejecutar Filtros
let getOperationsModified = () => {
    let type = $('#type-filter-input').value;
    let category = $('#category-filter-input').value;

    let operationsModified = operations;

    if(type!=="Todos"){
        operationsModified = filterType(operationsModified, type);
        console.log(operationsModified)
    }

    if(category!=="Todas"){
        operationsModified = filterCategory(operationsModified, category);
        console.log(operationsModified)
    }
 
    return operationsModified;
}

$('#type-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsModified());
});

$('#category-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsModified());
});