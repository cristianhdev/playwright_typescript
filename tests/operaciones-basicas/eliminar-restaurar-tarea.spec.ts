import { test, expect } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Mover una tarea a la papelera y restaurarla', async ({ page }) => {
    // 1. Crear una tarea para eliminar y restaurar.
    await page.goto('https://todo.uiineed.com/');
    await page.getByRole('textbox', { name: 'Add a to-do item...' }).fill('Reservar cita');
    await page.getByRole('button', { name: 'Add' }).click();
    const task = page.locator('.todo-item').filter({ hasText: 'Reservar cita' });
    await expect(task).toBeVisible();

    // 2. Eliminar la tarea y comprobar que está en la papelera.
    await task.getByRole('img', { name: 'Delete' }).click();
    await expect(task).toHaveCount(0);
    await page.getByRole('button', { name: 'Trash' }).click();
    const trashedTask = page.locator('.todo-item').filter({ hasText: 'Reservar cita' });
    await expect(trashedTask).toBeVisible();

    // 3. Restaurar la tarea y verificarla en la vista All.
    await trashedTask.getByRole('img', { name: 'Restore' }).click();
    await expect(trashedTask).toHaveCount(0);
    await page.getByRole('button', { name: 'All', exact: true }).click();
    const restoredTask = page.locator('.todo-item').filter({ hasText: 'Reservar cita' });
    await expect(restoredTask).toBeVisible();
    await expect(restoredTask.locator('.todo-content')).not.toHaveClass(/completed/);
  });
});
