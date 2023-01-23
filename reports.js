//Obtener Totales
let totalsOperations = (operations) =>{
    let totalGanancias = 0;
    let totalGastos = 0;
    let balance = 0;

    for (let { id, description, amount, type, category, date } of operations){
        if (type === "Gasto") {
            totalGastos += Number(amount);
        } 
        else if (type == "Ganancia") {
            totalGanancias += Number(amount);
        }

    }

    balance = totalGanancias - totalGastos;

    return {
        totalGanancias : totalGanancias,
        totalGastos : totalGastos,
        balance :  balance
    }
}

//Obtener Totales por Categorias
let getTotalsCategories = (operations)=>{
    let totalGastosCategory = 0;
    let totalGananciasCategory = 0;
    let balanceCategory= 0;
    let totalsCategories = [];
    let copyOperations = [...operations];

    for (let category of categories) {
        total = totalsOperations(filterCategory(copyOperations, category.name));
        totalGastosCategory = total.totalGastos;
        totalGananciasCategory =  total.totalGanancias;
        balanceCategory = total.balance;

        totalsCategories.push({
            category : category.name,
            totalGanancias: totalGananciasCategory,
            totalGastos: totalGastosCategory,
            balance: balanceCategory
        })
    }

    return totalsCategories;
}

//Obtener meses AAAAMMM
let getMonths = (operations) =>{
    let months = [];

     for (const operation of operations) {
        if(!months.some((e)=>
            e === getMonth(operation.date)
        ))
        {
            months.push(getMonth(operation.date))
        }
     }
     return months;
}

//Obtener Totales por mes
let getTotalsMonths = (operations) =>{
    let months = getMonths(operations);
    let totalGastosMes = 0;
    let totalGananciasMes = 0;
    let balanceMes= 0;
    let totalsMonth = [];
    let copyOperations = [...operations];

    for (let month of months) {
        total = totalsOperations(filterMonthAAAMM(copyOperations, month));
        totalGastosMes = total.totalGastos;
        totalGananciasMes =  total.totalGanancias;
        balanceMes = total.balance;

        totalsMonth.push({
            month : month,
            totalGanancias: totalGananciasMes,
            totalGastos: totalGastosMes,
            balance: balanceMes
        })
    }

    return totalsMonth;
}

//Mostrar totales por categorias
let showTotalsCategories = (operations) =>{
    $('#total-category-container').innerHTML = " ";
    let totalsCategories = getTotalsCategories (operations);
    for (const {category, totalGanancias, totalGastos, balance} of totalsCategories) {
        //Mostrar solo los que tienen datos
        if(totalGastos!=0 || totalGanancias!=0)
        {
        $('#total-category-container').innerHTML += `<div class="columns is-mobile">
        <div class="column is-3">
            <span class="tag is-primary is-light">${category}</span>
        </div>
        <div class="column is-3 has-text-success">
            <span>+$</span>
            <span class="has-text-weight-semibold">${totalGanancias}</span>
        </div>
        <div class="column is-3 has-text-danger">
            <span>-$</span>
            <span class="has-text-weight-semibold">${totalGastos}</span>
        </div>
        <div class="column is-3">
            <span>$</span>
            <span class="has-text-weight-semibold">${balance}</span>
        </div>
    </div>`
    }
    }
}

//Mostrar totales por mes
let showTotalsMonths = (operations) =>{
    $('#total-month-container').innerHTML = " ";
    let totalsMonth = getTotalsMonths (operations);
    for (const {month, totalGanancias, totalGastos, balance} of totalsMonth) {
        $('#total-month-container').innerHTML += `<div class="columns is-mobile">
        <div class="column is-3">
            <span class="has-text-weight-semibold">${month}</span>
        </div>
        <div class="column is-3 has-text-success">
            <span>+$</span>
            <span class="has-text-weight-semibold">${totalGanancias}</span>
        </div>
        <div class="column is-3 has-text-danger">
            <span>-$</span>
            <span class="has-text-weight-semibold">${totalGastos}</span>
        </div>
        <div class="column is-3">
            <span>$</span>
            <span class="has-text-weight-semibold">${balance}</span>
        </div>
    </div>`
    }
}

