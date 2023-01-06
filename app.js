const $ = (selector) => document.querySelector(selector);

// Funcionamiento menú burguer
$('#navbar-burguer').addEventListener('click', () =>{
    $('#navbar-burguer').classList.toggle("is-active")
    $('#navbar').classList.toggle("is-active")
})