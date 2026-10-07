import { expect, test } from '@playwright/test';

test('usuario puede completar el formulario web', async ({ page }) => {
  await page.goto('https://bonigarcia.dev/selenium-webdriver-java/web-form.html');

  await page.getByLabel('Text input').fill('Test1');
  await page.getByLabel('Password').fill('Test2');
  await page.getByLabel('Dropdown (select)').selectOption({ label: 'Two' });

  await expect(page.getByLabel('Text input')).toHaveValue('Test1');
  await expect(page.getByLabel('Password')).toHaveValue('Test2');
  await expect(page.getByLabel('Dropdown (select)')).toHaveValue('2');
});

test('usuario puede cargar y validar un archivo', async ({ page }) => {
  await page.goto('https://bonigarcia.dev/selenium-webdriver-java/web-form.html');

  const fileInput = page.getByLabel('File input');
  const fileContent = 'Contenido de prueba para cargar';
  const fileBuffer = Uint8Array.from(new TextEncoder().encode(fileContent));

  await fileInput.setInputFiles({
    name: 'archivo-prueba.txt',
    mimeType: 'text/plain',
    buffer: fileBuffer,
  });

  const selectedFile = await fileInput.evaluate(async (element) => {
    const file = (element as HTMLInputElement).files?.item(0);
    return file
      ? { name: file.name, type: file.type, content: await file.text() }
      : null;
  });

  expect(selectedFile).toEqual({
    name: 'archivo-prueba.txt',
    type: 'text/plain',
    content: fileContent,
  });
});
