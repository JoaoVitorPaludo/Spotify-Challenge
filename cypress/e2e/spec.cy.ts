describe('Access url', () => {
  it('passes', () => {
    cy.visit('http://localhost:5174/')
    cy.get('button').click()
    cy.origin('https://accounts.spotify.com', () => {
      cy.get('[data-testid="login-username"]').type('')
      cy.get('[data-testid="login-password"]').type('')
      cy.get('[data-testid="login-button"]').click()
    })
    cy.url().should('include', '/home')
    cy.get('h1').should('have.text', 'Histórico de musicas')
    cy.get('p').should('have.text', 'Suas ultimas musicas ouvidas')
  })
})

// describe('Home page list', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:5174/home')
//     cy.get('h1').should('have.text', 'Histórico de musicas')
//     // cy.get('map').should('have.length', 1)
//   })
// })
