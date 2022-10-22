let lembretes = [["Titulo do lembrete","out", 2022, "10:30"]]
let show = document.querySelector('.tasks');




function manipularModal(){
    modal = document.querySelector('.modal-container')
    modal.classList.toggle('hidden')
}

if(lembretes.length > 0) {
   lembretes.map((lembrete) =>{ 
        show.innerHTML += `<div class="task-container">${lembrete[0]} ${lembrete[lembrete.length-1]}</p></div>`
    })
}else{
    show.innerHTML += `<div class="task-container">Nenhum lembrete cadastrado ainda</p></div>`
}
