// //declaracion de variables
// let datos = [{
//     nombre : "Juan",
//     profesion: "Docente",
//     salario: 3000000
// },
// {
//     nombre : "Pedro",
//     profesion: "Odontologo",
//     salario: 5000000
// },
// {
//     nombre : "Luisa",
//     profesion: "Psicologa",
//     salario: 4000000
// }
// ];
// //guardar la informacion el localStorage
// localStorage.setItem("info",  JSON.stringify(datos));
// alert("Datos guardados con exito");

//extraer datos de localstorage
// let informacion =  JSON.parse(localStorage.getItem("info"));
// let info = [];
// if( informacion != null ){
//     info = informacion;
// }
// info.forEach((d,i)=>{
//     document.write(
//         ` Id: ${i+1}
//           Nombre : ${d.nombre} <br>
//           Profesion : ${d.profesion} <br>
//           Salario : ${d.salario}
//           <hr>
//         `
//     );
// });

// //Eliminar la infomacion de localstorage
// localStorage.removeItem("info");

//declaracion de variables
const d = document
let nombrePro = d.querySelector('.nombre-producto')
let precioPro = d.querySelector('.precio-producto')
let presentacionPro = d.querySelector('.presentacion-producto')
let imagenPro = d.querySelector('.imagen-producto')
let btnGuardar = d.querySelector('.btn-guardar')
let tabla = d.querySelector('.table > tbody')

//evento para el boton guardar
btnGuardar.addEventListener('click', () => {
  let datos = obtenerDatos()
  guardarDatos(datos)
  borrarTabla()
  mostrarDatos()
})

//funcion para tomar los datos del formulario
function obtenerDatos() {
  let producto = {
    nombre: nombrePro.value,
    precio: precioPro.value,
    presentacion: presentacionPro.value,
    imagen: imagenPro.value,
  }

  nombrePro.value = ''
  precioPro.value = ''
  presentacionPro.value = ''
  imagenPro.value = ''

  return producto
}

const listadoPedidos = 'Pedidos'

function guardarDatos(datos) {
  let pedidos = []
  let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos))
  if(pedidosPrevios != null){
    pedidos = pedidosPrevios
  }
  pedidos.push(datos)
  localStorage.setItem(listadoPedidos, JSON.stringify(pedidos))
  alert('Datos guardados con exito')
}

function mostrarDatos(){
    let pedidos = []
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos))
    if(pedidosPrevios != null){
        pedidos = pedidosPrevios 
    }
    //console.log({pedidos})
    pedidos.forEach((p,i) => {
        let fila = d.createElement('tr')
        fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${p.nombre} </td>
            <td> ${p.precio} </td>
            <td> ${p.presentacion} </td>
            <td> <img src='${p.imagen}' width='50%' >  </td>
            <td> <span onclick='actualizarPedido(${i})' class= 'btn-editar btn btn-warning'> ✏ </span></td>
            <td> <span onclick='eliminarPedido(${i})' class='btn-eliminar btn btn-danger'> ❌ </span></td>


        `
        tabla.appendChild(fila)
    })
}

function borrarTabla(){
    let filas = d.querySelectorAll('.table tbody tr')
    filas.forEach((f)=> {
        f.remove()
    })

}

function actualizarPedido(pos){
  let pedidos = []
  let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos))
  if(pedidosPrevios != null){
    pedidos = pedidosPrevios
  }
  nombrePro.value = pedidos[pos].nombre
  precioPro.value = pedidos[pos].precio
  presentacionPro.value = pedidos[pos].presentacion

  let btnActualizar = d.querySelector('.btn-actualizar')
  btnActualizar.classList.toggle('d-none')
  btnGuardar.classList.toggle('d-none')
}

function eliminarPedido(pos){
  let pedidos = []
  let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos))
  if(pedidosPrevios != null){
    pedidos = pedidosPrevios
  }
  let confirmar = confirm(`¿Deseas eliminar el pedido ${pedidos[pos].nombre}?`)
  if(confirmar) {
    pedidos.splice(pos, 1)
    alert(`EL PEDIDO HA SIDO ELIMINADO CON ÉXITO.`)
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos))
    borrarTabla()
    mostrarDatos()
  }
}

addEventListener('DOMContentLoaded', ()=> {
    borrarTabla()
    mostrarDatos()
})


