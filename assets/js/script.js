// Este es el archivo que inicializa la aplicación. Realiza las llamadas asincrónicas iniciales para cargar las categorías y la primera página del catálogo

import {AdministradorInterfaz} from "./AdministradorInterfaz.js";
import {CatalogoProductos, CarroCompras} from "./Clases.js";

document.addEventListener("DOMContentLoaded", async() => {
    const productosPorPagina = 8;
    const carro = new CarroCompras();
    const catalogo = new CatalogoProductos(productosPorPagina); 
    const adminInterfaz = new AdministradorInterfaz(catalogo, carro);
    const pagina = 1;

    adminInterfaz.toogleEsperaCarga();
    await catalogo.cargarCategorias();
    await catalogo.cargarCatalogo(pagina);
    adminInterfaz.toogleEsperaCarga();
    adminInterfaz.mostrarCategorias();
    adminInterfaz.mostrarProductos();
    adminInterfaz.mostrarPaginación(pagina);
    adminInterfaz.agregarEventos();
});