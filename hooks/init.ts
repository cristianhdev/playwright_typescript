import { test } from '../fixtures/pages.fixture';

export class Hooks {

  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }


  static init() {

    test.beforeEach(async ({ browser, browserName, utils }, testInfo) => {

      console.log(`🧪 Ejecutando test: ${this.capitalize(testInfo.title)}` );

      let formattedDate = await utils.getFormattedDate();
      let browserVersion = browser.version();
     
      let title = testInfo.title;
      let status = testInfo.status;

      testInfo.annotations.push(
        {
          type: 'Navegador',
          description: this.capitalize(browserName),
        },
        {
          type: 'Verión del navegador',
          description: browserVersion,
        },
        {
          type: 'Fecha y Hora de Ejecución',
          description: `${formattedDate}`,
        },
        {
          type: 'Test descripción',
          description: this.capitalize(title),
        },
        {
          type: 'Status del test',
          description: this.capitalize(status?.toString() || 'Unknown'),
        },
        {
          type: 'Ruta del test',
          description: testInfo.file,
        }
      );
    });

    test.afterEach(async ({ },testInfo) => {

      let status = testInfo.status == "passed" ? "✅ Passed" : testInfo.status == "failed" ? "❌ Failed" : testInfo.status== "skipped" ? "Omitido" : "Desconocido";
      console.log(`🧪 Status test: ${status}` );
    });

    test.beforeAll(async () => {

    });

    test.afterAll(async ({page}) => {
      page.close();
    });
  }
}