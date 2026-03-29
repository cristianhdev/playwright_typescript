import { expect } from '@playwright/test';
import { test } from '../fixtures/pages.fixture';



//usuario puede agregar tareas a la lista

test('usuario puede agregar tareas a la lista', async ({ page, webPage }) => {



  await test.step('Cuando el usuario ingresa la tarea', async () => {
    await webPage.addTask('test1');
  });


  await test.step('Entonces la tarea se debe mostrar en la lista', async () => {
    const task = webPage.page.getByRole('listitem').filter({ hasText: 'test1' });
    await expect(task).toBeVisible();
  });

});



test('usuario puede marcar todas las tareas de la lista como completas', async ({ page, webPage }) => {


  await test.step('Cuando el usuario ingresa las tareas', async () => {
    const tasks = ['test1', 'test2', 'test3', 'test4', 'test5'];
    for (const task of tasks) {
      await webPage.fillSearchInput(task);
      await webPage.clickAddButton();
    }
  });

  await test.step('Y la marca la opcion para completar todas las tareas', async () => {
    await webPage.buttonCompleteTask();
  });


  await test.step('Entonces debe visulizar la tarea como marcada', async () => {
    const tasks = page.locator('.todo-item');

    const tasks_complete = tasks.filter({ has:page.locator('.todo-content.completed') });


    await expect(tasks, 'Debe haber exactamente 5 tareas en la lista').toHaveCount(5);
    await expect(tasks_complete, 'Todas las tareas deben estar marcadas como completas').toHaveCount(5);
  
  });

});

test('usuario puede marcar como completado una tarea de la lista', async ({ page, webPage }) => {

  test.slow();

  await test.step('Cuando el usuario ingresa la tarea', async () => {
    await webPage.addTask('test1');
  });

  await test.step('Y la marque como completado', async () => {
    await webPage.buttonCompleteTask();
  });


  await test.step('Entonces debe visulizar la tarea como marcada', async () => {
    const task = page.locator('div.todo-content.completed', {
      hasText: /test1/
    });
    await expect(task).toHaveClass(/completed/);
    await expect(page.getByAltText("Mark as Incomplete")).toHaveClass(/icon-finish/);
  });

});

test('usuario puede eliminar tareas de la lista', async ({ page, webPage }) => {


  await test.step('Dado que el usuario esta en la pagina de todo-list', async () => {
    await expect(page).toHaveTitle(/Todo List Online - Minimalist, No-Login Required Web Todo App/);
  });

  await test.step('Cuando el usuario ingresa la tarea', async () => {

    const tasks = ['test1', 'test2'];
    for (const task of tasks) {
      await webPage.fillSearchInput(task);
      await webPage.clickAddButton();
    }
  });

  await test.step('Y el usuario elimine la tarea "test1"', async () => {
    await webPage.deleteTask('test1');
  });


  await test.step('Entonces la tarea no debe mostrarse en la lista', async () => {
    const task = webPage.page.getByRole('listitem').filter({ hasText: 'test1' });
    await expect(task,"Se espera que la tarea eliminada no este en la lista").not.toBeVisible();
  });

});

