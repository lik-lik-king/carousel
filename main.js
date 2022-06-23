// Below we are defining all of the variables with the selected class using the dom 
//  the first variable is the parent element defined carousel and then the rest are the child elements defined using the parent element variable with querySelector and the respective classes that are selected.
const carousel = document.querySelector('.carousel')
const previousButton = carousel.querySelector('.previous-button')
const nextButton = carousel.querySelector('.next-button')
const contents = carousel.querySelector('.carousel__contents')
const dotsContainer = carousel.querySelector('.carousel__dots')
// next we define the variables for the dots and the dot class and the slides and the slide class. We are defining this using the Array.from function and the querySelectorAll function. The Array.from function is used to convert the node list into an array of objects. The querySelectorAll function is used to select all the elements that have the class of carousel__dot or carousel__slide.
const slides = Array.from(carousel.querySelectorAll('.carousel__slide'))
const dots = Array.from(carousel.querySelectorAll('.carousel__dot'))
// Next we add the event listeners to the next button. This way we can move to the next slide. Inside of the code block we add currentSlide, nextSlide and destination. The currentSlide is the current slide that is selected. The nextSlide is the next slide that is selected. The destination is the position of the next slide. I am defining the currentSlide variable by adding the querySelector which is the carousel__contents and accessing the child element and the class is__selected. The nextSlide variable is defined with the currentSlide variable with the method of nextElementSibling which is the next sibling of the currentSlide. The destination variable is defined with getComputedStyle method which takes an argument of the nextSlide variable and the property is the left property. The getComputedStyle method is used to get the computed style of the element. The left property is used to get the left position of the element. The nextSlide variable is then used to set the left property of the contents variable to the destination variable.
nextButton.addEventListener('click', event => {
  const currentSlide = contents.querySelector('.is-selected')
  const nextSlide = currentSlide.nextElementSibling
  const destination = getComputedStyle(nextSlide).left

  // Shows next slide
  // Below shows the contents with the style method added to the left property. which is now defined by the destination variable being concatenated with the string of "-" with destination variable. 
  contents.style.left = '-' + destination
  currentSlide.classList.remove('is-selected')
  nextSlide.classList.add('is-selected')
  

  // Shows previous button
// Here I am adding the dot-notation of removeAttribute to the previousButton variable. This is used to remove the attribute of hidden from the previousButton variable. We do this because we want the previous button to be visible when we are on the first slide.
  previousButton.removeAttribute('hidden')

  // Hides next button
  // Here I am adding an if statement to see if the nextSlide is null. If it is null then we want to add the hidden attribute to the nextButton variable and set it to true.
  if (!nextSlide.nextElementSibling) {
    nextButton.setAttribute('hidden', true)
  }

  // Highlight dot
  // This is selecting the current dot selected and when selecting the new dot we remove it and then add the next dot selected.
  const currentDot = dotsContainer.querySelector('.is-selected')
  const nextDot = currentDot.nextElementSibling
  currentDot.classList.remove('is-selected')
  nextDot.classList.add('is-selected')
})
// We then add an event listener to the previous button again but this time we want to move to the previous slide. We are defining the currentSlide variable by adding the querySelector which is the carousel__contents and accessing the child element and the class is__selected. The previousSlide variable is defined with the currentSlide variable with the method of previousElementSibling which is the previous sibling of the currentSlide. The destination variable is defined with getComputedStyle method which takes an argument of the previousSlide variable and the property is the left property. The getComputedStyle method is used to get the computed style of the element. The left property is used to get the left position of the element. The previousSlide variable is then used to set the left property of the contents variable to the destination variable.
previousButton.addEventListener('click', event => {
  const currentSlide = contents.querySelector('.is-selected')
  const previousSlide = currentSlide.previousElementSibling
  const destination = getComputedStyle(previousSlide).left

  // Shows previous slide
  contents.style.left = '-' + destination
  currentSlide.classList.remove('is-selected')
  previousSlide.classList.add('is-selected')

  // Shows next button
  nextButton.removeAttribute('hidden')

  // Hides previous button
  if (!previousSlide.previousElementSibling) {
    previousButton.setAttribute('hidden', true)
  }

  // Highlight dot
  const currentDot = dotsContainer.querySelector('.is-selected')
  const previousDot = currentDot.previousElementSibling
  currentDot.classList.remove('is-selected')
  previousDot.classList.add('is-selected')
})
// we then add the dots method with the foreach function. This is used to loop through the dots array and add the event listener to each dot. The event listener is added to the click event. The click event is used to add the class of is-selected to the dot that is clicked.
dots.forEach(dot => {
  dot.addEventListener('click', event => {
    let clickedDotIndex
// then define the clickedDotIndex variable with a for loop. This is used to loop through the dots array and add an if statement to see if the dot that is clicked has the index strictly equal to the dot that is clicked. If it is equal to the dot that is clicked then clickedDotIndex is set to the index of the dot that is clicked.
    for (let index = 0; index < dots.length; index++) {
      if (dots[index] === dot) {
        clickedDotIndex = index
      }
    }

    // Show slide
    const slideToShow = slides[clickedDotIndex]
    const destination = getComputedStyle(slideToShow).left

    contents.style.left = '-' + destination
    slides.forEach(slide => { slide.classList.remove('is-selected') })
    slideToShow.classList.add('is-selected')

    // Highlight dot
    dots.forEach(d => { d.classList.remove('is-selected') })
    dot.classList.add('is-selected')

    // Show / hide buttons
    if (clickedDotIndex === 0) {
      previousButton.setAttribute('hidden', true)
      nextButton.removeAttribute('hidden')
    } else if (clickedDotIndex === dots.length - 1) {
      previousButton.removeAttribute('hidden')
      nextButton.setAttribute('hidden', true)
    } else {
      previousButton.removeAttribute('hidden')
      nextButton.removeAttribute('hidden')
    }
  })
})
