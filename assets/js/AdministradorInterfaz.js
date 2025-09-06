import {Producto} from "./Clases.js"

// Esta clase es responsable de la manipulación del DOM y la gestión de la interacción del usuario. Actúa como el puente entre la lógica del negocio (Clases.js) y la interfaz (index.html)
export class AdministradorInterfaz {
    // Inicializa referencias a todos los elementos del DOM necesarios para la interacción
    constructor(catalogo, carro) {
        // Parametros Obligatorios Constructor
        this.catalogo = catalogo;
        this.carro = carro;
        
        // Selecciones Catálogo Productos
        this.productoSeleccionado = undefined;
        this.categoriaActiva = "";
        
        // Nodos DOM 
        // Navbar
        this.btnCarroNavbar = document.querySelector('#btn-carro-navbar');
        this.contadorNavbar = document.querySelector('#contador-navbar');
        
        // Section Catálogo Productos
        this.sectionCatalogo = document.querySelector('#section-catalogo');
        this.categoriaCatalogo = this.sectionCatalogo.querySelector('#categoria-catalogo');
        this.cargandoCatalogo = this.sectionCatalogo.querySelector('#cargando-catalogo');
        this.cardsCatalogo = this.sectionCatalogo.querySelector('#cards-catalogo');
        this.paginasCatalogo = this.sectionCatalogo.querySelector('#paginas-catalogo');

        // Section Detalles Prodcuto
        this.sectionDetalles = document.querySelector('#section-detalles');
        this.imagenDetalles = this.sectionDetalles.querySelector('#imagen-detalles');
        this.nombreDetalles = this.sectionDetalles.querySelector('#nombre-detalles');
        this.descripcionDetalles = this.sectionDetalles.querySelector('#descripcion-detalles');
        this.precioDetalles = this.sectionDetalles.querySelector('#precio-detalles');
        this.btnVolverDetalles = this.sectionDetalles.querySelector('#btn-volver-detalles');
        this.cantidadDetalles = this.sectionDetalles.querySelector('#cantidad-detalles');
        this.btnAgregarCarroDetalles = this.sectionDetalles.querySelector('#btn-agregar-carro-detalles');
        
        // Section Carro Compra
        this.sectionCarro = document.querySelector('#section-carro');
        this.alertaCarro = this.sectionCarro.querySelector('#alerta-carro');
        this.cardsCarro = this.sectionCarro.querySelector('#cards-carro');
        this.contadorCarro = this.sectionCarro.querySelector('#contador-carro');
        this.totalCarro = this.sectionCarro.querySelector('#total-carro');
        this.btnVolverCarro = this.sectionCarro.querySelector('#btn-volver-carro');
        this.btnFinalizarCarro = this.sectionCarro.querySelector('#btn-finalizar-carro');
        
        // Modal Prodcuto Agregado
        this.btnCarroModal = document.querySelector('#btn-carro-modal');
        
        // Modal Finalizar Compra
        this.procesandoFinalizar = document.querySelector('#procesando-finalizar');
        this.confirmacionFinalizar = document.querySelector('#confirmacion-finalizar');
        this.btnVolverFinalizar = document.querySelector('#btn-volver-finalizar');
    }

