const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '623153427amshd984e2823da5525p19c597jsncea117e553a8',
    'x-rapidapi-host':
      'ip-geolocation-find-ip-location-and-ip-info.p.rapidapi.com'
  }
}

const fetchIP = (ip) => {
  return fetch(
    `https://ip-geolocation-find-ip-location-and-ip-info.p.rapidapi.com/backend/ipinfo/?ip=${ip}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

const $formulario = document.querySelector('#formulario')
const $ip = document.querySelector('#ip')
const $submit = document.querySelector('#submit')
const $limpiar = document.querySelector('.limpiar')
const $result = document.querySelector('#result')

$formulario.addEventListener('submit', async (event) => {
  event.preventDefault()
  const { value } = $ip
  if (!value) return

  $submit.setAttribute('disabled', '')

  const ipInfo = await fetchIP(value)

  // mostrar la informacion
  if (ipInfo) {
    $result.innerHTML = JSON.stringify(ipInfo, null, 2)
  }

  $submit.removeAttribute('disabled')
})

$limpiar.addEventListener('click', () => {
  $ip.value = ''
  $result.innerHTML =
    '<small>Aquí se visualizará la información de la dirección IP</small>'
})
