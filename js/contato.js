'use strict'

/* Selecionar os elementos que serão manipulados */
const formulario = document.querySelector('form')
const campoCep = document.querySelector('#cep')
const campoEndereco = document.querySelector('#endereco')
const campoBairro = document.querySelector('#bairro')
const campoCidade = document.querySelector('#cidade')
const campoEstado = document.querySelector('#estado')
const campoTelefone = document.querySelector('#telefone')
const botaoBuscar = document.querySelector('#buscar')
const mensagemStatus = document.querySelector('#status')

/* seleção dos campos (via Jquery) e astivação das máscaras(via Jquery Mask) */
$(campoCep).mask("00000-000")           //01234-567
$(campoTelefone).mask("(00) 0000-0000")      //(11) 2134-0300

//detectar quando o botao de buscar cep é acionado
botaoBuscar.addEventListener('click', async function (event) {
    event.preventDefault()
    let cepInformado
    /* verificar se o cep não tem 8 digitos */
    if (campoCep.value.length !== 9) {
        mensagemStatus.textContent = 'Digite um CEP válido'
        mensagemStatus.style.color = 'purple'

        return
    } else {
        cepInformado = campoCep.value
    }

     /* AJAX - Asyncronous  JS And XML
        (JS assíncronomo e XML)
        
        Técnica de comunicação (transmissão, recebimento) de dados que permite o processanebto em conjunto com APIs
        (ou Web Service)
        */

    // etapa 1: prepaara a url da API com o CEP onformado
    let url = `https://viacep.com.br/ws/${cepInformado}/json/`;

    //etapa 2; acessar a API (com a URL) e aguarda o reorno dela
    const resposta = await fetch(url);

    //etapa 3: extrair os dados da resposta da API em formato JSON
    const dados = await resposta.json();
    console.log(dados);


    //etapa 4: lidar com os dados (em caso de eoo e de sucesso)
    //se existir a string/prop 'error' no objeto de dados
    if ('erro' in dados) {
        mensagemStatus.textContent = 'CEP inexistente'
        mensagemStatus.style.color = 'red'
    } else {
        //Senão, é porque o CEP existe
        mensagemStatus.textContent = 'cep encontrado'
        mensagemStatus.style.color = 'blue'

        const camposAdicionais = formulario.querySelectorAll('.campos-restantes')

        for (const camp of camposAdicionais) {
            camp.classList.remove('campos-restantes')
        }

        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro
        campoCidade.value = dados.localidade
        campoEstado.value = dados.uf

    }
})

// script do formspree

    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status-do-evento");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: formulario.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Seus dados foram enviados!";
          formulario.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
              status.innerHTML = "Obrigado"
              status.style.color = "blue"
              formulario.reset()
            } else {
              status.innerHTML = "Oops! deu erro"
              status.style.color = "red"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! deu erro"
        status.style.color = "red"
      });
    }
    formulario.addEventListener("submit", handleSubmit)