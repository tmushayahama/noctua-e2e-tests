import AnnotationPage from "../../support/models/annotations/annotation-page";
import createAnnotationsData from "../../fixtures/annotations/create-annotations.json";
import { selectFromAutocomplete } from "../../support/utils/create-annotations";

describe('Create a Standard Annotation', () => {
  const annotationPage = new AnnotationPage();

  before(() => {
    annotationPage.visit(createAnnotationsData.modelId);
  });

  it('Types into a textarea and checks autocomplete', () => {
    createAnnotationsData.annotations.forEach(data => {
      selectFromAutocomplete(`[data-cy="form-input-${data.target}"]`, data.input, data.optionId);
    });
  });

});
