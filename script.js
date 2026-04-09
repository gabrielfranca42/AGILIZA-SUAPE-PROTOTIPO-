
alert("O ARQUIVO JS ESTÁ CONECTADO!");// O evento DOMContentLoaded garante que o JS só rode depois que a tela inteira existir
document.addEventListener('DOMContentLoaded', function() {
    
    /* --- ROTEAMENTO E CONTROLE DAS TELAS --- */
    const pageHome = document.getElementById('home-page');
    const pageLogin = document.getElementById('login-page');
    const pageCategoria = document.getElementById('cadastro-categoria-page');
    const pageFormulario = document.getElementById('agiliza-page');

    // Função para exibir a tela desejada e ocultar as demais (Versão Robusta)
    function navigateTo(showPage) {
        if (!showPage) return; // Proteção contra erros
        
        // Esconde absolutamente todas as telas
        pageHome.classList.remove('view-active');
        pageHome.classList.add('view-hidden');
        
        pageLogin.classList.remove('view-active');
        pageLogin.classList.add('view-hidden');
        
        pageCategoria.classList.remove('view-active');
        pageCategoria.classList.add('view-hidden');
        
        pageFormulario.classList.remove('view-active');
        pageFormulario.classList.add('view-hidden');
        
        // Ativa apenas a tela que foi chamada
        showPage.classList.remove('view-hidden');
        showPage.classList.add('view-active');
        
        window.scrollTo(0, 0); // Sobe para o topo da tela
    }

    /* --- EVENTOS DE CLIQUE PARA NAVEGAÇÃO --- */

    // 1. Home -> Clica em Agiliza Suape -> Vai pro Login
    document.getElementById('btn-abrir-login').addEventListener('click', function() {
        navigateTo(pageLogin);
    });

    // 2. Login -> Clica em "Não é cadastrado" -> Vai pra Categoria
    document.getElementById('link-ir-cadastro').addEventListener('click', function(e) {
        e.preventDefault(); // Evita que a página recarregue
        navigateTo(pageCategoria);
    });

    // 3. Categoria -> Clica em "Já tem login?" -> Volta pro Login
    document.getElementById('link-voltar-login').addEventListener('click', function(e) {
        e.preventDefault();
        navigateTo(pageLogin);
    });

    // 4. Categoria -> Clica em "Resíduos Sólidos..." -> Vai pro Formulário Final
    document.getElementById('btn-cat-oleoso').addEventListener('click', function() {
        navigateTo(pageFormulario);
    });

    // Botões "Voltar"
    document.getElementById('btn-voltar-home-from-login').addEventListener('click', function() {
        navigateTo(pageHome);
    });
    
    document.getElementById('btn-voltar-login-from-cat').addEventListener('click', function() {
        navigateTo(pageLogin);
    });
    
    document.getElementById('btn-voltar-home-from-form').addEventListener('click', function() {
        document.getElementById('cadastroForm').reset();
        navigateTo(pageHome);
    });

    /* --- LÓGICA DE LOGIN DIRETO (0000 / 0000) --- */
    document.getElementById('form-login').addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário que recarrega a página
        
        const cnpjVal = document.getElementById('login-cnpj').value;
        const senhaVal = document.getElementById('login-senha').value;

        // Se as credenciais estiverem corretas, vai DIRETO para a tela do formulário (sem alertas)
        if (cnpjVal === "0000" && senhaVal === "0000") {
            document.getElementById('cnpj').value = "00.000.000/0000-00"; 
            document.getElementById('empresaId').value = "00000000000000";
            this.reset(); // Limpa os campos de login
            navigateTo(pageFormulario);
        } else {
            alert("Credenciais inválidas! Tente CNPJ: 0000 e Senha: 0000");
        }
    });

    /* --- MÁSCARAS E VALIDAÇÕES DO FORMULÁRIO FINAL --- */

    // Máscara CNPJ (Gera ID)
    const cnpjInputForm = document.getElementById('cnpj');
    const empresaIdHidden = document.getElementById('empresaId');

    cnpjInputForm.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
        empresaIdHidden.value = e.target.value.replace(/\D/g, ''); 
    });

    // Máscara CEP
    document.getElementById('cep').addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
        e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2];
    });

    // Envio do Form Final
    document.getElementById('cadastroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const residuosMarcados = document.querySelectorAll('input[name="tipoResiduo"]:checked').length;
        const operacoesMarcadas = document.querySelectorAll('input[name="tipoOperacao"]:checked').length;

        if (residuosMarcados === 0) { 
            alert('Por favor, selecione pelo menos um Tipo de Resíduo.'); 
            return; 
        }
        
        if (operacoesMarcadas === 0) { 
            alert('Por favor, selecione pelo menos um Tipo de Operação.'); 
            return; 
        }

        alert('Dados enviados com sucesso ao Agiliza SUAPE!\nID do registro: ' + empresaIdHidden.value);
        document.getElementById('btn-voltar-home-from-form').click(); // Volta à tela inicial
    });
});

// A função de upload fica de fora do DOMContentLoaded para poder ser chamada no onclick do HTML
window.updateFileName = function(input) {
    const fileName = input.files[0] ? input.files[0].name : "Nenhum arquivo escolhido";
    input.parentElement.querySelector('.file-name').innerText = fileName;
};