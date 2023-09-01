// declaração das constantes
const form         = document.querySelector('form');
const pesquisaCep  = document.querySelector('#cep');
const cadast       = document.querySelector('#termos');

// limpar formulário
const limpaForm = () => {

    // limpar os valores do endereço do formulário
    document.querySelector('#uf').value          = '';
    document.querySelector('#cidade').value      = '';
    document.querySelector('#bairro').value      = '';
    document.querySelector('#logradouro').value  = '';

};

// callback
const meuCallback = (conteudo) => {

    if (!('erro' in conteudo)) {

        document.querySelector('#uf').value         = (conteudo.uf);
        document.querySelector('#cidade').value     = (conteudo.localidade);
        document.querySelector('#bairro').value     = (conteudo.bairro);
        document.querySelector('#logradouro').value = (conteudo.logradouro);
    }
    else {
        // cep não encontrado
        limpaForm();
        alert('CEP não encontrado.');


    }

};

// invalida a submissão de dados do formulário
form.onsubmit = () => false;

// evento que preenche automaticamente o endereço de acordo com cep prenechido
pesquisaCep.addEventListener('blur', () => {

    // elimina caracteres especificos deixando somente números
    let cep = pesquisaCep.value.replace(/\D/g, '');

    // verificar se o campo cep possui algum valor informado
    if (cep !='') {

        // validar o cep
        let validaCep = /^[0-9;]{8}$/;

        if (validaCep.test(cep)) {
            
            // cria elemento js
            let script = document.createElement('script');
            
            script.src = 'http://viacep.com.br/ws/' + cep + '/json/?callback=meuCallback';

            // insere o script no documento e carrega o conteúdo
            document.body.appendChild(script);
        }
        else {
            // cep inválido
            limpaForm();
            alert('CEP inválido.');
        }
    }
});

// evento mostrar dados cadastrados no modal
const cadast