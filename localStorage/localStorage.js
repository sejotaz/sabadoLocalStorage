//declaracion de variables
// let informacion = [{
//     nombre: "Juan",
//     profesion: "programador",
//     salario: 6000000
// },
// {
//     nombre: "Luis",
//     profesion: "Medico",
//     salario: 8000000
// },
// {
//     nombre: "Ana",
//     profesion: "Docente",
//     salario: 5000000
// }
// ]
// // //guardar informacion en localStorage
// localStorage.setItem("info", JSON.stringify(informacion));
// alert("datos guardados con exito");

//mostrar informacion en el navegador
// let datos = JSON.parse(localStorage.getItem("info"));
// let info = [];
// if(datos != null){
//     info = datos;
// }
// info.forEach((d,i)=>{
//     document.write(
//         ` Id: ${i+1}
//           Nombre: ${d.nombre} <br>
//           Profesion: ${d.profesion} <br>
//           Salario: ${d.salario} 
//           <hr>
//         `
//     );
// });
// // borrar datos guardados en localStorage
// localStorage.removeItem("info");

//declaracion de variables
let nombrePro = document.querySelector(".nombre-producto");
let precioPro = document.querySelector(".precio-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let imagenPro = document.querySelector(".imagen-producto");
let botonGuardar = document.querySelector(".btn-guardar");

//agregar evento al boton guardar
botonGuardar.addEventListener("click", function(){
    //alert(nombrePro.value);
    obtenerProductos();
});

//funcion para obtener todos los datos del formulario
function obtenerProductos() {
    if (nombrePro.value == "" || precioPro.value == ""
    || presentacionPro.value == "" || imagenPro.value == "") {
        alert("Todos los campos son obligatorios");
    }else{
        let producto = {
            nombre: nombrePro.value,
            precio: precioPro.value,
            presentacion: presentacionPro.value,
            imagen: imagenPro.value
        }
        nombrePro.value = "";
        precioPro.value = "";
        presentacionPro.value = "";
        imagenPro.value = "";

        return console.log(producto);
    }
}


