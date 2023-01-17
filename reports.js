//Obtener Totales por Categorias
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

//Mostrar totales por categorias

let showTotalsCategories = (operations) =>{
    $('#total-category-container').innerHTML = " ";
    let totalsCategories = getTotalsCategories (operations);
    for (const {category, totalGanancias, totalGastos, balance} of totalsCategories) {
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

showTotalsCategories(operations);