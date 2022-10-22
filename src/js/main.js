let lembretes = [["Titulo do lembrete","out", 2022, "10:30"]]
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  addLembrete(event);
});

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
    lembretes.map((lembrete) =>{ 
         show.innerHTML += `<div class="task-container">${lembrete[0]} ${lembrete[lembrete.length-1]}</p></div>`
     })
 }else{
     show.innerHTML += `<div class="task-container">Nenhum lembrete cadastrado ainda</p></div>`
 }
}

mostrarLembretes();