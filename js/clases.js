//se declara la clase de camiseta
class Camiseta {
    constructor(id, equipo, marca, precio, imagen, cantidad) {
        this.id = parseInt(id);
        this.equipo = equipo.toUpperCase();
        this.marca = marca;
        this.precio = parseInt(precio);
        this.imagen = imagen;
        this.cantidad = cantidad;
    }
    agregarCantidad(valor) {
        this.cantidad += valor;
    }
    subtotal() {
        return this.cantidad * this.precio;
    }
}