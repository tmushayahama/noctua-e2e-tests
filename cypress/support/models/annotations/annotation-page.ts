class AnnotationPage {

  visit(url: string, modelId: string): void {
    cy.visit(url + modelId);

    //will add more things here
  }

  login() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="noc-login-button"]').length > 0) {
        cy.get('[data-cy="noc-login-button"]').click();

        //cy.url().should('not.eq', 'http://the-previous-url.com');
        // cy.url().should('include', 'http://the-new-url.com');

        cy.get('a').contains('Sign in locally').should('be.visible').click();
        cy.get('input[name="username"]').should('be.visible').type('gotremayne');
        cy.get('input[name="password"]').should('be.visible').type('artist12345');
        cy.get('button').contains('Submit').click();

        cy.wait(1000);
        cy.get('#return-trip-login').should('be.visible').click();

      } else {
        cy.log('Login button not found');
      }
    });
  }

  typeInTextarea(selector: string, text: string): void {
    cy.get(selector).should('exist');
    cy.get(`${selector} textarea`).type(text);
  }

  selectAutocompleteOption(optionId: string): void {
    cy.get('.mat-autocomplete-panel').should('be.visible');
    cy.get('mat-option').each(($option) => {
      if ($option.find('.noc-term-id').text().includes(optionId)) {
        cy.wrap($option).click();
      }
    });
  }

}

export default AnnotationPage;