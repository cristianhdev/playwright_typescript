import { test, expect } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Editar el texto de una tarea', async ({ page }) => {
    // 1. Agregar la tarea que se va a editar.
    await page.goto('https://todo.uiineed.com/');
    await page.getByRole('textbox', { name: 'Add a to-do item...' }).fill('Revisar borrador');
    await page.getByRole('button', { name: 'Add' }).click();

    // 2. Abrir la edición en línea y reemplazar el texto.
    const task = page.locator('.todo-item');
    await task.getByText('Revisar borrador').dblclick();
    const editInput = task.getByRole('textbox');
    await expect(editInput).toHaveValue('Revisar borrador');
    await editInput.fill('Revisar versión final');
    await editInput.press('Enter');

    // 3. Verificar que el nuevo texto reemplazó al anterior.
    await expect(page.getByText('Revisar versión final')).toBeVisible();
    await expect(page.getByText('Revisar borrador')).toHaveCount(0);
  });
});
