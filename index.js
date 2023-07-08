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
    constructor(nombre, imagen) {
        this.nombre = nombre,
            this.canciones = [],
            this.imagen = imagen
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
    playLists.push(new Playlist("Top 50", "Top 50.png"))
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
const buttonShowPlaylists = document.getElementById("button-ver-playlists")
const divPlaylists = document.getElementById("div-playlists")
let modalBodyCanciones = document.getElementById("modal-canciones")
let tituloModalCanciones = document.getElementById("exampleModalLabel")
const tituloCancion = document.getElementById("tituloInput")
const artistaCancion = document.getElementById("artistaInput")
const duracionCancion = document.getElementById("artistaInput")
const playlistCancion = document.getElementById("playlistInput")
const buttonAgregarCancion = document.getElementById("botonAgregarCancion")

buttonShowPlaylists.addEventListener("click", () => {
    mostrarTodasLasPlaylist()
})

buttonCreatePlaylist.addEventListener("click", (e) => {
    e.preventDefault()
    let nombre = document.getElementById("nombre-playlist")
    if (nombre.value) {
        crearPlaylist(nombre.value)
        nombre.value = ""
        mostrarTodasLasPlaylist()
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

buttonAgregarCancion.addEventListener("click", (e) => {
    e.preventDefault()
    let titulo = tituloCancion.value
    let artista = artistaCancion.value
    let duracion = duracionCancion.value
    //console.log(titulo != "" & artista != "" & duracion != "")
    if (titulo != "" & artista != "" & duracion != "") {
        let playlist = buscarPlaylistPorNombre(playlistCancion.value)
        let cancion = new Cancion(titulo, artista, duracion)
        agregarCancion(playlist, cancion)
        localStorage.setItem("playlists", JSON.stringify(playLists))
        tituloCancion.value = ""
        artistaCancion.value = ""
        duracionCancion.value = ""
        playlistCancion.value = ""
        mostrarTodasLasPlaylist()
    }
})

//Funcion para eliminar una cancion de la playlist
const eliminarCancion = (titulo, playlist) => {
    let cancion = playlist.canciones.find((cancion) => cancion.titulo == titulo)
    let cancionIndex = playlist.canciones.indexOf(cancion)
    if (cancionIndex >= 0) {
        playlist.canciones.splice(cancionIndex, 1)
        localStorage.setItem("playlists", JSON.stringify(playLists))
        mostrarTodasLasPlaylist()
    } else {

    }

}

//funcion para buscar una playlist por su nombre
const buscarPlaylistPorNombre = (nombre) => {
    return playLists.find(playlist => playlist.nombre.toLowerCase() == nombre.toLowerCase())
}

const agregarCancion = (playlist, cancion) => {
    playlist.canciones.push(cancion)
}

//Funcion para pedirle los datos al usuario para crear la playlist
const crearPlaylist = (nombre) => {
    if (nombre != null) {
        let playlist = buscarPlaylistPorNombre(nombre)
        if (playlist == undefined) {
            playLists.push(new Playlist(nombre, "default.png"))
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

//funcion para eliminar una playlist por su nombre
const eliminarPlaylistPorTitulo = (nombre) => {
    if (nombre != null) {
        let playlistIndex = playLists.indexOf(buscarPlaylistPorNombre(nombre))
        if (playlistIndex >= 0) {
            let eliminarLi = document.getElementById(nombre)
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
                tituloModalCanciones.innerText = playlist.nombre
                modalBodyCanciones.innerHTML = ``
                //primer for each imprime las card
                playlist.canciones.forEach((cancion) => {
                    modalBodyCanciones.innerHTML += `                
                    <div class="card border-primary mb-3" id ="cancion${cancion.titulo}" style="max-width: 540px;">
                    <div class="card-body">
                    <h4 class="card-title">${cancion.titulo}</h4>
                    <p class="card-text">${cancion.artista}</p>
                    <p class="card-text">${cancion.duracion}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${cancion.titulo}"><i class="fas fa-trash-alt"></i>Eliminar</button>
                    </div>    
                    </div>                    
                    `
                })

                playlist.canciones.forEach((cancion) => {
                    //manipular el DOM sin guardar en variable
                    document.getElementById(`botonEliminar${cancion.titulo}`).addEventListener("click", () => {
                        let cardCancnion = document.getElementById(`cancion${cancion.titulo}`)
                        cardCancnion.remove()
                        //borrar del array
                        //encontramos objeto a eliminar
                        eliminarCancion(cancion.titulo, playlist)
                    })
                })

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
        divPlaylists.innerHTML = ""
        let tituloDivPlaylists = document.createElement("div")
        tituloDivPlaylists.innerHTML = `<h3 class="mostrar-playlists">Playlists</h3>`
        divPlaylists.appendChild(tituloDivPlaylists)
        for (let playlist of playLists) {
            let nuevaPlayListDiv = document.createElement("div")
            nuevaPlayListDiv.className = "col-12 col-md-6 col-lg-4 my-2"
            nuevaPlayListDiv.innerHTML = `<div id="${playlist.nombre}" class="card" style="width: 19rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${playlist.imagen}" alt="${playlist.nombre}">
            <div class="card-body">
               <h4 class="card-title">${playlist.nombre}</h4>
               <p>Canciones: ${playlist.canciones.length}</p>
               <a id="agregarCancion${playlist.nombre}" data-bs-toggle="modal" data-bs-target="#idModalAgregarCancion" class="btn btn-secondary"><i class="fas fa-shopping-cart fa-1x">Agregar Cancion</i></a>
               <a id="mostrarCanciones${playlist.nombre}" data-bs-toggle="modal" data-bs-target="#idModalCanciones" class="btn btn-secondary" ${playlist.canciones.length ? "" : "hidden"}><i class="fas fa-shopping-cart fa-1x">Ver canciones</i></a>
               </div>
            </div>`
            //<button id="mostrarCanciones${playlist.nombre}" class="btn btn-outline-success">Mostrar canciones</button>
            divPlaylists.appendChild(nuevaPlayListDiv)
            let mostrarBtn = document.getElementById(`mostrarCanciones${playlist.nombre}`)
            let agregarBtn = document.getElementById(`agregarCancion${playlist.nombre}`)

            mostrarBtn.addEventListener("click", () => {
                mostrarCancionesDePlaylist(playlist.nombre)
            })

            agregarBtn.addEventListener("click", () => {
                playlistCancion.value = playlist.nombre
            })
        }
    } else {
        alert(`No hay playlist creadas aún`)
    }
}
