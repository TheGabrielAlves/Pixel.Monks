function gf(eventObjectLocal) {

    const eventData = eventObjectLocal;
    eventData.items = eventObjectLocal.items; // editar com filtros necessarisos

    console.log("-----")
    console.log(eventObjectLocal)
    console.log("-----")
    console.log("-----")
    console.log(eventData)
    console.log("-----")

    APIMM(eventData);
}
