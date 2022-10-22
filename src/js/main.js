// Inicialização de variáveis

let lembretes = [
    ["Titulo do lembrete","out", 2022, "10:30"], 
    ["Ir na facul","nov", 2022, "10:30"], 
    ["fazer compras","out", 2022, "10:30"],
]

let meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']

let mesAtual = 10;
let anoAtual = 2022;

//Mostrar o mês e os lembretes dele quando a página carregar

window.addEventListener("load",()=>{
  mostrarData();
  mostrarLembretes();
})

// Manipular mês/Ano

function mostrarData(){
  let show = document.querySelector('.mostra');
  show.innerHTML = '';
  let mes = meses[mesAtual-1]
  show.innerHTML += `<p>${mes}, ${anoAtual}</p>`
}

function mudarDataAvançar(){
  if(mesAtual<meses.length){
    mesAtual++;
  } else {
    mesAtual = 1
    anoAtual ++
  }
  mostrarLembretes();
  mostrarData();
}

function mudarDataVoltar(){
  if(mesAtual > 1){
    mesAtual--;
  } else {
      anoAtual --
      mesAtual = 12
  }
  mostrarLembretes();
  mostrarData();
}

//Abrir / fechar modal

function manipularModal() {
  modal = document.querySelector(".modal-container");
  modal.classList.toggle("hidden");
}

//Adicionar Lembretes

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  addLembrete(event);
});

function addLembrete(e) {
  let formData = new FormData(e.target).entries();
  let lembreteObj = Object.fromEntries(formData);
  let lembreteArray = [];
  lembreteArray.push(lembreteObj.descricao);
  lembreteArray.push(lembreteObj.mes);
  lembreteArray.push(lembreteObj.ano);
  lembreteArray.push(lembreteObj.hora);
  lembretes.push(lembreteArray);
  manipularModal();
  mostrarLembretes();
}

//Mostrar Lembretes na tela

function mostrarLembretes(){
  let show = document.querySelector('.tasks');
  show.innerHTML = '';
  let lembretesFiltrados = lembretes
  .filter((lembrete) => lembrete[1] == meses[mesAtual-1])   
  if (lembretesFiltrados.length > 0 ){
    lembretesFiltrados
    .forEach(el =>{
      show.innerHTML += `<div class="task-container task-container-item">
      <p>${el[0]}</p> <p>${el[el.length-1]}</p>
      </div>`
    })
    }else{
      show.innerHTML = `<div class="task-container">Nenhum lembrete cadastrado ainda</p></div>`
  }
}