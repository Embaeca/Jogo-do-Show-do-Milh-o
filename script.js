let dd = document.querySelector(".dica");
let comecar_jogo = document.querySelector(".comecar_jogo");
let valor_acumulado = document.querySelector(".valor_acumulado");
let iniciar_jogo = document.querySelector(".iniciar_jogo");
let perguntas = document.querySelector(".perguntas");
let ace = document.querySelector(".acertos");
let valor_total = document.querySelector(".valor_toral");
let valtot = document.querySelector(".valortot");
let temporizador = document.querySelector(".temporizador");
let audioperg = document.querySelector(".audioperg");
let audioinicio = document.querySelector(".audioinicio");
let dica_e_temp = document.querySelector(".aa");
let pergnum = document.querySelector(".pergnum");

let aberturaaudio = document.querySelector(".aberturaaudio");
let boasorteaudio = document.querySelector(".boasorteaudio");
let certarespostaaudio = document.querySelector(".certarespostaaudio");
let respostaerradaaudio = document.querySelector(".respostaerradaaudio");
let tempoacabouaudio = document.querySelector(".tempoacabouaudio");
let suspense = document.querySelector(".suspense");
let moeda = document.querySelector(".moedaaud");
let vitoria = document.querySelector(".vitoriaaud");

let a = document.querySelectorAll(".a");
let b = document.querySelectorAll(".b");
let c = document.querySelectorAll(".c");
let d = document.querySelectorAll(".d");

let btns = document.querySelectorAll(".btn");

let resposta_eliminada = [];
let respostas_a_serem_eliminadas = ["a", "b", "c", "d"];
let acertos = 0;
let proxperg = 1;
let pergg = ".perg";
let cont_dica = 10;
let dicas_usadas_nessa_pergunta = 0;
let cont = 0;
let conttemp = 30;
let tempoInterval;
let controle_dica = false;
let ganhou = false;
let perdeu = false;

pp = [];
const respostas = [
  "b", // 1 - Azul
  "c", // 2 - 4
  "c", // 3 - Cachorro
  "b", // 4 - Banana
  "c", // 5 - Pães
  "c", // 6 - 3
  "b", // 7 - América do Sul
  "b", // 8 - Júpiter
  "c", // 9 - Da Vinci
  "c", // 10 - H2O
  "b", // 11 - Deodoro da Fonseca
  "d", // 12 - Pacífico
  "c", // 13 - 5
  "b", // 14 - 60
  "a", // 15 - 3,14
  "c", // 16 - Itália
  "a", // 17 - Machado de Assis
  "c", // 18 - Um poema curto
  "b", // 19 - Vaticano
  "c", // 20 - Fêmur
  "c", // 21 - Alexander Fleming
  "b", // 22 - Persa
  "c", // 23 - Antártida
  "a", // 24 - 46
  "b", // 25 - Baku
  "a", // 26 - Gödel
  "a", // 27 - Lítio
  "a", // 28 - 118
  "a", // 29 - 2,71
  "a", // 30 - G
];

telainicialaud();

for (let i = 2; i < 31; i++) {
  pp[i - 1] = i;
}

//chat :)
btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (document.querySelector(".nome").value !== "admin") {
      controle_dica = true;
      this.classList.toggle("ativo"); // Ativa ou desativa a cor
      // Desabilita todos os botões
      btns.forEach(function (b) {
        b.disabled = true;
      });
    }
  });
});
comecar_jogo.addEventListener("click", () => {
  if (document.querySelector(".comecar_jogo").value == "2") {
    window.location.reload();
  } else {
    boasorteaud();
  }
});
dd.addEventListener("click", () => {
  if (controle_dica) {
  } else {
    if (
      dicas_usadas_nessa_pergunta >= 3 &&
      document.querySelector(".nome").value !== "admin"
    ) {
      alert("Infelizmente não é mais possivel usar dicas nessa pergunta!!");
    } else {
      if (document.querySelector(".nome").value == "admin") {
      } else {
        cont_dica -= 1;
      }

      if (cont_dica <= 0) {
        cont_dica = 0;
        alert("Inrelizmente suas dicas acabaram!!");
      } else {
        dd.innerHTML = cont_dica;

        respostas_a_serem_eliminadas = respostas_a_serem_eliminadas.filter(
          (item) => item !== respostas[proxperg - 1]
        );

        let indiceAleatorio = Math.floor(
          Math.random() * respostas_a_serem_eliminadas.length
        );

        resposta_eliminada[dicas_usadas_nessa_pergunta] =
          respostas_a_serem_eliminadas[indiceAleatorio];

        if (resposta_eliminada[dicas_usadas_nessa_pergunta] == "a") {
          a[proxperg - 1].style.opacity = "0.5";
          a[proxperg - 1].disabled = true;
        }
        if (resposta_eliminada[dicas_usadas_nessa_pergunta] == "b") {
          b[proxperg - 1].style.opacity = "0.5";
          b[proxperg - 1].disabled = true;
        }
        if (resposta_eliminada[dicas_usadas_nessa_pergunta] == "c") {
          c[proxperg - 1].style.opacity = "0.5";
          c[proxperg - 1].disabled = true;
        }
        if (resposta_eliminada[dicas_usadas_nessa_pergunta] == "d") {
          d[proxperg - 1].style.opacity = "0.5";
          d[proxperg - 1].disabled = true;
        }

        respostas_a_serem_eliminadas = respostas_a_serem_eliminadas.filter(
          (item) => item !== respostas_a_serem_eliminadas[indiceAleatorio]
        );
        if (document.querySelector(".nome").value == "admin") {
        } else {
          dicas_usadas_nessa_pergunta += 1;
        }
      }
    }
  }
});

