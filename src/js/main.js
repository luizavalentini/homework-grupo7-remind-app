let lembretes = [
    ["Titulo do lembrete","out", 2022, "10:30"], 
    ["Ir na facul","nov", 2022, "10:30"], 
    ["fazer compras","out", 2022, "10:30"],
]
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  addLembrete(event);
});
let meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
let mesAtual = 10;

function manipularModal() {
  modal = document.querySelector(".modal-container");
  modal.classList.toggle("hidden");
}

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

function manipularModal(){
    modal = document.querySelector('.modal-container')
    modal.classList.toggle('hidden')
}

function mostrarLembretes(){
  let show = document.querySelector('.tasks');
  show.innerHTML = '';
  if(lembretes.length > 0) {
    lembretes.filter((lembrete) =>{
        if(lembrete[1] === meses[mesAtual-1]){
            show.innerHTML += `<div class="task-container task-container-item"><p>${lembrete[0]}</p> <p>${lembrete[lembrete.length-1]}</p></div>`
        }
     })
 }else{
     show.innerHTML += `<div class="task-container">Nenhum lembrete cadastrado ainda</p></div>`
 }
}

mostrarLembretes();