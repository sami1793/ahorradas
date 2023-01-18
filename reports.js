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

        balance = totalGanancias - totalGastos;
    }

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


//Obtener Totales por mes
let getTotalsMonths = (operations) =>{
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let totalGastosMes = 0;
    let totalGananciasMes = 0;
    let balanceMes= 0;
    let totalsMonth = [];
    let copyOperations = [...operations];

    for (let month of months) {
        total = totalsOperations(filterMonth(copyOperations, month));
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

let getTotalsMonths2 = (operations) =>{
    let months = [];
    let totalGastosMes = 0;
    let totalGananciasMes = 0;
    let balanceMes= 0;
    let totalsMonth = [];
    let copyOperations = [...operations];

    // for (const operation of operations) {
        
    // }
}

//Mostrar totales por categorias
let showTotalsCategories = (operations) =>{
    $('#total-category-container').innerHTML = " ";
    let totalsCategories = getTotalsCategories (operations);
    for (const {category, totalGanancias, totalGastos, balance} of totalsCategories) {
        //Mostrar solo los que tienen datos
        if(totalGastos!=0 || totalGanancias!=0)
        {
        $('#total-category-container').innerHTML += `<div class="columns">
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
        $('#total-month-container').innerHTML += `<div class="columns">
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
    let totalsCategories = getTotalsCategories (operations);
    let mayorGanancia = 0;
    let categoryMayorGanancia = "";
    let mayorGasto = 0;
    let categoryMayorGasto = "";
    let mayorBalance = 0;
    let categoryMayorBalance = "";
    for (const {category, totalGanancias, totalGastos, balance} of totalsCategories) {
        if(totalGanancias >= mayorGanancia){
            mayorGanancia = totalGanancias;
            categoryMayorGanancia = category;
        }
            
        if(totalGastos >= mayorGasto){
            mayorGasto = totalGastos;
            categoryMayorGasto = category;
        }
            
        if(balance >= mayorBalance){
            mayorBalance = balance;
            categoryMayorBalance = category;
        }
            
    }
    $('#resume-reports-container').innerHTML = 
    `<div class="columns is-mobile">
    <div class="column is-4 has-text-weight-semibold">
        <div>Categoría con mayor ganancia</div>
    </div>
    <div class="column is-4">
        <div class="tag is-primary is-light">${categoryMayorGanancia}</div>
    </div>
    <div class="column is-4">
        <div class="has-text-success">
        <span>+$</span>
        <span>${mayorGanancia}</span>
        </div>
    </div>
</div>

<div class="columns is-mobile">
    <div class="column is-4 has-text-weight-semibold">
        <div>Categoría con mayor gasto</div>
    </div>
    <div class="column is-4">
        <div class="tag is-primary is-light">${categoryMayorGasto}</div>
    </div>
    <div class="column is-4">
        <div class="has-text-danger">
            <span>-$</span>
            <span>${mayorGasto}</span>
        </div>
    </div>
</div>

<div class="columns is-mobile">
    <div class="column is-4 has-text-weight-semibold">
        <div>Categoría con mayor balance</div>
    </div>
    <div class="column is-4">
        <div class="tag is-primary is-light">${categoryMayorBalance}</div>
    </div>
    <div class="column is-4">
        <div class="has-text-weight-semibold">
            <span>$</span>
            <span>${mayorBalance}</span>
        </div>
    </div>
</div>`
}

//Obtener mes MM/AAAA
let getMonth = (date) =>{
    dateSlice = date.slice(0,7)
    return dateSlice;
}


