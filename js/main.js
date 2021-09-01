const URLGET = "data/productos.json";
$.get(URLGET, function (datos, estado) {
    if (estado == "success") {
        for (const literal of datos) {
            camisetas.push(new Camiseta(literal.id, literal.equipo, literal.marca, literal.precio, literal.imagen, literal.cantidad))

        }
    }

    //llamada funcion de interfaz
    productosIntfz(camisetas, "#cardds");
});

window.addEventListener("load", () => {
    $("#cardds").fadeIn(100);
})


//filtro categorias
selectUI(marcas, "#filtroCategorias");
//eventos sobre el select
$('#filtroCategorias').change(function (e) {
    //se obtiene nuevo valor del select
    const value = this.value;
    //animaciones
    $('#cardds').fadeOut(600, function () {
        //filtro se realiza cuando se oculta el contenedor
        if (value == 'TODOS') {
            productosIntfz(camisetas, '#cardds');
        } else {
            const filtrados = camisetas.filter(producto => producto.marca == value);
            productosIntfz(filtrados, '#cardds');
        }
        //mostrar productos generados
        $('#cardds').fadeIn();
    });
});

//eventos , busqueda
$("#busquedaProducto").keyup(function (e) {
    const busqueda = this.value.toUpperCase();
    console.log(busqueda);
    if (busqueda != "") {

        const encontrados = camisetas.filter(p => p.equipo.includes(busqueda.toUpperCase())
            || p.marca.includes(busqueda.toUpperCase()));
        productosIntfz(encontrados, '#cardds');
    }
});

