// Atualiza o texto visual do input file com o nome do arquivo selecionado
function updateFileName(input) {
    const fileName = input.files[0] ? input.files[0].name : "Nenhum arquivo escolhido";
    input.parentElement.querySelector('.file-name').innerText = fileName;
}

// Máscara CNPJ e regra de negócio (ID = CNPJ)
const cnpjInput = document.getElementById('cnpj');
const empresaIdHidden = document.getElementById('empresaId');

cnpjInput.addEventListener('input', function (e) {
    // Aplica a máscara
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
    
    // Define o value do ID Oculto como sendo apenas os números do CNPJ para o backend
    empresaIdHidden.value = e.target.value.replace(/\D/g, '');
});

// Máscara CEP
document.getElementById('cep').addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
    e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2];
});

// Submissão do Formulário
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação simples: verificar se ao menos um tipo de resíduo e operação foi marcado
    const residuosMarcados = document.querySelectorAll('input[name="tipoResiduo"]:checked').length;
    const operacoesMarcadas = document.querySelectorAll('input[name="tipoOperacao"]:checked').length;

    if (residuosMarcados === 0) {
        alert('Por favor, selecione pelo menos um Tipo de Resíduo.');
        return;
    }

    if (operacoesMarcadas === 0) {
        alert('Por favor, selecione pelo menos um Tipo de Operação de Retirada.');
        return;
    }

    alert('Dados validados localmente. Enviando para o sistema Agiliza SUAPE...\nID de registro gerado: ' + empresaIdHidden.value);
    // Lógica de fetch/axios para o backend entraria aqui
});