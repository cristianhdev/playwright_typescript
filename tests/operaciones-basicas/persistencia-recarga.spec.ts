import { test, expect } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Conservar tareas al recargar la página', async ({ page }) => {
    // 1. Crear una tarea y recargar la página.
    await page.goto('https://todo.uiineed.com/');
    const taskInput = page.getByRole('textbox', { name: 'Add a to-do item...' });
    await taskInput.fill('Persistir localmente');
    await page.getByRole('button', { name: 'Add' }).click();
    await page.goto('https://todo.uiineed.com/');

    // 2. Verificar que la tarea persiste con su texto y estado pendiente.
    const task = page.locator('.todo-item').filter({ hasText: 'Persistir localmente' });
    await expect(task).toBeVisible();
    await expect(task.locator('.todo-content')).not.toHaveClass(/completed/);
    await expect(page.getByText('1 items remaining')).toBeVisible();
  });
});
