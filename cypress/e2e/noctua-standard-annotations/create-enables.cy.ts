import AnnotationPage from "../../support/models/annotations/annotation-page";
import createAnnotationsData from "../../fixtures/annotations/create-annotations.json";
import { selectFromAutocomplete } from "../../support/utils/create-annotations";

describe('Create a Standard Annotation', () => {
  const annotationPage = new AnnotationPage();

  before(() => {
    annotationPage.visit(createAnnotationsData.modelId);

    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="noc-login-button"]').length > 0) {
        cy.get('[data-cy="noc-login-button"]').click();

        //cy.url().should('not.eq', 'http://the-previous-url.com');
        // or, if you know the new URL:
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
  });

  it('Types into a textarea and checks autocomplete', () => {
    createAnnotationsData.annotations.forEach(data => {
      selectFromAutocomplete(`[data-cy="form-input-${data.target}"]`, data.input, data.optionId);
    });

    // cy.get('[data-cy="save-annotation-button"]').should('be.visible').click();
  });

});
