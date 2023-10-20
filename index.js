const dataBlog = [
  {
    title: 'Mastering Modern Minimalism',
    author: 'DesignSavvySoul',
    date: 'Apr 18th, 2022',
    image: 'assets/blog-1.jpg',
  },
  {
    title: 'The Fusion of Tech and Design',
    author: 'DesignSavvySoul',
    date: 'Nov 10th, 2022',
    image: 'assets/blog-2.jpg',
  },
  {
    title: 'Eco-Friendly Modern Style',
    author: 'HomeStyleHarmony',
    date: 'Feb 25th, 2023',
    image: 'assets/blog-3.jpeg',
  },
]
const dataAbout = [
  {
    icon: `<i class="ri-truck-line"></i>`,
    title: 'Fast & Free Shipping',
    desc: 'Improve your appearance and comfort with our Fast & Free Delivery service without delay',
  },
  {
    icon: `<i class="ri-shopping-bag-3-line"></i>`,
    title: 'Easy to Shop',
    desc: 'Discover Effortless Elegance: Explore Solutions to look cool without worrying about being uncomfortable',
  },
  {
    icon: `<i class="ri-customer-service-2-line"></i>`,
    title: '24/7 Support',
    desc: 'Experience peace of mind knowing that our dedicated team is available round the clock',
  },
  {
    icon: `<i class="ri-loop-right-line"></i>`,
    title: 'Hassle Free Returns',
    desc: "We believe in the perfect match, and if it doesn't quite fit, we make returning items a breeze",
  },
]

const GetAuth = () => {
  const userString = localStorage.getItem('user')

  if (userString) {
    const user = JSON.parse(userString)
    return user
  }

  return null
}

const scrollRevealOption = (distance, origin, duration) => {
  return {
    distance,
    origin,
    duration,
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
    const products = await response.json()
    products.results.data.slice(0, 3).forEach((product, index) => {
      const container = document.querySelector('#best_1')
      const imgElement = document.createElement('img')
      imgElement.src = product.images[0].url
      imgElement.id = `product_${index}`
      imgElement.alt = 'product-best-seller'
      container.appendChild(imgElement)
    })
    products.results.data.slice(3, 7).forEach((product, index) => {
      const container = document.querySelector('#best_2')
      const imgElement = document.createElement('img')
      imgElement.src = product.images[0].url
      imgElement.alt = 'product-best-seller'
      imgElement.id = `product_best_${index}`
      container.appendChild(imgElement)
    })

    for (let i = 0; i <= 2; i++) {
      ScrollReveal().reveal(`#product_${i}`, {
        ...scrollRevealOption('50px', 'left', 1000),
        delay: i * 500,
      })
    }
    for (let i = 3; i >= 0; i--) {
      // Mengubah nilai awal dan batas atas serta mengurangi indeks
      ScrollReveal().reveal(`#product_best_${i}`, {
        ...scrollRevealOption('50px', 'right', 1000),
        delay: (3 - i) * 500,
      })
    }
  } catch (error) {
    return error
  }
}
const navLinks = document.getElementById('nav-links')
const menuBtn = document.getElementById('menu-btn')
const menuBtnIcon = menuBtn.querySelector('i')
const toogleNav = () => {
  navLinks.classList.toggle('open')

  const isOpen = navLinks.classList.contains('open')
  menuBtnIcon.setAttribute('class', isOpen ? 'ri-close-line' : 'ri-menu-line')
}
document.addEventListener('DOMContentLoaded', () => {
  getProducts()
  const dataAuth = GetAuth()
  const authElement = document.querySelector('#auth_nav')

  if (dataAuth) {
    authElement.innerHTML = `<a href="/store.html" class="text-white font-medium">Store</a>`
  } else {
    authElement.innerHTML = `<a href="/login.html" class="text-white font-medium">Login</a>`
  }
})

const blogCardContainer = document.querySelector('#card_blog_container')
const aboutCardContainer = document.querySelector('#about_card_container')

dataBlog.forEach((blog, i) => {
  const divElement = document.createElement('div')
  divElement.id = `blog_${i + 1}`
  divElement.innerHTML = `
      <img src="${blog.image}" alt="blog" class="mb-[1rem] rounded-[10px] shadow-lg h-[250px] w-[370px]">
      <h4 class="mb-[1rem] text-[1rem] font-semibold text-[#18181b]">${blog.title}</h4>
      <p class="font-medium text-[#18181b]">
        <span class="font-normal text-[#71717a]">by</span> ${blog.author}
        <span>on</span> ${blog.date}
      </p>
  `
  blogCardContainer.appendChild(divElement)
})
dataAbout.forEach((about, i) => {
  const divElement = document.createElement('div')
  divElement.id = `about_${i}`
  divElement.innerHTML = `
      <span class="inline-block mb-[0.5rem] py-[5px] px-[10px] text-[1.25rem] bg-[#cad8d8] rounded-full">${about.icon}</span>
      <h4 class="mb-[1rem] text-[1rem] font-semibold text-[#18181b]">${about.title}</h4>
      <p class="font-medium text-[#18181b]">
        ${about.desc}
      </p>
  `
  aboutCardContainer.appendChild(divElement)
})
for (let i = 0; i <= 3; i++) {
  ScrollReveal().reveal(`#about_${i}`, {
    ...scrollRevealOption('50px', 'bottom', 1000),
    delay: i * 500,
  })
}
ScrollReveal().reveal('#about_image', {
  ...scrollRevealOption('200px', 'bottom', 3000),
})

// header container
ScrollReveal().reveal('#text_header', {
  ...scrollRevealOption('50px', 'bottom', 1000),
})

ScrollReveal().reveal('#text_paragraf', {
  ...scrollRevealOption('50px', 'bottom', 1000),
  delay: 500,
})
ScrollReveal().reveal('#started', {
  ...scrollRevealOption('50px', 'bottom', 1000),
  delay: 1000,
})
ScrollReveal().reveal('#scroll', {
  ...scrollRevealOption('50px', 'bottom', 1000),
  delay: 1500,
})
ScrollReveal().reveal('#best_content', {
  ...scrollRevealOption('50px', 'left', 1000),
  delay: 1500,
})
ScrollReveal().reveal('#blog h2', {
  ...scrollRevealOption('100px', 'left', 1000),
})
ScrollReveal().reveal('#blog_1', {
  ...scrollRevealOption('200px', 'bottom', 1500),
})
ScrollReveal().reveal('#blog_3', {
  ...scrollRevealOption('200px', 'bottom', 1500),
})

ScrollReveal().reveal('#blog_2', {
  ...scrollRevealOption('200px', 'top', 1500),
})
