(function(){

  //easy select

  const select = function(el, all = false) {
    el = el.trim();
    if(all) {
      return [... document.querySelectorAll(el)]
    } 
    return document.querySelector(el)
  }

  // easy on event 

  const on = function(type, el, listener, all = false ) {
    let selectEl = select(el, all)
    if(selectEl) {
      if(all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  // easy onscroll

  const onScroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  // toggle click
  // ===========================
  let toggle = select('.toggle')
  
  // GENERRAL TOGGLE///
  let handleToggle = () => {

    let toggleNav = select('.toggle-nav')
    let icon = select('.toggle i')

    let active = icon.classList.contains('bi-list')

    if (active){
      icon.classList.remove('bi-list')
      icon.classList.add('bi-x')
      toggleNav.classList.add('active')
      toggle.classList.add('active')
      
    } else{
      icon.classList.remove('bi-x')
      icon.classList.add('bi-list')
      toggleNav.classList.remove('active')
      toggle.classList.remove('active')

    }

  }
  toggle.addEventListener('click', () => {
  
    // handle toggle function will be called when clicked
    handleToggle()
  })
  // click to links 

  // handle delete active  function
  let links = select('.navbar__li', true)

  let deleteActive = () => {
    links.forEach(link => link.classList.remove('active'))
  }
  

  // handle when click to navbar links
  let linkBtn = on('click', '.navbar__li',function(e) {
    // delete active
    deleteActive()
    // ADD ACIVE CLASS
    if (!this.classList.contains('active')) {
      this.classList.add('active')
    }
    // recall toggle icon handle function
    handleToggle()
  },true)


  //handle click to Top

  let scrollToTop = select('.clickToTop')
  scrollToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  })

  // listen to the scroll event

  window.addEventListener('scroll', () => {
    let scroll = window.scrollY
    if (scrollToTop) {
      
      if (scroll >= 60) {
        scrollToTop.classList.add('active')
      } else {
        scrollToTop.classList.remove('active')
      }
    }

  })

    /**
   * Hero type effect
   */
    const typed = select('.typed')
    if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }





  //initialize the AOS effects
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  })

  



  
})()


  
  
  
  
  // Form Validation
  function Validator(options) {
    //easy slect 

    const select = (el, all = false) => {
      el = el.trim()
      if(all) {
        return [... document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }


    // get form element

    let formElement = select(options.form)

    if (formElement) {
      let inpuntElement = formElement.querySelector(options.rules.selector)
      console.log(inpuntElement)

    }


  
  }
  


  // Define rules
  Validator.isRequired = (selector) => {
    return {
      selector,
      rule: () => {

      }
    }
  }
  Validator.isEmail = (selector) => {
    return {
      selector,
      rule: () => {
        
      }
    }
  }

