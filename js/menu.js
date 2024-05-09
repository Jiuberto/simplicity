'use strict'

//selecionando o elemento que acionara a lista de links menu
const botaoMenu = document.querySelector('nav h2 a');

//selencionando a lista de links/menu

const listaDeLinks = document.querySelector('.links-menu')


//monitorar o evento clique/toque no botaoMenu
botaoMenu.addEventListener('click', function (event) {
    /* "Prevenir/anular" o evento padrão do link de redirecionamento/recarregamento da página*/
    event.preventDefault()
    
    listaDeLinks.classList.toggle('aberto')

    if (listaDeLinks.classList.contains('aberto')) {
        botaoMenu.innerHTML = 'Fecha &times;';
    } else {
        botaoMenu.innerHTML = 'Menu &equiv;'
    }
});



