// Filtrar por Tipo
let filterType = (operations, type) =>{
    return operations.filter((operation) => operation.type === type);
}
//Filtrar por Categoria
let filterCategory = (operations, category) =>{
    return operations.filter((operation) => operation.category === category);
}

//Filtrar por fecha
let filterDate = (operations , date) =>{
    return operations.filter((operation) => {
        let fechaOperaciones = (new Date(`${operation.date} `)).getTime();
        let fecha = (new Date (`${date} `)).getTime()
        return fechaOperaciones >= fecha
    })
}

//Ejecutar Filtros
let getOperationsFiltered = () => {
    let type = $('#type-filter-input').value;
    let category = $('#category-filter-input').value;
    let date = $('#date-filter-input').value;

    let operationsFiltered = operations;

    if(type!=="Todos"){
        operationsFiltered = filterType(operationsFiltered, type);
    }

    if(category!=="Todas"){
        operationsFiltered = filterCategory(operationsFiltered, category);
    }

    operationsFiltered = filterDate(operationsFiltered, date)
 
    return operationsFiltered;
}

$('#type-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsFiltered());
});

$('#category-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsFiltered());
});

$('#date-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsFiltered())    
})

// $('#date-new-operation-input').addEventListener('click', (e)=>{
//     alert("funciona")
//     console.log($('#date-new-operation-input').value)
// })