//creacion de interfaz html
function productosIntfz(camisetas, id) {
  $(id).empty();
  for (const camiseta of camisetas) {
    //comentado forma de agregar sin jquerry
    /*let divCamiseta = document.createElement("div");
    divCamiseta.classList.add("col-md-4");
    divCamiseta.innerHTML =*/
    $(id).append(`<div class="card border-success m-4" style="width: 20rem;">
                            <img src="${camiseta.imagen}" class="card-img-top" alt="...">
                           <div class="card-body">
                           <h5 class="card-title texto">CAMISETA ${camiseta.equipo}</h5>
                           <p class="card-text texto">MARCA ${camiseta.marca}</p>
                           <p class="card-text texto">$${camiseta.precio}</p>
                           <button id=${camiseta.id} class="boton btn btn-success">añadir al carrito</button>
                           </div>
                           </div>`);
    /*let seccion = document.getElementById("cardds")                      
    seccion.appendChild(divCamiseta);*/
  }
  $('.boton').on("click", agregar);
}

//funcion comprar carrito
//e-->prevent para prevenir refresco al apretar sobre botones/enlaces
function agregar(e) {
  e.preventDefault()
  alertify.success("¡agregado correctamente!")//alerta de agregado al presionar boton
  const idCamiseta = e.target.id;   //id del producto
  const seleccion = carrito.find(p => p.id == idCamiseta); //busco objeto en el carrito
  if (seleccion == undefined) {                                //busco en el array de camisetas
    carrito.push(camisetas.find(p => p.id == idCamiseta));
  } else {                             //se agrega una cantidad si no se encuentra
    seleccion.agregarCantidad(1);
  }
  localStorage.setItem("CARRITO", JSON.stringify(carrito)); //guardo en storage

  carritoNotif(carrito);
}

//notificaciones e interior carrito , interfaz
function carritoNotif(productos) {
  $("#cantidad").html(productos.length); //se cambia interior de badge de notificaciones
  $('#carrito').empty();  //se vacia carrito
  for (const producto of productos) {
    $('#carrito').append(registroCarrito(producto));
  }
  $('#carrito').append(`<hr>
                        <div class="totalCarr">
                        <p class="pCarr" id="totalCarrito"> TOTAL ${totalCarrito(productos)}</p>
                        </div>`)
  $('#carrito').append('<div id="divConfirmar" class="text-center"><button id="btnConfimar" class="btn btn-success">CONFIRMAR</button></div>')
  //asocio enventos a botones
  $('.btn-borrar').on('click', eliminarCarrito);
  $('.btn-agregar').click(sumarCantidad);
  $('.btn-subtotal').click(subCantidad);
  $('#btnConfimar').click(confirmarCompra);
}

//estructura botones
function registroCarrito(producto) {
  return `<div class="fondoCarrito">${producto.equipo}
            <span class="badge badge-success">$${producto.precio}</span>
            <span class="badge badge-light">${producto.cantidad}</span>
            <span class="badge badge-light"> $ ${producto.subtotal()}</span>
            <a id="${producto.id}" class="btn bot    btn-agregar">+</a>
            <a id="${producto.id}" class="btn bot btn-subtotal">-</a>
            <a id="${producto.id}" class="btn btn-danger  btn-borrar">x</a>
            </div>`
}

function eliminarCarrito(e) {
  let eliminar = carrito.findIndex(p => p.id == e.target.id);
  carrito.splice(eliminar, 1);
  carritoNotif(carrito); //generar nueva interfaz
  localStorage.setItem("CARRITO", JSON.stringify(carrito));
}

//agregar cantidad
function sumarCantidad() {
  let producto = carrito.find(p => p.id == this.id);
  producto.agregarCantidad(1);
  $(this).parent().children()[1].innerHTML = producto.cantidad;
  $(this).parent().children()[2].innerHTML = producto.subtotal();
  //total carrito
  $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);
  localStorage.setItem("CARRITO", JSON.stringify(carrito));
}

//restar cantidad
function subCantidad() {
  let producto = carrito.find(p => p.id == this.id);
  if (producto.cantidad > 1) {
    producto.agregarCantidad(-1);
    //$(this).parent().children()[1].innerHTML = producto.cantidad;
    let registroUI = $(this).parent().children();
    registroUI[1].innerHTML = producto.cantidad;
    registroUI[2].innerHTML = producto.subtotal();
    //total carrito
    $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);
    localStorage.setItem("CARRITO", JSON.stringify(carrito));
  }
}

//precio total del carrito
function totalCarrito(carrito) {
  console.log(carrito);
  let total = 0;
  carrito.forEach(p => total += p.subtotal());
  return total;
}

//generar opciones del select
function selectUI(lista, selector) {
  //se vacia las opciones existentes
  $(selector).empty();
  //recorrer lista y añadir una opcion por cada elemento
  lista.forEach(element => {
    $(selector).append(`<option value='${element}'>${element}</option>`);
  });
  $(selector).prepend(`<option value='TODOS' selected>TODOS</option>`);
}

//funcion de para notificacion del boton de compra
function confirmarCompra() {
  //ocultar boton
  $('#btnConfimar').hide();
  $("#notificaciones").html(`<div class="alert alert-sucess alert-dismissible fade show" role="alert">
                              <strong class="texto ">¡COMPRA CONFIRMADA!</strong> 
                              </div>`).fadeIn().delay(3000).fadeOut('');
  //vaciar carrito
  carrito.splice(0, carrito.length);
  //sobreescribir lo almacenado en storage
  localStorage.setItem("CARRITO", '[]');
  //vaciar menu
  $('#carrito').empty();
  //indicador en 0
  $('#cantidad').html(0);

}

//modo oscuro
const btnSwitch = document.querySelector("#switch");

btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnSwitch.classList.toggle("active");
})

//formulario
const miFormulario = document.getElementById("formContacto");
miFormulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = miFormulario.nombre.value;
  const email = miFormulario.email.value;
  const comentario = miFormulario.comentario.value;
  console.log(nombre);
  console.log(email);
  console.log(comentario)
  swal("comentario enviado con exito", "", "success");
  //vacio inputs
  $('#_nombre').val("");
  $('#email').val("");
  $('#comentario').val("");
})