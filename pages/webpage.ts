import { Locator, Page } from "@playwright/test";

export class WebPage {
    readonly page: Page;
    readonly inputText: Locator;
    readonly buttonAdd: Locator;
    readonly buttonComplete: Locator;
    readonly buttonOk: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inputText = page.getByPlaceholder("Add a to-do item...");
        this.buttonAdd = page.getByRole('button', { name: /Add/});
        this.buttonComplete = page.getByText('Mark All Done');       
        this.buttonOk = page.getByRole('button', { name: 'OK' })      
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    async clickAddButton() {
        await this.buttonAdd.click();
    }

    async fillSearchInput(text: string) {
        await this.inputText.fill('');  
        await this.inputText.fill(text);
    }

    async addTask(task: string) {
        await this.fillSearchInput(task);
        await this.clickAddButton();
    }

    async buttonCompleteTask() {
       await  this.buttonComplete.click();
        await this.buttonOk.click();
    }

    async deleteTask(task: string) {
        const taskLocator = this.page.getByRole('listitem').filter({ hasText: task });
        const deleteButton = taskLocator.getByAltText(/Delete/);
        await deleteButton.click();
    }

}