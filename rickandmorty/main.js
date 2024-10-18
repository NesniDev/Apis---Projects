const ObtenerDatosAPI = async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json()
    console.log(data)

    // let infoPersonaje = "" se hizo con createRange().createContextualFragment para hacerlo de un distinta manera
    data.results.forEach((personaje) => {
      const incluir = document.createRange().createContextualFragment(` 
                <article  class="personaje">
                    <h2>${personaje.name}</h2>
                    <img src="${personaje.image}" alt="${personaje.name}">
                    <div class="info-basic">
                        <small>${personaje.gender}</small>
                        <small>${personaje.status}</small>    
                    </div>
                    <span>${personaje.episode.length} episodios</span>
                    <p>${personaje.location.name}</p>
                </article > 
            `)
      const main = document.querySelector('#contenedor-info')
      main.append(incluir)
    })

    // document.getElementById("contenedor-info").innerHTML = infoPersonaje
  } catch (error) {
    console.log(error)
  }
}

ObtenerDatosAPI()
