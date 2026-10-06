import { test, expect } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Agregar tarea con el botón Add', async ({ page }) => {
    // 1. Abrir la aplicación y verificar los controles para crear una tarea.
    await page.goto('https://todo.uiineed.com/');
    const taskInput = page.getByRole('textbox', { name: 'Add a to-do item...' });
    await expect(taskInput).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();

    // 2. Agregar «Comprar leche» y comprobar la tarea, el campo y el contador.
    await taskInput.fill('Comprar leche');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Comprar leche')).toBeVisible();
    await expect(taskInput).toHaveValue('');
    await expect(page.getByText('1 items remaining')).toBeVisible();
  });
});
