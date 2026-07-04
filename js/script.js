document.getElementById("leadForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const btn = document.getElementById("submitBtn");
  const msg = document.getElementById("formMsg");

  btn.disabled = true;
  btn.innerText = "Enviando...";
  msg.innerHTML = "";

  const data = {
    nome: form.nome.value,
    sobrenome: form.sobrenome.value,
    empresa: form.empresa.value,
    email: form.email.value,
    telefone: form.telefone.value,
    mensagem: form.mensagem.value
  };

  try {
    const res = await fetch("https://formspree.io/f/xnjgwlgz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      msg.innerHTML = "✅ Mensagem enviada com sucesso!";
      msg.style.color = "#FFFFFF";
      form.reset();
    } else {
      msg.innerHTML = "❌ Erro ao enviar. Tente novamente.";
      msg.style.color = "#FFD1D1";
    }

  } catch (error) {
    msg.innerHTML = "❌ Erro de conexão.";
    msg.style.color = "#FFD1D1";
  }

  btn.disabled = false;
  btn.innerText = "Enviar mensagem";
});
</script>

<!-- 🖼️ MODAL IMAGEM -->
<div id="modalImagem" style="
  display:none;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.9);
  justify-content:center;
  align-items:center;
  z-index:9999;
">

  <span onclick="fecharImagem()" style="
    position:absolute;
    top:20px;
    right:30px;
    font-size:40px;
    color:white;
    cursor:pointer;
  ">&times;</span>

  <img id="imgExpandida" style="
    max-width:90%;
    max-height:90%;
    border-radius:12px;
  ">

</div>

<script>
function abrirImagem(src) {
  document.getElementById("modalImagem").style.display = "flex";
  document.getElementById("imgExpandida").src = src;
}

function fecharImagem() {
  document.getElementById("modalImagem").style.display = "none";
}
</script>

<script>
function toggleMenu() {
  document.querySelector(".menu-mobile").classList.toggle("active");
}
</script>
  
<script>
document.querySelectorAll(".faq-question").forEach(function(botao) {
  botao.addEventListener("click", function() {
    botao.parentElement.classList.toggle("active");
  });
});
</script>

<script>
const slidesSolucoes = document.querySelectorAll(".slide-solucoes");
const dotsSolucoes = document.querySelectorAll(".dot");
const areaSolucoes = document.getElementById("carrosselSolucoes");

let slideAtual = 0;
let toqueInicioX = 0;
let toqueFimX = 0;

function irParaSlide(index) {
  if (index < 0) index = 0;
  if (index > slidesSolucoes.length - 1) index = slidesSolucoes.length - 1;

  slideAtual = index;

  slidesSolucoes.forEach(function(slide, i) {
    slide.classList.toggle("active", i === slideAtual);
  });

  dotsSolucoes.forEach(function(dot, i) {
    dot.classList.toggle("active", i === slideAtual);
  });
}

dotsSolucoes.forEach(function(dot, index) {
  dot.addEventListener("click", function() {
    irParaSlide(index);
  });
});

areaSolucoes.addEventListener("touchstart", function(e) {
  toqueInicioX = e.changedTouches[0].screenX;
});

areaSolucoes.addEventListener("touchend", function(e) {
  toqueFimX = e.changedTouches[0].screenX;

  if (toqueInicioX - toqueFimX > 50) {
    irParaSlide(slideAtual + 1);
  }

  if (toqueFimX - toqueInicioX > 50) {
    irParaSlide(slideAtual - 1);
  }
});

irParaSlide(0);
</script>

<script>
function toggleQuemSomos(event) {
  event.stopPropagation();
  document.querySelector(".menu-dropdown").classList.toggle("active");
}

document.addEventListener("click", function() {
  const dropdown = document.querySelector(".menu-dropdown");
  if (dropdown) {
    dropdown.classList.remove("active");
  }
});