function comecar_jog() {
  pergnum.innerHTML = 30 - pp.length + 1;
  aberturaaudio.muted = true;
  suspenceaud();
  const nome = document.querySelector(".nome").value;
  if (nome == "" || nome == undefined) {
    alert("Por favor digite seu nome!!");
  } else {
    document.querySelector(pergg).style.display = "block";
    document.querySelector(".name").innerHTML = nome;
    iniciar_jogo.style.display = "none";
    perguntas.style.display = "block";
    temp();
  }
}

function noopc() {
  if (document.querySelector(".nome").value == "admin") {
  } else {
    perdeu = true;
    errouaud();
  }
}
function opc() {
  acertouaud();
}
function resperr() {
  document.querySelector(".nome").style.display = "none";
  perguntas.style.display = "none";
  comecar_jogo.innerHTML = "Recomeçar";
  iniciar_jogo.style.display = "flex";
  iniciar_jogo.style.flexDirection = "column";
  document.querySelector(".resultado_final").style.display = "flex";
  document.querySelector(".comecar_jogo").value = 2;
  ace.innerHTML = acertos;
  valor_total.innerHTML = acertos * 33333 + 10;
  dica_e_temp.style.display = "none";
}
function respcert() {
  acertos += 1;
  dicas_usadas_nessa_pergunta = 0;
  document.querySelector(pergg + proxperg).style.display = "none";
  if (pp.length === 0) {
    proxperg = 31;
    console.log(proxperg);
  } else {
    let pergaleatoria = Math.floor(Math.random() * pp.length);
    proxperg = pp[pergaleatoria];
    pp = pp.filter((item) => item !== pp[pergaleatoria]);
  }
  if (proxperg == 31) {
    pergnum.style.display = "none";
    suspense.muted = true;
    document.querySelector(pergg + proxperg).style.display = "flex";
    valor_acumulado.style.display = "none";
    dica_e_temp.style.display = "none";
    document.querySelector(".nomewin").innerHTML =
      document.querySelector(".nome").value;
    animacao();
  } else {
    document.querySelector(pergg + proxperg).style.display = "block";
  }
  pergnum.innerHTML = 30 - pp.length;
  conttemp = 30;
  resposta_eliminada = [];
  respostas_a_serem_eliminadas = ["a", "b", "c", "d"];
  temp();
  valor_acumulado.innerHTML = `${acertos * 33333 + 10}`;
  btns.forEach(function (b) {
    b.disabled = false;
    b.classList.remove("ativo"); // opcional: remove a cor ativa se quiser
  });
}
function animacao() {
  vitoriaaud();
  moedaaud();
  cont += 5000;
  let format = cont.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  valtot.textContent = format;
  if (cont < 1000000) {
    requestAnimationFrame(animacao);
  }
  if (cont == 1000000) {
    document.querySelector(".resetwin").style.display = "flex";
  }
}

function temp() {
  if (ganhou == true || document.querySelector(".nome").value == "admin") {
  } else {
    clearInterval(tempoInterval);
    temporizador.innerHTML = conttemp;

    tempoInterval = setInterval(() => {
      conttemp--;
      temporizador.innerHTML = conttemp;
      console.log(conttemp);
      if (conttemp <= 0) {
        if (proxperg == 31) {
        } else {
          clearInterval(tempoInterval);
          tempoacabouaud();
        }
      }
    }, 1000);
  }
}
function telainicialaud() {
  aberturaaudio.muted = false;
  aberturaaudio.play().catch((error) => {});
}
function boasorteaud() {
  aberturaaudio.muted = true;
  boasorteaudio.muted = false;
  boasorteaudio.play().catch((error) => {});
  boasorteaudio.addEventListener(
    "ended",
    () => {
      boasorteaudio.muted = true;
      comecar_jog();
    },
    { once: true }
  );
}
function errouaud() {
  if (document.querySelector(".nome").value == "admin") {
    resperr();
  } else {
    respostaerradaaudio.muted = false;
    respostaerradaaudio.play().catch((error) => {});
    respostaerradaaudio.addEventListener(
      "ended",
      () => {
        respostaerradaaudio.muted = true;
        suspense.muted = true;
        resperr();
      },
      { once: true }
    );
  }
}
function acertouaud() {
  if (document.querySelector(".nome").value == "admin") {
    respcert();
  } else {
    certarespostaaudio.muted = false;
    certarespostaaudio.play().catch((error) => {});
    certarespostaaudio.addEventListener(
      "ended",
      () => {
        certarespostaaudio.muted = true;
        controle_dica = false;
        respcert();
      },
      { once: true }
    );
  }
}
function tempoacabouaud() {
  if (document.querySelector(".nome").value == "admmin" || perdeu == true) {
  } else {
    tempoacabouaudio.muted = false;
    tempoacabouaudio.play().catch((error) => {});
    tempoacabouaudio.addEventListener(
      "ended",
      () => {
        tempoacabouaudio.muted = true;
        resperr();
      },
      { once: true }
    );
  }
}
function suspenceaud() {
  suspense.muted = false;
  suspense.play().catch((error) => {});
  suspense.addEventListener("ended", function loopSuspense() {
    if (!suspense.muted) {
      suspense.currentTime = 0;
      suspense.play().catch((error) => {});
    }
  });
}
function vitoriaaud() {
  vitoria.muted = false;
  vitoria.volume = 0.5;
  vitoria.play().catch((error) => {});
  vitoria.addEventListener("ended", function loopvitoria() {
    if (!vitoria.muted) {
      vitoria.currentTime = 0;
      vitoria.play().catch((error) => {});
    }
  });
}
function moedaaud() {
  moeda.muted = false;
  moeda.play().catch((error) => {});
  moeda.addEventListener("ended", () => {
    moeda.muted = true;
  });
}
