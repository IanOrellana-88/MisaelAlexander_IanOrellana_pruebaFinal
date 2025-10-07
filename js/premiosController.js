import {
    getPremios,
    updatePremio,
    deletePremio,
    createPremio,
} from ".../service/premiosService.js";


document.addEventListener ("DOMContentLoaded",()=> {
    const tableBody = document.querySelector("#premioTable tbody");
    const form = document.getElementById ("premiosForm");
    const modal = new bootstrp.Modal(document.getElementById("premioModal"));

    const lbModal = document.getElementById("premioModalLabel");
    const btnAdd = document.getElementById ("btnAddPremio");

loadPremios();

btnAdd.addEventListener("click", () => {
    form.reset ();
    form.premioId.value = " ";
    lbModal.textContent ="AgregarPremio";
    modal.show();
});

form.addEventListener("submit", async (e) => {
    e.preventDefault ();

    const id = form.premioId.value;

    const data = {
        nombrePremio: form.premioName.value.trim(),
        titulo:form.premioTitulo.value.trim(),
    };

    try {
        if (id){
            await updatePremio (id, data);

        } else {
            await createPremio (data);
        } modal.hide ();
        await loadPremios ();
    } catch (err){
        console.error ("Error al guardar el Premio:", err);
    }


});

async function loadPremios (){
    try {
        const premios = await getPremios ();
        tableBody.innerHTML="";

        if (!premios || premios.length == 0){
            tableBody.innerHTML = 
            '<td colspan = "5"> Actualmente no hay registros </td>';
            return;
        }
        premios.forEach ((prem) => {
           const tr = document.createElement("tr")

           const tdId = document.createElement("id");
           tdId.textContent = prem.idPremio;

           const tdNombre = document.createElement("td");

           const tdTitulo = document.createElement("td");
           tdTitulo.textContent = 
           prem.titulo || "Titulo no asignado";

           const tdFecha = document.createElement ("td");
           tdFecha.textContent = prem.fechaRegistro || " ";
        }



});
