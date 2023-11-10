Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Jorge Fernando')
    cy.get('#lastName').type('Toledo')
    cy.get('#email').type('jftoledoqa@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})