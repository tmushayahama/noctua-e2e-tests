export function selectFromAutocomplete(inputSelector: string, text: string, optionId: string = null): void {
  cy.get(inputSelector).should('exist');
  cy.get(`${inputSelector} textarea`).type(text);

  if (optionId) {
    cy.wait(1000);
    cy.get('mat-option').should('be.visible');
    cy.get('mat-option').each(($option) => {
      if ($option.find('.noc-term-id').text().includes(optionId)) {
        cy.wrap($option).click();
      }
    });
  }

}
