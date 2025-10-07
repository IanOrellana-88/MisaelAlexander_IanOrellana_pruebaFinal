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

           const tdBtns = document.createElement ("id");
           tdBtns.innerHTML = `<button class=btn btn-sm> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg> </button>
           <button> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> 
           </button>;`

           tdBtns.querySelector(".edit-btn").addEventListener("click", () => {
            form.premioId.value = prem.idPremio;
            form.premioNameName.value = prem.nombrePremio;
            form.premioTitulo.value = prem.titulo;
            lbModal.textContent = "Editar Premio";
            modal.show();
          });
  
          tdBtns.querySelector(".delete-btn").addEventListener("click", async () => {
            if (confirm("¿Desea eliminar el Premio?")) {
              await deletePremio(prem.idPremio);
              await loadPremios();
            }
          });
  
          // Agregar todo al tr
          tr.appendChild(tdId);
          tr.appendChild(tdNombre);
          tr.appendChild(tdTitulo);
          tr.appendChild(tdFecha);
          tr.appendChild(tdBtns);
  
          tableBody.appendChild(tr);
        });
      } catch (err) {
        console.error("Error cargando categorías: ", err);
      }
    }


           


        
});
