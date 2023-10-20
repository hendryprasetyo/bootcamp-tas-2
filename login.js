const Login = async e => {
  e.preventDefault() // Prevent the form from submitting and refreshing the page

  const usernameInput = document.getElementById('username')
  const passwordInput = document.getElementById('password')

  const username = usernameInput.value
  const password = passwordInput.value
  const loadingComponent = document.querySelector('#sign_btn svg')
  try {
    loadingComponent.classList.remove('hidden')
    const response = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const data = await response.json()
    const elementError = document.querySelector('#error_login')

    if (data.status === 200) {
      localStorage.setItem('user', JSON.stringify(data.results))
      window.location.href = '/store.html'
    } else {
      elementError.innerHTML = `<p>${data.message}</p>`
      elementError.classList.remove('hidden')
      elementError.classList.add('flex')
    }
  } catch (err) {
    const elementError = document.querySelector('#error_login')
    elementError.innerHTML = `<p>${err.message}</p>`
    elementError.classList.remove('hidden')
    elementError.classList.add('flex')
  } finally {
    loadingComponent.classList.add('hidden')
  }
}
const GetAuth = () => {
  const userString = localStorage.getItem('user')

  if (userString) {
    const user = JSON.parse(userString)
    return user
  }

  return null
}
document.addEventListener('DOMContentLoaded', () => {
  const dataAuth = GetAuth()
  if (dataAuth) {
    window.location.href = '/store.html'
  }
})
const formLogin = document.getElementById('loginForm')
formLogin.addEventListener('submit', Login)
