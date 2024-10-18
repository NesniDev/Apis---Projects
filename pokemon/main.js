// import JSConfetti from 'js-confetti'
const $card = document.querySelector('#card')
const $imagen = document.querySelector('#img')
const $title = document.querySelector('#name')
const $text = document.querySelector('#text-small')
const $paragraph = document.querySelector('#paragraph')
const $experience = document.querySelector('#experience')
const $number = document.querySelector('#number')
const $formulario = document.querySelector('#formulario')
const $submit = document.querySelector('#submit')
const $nameInput = document.querySelector('#pokemon')
const $small = document.querySelector('#texto')

document.addEventListener('DOMContentLoaded', () => {
  const namePokemon = 'squirtle'
  APIfetchPokemon(namePokemon.toLowerCase())
})
// IVYSAUR o 2
$formulario.addEventListener('submit', async (event) => {
  event.preventDefault()

  const { value } = $nameInput
  $submit.setAttribute('disabled', 'true')
  // Llamada a la API con async/await
  const pokemonFound = await APIfetchPokemon(value.toLowerCase())

  if (pokemonFound) {
    // Si el Pokémon se encuentra, lanzamos el confetti
    $small.textContent = 'Pokemón Encontrado 🎉'
    $small.style.color = 'rgb(60, 255, 0)'
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  } else {
    $small.textContent = 'Pokemón No Encontrado 😣'
    $small.style.color = 'rgb(255, 0, 0)'
  }

  $submit.removeAttribute('disabled')
})

const APIfetchPokemon = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (!response.ok) throw new Error('Pokémon no encontrado')

    const data = await response.json()
    const option = {
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      paragraph: [
        data.abilities[0]?.ability.name || 'Sin habilidad',
        data.abilities[1]?.ability.name || 'Sin habilidad'
      ],
      weight: data.weight,
      experience: data.base_experience,
      number: data.id
    }

    // Actualizamos el DOM con la información del Pokémon
    $imagen.src = option.image
    $title.textContent = option.name.toUpperCase()
    $text.textContent = `${option.weight / 10}kg`
    $paragraph.textContent = option.paragraph.join(', ')
    $experience.textContent = option.experience
    $number.textContent = `#${option.number}`

    return true // Indica que el Pokémon fue encontrado y la API devolvió datos válidos
  } catch (error) {
    console.error('Error al obtener el Pokémon:', error)
    return false // Si hay error, devuelve false
  }
}
