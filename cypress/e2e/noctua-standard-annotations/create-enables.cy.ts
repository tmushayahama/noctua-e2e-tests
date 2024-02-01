import AnnotationPage from "../../support/models/annotations/annotation-page";
import createAnnotationsData from "../../fixtures/annotations/create-annotations.json";
import { selectFromAutocomplete } from "../../support/utils/create-annotations";

describe('Create a Standard Annotation', () => {
  const annotationPage = new AnnotationPage();

  before(() => {
    annotationPage.visit(createAnnotationsData.modelUrl, createAnnotationsData.modelId);
    annotationPage.login();
  });

  it('Types into a textarea and checks autocomplete', () => {
    createAnnotationsData.annotations.forEach(annotations => {
      annotationPage.visit(createAnnotationsData.modelUrl, createAnnotationsData.modelId);
      annotations.forEach(annotation => {
        selectFromAutocomplete(`[data-cy="form-input-${annotation.target}"]`, annotation.input, annotation.optionId);
      });

      cy.wait(1000);
      cy.get('[data-cy="save-annotation-button"]').should('be.visible').click();
    });


  });

});
