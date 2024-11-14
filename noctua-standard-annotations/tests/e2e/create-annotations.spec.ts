import { test, expect } from '@playwright/test';
import { AnnotationPage } from '../pages/annotation-page';
import { selectFromAutocomplete } from '../utils/create-annotation';
import createAnnotationsData from '../fixtures/annotations/create-annotations.json';

test.describe('Create a Standard Annotation', () => {
  let annotationPage: AnnotationPage;

  test.beforeEach(async ({ page }) => {
    annotationPage = new AnnotationPage(page);
    await annotationPage.visit(createAnnotationsData.modelUrl, createAnnotationsData.modelId);
    await annotationPage.login();
  });

  test('Types into a textarea and checks autocomplete', async ({ page }) => {
    for (const annotations of createAnnotationsData.annotations) {
      await annotationPage.visit(createAnnotationsData.modelUrl, createAnnotationsData.modelId);

      for (const annotation of annotations) {
        await selectFromAutocomplete(
          page,
          `[data-cy="form-input-${annotation.target}"]`,
          annotation.input,
          annotation.optionId
        );
      }

      await page.waitForTimeout(1000);
      await page.locator('[data-cy="save-annotation-button"]').click();
    }
  });
});