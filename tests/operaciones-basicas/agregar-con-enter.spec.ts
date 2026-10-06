import { test, expect } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Agregar una tarea con la tecla Enter', async ({ page }) => {
    // 1. Abrir la aplicación con una lista vacía.
    await page.goto('https://todo.uiineed.com/');

    // 2. Crear «Llamar al dentista» usando Enter y verificar el resultado.
    const taskInput = page.getByRole('textbox', { name: 'Add a to-do item...' });
    await taskInput.fill('Llamar al dentista');
    await taskInput.press('Enter');
    await expect(page.locator('.todo-item')).toHaveCount(1);
    await expect(page.locator('.todo-content')).toHaveText('Llamar al dentista');
    await expect(taskInput).toHaveValue('');
    await expect(page.locator('.todo-content')).not.toHaveClass(/completed/);
  });
});