    // Método central que asocia todos los event listeners a los botones, enlaces y menús desplegables
    agregarEventos = () => {
        // NavBar
        this.btnCarroNavbar.addEventListener('click', () => this.mostrarCarroCompras());

        // Section Catálogo Productos
        this.categoriaCatalogo.addEventListener('change', async() => {
            const indexCategoria = parseInt(this.categoriaCatalogo.value);
            let categoria;

            if (indexCategoria === -1) categoria = "";
            else categoria = this.catalogo.categorias[indexCategoria];
            
            this.categoriaActiva = categoria;
            this.toogleEsperaCarga();
            await this.catalogo.cargarCatalogo(1, categoria);
            this.toogleEsperaCarga();
            this.mostrarProductos();
            this.mostrarPaginación(1);
        });

        this.cardsCatalogo.addEventListener('click', (event) => {
            const cardProducto = event.target.closest('.col');
            if (cardProducto) {
                this.mostrarDetallesProducto(cardProducto.dataset.id, false);
            }
        });

        this.paginasCatalogo.addEventListener('click', async(event) => {
            const nodoPagina = event.target.closest('.page-item');
            
            if(nodoPagina) {
                let numeroPagina = nodoPagina.dataset.pagina;
                const paginaActiva =  this.paginasCatalogo.querySelector('.active');
                
                if(numeroPagina === 'prev' || numeroPagina === 'next') {    
                    const paginaNueva = (numeroPagina === 'prev') ? paginaActiva.previousElementSibling : paginaActiva.nextElementSibling;
                    const numeroPaginaNueva = paginaNueva.dataset.pagina;
                    
                    numeroPagina = (numeroPaginaNueva === 'prev' || numeroPaginaNueva === 'next') ?  paginaActiva.dataset.pagina : numeroPaginaNueva;
                }

                this.catalogo.productos = [];
                this.toogleEsperaCarga();
                await this.catalogo.cargarCatalogo(parseInt(numeroPagina), this.categoriaActiva);
                this.toogleEsperaCarga();
                this.mostrarProductos();
                this.cambiarPagina(numeroPagina, paginaActiva);
            }
        });

        // Section Detalles Producto
        this.btnVolverDetalles.addEventListener('click', () => {
            this.sectionCatalogo.classList.remove('d-none');
            this.sectionDetalles.classList.add('d-none');
        });

        this.btnAgregarCarroDetalles.addEventListener('click', () =>{
            const cantidad = parseInt(this.cantidadDetalles.value);
            this.carro.agregarCompra(cantidad, this.productoSeleccionado);            
            this.contadorNavbar.textContent = this.carro.calcularTotalProductos();
        });
        
        // Section Carro Compras
        this.btnVolverCarro.addEventListener('click', () => {
            this.sectionCatalogo.classList.remove('d-none');
            this.sectionCarro.classList.add('d-none');
        });

        this.cardsCarro.addEventListener('click', (event) => {
            const btnCantidadMenos = event.target.closest('.minus');
            const btnCantidadMas = event.target.closest('.plus');
            const btnEliminarCompra = event.target.closest('#eliminarCompra');
            const cardCarro = event.target.closest('.card');
            const idProducto = cardCarro.dataset.idProducto;

            if (btnCantidadMenos || btnCantidadMas || btnEliminarCompra){
                let nodoCantidad;

                if (btnCantidadMenos) {
                    nodoCantidad = btnCantidadMenos.previousElementSibling
                    const cantidadActual = nodoCantidad.textContent;
                    if (cantidadActual == 1) return;
                } else if (btnCantidadMas) {
                    nodoCantidad = btnCantidadMas.nextElementSibling;
                }  else if (btnEliminarCompra) {
                    this.carro.eliminarDetalleCompra(idProducto);
                    if (cardCarro) cardCarro.remove();
                    if (this.carro.compras.length === 0) {
                        this.alertaCarro.classList.remove('d-none');
                        this.btnFinalizarCarro.hidden = true;    
                    }
                }
                
                if(btnCantidadMenos || btnCantidadMas){
                    nodoCantidad.textContent = this.carro.actualizarCantidad(idProducto, btnCantidadMenos ? -1 : 1);
                }
                
                this.contadorNavbar.textContent = this.carro.calcularTotalProductos();
                this.contadorCarro.textContent = this.contadorNavbar.textContent;
                this.totalCarro.textContent = this.carro.calcularTotalCompra().toFixed(2);                
            
            } else if (cardCarro) {
                this.mostrarDetallesProducto(cardCarro.dataset.idProducto, true);
            }
        });

        this.btnFinalizarCarro.addEventListener('click', () => {
            setTimeout(() => {
            this.procesandoFinalizar.classList.toggle('d-none');
            this.confirmacionFinalizar.classList.toggle('d-none');
            this.btnVolverFinalizar.disabled = false;
            }, 3000)
        });

        // Modal Agregar Producto al Carro
        this.btnCarroModal.addEventListener('click', () => this.mostrarCarroCompras());
        
        // Modal Finalizar Compra
        this.btnVolverFinalizar.addEventListener('click', async() => {
            this.categoriaActiva = "";
            this.categoriaCatalogo.value = -1;
            this.sectionCatalogo.classList.remove('d-none');
            this.sectionCarro.classList.add('d-none');
            this.toogleEsperaCarga();
            await this.catalogo.cargarCatalogo(1, this.categoriaActiva);
            this.toogleEsperaCarga();
            this.mostrarProductos();
            this.mostrarPaginación(1);
            this.limpiarCarroHTML();
        });
    }

    // Método que rellena el menú desplegable de categorías
    mostrarCategorias = () => {
        this.catalogo.categorias.forEach((categoria, index) => {
            const option = document.createElement('option');
            option.textContent = categoria.toUpperCase();
            option.setAttribute('value', index);
            this.categoriaCatalogo.append(option); 
        });
    }

    // Método genera dinámicamente el HTML para las tarjetas de productos y las inserta en el catálogo
    mostrarProductos = () => {                
        let contenidoHTML = "";

        this.catalogo.productos.forEach(producto => {
            contenidoHTML += `
            <div class="col px-0" data-id="${producto.id}">
                <div class="card h-100">
                    <div class="d-flex flex-column justify-content-center px-5 pt-5">
                        <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.nombre}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">$${producto.precio}</h5>
                        <p class="card-text"">${producto.nombre}</p>
                    </div> 
                </div>
            </div>
            `;
        });

        this.cardsCatalogo.innerHTML = contenidoHTML;
    }

