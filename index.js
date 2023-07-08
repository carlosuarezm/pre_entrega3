//Variable para controlar el ciclo del menu
let seguirIngresando = true;


//Clase cancion
class Cancion {
    constructor(titulo, artista, duracion) {
        this.titulo = titulo,
            this.artista = artista,
            this.duracion = duracion
    }
}

//Clase Playlist
class Playlist {
    constructor(nombre) {
        this.nombre = nombre,
            this.canciones = []
    }

    //metodo para agregar una cancion
    agregarCancion(cancion) {
        this.canciones.push(cancion)
    }

    //metodo que devuelve la cantidad de canciones de la playlist
    cantidadDeCanciones() {
        return this.canciones.length
    }

    //metrodo para buscar una cancion pot titulo, devuelve un objeto cancion o undefined
    buscarCancionPorTitulo(titulo) {
        return this.canciones.find(cancion => cancion.titulo.toLowerCase().includes(titulo.toLowerCase()))
    }

    //metodo para buscar canciones que incluyan al artista buscado, devuelve un array
    buscarCancionesPorArtista(artista) {
        return this.canciones.filter(cancion => cancion.artista.toLowerCase().includes(artista.toLowerCase()))
    }

    //metodo para eliminar una cancion por su titulo
    eliminarCancionPorTitulo(titulo) {
        let cancion
        let cancionIndex = this.canciones.indexOf(this.buscarCancionPorTitulo(titulo))
        if (cancionIndex >= 0) {
            cancion = this.canciones[cancionIndex]
            this.canciones.splice(cancionIndex, 1)
        } else {
            cancion = undefined
        }
        return cancion
    }
}

//Array para guardar las playlist que se creen, inicializado con una playlist
let playLists = []
let listasguardadas = JSON.parse(localStorage.getItem("playlists"))
//se cargan canciones a la playlist
if (!listasguardadas) {
    playLists.push(new Playlist("Top 50"))
    playLists[0].agregarCancion(new Cancion("Viva la vida", "Coldplay", "2:34"))
    playLists[0].agregarCancion(new Cancion("Thinking out loud", "Ed Sheeran", "3:42"))
    playLists[0].agregarCancion(new Cancion("I can't feel my face", "The Weekend", "3:11"))
    playLists[0].agregarCancion(new Cancion("Fix You", "Coldplay", "4:59"))
    playLists[0].agregarCancion(new Cancion("Música ligera", "Soda Estereo", "3:26"))
    localStorage.setItem("playlists", JSON.stringify(playLists))
} else {
    playLists = listasguardadas
}

let lista = document.getElementById("lista-playlist")

//Boton para crear la Playlist
const buttonCreatePlaylist = document.getElementById("button-create-playlist")
const buttonDeletePlaylist = document.getElementById("button-delete-playlist")
const buttonShowPlaylist = document.getElementById("button-show-playlist")

buttonCreatePlaylist.addEventListener("click", (e) => {
    e.preventDefault()
    let nombre = document.getElementById("nombre-playlist")
    if (nombre.value) {
        crearPlaylist(nombre.value)
        nombre.value = ""
    }

})

buttonDeletePlaylist.addEventListener("click", (e) => {
    e.preventDefault()
    let nombre = document.getElementById("nombre-playlist")
    if (nombre.value) {
        eliminarPlaylistPorTitulo(nombre.value)
        nombre.value = ""
    }
})

buttonShowPlaylist.addEventListener("click", (e) => {
    e.preventDefault()
    let nombre = document.getElementById("nombre-playlist")
    if (nombre.value) {
        mostrarCancionesDePlaylist(nombre.value)
        nombre.value = ""
    }
})

playLists.forEach(element => {
    let item = document.createElement("li")
    item.textContent = element.nombre
    item.id = element.nombre
    lista.append(item)
});

