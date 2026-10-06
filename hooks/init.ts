import {test} from '../fixtures/pages.fixture';

export class Hooks {

   static init() {
    test.beforeEach(async ({page,utils}) => {
       console.log('🔵 [HOOK] beforeEach ejecutado');
       //await utils.takeScreenshot(page, `page_capture_beforeEach_${Date.now()}`);
    });

    test.afterEach(async ({page,utils}) => {
        console.log('🔵 [HOOK] afterEach ejecutado');
        //await utils.takeScreenshot(page, `page_capture_afterEach_${Date.now()}`);
    });

    test.beforeAll(async () => {
        console.log('🔵 [HOOK] beforeAll ejecutado');
    });

    test.afterAll(async () => {
      console.log('🔵 [HOOK] afterAll ejecutado');
    });
  } 
}