    // Método que crea los enlaces de paginación basados en el total de productos
    mostrarPaginación = (pagina) => {
        const totalProductos = this.catalogo.totalProductos;
        const limite = this.catalogo.limite;
        
        let contenidoHTML = "";

        const totalPaginas = (totalProductos % limite) === 0 ? (totalProductos / limite) : ((totalProductos / limite) | 0) + 1; 

        for(let cont = 1; cont <= totalPaginas; cont++){
            if(cont === pagina)
                contenidoHTML += `<li class="page-item active" data-pagina="${cont}"><a class="page-link" href="#">${cont}</a></li>`;
            else
                contenidoHTML += `<li class="page-item" data-pagina="${cont}"><a class="page-link" href="#">${cont}</a></li>`;
        }

        this.paginasCatalogo.innerHTML = `
        <li class="page-item" data-pagina = "prev">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        ${contenidoHTML}
        <li class="page-item" data-pagina = "next">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
        `;
    }

    // Método que oculta el catálogo y carro para mostrar la sección detalles del producto seleccionado
    mostrarDetallesProducto = (idProducto, origenCarro) => {
        let producto = undefined;

        if(origenCarro) producto = this.carro.compras.find(compra => compra.producto.id == idProducto).producto; 
        else producto = this.catalogo.productos.find(producto => producto.id == idProducto);
            
        const {id, nombre, precio, descripcion, categoria, imagenes, thumbnail} = producto;
        this.productoSeleccionado = new Producto(id, nombre, precio,descripcion, categoria, imagenes, thumbnail);
            
        this.cantidadDetalles.value = 1;
        this.nombreDetalles.textContent = producto.nombre;
        this.descripcionDetalles.textContent = producto.descripcion;
        this.precioDetalles.textContent = `$${producto.precio}`;
        this.imagenDetalles.src = producto.imagenes[0];
        this.imagenDetalles.alt = producto.nombre;

        // Oculta el catálogo y muestra la sección de detalles
        this.sectionCatalogo.classList.add('d-none');
        this.sectionCarro.classList.add('d-none');
        this.sectionDetalles.classList.remove('d-none');
    }

    //Método que oculta el catálogo y dettales de producto, para mostrar la sección del carrito de compras, actualizando el contenido según los productos que se encuentren en el carrito
    mostrarCarroCompras = () => {
        const compras = this.carro.compras;
        let contenidoHTML = "";

        this.alertaCarro.classList.add('d-none');
        this.btnFinalizarCarro.hidden = false;
        
        if (compras.length === 0) {
            this.alertaCarro.classList.remove('d-none');  
            this.btnFinalizarCarro.hidden = true;
        }

        compras.forEach(compra => {
            contenidoHTML += `
            <div class="card mb-3" data-id-producto="${compra.producto.id}">
                <div class="row g-0">
                    <div class="col-1">
                        <img src="${compra.producto.thumbnail}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-11">
                        <div class="card-body">
                            <div class="row">
                                <h5 class="card-title col text-start">${compra.producto.nombre}</h5>
                                <h5 class="card-title col text-end">$${compra.producto.precio}</h5>
                            </div>
                            <div class="d-flex">
                                <div class="col-2 d-flex border border-3 border-warning rounded-5 bg-light justify-content-between">
                                    <button class="btn rounded-start-5 plus"><i class="bi bi-plus-lg"></i></button>
                                    <div class="align-self-center">${compra.cantidad}</div>
                                    <button class="btn rounded-end-5 minus"><i class="bi bi-dash-lg"></i></button>
                                </div>
                                <button id="eliminarCompra" class="btn btn-warning ms-3 rounded-5"><i class="bi bi-trash3"></i> Remove Product</button>
                            </div>     
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        this.cardsCarro.innerHTML = contenidoHTML;
        this.contadorCarro.textContent = this.contadorNavbar.textContent;
        this.totalCarro.textContent = this.carro.calcularTotalCompra().toFixed(2);
        this.sectionCarro.classList.remove('d-none');
        this.sectionCatalogo.classList.add('d-none');
        this.sectionDetalles.classList.add('d-none');
    }

    cambiarPagina = (numeroPagina, paginaActiva) => {
        if (numeroPagina == paginaActiva.dataset.pagina) return;
        
        paginaActiva.classList.remove('active');
        paginaActiva = this.paginasCatalogo.querySelector(`[data-pagina="${numeroPagina}"]`);
        paginaActiva.classList.add('active');
    }

    // Muestra u oculta el mensaje de carga en el catálogo
    toogleEsperaCarga = () => {
        this.cargandoCatalogo.classList.toggle('d-none');
        this.cardsCatalogo.classList.toggle('d-none');
        this.paginasCatalogo.classList.toggle('d-none');
    }

    // Resetea el carro en la interfaz y en el objeto CarroCompras
    limpiarCarroHTML = () => {
        this.carro.limpiarCarro();

        this.procesandoFinalizar.classList.toggle('d-none');
        this.confirmacionFinalizar.classList.toggle('d-none');
        this.btnVolverFinalizar.disabled = true;

        this.cardsCarro.innerHTML = "";
        this.contadorNavbar.textContent = "0";
        this.contadorCarro.textContent = "0";
    }
}