//Funcion para pedir al usuario el titulo de la cancion
const ingresarCancion = (nombre) => {
    if (nombre != null) {
        let playlist = buscarPlaylistPorNombre(nombre)
        if (playlist != undefined) {
            let titulo = prompt("Ingrese el titulo de la canción")
            let artista = prompt("Ingrese el artista de la canción")
            let duracion = prompt("Ingrese la duración de la canción")
            playlist.agregarCancion(new Cancion(titulo, artista, duracion))
            alert(`Usted ha agregado la cancion "${titulo}" a la playlist "${playlist.nombre}"`)
        } else {
            alert(`No se ha encontrado playlist con el nombre ${nombre}`)
        }
    }
}

//Funcion para eliminar una cancion de la playlist
const eliminarCancion = (titulo, playlist) => {

    let cancion = playlist.eliminarCancionPorTitulo(titulo)
    if (cancion != undefined) {
        alert(`Se ha eliminado la cancion "${cancion.titulo}" de la playlist "${playlist.nombre}"`)
    } else {
        alert(`No se ha encontrado la cancion "${titulo}" en la playlist "${playlist.nombre}"`)
    }

}

//funcion para buscar una playlist por su nombre
const buscarPlaylistPorNombre = (nombre) => {
    return playLists.find(playlist => playlist.nombre.toLowerCase() == nombre.toLowerCase())
}

//Funcion para pedirle los datos al usuario para crear la playlist
const crearPlaylist = (nombre) => {
    if (nombre != null) {
        let playlist = buscarPlaylistPorNombre(nombre)
        if (playlist == undefined) {
            playLists.push(new Playlist(nombre))
            let item = document.createElement("li")
            item.id = nombre
            item.textContent = nombre
            lista.append(item)
            localStorage.setItem("playlists", JSON.stringify(playLists))
        } else {
            alert(`Ya existe una Playlist con el nombre "${nombre}"`)
        }
    }
}

//metodo que pregunta el nombre de una playlist para eliminar una cancion
const eliminarCancionDePlaylist = () => {
    let nombre = prompt("Ingrese el nombre de una playlist")
    if (nombre != null) {
        let playlist = buscarPlaylistPorNombre(nombre)
        if (playlist) {
            eliminarCancion(prompt("Ingrese el nombre de la cancion a eliminar"), playlist)
        } else {
            alert(`No se encontró playlist con el nombre "${nombre}"`)
        }
    }
}

//Funcion para mostrar al usuario la informacion de la playlist
const mostrarPlaylist = (nombre) => {
    if (nombre != null) {
        const playlist = buscarPlaylistPorNombre(nombre)

        if (playlist != undefined) {
            alert(`La playlist ${playlist.nombre} tiene un total de ${playlist.cantidadDeCanciones()} canciones`)
        } else {
            alert(`No se ha encontrado la playlist ${nombre}`)
        }
    }
}

//funcion para eliminar una playlist por su nombre
const eliminarPlaylistPorTitulo = (nombre) => {
    if (nombre != null) {
        let playlistIndex = playLists.indexOf(buscarPlaylistPorNombre(nombre))
        if (playlistIndex >= 0) {
            let eliminarLi = document.getElementById(nombre)
            console.log(eliminarLi)
            lista.removeChild(eliminarLi)
            //let playlist = playLists[playlistIndex]
            playLists.splice(playlistIndex, 1)
            localStorage.setItem("playlists", JSON.stringify(playLists))
            //alert(`Se eliminó la playlist ${playlist.nombre}`)

        } else {
            alert(`No se encontró la playlist ${nombre}`)
        }
    }
}

