const API_URL = " ";


export async function getPremios(){
    const res = await fetch ('${API_URL}'/getDataPremios');
        return res.json();

}


export async function createPremio (data) {
    await fetch ('${API_URL'}'/newPremio;
        method: "POST",
        headers : { "Content-Type": application/json"},
            body: JSON.stringify (data)
});
}

export async function updatePremio (Id, data){
    await fetch ('${API_URL}/updatePremio/${id}',{
        method: "PUT",
        headers: {"Content-Type":"applicaction/json"},
        body: JSON.stringify (data)
    });
}

export async function  deletePremio (id) {
    await fetch ('$API_URL')/deletePremio/${id}'{
    method: "DELETE"
  });
}

