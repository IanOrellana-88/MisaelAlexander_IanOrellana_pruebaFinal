const API_URL = "http://localhost:8080/Premios";
 
 
export async function getPremios(){
    const res = await fetch (`${API_URL}/Mostrar`);
        return res.json();
 
}
 
 
export async function createPremio (data) {
    await fetch (`${API_URL}/Mostrar`, {
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify (data)
});
}
 
export async function updatePremio (id, data){
    await fetch (`${API_URL}/Actualizar/${id}`,{
        method: "PUT",
        headers: {"Content-Type":"applicaction/json"},
        body: JSON.stringify (data)
    });
}
 
export async function  deletePremio (id) {
    await fetch (`${API_URL}/Eliminar/{id}`,{
    method: "DELETE"
  });
}