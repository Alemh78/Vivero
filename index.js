

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');
const contadorCarrito = document.getElementById('contador-carrito');
const vaciarCarrito = document.getElementById('vaciar-carrito');

// Actualiza el DOM con los productos del carrito
function renderizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  let contador = 0;

  carrito.forEach(producto => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-sm btn-outline-danger";
    btnEliminar.textContent = "X";
    btnEliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);

    total += producto.precio * producto.cantidad;
    contador += producto.cantidad;
  });

  totalElemento.textContent = total;
  contadorCarrito.textContent = contador;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agrega producto al carrito
document.querySelectorAll(".agregar-carrito").forEach(boton => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);
    const id = boton.dataset.id;

    const productoExistente = carrito.find(p => p.id === id);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    renderizarCarrito();
  });
});

// Elimina un producto del carrito
function eliminarDelCarrito(id) {
  const index = carrito.findIndex(p => p.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    } else {
      carrito.splice(index, 1);
    }
  }
 renderizarCarrito();
}

// Vaciar carrito
vaciarCarrito?.addEventListener("click", () => {
  carrito = [];
  renderizarCarrito();
// Reiniciar globitos
  document.querySelectorAll('[id^="badge-"]').forEach(badge => {
    badge.textContent = '0';
  });
});

document.addEventListener("DOMContentLoaded", renderizarCarrito);