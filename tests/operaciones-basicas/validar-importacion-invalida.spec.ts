import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';

test.describe('Operaciones básicas de tareas', () => {
  test('Rechazar un archivo de importación inválido', async ({ page }) => {
    // 1. Crear una tarea que debe permanecer tras la importación inválida.
    await page.goto('https://todo.uiineed.com/');
    await page.getByRole('textbox', { name: 'Add a to-do item...' }).fill('No perder');
    await page.getByRole('button', { name: 'Add' }).click();

    // 2. Seleccionar un archivo con formato no admitido y comprobar el error.
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Import(txt/json)' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(resolve(__dirname, '../../README.md'));
    await expect(page.getByText(/File parsing error/)).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();

    // 3. Verificar que la tarea original sigue siendo el único elemento.
    await expect(page.locator('.todo-item')).toHaveCount(1);
    await expect(page.getByText('No perder')).toBeVisible();
  });
});
