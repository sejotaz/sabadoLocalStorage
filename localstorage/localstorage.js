const d = document;
let nombrePro = d.querySelector('.nombre-producto');
let precioPro = d.querySelector('.precio-producto');
let presentacionPro = d.querySelector('.presentacion-producto');
let imagenPro = d.querySelector('.imagen-producto');
let btnGuardar = d.querySelector('.btn-guardar');
let tabla = d.querySelector('.table > tbody');
let filter = d.querySelector('.buscar');

//evento para el boton guardar
btnGuardar.addEventListener('click', () => {
  let datos = obtenerDatos();
  if (datos != null) {
    guardarDatos(datos);
  }
  borrarTabla();
  mostrarDatos();
});

//funcion para tomar los datos del formulario
function obtenerDatos() {
  let datosForm;
  if (
    nombrePro.value == '' ||
    precioPro == '' ||
    presentacionPro == '' ||
    imagenPro == ''
  ) {
    alert('Todos los campos del formulario son obligatorios');
    return;
  } else {
    datosForm = {
      nombre: nombrePro.value,
      precio: precioPro.value,
      presentacion: presentacionPro.value,
      imagen: imagenPro.value,
    };

    nombrePro.value = '';
    precioPro.value = '';
    presentacionPro.value = '';
    imagenPro.value = '';

    return datosForm;
  }
}

const listadoPedidos = 'Pedidos';

function guardarDatos(datos) {
  let pedidos = [];
  let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosPrevios != null) {
    pedidos = pedidosPrevios;
  }
  pedidos.push(datos);
  localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
  alert('Datos guardados con exito');
}

function mostrarDatos() {
  let pedidos = [];
  let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosPrevios != null) {
    pedidos = pedidosPrevios;
  }
  pedidos.forEach((p, i) => {
    let fila = d.createElement('tr');
    fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>${p.presentacion}</td>
            <td><img src='${p.imagen}' width='50%'></td>
            <td><span onclick='actualizarPedido(${i})' class='btn-editar btn btn-warning'>✏</span></td>
            <td><span onclick='eliminarPedido(${i})' class='btn-eliminar btn btn-danger'>❌</span></td>
        `;
    tabla.appendChild(fila);
  });
}

function borrarTabla() {
  let filas = d.querySelectorAll('.table tbody tr');
  filas.forEach((f) => {
    f.remove();
  });
}

function actualizarPedido(pos) {
  let pedidos = [];
  let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosPrevios != null) {
    pedidos = pedidosPrevios;
  }
  nombrePro.value = pedidos[pos].nombre;
  precioPro.value = pedidos[pos].precio;
  presentacionPro.value = pedidos[pos].presentacion;

  let btnActualizar = d.querySelector('.btn-actualizar');
  btnActualizar.classList.toggle('d-none');
  btnGuardar.classList.toggle('d-none');

  btnActualizar.addEventListener('click', () => {
    pedidos[pos].nombre = nombrePro.value;
    pedidos[pos].precio = precioPro.value;
    pedidos[pos].presentacion = presentacionPro.value;

    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    alert('El dato fue actualizado con éxito');

    nombrePro.value = '';
    precioPro.value = '';
    presentacionPro.value = '';

    btnActualizar.classList.toggle('d-none');
    btnGuardar.classList.toggle('d-none');

    borrarTabla();
    mostrarDatos();
  });
}

function eliminarPedido(pos) {
  let pedidos = [];
  let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosPrevios != null) {
    pedidos = pedidosPrevios;
  }
  let confirmar = confirm(`¿Deseas eliminar el pedido ${pedidos[pos].nombre}?`);
  if (confirmar) {
    pedidos.splice(pos, 1);
    alert(`EL PEDIDO HA SIDO ELIMINADO CON ÉXITO.`);
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    borrarTabla();
    mostrarDatos();
  }
}

function filterObjects(inputValue, pedidos) {
  return pedidos.filter(producto => producto.nombre.toLowerCase().includes(inputValue));
}

filter.addEventListener('input', () => {
  const inputValue = filter.value.trim().toLowerCase();
  let pedidos = JSON.parse(localStorage.getItem(listadoPedidos)) || [];
  const productosFiltrados = filterObjects(inputValue, pedidos);
  borrarTabla();
  productosFiltrados.forEach((producto, i) => {
    let fila = d.createElement('tr');
    fila.innerHTML = `
      <td>${i + 1}</td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td>${producto.presentacion}</td>
      <td><img src='${producto.imagen}' width='50%'></td>
      <td><span onclick='actualizarPedido(${i})' class='btn-editar btn btn-warning'>✏</span></td>
      <td><span onclick='eliminarPedido(${i})' class='btn-eliminar btn btn-danger'>❌</span></td>
    `;
    tabla.appendChild(fila);
  });
});

addEventListener('DOMContentLoaded', () => {
  mostrarDatos();
});