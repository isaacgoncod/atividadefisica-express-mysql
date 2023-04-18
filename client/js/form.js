const registerNome = document.querySelector("#registerNome");
const registerNasci = document.querySelector("#registerNasci");
const registerPeso = document.querySelector("#registerPeso");
const registerAlt = document.querySelector("#registerAlt");

function registerPaciente() {
  let data = {
    nomeCompleto: registerNome.value,
    nascimento: registerNasci.value,
    peso: registerPeso.value,
    altura: registerAlt.value,
  };

  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("http://localhost:3000/paciente/create", options)
    .then((resp) => {
      return resp.json();
    })
    .then((info) => {
      if (info != undefined) {
        alert("Cadastrado com Sucesso!");
      } else {
        alert(info.msg);
      }
    });
}
