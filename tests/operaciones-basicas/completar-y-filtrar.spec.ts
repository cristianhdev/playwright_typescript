import { test, expect } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Completar, reabrir y filtrar una tarea', async ({ page }) => {
    // 1. Crear una tarea pendiente.
    await page.goto('https://todo.uiineed.com/');
    const taskInput = page.getByRole('textbox', { name: 'Add a to-do item...' });
    await taskInput.fill('Enviar informe');
    await page.getByRole('button', { name: 'Add' }).click();
    const task = page.locator('.todo-item').filter({ hasText: 'Enviar informe' });
    await expect(task).toBeVisible();

    // 2. Completar la tarea con su control individual.
    await task.locator('.btn-finish').click();
    await expect(task.locator('.todo-content')).toHaveClass(/completed/);

    // 3. Agregar una tarea pendiente para poder verificar ambos filtros.
    await taskInput.fill('Otra tarea pendiente');
    await taskInput.press('Enter');
    const pendingTask = page.locator('.todo-item').filter({ hasText: 'Otra tarea pendiente' });
    await expect(pendingTask).toBeVisible();

    // 4. Comprobar el filtro Completed.
    await page.getByRole('button', { name: 'Completed', exact: true }).click();
    await expect(task).toBeVisible();
    await expect(pendingTask).toHaveCount(0);

    // 5. Comprobar el filtro In Progress.
    await page.getByRole('button', { name: 'In Progress' }).click();
    await expect(pendingTask).toBeVisible();
    await expect(task).toHaveCount(0);

    // 6. Reabrir la tarea completada y verificar que vuelve a estar pendiente.
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await task.getByRole('img', { name: 'Mark as Incomplete' }).click();
    await expect(task.locator('.todo-content')).not.toHaveClass(/completed/);
    await expect(task).toBeVisible();
  });
});
