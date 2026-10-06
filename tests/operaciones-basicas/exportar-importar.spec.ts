import { expect, test } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Exportar tareas e importarlas de nuevo', async ({ page }, testInfo) => {
    // 1. Crear tareas con estados distintos.
    await page.goto('https://todo.uiineed.com/');
    const taskInput = page.getByRole('textbox', { name: 'Add a to-do item...' });
    for (const title of ['Pendiente importada', 'Completada importada']) {
      await taskInput.fill(title);
      await page.getByRole('button', { name: 'Add' }).click();
    }

    const completedTask = page.locator('.todo-item').filter({ hasText: 'Completada importada' });
    await completedTask.locator('.btn-finish').click();
    await expect(completedTask.locator('.todo-content')).toHaveClass(/completed/);

    // 2. Exportar y verificar el archivo descargado.
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Export data' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^todos-\d{8}-\d{6}\.txt$/);
    const exportedFilePath = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(exportedFilePath);

    // 3. Limpiar la lista para comprobar que la importación la restaura.
    await page.getByRole('button', { name: 'Clear All' }).click();
    await expect(page.getByText('Confirm to clear all todo items?')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.locator('.todo-item')).toHaveCount(0);

    // 4. Importar el archivo descargado y validar textos y estados.
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Import(txt/json)' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(exportedFilePath);
    await expect(page.getByText('File imported successfully, data has been appended!')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();

    const pendingTask = page.locator('.todo-item').filter({ hasText: 'Pendiente importada' });
    const importedCompletedTask = page.locator('.todo-item').filter({ hasText: 'Completada importada' });
    await expect(pendingTask).toBeVisible();
    await expect(pendingTask.locator('.todo-content')).not.toHaveClass(/completed/);
    await expect(importedCompletedTask).toBeVisible();
    await expect(importedCompletedTask.locator('.todo-content')).toHaveClass(/completed/);
    await expect(page.locator('.todo-item')).toHaveCount(2);
  });
});
