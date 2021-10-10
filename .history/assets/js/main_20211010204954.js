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

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  
  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('.navbar .navbar__ul', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {

      console.log(navbarlink)
      console.log(navbarlink.hash)
      // if (!navbarlink.hash) return
      // let section = select(navbarlink.hash)
      // if (!section) return
      // if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      //   navbarlink.classList.add('active')
      // } else {
      //   navbarlink.classList.remove('active')
      // }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

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

      return !errorMessage

    }


    // main handle when there is a form for validate

    if (formElement) {

      // prevent default submit event
      formElement.onsubmit = (e) => {
        e.preventDefault();

        // the default of form is having no error
        let isFormValid = true

        //validate when submit
        options.rules.forEach(rule => {
          let inpuntElement = formElement.querySelector(rule.selector)

          //call validate method while check if there are any errorMessages
          // if there is an error the result will be false
          let isValid = validate(inpuntElement, rule)

          // if there is an error the default of formValid will be set to be false
          if (!isValid) {
            isFormValid = false
          }


        })

        

        //handle the form submit with two conditions (Whether FormSubmit is valid or not)
        if (isFormValid) { //Form is valid

          // get value from User Input with element have attribute name and not with element disable
          // this varieble is a node list => let convert to Array for getting value
          let formValueInput = formElement.querySelectorAll('[name]:not([disable])')

          //SUBMIT WITH JAVASCRIPT
          if (typeof options.onSubmit === 'function') {
            

            //getting value by convert to Array
            let formValue = Array.from(formValueInput).reduce((values, input) => {
              values[input.name] = input.value
              return values
            }, {})

            //assign form value data to function onSubmit
            options.onSubmit(formValue)

            //clear value inputs
            Array.from(formValueInput).forEach((el) => {
              el.value = ''
            })
            // get element message DOM
            let messageSuccess = select('.contact__form-message')
            messageSuccess.classList.add('active')
            setTimeout((() => {
              messageSuccess.classList.remove('active')
            }),6000)

          } 
          //SUBMIT BY DEFAULT
          else {
            formElement.submit()
          }

        } else { //Form is not valid
          return
        }
      }

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

        return regex.test(value) ? undefined : `Your email is not valid`
        
      }
    }
  }

