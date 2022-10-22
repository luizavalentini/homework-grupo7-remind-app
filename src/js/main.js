let lembretes = [["titulo", "mês", "ano", "hora"]];

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
}
