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

    // collect rules for validating

    let  collectRules = {}

    // handle validate for each rule  when there are any events
    function validate(inpuntElement, rule, event = 'blur') {
      let errorMessage
      let errorElement = inpuntElement.parentElement.querySelector('span')
      //get rule
      let rules = collectRules[rule.selector]
      // use for loop to get the needed message for specific event
      for(let i = 0; i < rules.length; ++i) {
        errorMessage = rules[i](inpuntElement.value)
        if (errorMessage) break;
      }


      switch (event) {
        // 1. Handle when blur event happens
        case "blur": 
          if (errorMessage) {
            errorElement.innerText=errorMessage;
            errorElement.classList.add('active')
            inpuntElement.classList.add('active')

          } else {
            errorElement.innerText='';
            errorElement.classList.remove('active')
            inpuntElement.classList.remove('active')
          }
          break;
          // 2. Handle when focus event happens
        case "focus": 
          errorElement.innerText='';
          errorElement.classList.remove('active')
          inpuntElement.classList.remove('active')
          break;

      }

    }


    // main handle when there is a form for validate

    if (formElement) {

      options.rules.forEach(rule => {
        
        let inpuntElement = formElement.querySelector(rule.selector)
        
        
        // add rules to collectRules

        if(Array.isArray(collectRules[rule.selector])) {
          collectRules[rule.selector].push(rule.check)
        } else {
          collectRules[rule.selector] = [rule.check]
        }


        //when blur event
        inpuntElement.onblur = () => {
          validate(inpuntElement, rule, 'blur')
        }
        
        
        //when focus event
        inpuntElement.oninput = () => {
          validate(inpuntElement, rule, 'focus')
        }
        
      }) 

    }


  
  }
  


  // Define rules

  // check whether users input 
  Validator.isRequired = (selector) => {
    return {
      selector,
      check: (value) => {
        return value.trim() ? undefined : 'Please fill out this field'
      }
    }
  }

  // Whether the value that has been texted is an email or not
  Validator.isEmail = (selector) => {
    return {
      selector,
      check: (value) => {
        let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return regex.test(value) ? undefined : `Please check your email syntax  `
        
      }
    }
  }

