// Este archivo contiene las clases principales.

export class CatalogoProductos {
    // Inicializa arreglos para productos y categorías, así como un límite de productos por página
    constructor(limite){
        this.productos = [];
        this.categorias = [];
        this.limite = limite;
        this.totalProductos = undefined;
    }

    // Método que añade un producto al arreglo de productos del catálogo
    agregarProducto = (producto) => {
        this.productos.push(producto);
        return this.productos;
    }

    // Método asincrónico que obtiene los productos de la API https://dummyjson.com/products y permite filtrar por categoría y paginar los resultados
    cargarCatalogo = async(pagina, categoria = "") => {
        if(categoria !== "") categoria = `/category/${categoria}`;
        
        const skip = (pagina - 1) * this.limite;
        const url = `https://dummyjson.com/products/${categoria}?limit=${this.limite}&skip=${skip}`;

        try {
            const respuesta = await fetch(url);
            
            if (!respuesta.ok) {
                throw new Error(`Respuesta HTTP no válida, status: ${respuesta.status}`);
            }

            const datos = await respuesta.json();
            const productos = datos.products;
            
            this.productos = [];

            productos.forEach(producto => {
                const {id, title:nombre, price:precio, description:descripcion, category:categoria, images:imagenes, thumbnail} = producto;
                this.agregarProducto(new Producto(id, nombre, precio, descripcion, categoria, imagenes, thumbnail));
            });
            
            this.totalProductos = datos.total;
            
        } catch (error) {
            if (error.message === 'fetch failed') error.message = "Falla en la conexión o url no válida";
            console.log(`\nError: ${error.message}`);
        }
    }

    // Método asincrónico que obtiene la lista de categorías de la API
    cargarCategorias = async() => {
        const url = `https://dummyjson.com/products/category-list`;
        
        try {
            const respuesta = await fetch(url);
            
            if (!respuesta.ok) {
                throw new Error(`Respuesta HTTP no válida, status: ${respuesta.status}`);
            }

            this.categorias = await respuesta.json();

        } catch (error) {
            if (error.message === 'fetch failed') error.message = "Falla en la conexión o url no válida";
            console.log(`\nError: ${error.message}`);
        }
    }
}

export class CarroCompras {
    constructor(compras = []){
        this.compras = compras;
    }

    // Método que añade un producto al carro de compras. Si el producto ya está en el carrito, solo aumenta la cantidad
    agregarCompra = (cantidad, producto) => {
        const productoComprado = this.compras.find(compra => compra.producto.id === producto.id);
        
        if( productoComprado === undefined){
            this.compras.push(new DetalleCompra(cantidad, producto));
        } else {
            productoComprado.cantidad += cantidad;  
        }

        return this.compras;
    }

    // Método que modifica la cantidad de un producto en el carro de compras
    actualizarCantidad = (idProducto, cantidad) => {
        const compra = this.compras.find(compra => compra.producto.id == idProducto);
        
        if(compra === undefined) throw new Error("ID producto no válido");
            
        compra.cantidad += cantidad;
        return compra.cantidad;
    }

    // Método que elimina un producto del carro
    eliminarDetalleCompra = (idProducto) => {
        const compraIndex = this.compras.findIndex(compra => compra.producto.id == idProducto);

        if(compraIndex === -1) throw new Error("ID producto no válido");

        const detalleCompraEliminado = this.compras.splice(compraIndex,1);        
        
        return detalleCompraEliminado;
    }

    // Método que calcula el valor total de todos los productos en el carro
    calcularTotalCompra = () => {
        return this.compras.reduce((suma, compra) => suma + (compra.cantidad * compra.producto.precio), 0);
    }

    // Método que cuenta la cantidad total de productos en el carro
    calcularTotalProductos = () => {
        return this.compras.reduce((suma, compra) => suma + compra.cantidad, 0);
    }

    // Vacía el carrito de compras
    limpiarCarro = () => {
        this.compras = [];
        return this.compras;
    }
}

class DetalleCompra {
    constructor(cantidad, producto) {
        this.cantidad = cantidad;
        this.producto = producto;
        this.subTotal = cantidad * producto.precio;
    }
}

export class Producto {
    constructor(id, nombre, precio,descripcion, categoria, imagenes, thumbnail){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria; 
        this.imagenes = imagenes;
        this.thumbnail = thumbnail;
    }

    // Método que imprime los detalles de un producto en la consola.
    mostrarProducto = () => {
        const {id, nombre, precio, idCategoria, descripcion} = this;
        console.log(`\nDetalle Producto ID ${id} :\n========================\n`)
        console.log(`Nombre: ${nombre}\nPrecio: ${precio}\nCategoria: ${idCategoria}\nDescripcion: ${descripcion}`);
        console.log(this.imagenes[0]);
    }
}