
class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    urlFeedback: () => cy.get('#urlFeedback'),
    subimitBtn: () => cy.get('#btnSubmit'),
  }

  typeTitle(text) {
    if (!text) return
    this.elements.titleInput().type(text)
  }

  typeUrl(text) {
    if (!text) return
    this.elements.imageUrlInput().type(text)
  }

  clickSubmit() {
    this.elements.subimitBtn().click()
  }

}

//instanciando uma classe para acessar funções dentro dela.
const registerForm = new RegisterForm();

describe('Image Registration', () => {

  describe('Submitting an image with invalid inputs', () => {

    after(() => {
      cy.clearAllLocalStorage();
    });

    const input = {
      title: "",
      url: "",
    }

    it('Given I am on the image registration page', () => {
      cy.visit('/')
    })

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title)
    })

    it(`Then I enter "${input.url}" in the URL field`, () => {
      registerForm.typeTitle(input.url)
    })

    it('Then I click the submit button', () => {
      registerForm.clickSubmit();
    })

    it('Then I should see "Please type a title for the image" message above the title field', () => {
      registerForm.elements.titleFeedback().should("contains.text", 'Please type a title for the image')
      // debugar onde esta o erro 
      // registerForm.elements.titleFeedback().should(element =>{debugger})
    })

    it('And I should see "Please type a valid URL" message above the imageUrl field', () => {
      registerForm.elements.urlFeedback().should("contains.text", 'Please type a valid URL')
    })

    it('And I should see an exclamation icon in the title and URL fields', () => {
      registerForm.elements.titleInput()
        .should('have.css', 'border-right-color', 'rgb(220, 53, 69)');
    })

  })

  const input = {
    title:'Alien BR',
    url:'https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg',

  }

  describe('Submitting an image with valid inputs using enter key', () => {

    it('Given I am on the image registration page', () => {
      cy.visit('/')
    })

    it('When I enter "Alien BR" in the title field', () => {
      registerForm.typeTitle(input.title)
    })

    it('Then I should see a check icon in the title field', () => {
      registerForm.elements.titleInput()
        .should("have.css", "border-right-color", "rgb(134, 183, 254)")
    })

    it('When I enter "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" in the URL field', () => {
      registerForm.typeUrl(input.url)
    })

    it('Then I should see a check icon in the title field', () => {
      registerForm.elements.imageUrlInput()
        .should("have.css", "border-right-color", "rgb(134, 183, 254)")
    })

    it('Then I can hit enter to submit the form', () => {
      registerForm.clickSubmit()
    })

  })

})
