import type { Page } from '@playwright/test';

export class Utils {

    async getFormattedDate() {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

     async takeScreenshot(page: Page, fileName: string) {
        await page.screenshot({ path: `screenshots/${fileName}.png`, fullPage: true });
    }

     async generatePDF(page: Page, fileName: string) {
        // Generación del documento PDF con opciones de formato
        await page.pdf({
            path: `screenshots/${fileName}.pdf`,
            format: 'A4',
            printBackground: true, // Incluye fondos y colores CSS
            landscape: true, // <-- Configura la orientación a Horizontal (Landscape)
            margin: {
                top: '20mm',
                bottom: '20mm',
                left: '15mm',
                right: '15mm',
            },
            displayHeaderFooter: true,
            headerTemplate: '<span style="font-size:10px; margin-left: 20px;">Documento generado con - Playwright - Testing</span>',
            footerTemplate: '<span style="font-size:10px; margin-left: 20px;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>',
        });
    }
}
