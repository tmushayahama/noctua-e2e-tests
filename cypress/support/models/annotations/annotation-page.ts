class AnnotationPage {
  visit(modelId: string): void {
    cy.visit(`http://localhost:4202/?model_id=${modelId}`);
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