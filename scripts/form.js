const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
const progressTexts = [...document.querySelectorAll(".step p")]
const progressBullets = [...document.querySelectorAll(".step .bullet")]
const progressChecks = [...document.querySelectorAll(".step .check")]
const submitButton = document.querySelector("[data-submit]")

let currentStep = formSteps.findIndex(step => {
  return step.classList.contains("active")
})

if (currentStep < 0) {
  currentStep = 0
  showCurrentStep()
}


multiStepForm.addEventListener("click", e => {
  let incrementor
  if (e.target.matches("[data-next]") || e.target.matches("[data-submit]")) {
    incrementor = 1
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1
  }

  if (incrementor == null) return

  const inputs = [...formSteps[currentStep].querySelectorAll("input")]
  const allValid = inputs.every(input => input.reportValidity())
  if (allValid) {
    currentStep += incrementor
    showCurrentStep()
  }
})

multiStepForm.addEventListener("submit", e => {
  e.preventDefault()
  // currentStep = 0
  // showCurrentStep()
  setTimeout(() => {
    alert("Thanks for your message :)")
  }, 500)
})

formSteps.forEach(step => {
  step.addEventListener("animationend", e => {
    formSteps[currentStep].classList.remove("hide")
    e.target.classList.toggle("hide", !e.target.classList.contains("active"))
  })
})

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep)
  })
  progressTexts.forEach((text, index) => {
    if (index === currentStep - 1) text.classList.add("active")
    if (index === currentStep) text.classList.remove("active")
  })
  progressBullets.forEach((bullet, index) => {
    if (index === currentStep - 1) bullet.classList.add("active")
    if (index === currentStep) bullet.classList.remove("active")
  })
  progressChecks.forEach((check, index) => {
    if (index === currentStep - 1) check.classList.add("active")
    if (index === currentStep) check.classList.remove("active")
  })
}

