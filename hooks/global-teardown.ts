// @ts-ignore: Los tipos de Node están deshabilitados en la configuración actual.
import fs from 'node:fs';

async function globalTeardown() {
    console.log('🧹 Ejecutando limpieza global...');

  /*const downloadPath = new URL('../downloads', import.meta.url);

  if (fs.existsSync(downloadPath)) {
    fs.rmSync(downloadPath, {
      recursive: true,
      force: true,
    });

    console.log('🗑️ Downloads limpiados');
  }*/
}

export default globalTeardown;