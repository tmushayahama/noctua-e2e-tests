describe('create a standard annotation', () => {
  it('passes', () => {
    cy.visit('http://localhost:4202/?model_id=gomodel%3A65495cd500000170')
  })

  it('Types into a textarea and checks autocomplete', () => {

    cy.visit('http://0.0.0.0:4202/?model_id=gomodel%3A65495cd500000170')

    cy.get('[data-cy="form-input-gp"]').should('exist');
    cy.get('[data-cy="form-input-gp"] textarea').type('air-2 Cele');

    // cy.wait(1000); 

    // Check if the autocomplete is visible and has the expected items
    cy.get('.mat-autocomplete-panel').should('be.visible');
    cy.get('.mat-autocomplete-panel mat-option').should('have.length.greaterThan', 0);

    // Step 2: Wait for mat-options to appear
    cy.get('mat-option').should('be.visible');

    // Step 3: Iterate through the options
    cy.get('mat-option').each(($option) => {
      if ($option.find('.noc-term-id').text().includes('WB:WBGene00000099')) {
        cy.wrap($option).click();
      }
    });




    // GO Term

    cy.get('[data-cy="form-input-goterm"]').should('exist');
    cy.get('[data-cy="form-input-goterm"] textarea').type('lipid binding');

    // cy.wait(1000); 

    // Check if the autocomplete is visible and has the expected items
    cy.get('.mat-autocomplete-panel').should('be.visible');
    cy.get('.mat-autocomplete-panel mat-option').should('have.length.greaterThan', 0);

    // Step 2: Wait for mat-options to appear
    cy.get('mat-option').should('be.visible');

    // Step 3: Iterate through the options
    cy.get('mat-option').each(($option) => {
      if ($option.find('.noc-term-id').text().includes('GO:0008289')) {
        cy.wrap($option).click();
      }
    });

    // Evidence

    cy.get('[data-cy="form-input-goterm-evidence-0"]').should('exist');
    cy.get('[data-cy="form-input-goterm-evidence-0"] textarea').type('evidence used in manual assertion');

    // c

    // Check if the autocomplete is visible and has the expected items
    cy.get('.mat-autocomplete-panel').should('be.visible');
    cy.get('.mat-autocomplete-panel mat-option').should('have.length.greaterThan', 0);

    // Step 2: Wait for mat-options to appear
    cy.get('mat-option').should('be.visible');

    // Step 3: Iterate through the options
    cy.get('mat-option').each(($option) => {
      if ($option.find('.noc-term-id').text().includes('ECO:0000352')) {
        cy.wrap($option).click();
      }
    });

    // Optionally, check for specific text in the autocomplete options
    // cy.get('[data-cy="form-input-gp"] .mat-autocomplete-panel mat-option').first().should('contain', 'expectedText');
  });
});