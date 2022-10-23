// Inicialização de variáveis
let lembretes = [
    ["Titulo do lembrete","out", 2022, "11:30"], 
    ["Ir na facul","nov", 2022, "10:30"], 
    ["fazer compras","out", 2022, "10:30"],
]

let horaLembrete = '';
/*
  Estrutura dum item do array lembretes: 
  item[0] -> Descrição
  item[1] -> Mês
  item[2] -> Ano
  item[3] -> Hora
*/
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
  //As duas linhas acima criam um objeto com todos os campos do formulario.
  if(validarHorario(lembreteObj.hora) && validarDescricao(lembreteObj.descricao)){ 
    let lembreteArray = [];
    lembreteArray.push(lembreteObj.descricao);
    lembreteArray.push(lembreteObj.mes);
    lembreteArray.push(parseInt(lembreteObj.ano));
    lembreteArray.push(horaLembrete);
    lembretes.push(lembreteArray);
    manipularModal();
    mostrarLembretes();
    }
}


//Mostrar Lembretes na tela

function mostrarLembretes(){
  let show = document.querySelector('.tasks');
  show.innerHTML = '';
  let lembretesFiltrados = lembretes.filter((lembrete) => lembrete[1] === meses[mesAtual-1] && lembrete[2] == anoAtual )   
  if (lembretesFiltrados.length > 0 ){
    lembretesFiltrados
    .sort((a,b) => parseInt(a[3].replace(':', '')) - parseInt(b[3].replace(':', '')))
    .forEach((el) =>{
      show.innerHTML += `<div class="task-container task-container-item">
        <p>${el[0]}</p>
        <div class="flex-row-center">
          <p>${el[el.length-1]}</p>
          <button class="delete-lembrete" onclick='confirmarExcluirLembrete(${lembretes.indexOf(el)})'> &#128465 </button>
        </div>
      </div>`
    })
    }else{
      show.innerHTML = `<div class="task-container">Nenhum lembrete cadastrado ainda</p></div>`
  }
}

// Validar o formato do horário

function validarHorario(horario){
  const msgErro = document.getElementById('erro-horario');
  msgErro.innerText = "";
  let hora = parseInt(horario.slice(0, 2));
  let minutos = horario.slice(-2);
  if(horario.length !== 5 || horario.slice(2, 3) !== ':') {
    msgErro.innerText = 'Hora inválida, formato correto HH:MM';
    return false;
  }else{
    if(hora >= 0 && hora < 24 && minutos >=0 && minutos < 60){
     hora = formataHoraMinuto(hora)
     minutos = minutos;
     horaLembrete = `${hora}:${minutos}`;
     return true;
    }else{
      msgErro.innerText = "Hora inválida, formato correto HH:MM";
      return false;
   }
  }
}

function formataHoraMinuto(a){
  return a < 10 ? `0${a}` : a;
}

//Outras validações na descrição 

function validarDescricao(descricao){
  let msgErro1 = document.getElementById('erro-descricao');
  msgErro1.innerText = ''
  if(descricao != undefined){
    if (descricao.length == 0){
      msgErro1.innerText = 'Descrição deve não estar vazia'
      return false
    } else if (descricao.trim().length == 0){
      msgErro1.innerText = 'Descrição não deve ser formada apenas por espaço'
      return false
    } else if (descricao.trim().length <=3){
      msgErro1.innerText = 'Descrição deve ter mais que 3 caracteres válidos'
      return false
    } 
    return true
  } else{
    return false
  }
}

function exlcuirLembrete(index){
  lembretes.splice(index,1)
  fecharModalExcluirLembrete();
  mostrarLembretes();
}

const confirmarExcluirLembrete = (index) => {
  document.querySelector('body').innerHTML+= `<div class='modal-container' id='modal-delete'>
    <div class='modal'>
      <header class='modal-header'>
        <h2 class='modal-title'>Realmente deseja exlcuir o lembrete? </h2>
      </header>
      <div class='flex-row-center'>
        <button onclick='exlcuirLembrete(${index})'class='button-primary'>Sim </button>
        <button class='button-primary delete' onclick='fecharModalExcluirLembrete()'> Não </button>
      </div>
    </div>
  </div>
`
}

function fecharModalExcluirLembrete(){
  modal = document.querySelector('#modal-delete')
  modal.parentNode.removeChild(modal)
}

