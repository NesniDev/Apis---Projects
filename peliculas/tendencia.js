let paginacion = 1

const $btnAnterior = document.getElementById('btnAnterior')
const $btnSiguiente = document.getElementById('btnSiguiente')

$btnAnterior.addEventListener('click', () => {
  if (paginacion === 1) {
    paginacion = 1
  } else {
    paginacion--
  }
  cargarPeliculas()
})

$btnSiguiente.addEventListener('click', () => {
  if (paginacion === 1000) {
    paginacion = 1000
  } else {
    paginacion++
  }
  cargarPeliculas()
})

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=bc15c34b83be1ce36f51c6099f599d7b&language=es-CO&page=${paginacion}`
    )
    if (respuesta.status === 200) {
      const data = await respuesta.json()

      let peliculas = ''
      data.results.forEach((element) => {
        peliculas += `
        <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${
              element.poster_path
            }" alt="${element.title}">
            <h2 class="titulo">${element.title}</h2>
            <p class="paragraph">${element.overview}</p>
            <p class="rating">⭐${element.vote_average.toFixed(1)}</p>
        </div>
        `
      })
      document.getElementById('contenedor').innerHTML = peliculas

      //   console.log(data.results)
    } else if (respuesta.status === 401) {
      console.log('Llave incorrecta')
    } else if (respuesta.status === 404) {
      console.log('No se encontró la pelicula')
    } else {
      console.log('Error en la petición')
    }
  } catch (error) {
    console.log(error)
  }
}

cargarPeliculas()
