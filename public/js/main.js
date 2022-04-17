const showDescriptionButtons = document.querySelectorAll(
  `.container .questions .show-description-button`
)

const questionDescriptions = document.querySelectorAll(
  `.container .questions .question-description`
)

if (questionDescriptions && showDescriptionButtons) {
  for (const button of showDescriptionButtons) {
    button.addEventListener('click', () => {
      const questionDescription = Array.from(questionDescriptions).find(
        questionDescription => button.id === questionDescription.id
      )

      questionDescription.classList.toggle('show')
    })
  }
}