//Mostrar Resumen
let showResume = (operations) =>{
    $('#resume-reports-container').innerHTML = " ";
 
    //Obtener estadisticas por categorias
    let totalsCategories = getTotalsCategories (operations);

    let mayorGananciaCategoria = getMayorGanancia(totalsCategories);
    let mayorGastoCategoria = getMayorGasto(totalsCategories);
    let mayorBalanceCategoria = getMayorBalance(totalsCategories);

    //Obtener estadisticas por mes
    let totalsMonth = getTotalsMonths(operations);

    let mayorGananciaMes = getMayorGanancia (totalsMonth);
    let mayorGastoMes = getMayorGasto(totalsMonth);

    $('#resume-reports-container').innerHTML = 
    `<div class="columns is-mobile">
    <div class="column is-6 has-text-weight-semibold">
        <div>Categoría con mayor ganancia</div>
    </div>
    <div class="column is-3">
        <div class="tag is-primary is-light">${mayorGananciaCategoria.category}</div>
    </div>
    <div class="column is-3">
        <div class="has-text-success has-text-weight-semibold">
        <span>+$</span>
        <span>${mayorGananciaCategoria.totalGanancias}</span>
        </div>
    </div>
</div>

<div class="columns is-mobile">
    <div class="column is-6 has-text-weight-semibold">
        <div>Categoría con mayor gasto</div>
    </div>
    <div class="column is-3">
        <div class="tag is-primary is-light">${mayorGastoCategoria.category}</div>
    </div>
    <div class="column is-3">
        <div class="has-text-danger has-text-weight-semibold">
            <span>-$</span>
            <span>${mayorGastoCategoria.totalGastos}</span>
        </div>
    </div>
</div>

<div class="columns is-mobile">
    <div class="column is-6 has-text-weight-semibold">
        <div>Categoría con mayor balance</div>
    </div>
    <div class="column is-3">
        <div class="tag is-primary is-light">${mayorBalanceCategoria.category}</div>
    </div>
    <div class="column is-3">
        <div class="has-text-weight-semibold">
            <span>$</span>
            <span>${mayorBalanceCategoria.balance}</span>
        </div>
    </div>
</div>

<div class="columns is-mobile">
    <div class="column is-6 has-text-weight-semibold">
        <div>Mes con mayor ganancia</div>
    </div>
    <div class="column is-3 has-text-weight-semibold">
        <div class="">${mayorGananciaMes.month}</div>
    </div>
    <div class="column is-3">
        <div class="has-text-success has-text-weight-semibold">
            <span>$</span>
            <span>${mayorGananciaMes.totalGanancias}</span>
        </div>
    </div>
</div>

<div class="columns is-mobile">
    <div class="column is-6 has-text-weight-semibold">
        <div>Mes con mayor gasto</div>
    </div>
    <div class="column is-3 has-text-weight-semibold">
        <div class="">${mayorGastoMes.month}</div>
    </div>
    <div class="column is-3">
        <div class="has-text-danger has-text-weight-semibold">
            <span>-$</span>
            <span>${mayorGastoMes.totalGastos}</span>
        </div>
    </div>
</div>`
}

//Obtener mes MM/AAAA
let getMonth = (date) =>{
    dateSlice = date.slice(0,7)
    return dateSlice;
}

//Obtener mayor ganancia
let getMayorGanancia = (totals) =>{
    let max = totals[0].totalGanancias;
    return totals.reduce ( (acc, item) =>{        
        return item.totalGanancias>max?item:acc;
    })
}

//Obtener mayor gasto
let getMayorGasto = (totals) =>{
    let max = totals[0].totalGastos;
    return totals.reduce ( (acc, item) =>{        
        return item.totalGastos>max?item:acc;
    })
}

//Obtener mayor balance
let getMayorBalance = (totals) =>{
    let max = totals[0].balance;
    return totals.reduce ( (acc, item) =>{        
        return item.balance>max?item:acc;
    })
}
