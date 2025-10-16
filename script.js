// Abre modal com detalhes do produto
document.querySelectorAll('.ver-mais').forEach(button => {
  button.addEventListener('click', () => {
    const produto = button.parentElement;
    const titulo = produto.querySelector('h3').textContent;
    const descricao = produto.querySelector('p').textContent;
    const preco = produto.querySelector('span').textContent;
    const imagem = produto.querySelector('img').src;

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" aria-label="Fechar modal">&times;</span>
        <img src="${imagem}" alt="${titulo}" />
        <h2>${titulo}</h2>
        <p>${descricao}</p>
        <strong>${preco}</strong>
        <br><br>
        <button onclick="adicionarAoCarrinho('${titulo}')">Adicionar ao Carrinho</button>
      </div>
    `;
    document.body.appendChild(modal);

    // Fecha modal ao clicar no X
    modal.querySelector('.close').addEventListener('click', () => {
      modal.remove();
    });

    // Fecha modal ao clicar fora do conteúdo
    modal.addEventListener('click', e => {
      if (e.target.classList.contains('modal')) {
        modal.remove();
      }
    });

    // Fecha modal com tecla ESC
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  });
});

// Função de adicionar ao carrinho
function adicionarAoCarrinho(produto) {
  alert(`"${produto}" foi adicionado ao carrinho!`);
}

// Filtro de busca (se existir campo de busca na página)
const campoBusca = document.getElementById('busca');
if (campoBusca) {
  campoBusca.addEventListener('input', e => {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll('.produto').forEach(produto => {
      const titulo = produto.querySelector('h3').textContent.toLowerCase();
      produto.style.display = titulo.includes(termo) ? 'block' : 'none';
    });
  });
}


//PARTE DO FORMULÁRIO

// Seleciona o formulário e o elemento de status
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// URL da sua API do Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbxKIhQrh3cBDsHUQgArnjHQVN-wfxbpHRrP5AEiDyUtdXvsbZ68pKBv7XgId1co5OZfFQ/exec';

form.addEventListener('submit', e => {
  // Impede o comportamento padrão de recarregar a página
  e.preventDefault();

  // Mostra uma mensagem de "enviando"
  formStatus.textContent = 'Enviando...';
  formStatus.style.color = '#333';

  // Envia os dados do formulário para a API
  fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
      if (data.result === 'success') {
        formStatus.textContent = 'Mensagem enviada com sucesso! Obrigado.';
        formStatus.style.color = 'green';
        form.reset(); // Limpa o formulário
      } else {
        throw new Error(data.error || 'Ocorreu um erro desconhecido.');
      }
    })
    .catch(error => {
      // Mostra uma mensagem de erro
      console.error('Erro!', error.message);
      formStatus.textContent = 'Erro ao enviar a mensagem. Tente novamente.';
      formStatus.style.color = 'red';
    });
});