const url = "http://localhost:3000/paciente";
const corpo = document.querySelector("#corpo");
const modal = document.querySelector(".modal-corpo");
const modalTitle = document.querySelector(".modal-title");
let query = document.querySelector("#query");

fetch(url + "/listar", { method: "GET" })
  .then((resp) => resp.json())
  .then((resp) => {
    montarTabela(resp);
  })
  .catch((err) => console.error(err));

function montarTabela(vetor) {
  vetor.forEach((e) => {
    let linha = document.createElement("tr");
    let col1 = document.createElement("td");
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");
    let button = document.createElement("button");

    col1.innerHTML = e.nome_completo;
    col2.innerHTML = e.diagnostico;
    button.innerHTML = "Info";

    button.setAttribute("type", "button");
    button.setAttribute("data-mdb-toggle", "modal");
    button.setAttribute("data-mdb-target", "#myModal");
    button.setAttribute("onclick", `getNomePaciente('${e.nome_completo}')`);

    button.className = "btn btn-primary";

    linha.appendChild(col1);
    linha.appendChild(col2);
    linha.appendChild(col3);
    col3.appendChild(button);

    corpo.appendChild(linha);
  });
}

function getNomePaciente(nome) {
  fetch(url + "/listar/nome?nomeCompleto=" + nome, { method: "GET" })
    .then((resp) => resp.json())
    .then((resp) => {
      modal.innerHTML = "";

      getPacienteInfo(resp);
    })
    .catch((err) => console.error(err));
}

function getPacienteInfo(vetor) {
  vetor.forEach((e) => {
    let linha = document.createElement("tr");
    let col1 = document.createElement("td");
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");
    let col4 = document.createElement("td");
    let col5 = document.createElement("td");
    let col6 = document.createElement("td");
    let col7 = document.createElement("td");

    modalTitle.innerHTML = e.nome_completo;
    col1.innerHTML = e.nome_completo;
    col2.innerHTML = formatarData(e.nascimento);
    col3.innerHTML = e.peso;
    col4.innerHTML = e.altura;
    col5.innerHTML = e.idade;
    col6.innerHTML = e.imc;
    col7.innerHTML = e.diagnostico;

    linha.appendChild(col1);
    linha.appendChild(col2);
    linha.appendChild(col3);
    linha.appendChild(col4);
    linha.appendChild(col5);
    linha.appendChild(col6);
    linha.appendChild(col7);

    modal.appendChild(linha);
  });
}

function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
