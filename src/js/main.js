let lembretes = [
    ["Titulo do lembrete","out", 2022, "10:30"], 
    ["Ir na facul","nov", 2022, "10:30"], 
    ["fazer compras","out", 2022, "10:30"],
]
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  addLembrete(event);
});
let meses = ['jan, 2022','fev, 2022','mar, 2022','abr, 2022','mai, 2022','jun, 2022','jul, 2022','ago, 2022','set, 2022','out, 2022','nov, 2022','dez, 2022']
let mesAtual = 10;
let mesChange = 0;

function mudarMesAvançar(){
    let show = document.querySelector('.mostra');
    show.innerHTML = '';
    if(mesChange+1<meses.length){
        mesChange++;
   }
    let mes = meses[mesChange]
    show.innerHTML += `<p>${mes}</p>`
}

function mudarMesVoltar(){
    let show = document.querySelector('.mostra');
    show.innerHTML = '';
    if(mesChange-1>=0){
         mesChange--;
    }
    let mes = meses[mesChange]
    show.innerHTML += `<p>${mes}</p>`
}

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