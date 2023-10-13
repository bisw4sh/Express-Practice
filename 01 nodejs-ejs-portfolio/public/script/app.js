const toggleOff = document.getElementById('toggleOff')
const toggleOn = document.getElementById('toggleOn')
const toggler = document.querySelector('.toggler')
const root = document.querySelector(':root')

const handleCSSVar = () => {
    root.style.setProperty('--text-color', '#F5F5F5')
    root.style.setProperty('--link-color', '#BA55D3')
    root.style.setProperty('--background-color', '#36454F')
}

const resetCSSVar = () => {
    root.style.setProperty('--text-color', '#1a1c20')
    root.style.setProperty('--link-color', '#4a76ee')
    root.style.setProperty('--background-color', '#eeeff1')
  }

const handleToggle = () => {
    toggler.classList.toggle('darkMode')
    if (toggleOff.style.display === 'none') {
        toggleOff.style.display = 'inline-block'
        toggleOn.style.display = 'none'
        } else {
        toggleOff.style.display = 'none'
        toggleOn.style.display = 'inline-block'
        }

    if(toggler.classList.contains('darkMode')){
        handleCSSVar()
        localStorage.setItem('mode','dark')
    }
    else{
        resetCSSVar()
        localStorage.clear()
    }    
}

toggler.addEventListener('click', handleToggle)


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault()// Prevent form submission

    // Get input values
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value

    // Compose email body
    const subject = `New message from ${name}`;
    const body = `From: ${name}\nEmail: ${email}\n\nMessage: ${message}`

    // Create mailto link
    const mailtoLink = `mailto:spikeystona@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Open default mail application
    window.location.href = mailtoLink
  })

  if(localStorage.getItem('mode') === 'dark'){
    handleToggle()
  }