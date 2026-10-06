import { test, expect } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Completar todas las tareas con confirmación', async ({ page }) => {
    // 1. Crear dos tareas pendientes.
    await page.goto('https://todo.uiineed.com/');
    const taskInput = page.getByRole('textbox', { name: 'Add a to-do item...' });
    for (const title of ['Comprar pan', 'Pagar factura']) {
      await taskInput.fill(title);
      await page.getByRole('button', { name: 'Add' }).click();
    }
    const taskItems = page.locator('.todo-item');
    await expect(taskItems).toHaveCount(2);

    // 2. Iniciar la acción masiva y confirmar en el diálogo.
    await page.getByRole('button', { name: 'Mark All Done' }).click();
    await expect(page.getByText('Confirm to mark all as completed?')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();

    // 3. Verificar que ambas tareas están en la vista Completed.
    await page.getByRole('button', { name: 'Completed', exact: true }).click();
    await expect(taskItems).toHaveCount(2);
    await expect(page.locator('.todo-content.completed')).toHaveCount(2);
    await expect(page.getByText('Comprar pan')).toBeVisible();
    await expect(page.getByText('Pagar factura')).toBeVisible();
  });
});
