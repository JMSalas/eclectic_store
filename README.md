ECLECTIC⚡STORE

⚡ Descripción General del Proyecto

ECLECTIC⚡STORE es una aplicación web de comercio electrónico simulada, diseñada para mostrar un catálogo de productos y gestionar un carrito de compras. El proyecto está construido con un fuerte enfoque en la Programación Orientada a Objetos (POO) en JavaScript, separando la lógica de negocio de la manipulación de la interfaz de usuario. La aplicación consume dinámicamente datos de productos y categorías a través de la API DummyJSON, garantizando que el contenido esté siempre actualizado. El diseño es completamente responsivo, utilizando Bootstrap 5 para asegurar una experiencia de navegación óptima en cualquier dispositivo, desde computadoras de escritorio hasta teléfonos móviles.

✨ Características Destacadas

    Catálogo de Productos Dinámico: Explora un catálogo que carga productos en tiempo real desde la API DummyJSON.

    Paginación Inteligente: Navega entre las páginas del catálogo sin esfuerzo. El sistema de paginación se adapta al número total de productos disponibles.

    Filtrado por Categorías: Utiliza un menú desplegable para filtrar los productos por categorías como "smartphones", "laptops", "fragrances", y más, facilitando la búsqueda de artículos específicos.

    Vista Detallada del Producto: Haz clic en cualquier tarjeta de producto para ver una vista completa con múltiples imágenes, una descripción detallada, y la opción de seleccionar la cantidad deseada.

    Gestión Completa del Carrito de Compras:

        Agrega productos al carrito desde la vista del catálogo o la de detalles.

        Incrementa o disminuye la cantidad de un producto directamente en el carrito.

        Elimina productos individuales del carrito.

        Visualiza el total de productos y el costo total de tu compra en tiempo real.

    Feedback al Usuario: Se utilizan modales de Bootstrap para notificar al usuario cuando un producto se ha agregado al carrito o cuando se ha completado la compra.

    Proceso de Pago Simulado: Un modal de finalización de compra simula un proceso de pago, mostrando un estado de "Procesando" y luego una "Confirmación de Pago Exitosa". Al finalizar, el carrito se vacía y el catálogo se recarga.

🏗️ Arquitectura y Estructura de Archivos

El proyecto está organizado de manera modular para una mayor claridad y mantenibilidad, siguiendo el principio de separación de responsabilidades.

    index.html: Es el esqueleto de la aplicación. Contiene todos los elementos HTML necesarios para la interfaz de usuario, incluyendo el Header, Navbar, el main con las secciones de Catálogo, Detalles de Producto y Carrito de Compras, así como los modales y el Footer.

    assets/:

        css/:

            style.css: Archivo de estilos personalizados donde se definen reglas CSS para complementar el diseño de Bootstrap.

        js/:

            script.js: El punto de entrada de la aplicación. Este archivo inicializa las clases principales (CatalogoProductos, CarroCompras, AdministradorInterfaz), realiza las llamadas asíncronas iniciales para cargar los datos y activa los eventos de la interfaz.

            AdministradorInterfaz.js: La clase clave para la interacción con el usuario. Se encarga de la manipulación del DOM, la gestión de eventos (clics en botones, cambios en menús, etc.), y de actualizar la interfaz visual basándose en la lógica de negocio.

            Clases.js: El corazón de la lógica de negocio. Define las clases principales que manejan los datos y las operaciones del proyecto:

                CatalogoProductos: Se encarga de la comunicación con la API, la carga de productos y categorías, y la gestión de la paginación.

                CarroCompras: Maneja todas las operaciones relacionadas con el carrito, como agregar, actualizar y eliminar productos, y calcular los totales.

                Producto y DetalleCompra: Modelos de datos que representan un producto y un detalle de compra, respectivamente.

🚀 Tecnologías Utilizadas

    HTML5: Para la estructura semántica de la página web.

    CSS3: Para la presentación y personalización de estilos.

    JavaScript (ES6+): Lenguaje principal de programación para la lógica de la aplicación, con un enfoque en POO y programación asíncrona (async/await).

    Bootstrap 5.3: Framework CSS para el diseño responsivo, el sistema de cuadrícula y los componentes UI.

    Bootstrap Icons: Biblioteca de íconos vectoriales para enriquecer la interfaz de usuario.

    Google Fonts: Para las tipografías personalizadas (Monoton y Roboto).

    API DummyJSON: Fuente de datos de la API para obtener los productos y categorías.

🛠️ Cómo Iniciar el Proyecto

    Clona el Repositorio:
    Bash

git clone <URL_DEL_REPOSITORIO>

Navega a la Carpeta del Proyecto:
Bash

    cd eclectic-store

    Abre el Archivo index.html:
    Simplemente abre el archivo index.html en tu navegador web preferido (Google Chrome, Firefox, etc.).

No se requiere ningún servidor local ni configuración adicional. La aplicación funciona de manera completamente cliente-side.

👤 Autor

Desarrollado por José Miguel Salas Markov / Github: JMSalas