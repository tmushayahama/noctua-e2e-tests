import { test as base, expect } from '@playwright/test';
import { AnnotationPage } from '../pages/annotation-page';
import { selectFromAutocomplete } from '../utils/create-annotation';
import createAnnotationsData from '../fixtures/annotations/create-annotations.json';


// Create a fixture for the AnnotationPage
type TestFixtures = {
  annotationPage: AnnotationPage;
};

const test = base.extend<TestFixtures>({
  annotationPage: async ({ page }, use) => {
    const annotationPage = new AnnotationPage(page);
    await use(annotationPage);
  },
});

test.describe('Create a Standard Annotation', () => {
  test.beforeEach(async ({ annotationPage }) => {

    try {
      console.log(`Running beforeEach for test: ${createAnnotationsData.modelId}`);
      await annotationPage.visit(createAnnotationsData.baseUrl, "");
      await annotationPage.login();
    } catch (error) {
      console.error('Error in beforeEach:', error);
      throw error;
    }
  });

  test('Types into a textarea and checks autocomplete', async ({ annotationPage, page }) => {
    // await page.waitForTimeout(100000);
    await page.locator('[data-pw="create-standard-annotations-button"]').click();
    for (const annotations of createAnnotationsData.annotations) {
      await annotationPage.visit(createAnnotationsData.modelUrl, createAnnotationsData.modelId);

      for (const annotation of annotations) {
        await selectFromAutocomplete(
          page,
          `[data-pw="form-input-${annotation.target}"]`,
          annotation.input,
          annotation.optionId
        );
      }

      await page.waitForTimeout(1000);
      await page.locator('[data-pw="save-annotation-button"]').click();
    }
  });
});