//funcion que muestra todas las canciones de una playlist
const mostrarCancionesDePlaylist = (nombre) => {
    if (nombre != null) {
        let playlist = buscarPlaylistPorNombre(nombre)
        if (playlist) {
            if (playlist.canciones.length > 0) {

                let canciones = document.getElementById("canciones-playlist")
                console.log(canciones)
                canciones.innerHTML = ""
                for (let index = 0; index < playlist.canciones.length; index++) {
                    let cancion = playlist.canciones[index]
                    let item = document.createElement("li")
                    item.textContent = `Titulo: ${cancion.titulo} - Artista: ${cancion.artista} - Duracion: ${cancion.duracion}`
                    canciones.append(item)
                }
            } else {
                alert(`La playlist ${playlist.nombre} no tiene canciones`)
            }
        } else {
            alert(`No se encontró playlist con el nombre ${nombre}`)
        }
    }

}

//funcion que muestra las canciones de una playlist que coincidan parcialmente con el artista buscado
const mostrarCancionesDePlaylistPorArtista = (nombre) => {

    if (nombre != null) {
        let playlist = buscarPlaylistPorNombre(nombre)
        if (playlist) {
            let artista = prompt("Ingrese el nombre del artista a buscar")
            let cancionesPorArtista = playlist.buscarCancionesPorArtista(artista)
            if (cancionesPorArtista.length > 0) {

                let canciones = `Canciones de ${playlist.nombre} del artista ${artista}: \n`
                for (let index = 0; index < cancionesPorArtista.length; index++) {
                    let cancion = cancionesPorArtista[index]
                    canciones += `${index + 1}. ${cancion.titulo} - ${cancion.artista}\n`
                }
                alert(canciones)
            } else {
                alert(`La playlist ${playlist.nombre} no tiene canciones del artista ${artista}`)
            }
        } else {
            alert(`No se encontró playlist con el nombre ${nombre}`)
        }
    }

}

//funcion que muestra todas las playlist creadas
const mostrarTodasLasPlaylist = () => {

    if (playLists.length > 0) {
        let lista = `Lista de playlist creadas: \n`
        for (let index = 0; index < playLists.length; index++) {
            lista += `${index + 1}. ${playLists[index].nombre} \n`
        }
        alert(lista)
    } else {
        alert(`No hay playlist creadas aún`)
    }
}


//Funcion para mostrarle al usuario el menu
const mostrarMenu = () => {
    let opcion = prompt(`Seleccione una de las siguintes opciones, ingrese 0 para salir:
    1. Crear playlist
    2. Agregar cancion a playlist
    3. Eliminar cancion de playlist
    4. Consultar playlist
    5. Mostrar todas las canciones de una playlist
    6. Mostrar canciones por artista de una playlist
    7. Mostrar todas las playlist
    8. Eliminar playlist`)
    if (opcion != null) {
        opcion = parseInt(opcion)
    }
    return opcion
}

//Ciclo para preguntar al usuario la opcion a ingresar, finaliza cuando ingresa 0
/*do {

    let opcion = mostrarMenu()
    switch (opcion) {
        case 1:
            crearPlaylist(prompt("Ingrese el titulo de la playlist que desea crear"))
            break;
        case 2:
            ingresarCancion(prompt("Ingrese el nombre de la playlist donde añadir la canción"))
            break;
        case 3:
            eliminarCancionDePlaylist()
            break;
        case 4:
            mostrarPlaylist(prompt("Ingrese el nombre de la playlisy a consultar"))
            break;
        case 5:
            mostrarCancionesDePlaylist(prompt("Ingrese el nombre de la playlisy a consultar"))
            break;
        case 6:
            mostrarCancionesDePlaylistPorArtista(prompt("Ingrese el nombre de la playlisy a consultar"))
            break;
        case 7:
            mostrarTodasLasPlaylist()
            break;
        case 8:
            eliminarPlaylistPorTitulo(prompt("Ingrese el nombre de la playlist a eliminar"))
            break;
        case 0:
            seguirIngresando = false
            break;
        case null:
            seguirIngresando = false
            break;
        default:

            if (opcion = ! false) {
                alert("Opcion incorrecta, ingrese de nuevo")
            } else {
                seguirIngresando = false
            }
            break;
    }

} while (seguirIngresando);*/