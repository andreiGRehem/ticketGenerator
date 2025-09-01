// ===== EVENTOS =====
document.getElementById("ticket").addEventListener("click", gerarTicket);
document.getElementById("remove-image").addEventListener("click", removerImagem);
document.getElementById("change-image").addEventListener("click", trocarImagem);
document.getElementById("file-input").addEventListener("change", enviarImagem);

// ===== FUNÇÕES DE IMAGEM =====
function enviarImagem() {
  const reader = new FileReader();
  const input = document.getElementById("file-input");

  reader.onload = function (e) {
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    localStorage.setItem("wallpaper", base64String);
    document.getElementById("image-preview").style.display = "block";
    document.getElementById("image-preview-overlay").style.display = "none";
    document.getElementById("show-image-user").src = e.target.result;
  };

  reader.readAsDataURL(input.files[0]);
}

function removerImagem() {
  document.getElementById("image-preview").style.display = "none";
  document.getElementById("image-preview-overlay").style.display = "block";
  document.getElementById("file-input").value = "";
  document.getElementById("show-image-user").src = "";
}

function trocarImagem() {
  document.getElementById("file-input").click();
}

// ===== FUNÇÕES DE VALIDAÇÃO =====
function validarNome(nome, tipo = "completo") {
  if (tipo === "primeiro") {  
    return nome.trim().split(" ").length === 1;    
  } else if (tipo === "completo") {
    
    return nome.trim().split(" ").length >= 2;
  }
  return false;
}

function validarGitHub(usuario) {
  usuario = usuario.trim();
  if (!usuario.startsWith("@")) {
    usuario = "@" + usuario; 
  }
 
  while (usuario.startsWith("@@")) {
    usuario = usuario.slice(1);
  }
  return usuario;
}

// Função genérica para exibir erro
function exibirErro(mensagem, posicao = "abaixo", inputId) {
  const input = document.getElementById(inputId);
  document.querySelectorAll(".erro-abaixo, .erro-acima").forEach(el => el.innerText = "");
  
  if (posicao === "abaixo") {
    const divErro = document.getElementById("erro-" + inputId);
    if (divErro) divErro.innerText = mensagem;
  } else if (posicao === "acima") {
    const divErro = document.createElement("div");
    divErro.classList.add("erro-acima");
    divErro.innerText = mensagem;
    input.parentNode.insertBefore(divErro, input);
  } else if (posicao === "alert") {
    alert(mensagem);
  } else if (posicao === "toast") {
    Toastify({
  text: mensagem,
  duration: 3000,
  close: true,
  gravity: "top",
  position: "right",
  backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
  stopOnFocus: true,
  style: {
    fontSize: "14px",
    fontFamily: "Inconsolata-Regular",
    zIndex: 9999,
    position: "fixed" // garante que fique fixo na tela
  }
}).showToast()
  }
}

function limparErros() {
  document.querySelectorAll("[id$='-erro']").forEach(el => el.remove());
}

// ===== FUNÇÃO PRINCIPAL =====
function gerarTicket() {
  limparErros();

  const fileInput = document.getElementById("file-input").files[0];
  const nome = document.getElementById("name").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  let github = document.getElementById("github").value.trim();

  if (!fileInput) {
    exibirErro("Selecione uma imagem!", "abaixo", "file-input");
    return;
  } else if (fileInput.size > 512000) {
    exibirErro("O arquivo deve ser menor que 500KB!", "acima", "file-input");
    return;
  }

  if (!validarNome(nome, "completo")) {
    exibirErro("Digite seu nome e sobrenome!", "toast", "fullName");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    exibirErro("Digite um email válido!", "alert", "userEmail");
    return;
  }

  github = validarGitHub(github);

  const data = {
    nome,
    email,
    github,
    date: new Date().toLocaleDateString(),
  };

  localStorage.setItem("data", JSON.stringify(data));
  window.location.href = "ticket.html";
}