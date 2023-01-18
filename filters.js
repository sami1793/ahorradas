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

//Filtrar por mes
let filterMonth = (operations, month) =>{
    return operations.filter((operation) => {
        let fecha = (new Date(`${operation.date} `) );
        let mes = fecha.getMonth()+1;

        return mes === month;
    })
}

//Filtrar por mes formato AAAA-MM
let filterMonthAAAMM = (operations, AAAAMMM ) =>{
    return operations.filter((operation) =>{
        let monthAAAAMM = operation.date.slice(0,7);

        return monthAAAAMM === AAAAMMM;
    })
}

//Ordenar por monto menor mayor
let orderByAmountAsc = (operations) =>{
    return operations.sort((a,b) =>{
        const amountA = a.amount;
        const amountB = b.amount;
        return amountA - amountB;
    })
}

//Ordenar por monto mayor menor
let orderByAmountDesc = (operations) =>{
    return operations.sort((a,b) =>{
        const amountA = a.amount;
        const amountB = b.amount;
        return amountB - amountA;
    })
}

//Ordenar por menos reciente
let orderByDateAsc = (operations) =>{
    return operations.sort((a,b)=>{
        let dateA = a.date;
        dateA = (new Date (`${dateA} `)).getTime();
        let dateB = b.date;
        dateB = (new Date (`${dateB} `)).getTime();

        return dateA-dateB;
    })
}

//Ordenar por mas reciente
let orderByDateDesc = (operations) =>{
    return operations.sort((a,b)=>{
        let dateA = a.date;
        dateA = (new Date (`${dateA} `)).getTime();
        let dateB = b.date;
        dateB = (new Date (`${dateB} `)).getTime();

        return dateB-dateA;
    })
}

//Ordenar A/Z
let orderAZ = (operations) =>{
    return operations.sort((a,b)=>{
        return a.description - b.description;
    })
}

//Ordenar Z/A
let orderZA = (operations) =>{
    return operations.sort((a,b)=>{
        return a.description - b.description;
    })
}

//Ejecutar Filtros
let getOperationsFiltered = () => {
    let type = $('#type-filter-input').value;
    let category = $('#category-filter-input').value;
    let date = $('#date-filter-input').value;
    let order = $('#order-filter-input').value;

    let operationsFiltered = operations;

    if(type!=="Todos"){
        operationsFiltered = filterType(operationsFiltered, type);
    }

    if(category!=="Todas"){
        operationsFiltered = filterCategory(operationsFiltered, category);
    }

    operationsFiltered = filterDate(operationsFiltered, date)

    switch(order){
        case 'Más reciente':
            operationsFiltered = orderByDateDesc(operationsFiltered);
            break;
        case 'Menos reciente':
            operationsFiltered = orderByDateAsc(operationsFiltered);
            break;
        case 'Mayor monto':
            operationsFiltered = orderByAmountDesc(operationsFiltered);
            break;
        case 'Menor monto':
            operationsFiltered = orderByAmountAsc(operationsFiltered);
            break;
        case 'A/Z':
            operationsFiltered = orderAZ(operationsFiltered);
            break;
        case 'Z/A':
            operationsFiltered = orderZA(operationsFiltered);
    }
 
    return operationsFiltered;
}

$('#type-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsFiltered());
});

$('#category-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsFiltered());
});

$('#date-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsFiltered());    
})

$('#order-filter-input').addEventListener('change', (e)=>{
    showOperations(getOperationsFiltered());
})