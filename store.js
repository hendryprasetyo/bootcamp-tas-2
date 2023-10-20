const navHome = document.querySelector('#nav-home')
const elementModal = document.querySelector('#popup-modal')
const navMobile = document.querySelector('#nav_mobile')
const navBtnMobile = document.querySelector('#menu-btn-mobile')
const quantityCart = document.querySelector('#quantity-cart')
const formatRupiah = value => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })

  return formatter.format(value)
}
const GetAuth = () => {
  const userString = localStorage.getItem('user')

  if (userString) {
    const user = JSON.parse(userString)
    return user
  }

  return null
}
const GetQuantityCart = () => {
  const quantity = localStorage.getItem('cartQuantity')

  if (quantity) {
    return quantity
  }

  return null
}
const addToCart = () => {
  const dataAuth = GetAuth()
  if (!dataAuth) {
    window.location.href = '/login.html'
  } else {
    getDataUser(dataAuth._id, dataAuth.token)
    let cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0
    cartQuantity += 1
    localStorage.setItem('cartQuantity', cartQuantity)
  }
}

const toogleNav = () => {
  if (navMobile.children[0].classList.contains('hidden')) {
    navMobile.children[0].classList.remove('hidden')
  } else {
    navMobile.children[0].classList.add('hidden')
  }
}
const getBanner = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/v1/banner-home', {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    const imageUrl = data.results[1].image.url
    const imgElement = document.createElement('img')
    imgElement.src = imageUrl
    imgElement.alt = 'banner'
    imgElement.className = 'w-full h-[300px] md:h-[400px] rounded-lg object-fit'

    // Memasukkan elemen-elemen <img> ke dalam elemen dengan class "w-full"
    const container = document.querySelector('#banner_image')
    container.appendChild(imgElement)
  } catch (error) {
    return error
  }
}

const containerAuthMenu = document.querySelector('#auth_menu')
const dropDown = () => {
  const dropdonwElement = document.querySelector('#dropdownInformation')
  if (dropdonwElement.classList.contains('hidden')) {
    dropdonwElement.classList.remove('hidden')
  } else {
    dropdonwElement.classList.add('hidden')
  }
}
const Modal = type => {
  if (type === 'open') {
    elementModal.classList.remove('-translate-y-full')
    elementModal.classList.add('translate-y')
  } else {
    elementModal.classList.remove('translate-y')
    elementModal.classList.add('-translate-y-full')
  }
}
const getDataUser = async (userId, token) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/user/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    const quantity = GetQuantityCart()
    if (quantity && parseInt(quantity) > 0) {
      quantityCart.classList.remove('hidden')
      quantityCart.innerHTML = quantity
    }
    navBtnMobile.children[0].className = 'hidden'
    navHome.className = 'hidden'
    navMobile.classList.remove('w-full')
    navMobile.children[0].className = 'flex justify-center items-center gap-5'
    navMobile.children[0].children[0].classList.remove('hidden')
    containerAuthMenu.innerHTML = `
    <div class='relative justify-center items-center gap-1 flex cursor-pointer' onclick='dropDown()'>
      <div
        id="dropdownInformation"
        class="z-40 absolute top-14 right-0 bg-gray-100 rounded-lg shadow w-44 hidden"
                >
                  <div class="px-4 py-3 text-sm text-gray-900 border-b border-gray-300 hover:bg-gray-200">
                    <h1>${data.results.username}</h1>
                    <div class="font-medium truncate">${data.results.email}</div>
                  </div>
                  <ul class="py-2 text-sm text-gray-700 hover:bg-gray-200">
                    <li>
                      <a href="/" class="block px-4 py-2"
                        >Home</a
                      >
                    </li>
                  </ul>
                  <div class="py-1 px-1 w-full border-t border-gray-300">
                    <button
                      onclick="Modal('open')"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full"
                      >Sign out</button>
                  </div>
          </div>
      <img src=${data.results.image.url} alt='avatar' class='w-10 h-10 rounded-full'/>
      <h1 class='hidden md:block'>${data.results.username}</h1>
    </div>`
  } catch (error) {
    console.log(error)
  }
}
const getProducts = async () => {
  try {
    const response = await fetch(
      'http://localhost:4000/api/v1/products?pageNumber=1&pageSize=20&search=jb',
      {
        method: 'GET',
      }
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    const productContainer = document.querySelector('#product_container')

    // Loop melalui data produk dan membuat elemen-elemen kartu produk
    data.results.data.forEach(product => {
      const price = formatRupiah(product.price)
      const priceBeforeDisc = formatRupiah(product.price_before_discount)
      const productCard = document.createElement('div')
      productCard.className = 'shadow-md w-[200px] p-2 h-[330px]'
      productCard.innerHTML = `<img src=${
        product.images[0].url
      } alt='product' class='w-full h-[180px]'> 
      <h1 class='font-medium text-base overflow-ellipsis overflow-hidden whitespace-nowrap mt-5'>${
        product.title
      }</h1>
      <div class='flex justify-between items-center mt-2'>
      <h3 class=${
        priceBeforeDisc === price ? 'hidden' : 'text-sm line-through'
      }>${priceBeforeDisc}</h3>
      <h2 class='text-orange-500 font-medium'>${price}</h2>
      </div>
      <div class='flex w-full justify-center mt-3'>
      <botton class='rounded-full px-4 py-1 border-2 border-yellow-500 hover:border-none hover:bg-orange-600/90 hover:text-white cursor-pointer transition font-medium' onclick='addToCart()'>Add to cart</botton>
      </div>
      `

      productContainer.appendChild(productCard)
    })
  } catch (error) {
    return error
  }
}

const logout = () => {
  Modal('close')
  localStorage.removeItem('user')
  window.location.href = '/login.html'
}

document.addEventListener('DOMContentLoaded', function () {
  getBanner()
  getProducts()
  const dataAuth = GetAuth()
  if (dataAuth) {
    getDataUser(dataAuth._id, dataAuth.token)
  }
  if (!dataAuth) {
    navMobile.children[0].children[0].classList.add('hidden')
    navMobile.children[0].className =
      'font-medium md:flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 hidden md:bg-white items-center justify-center'
    navBtnMobile.children[0].className = 'md:hidden'
    containerAuthMenu.innerHTML = `
      <a href='/login.html' class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
        Login
      </a>`
  }
})
