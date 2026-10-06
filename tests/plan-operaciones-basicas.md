# Plan de pruebas: operaciones básicas

## Application Overview

Plan funcional para https://todo.uiineed.com/. Cubre administración básica de tareas, validaciones, estados y filtros, eliminación/restauración, persistencia e intercambio de datos. Ejecutar cada caso de forma independiente con almacenamiento local limpio y una lista vacía; para escenarios de importación, preparar los archivos indicados por el caso.

## Test Scenarios

### 1. Operaciones básicas de tareas

**Seed:** `tests/seed.spec.ts`

#### 1.1. Agregar tarea con el botón Add

**File:** `tests/operaciones-basicas/agregar-tarea.spec.ts`

**Steps:**
  1. Abrir https://todo.uiineed.com/ en un contexto de navegador limpio.
    - expect: La página muestra el campo «Add a to-do item...» y el botón «Add».
    - expect: La lista no contiene tareas previas.
  2. Escribir «Comprar leche» en el campo y pulsar «Add».
    - expect: «Comprar leche» aparece una sola vez en la lista.
    - expect: El campo de entrada queda vacío.
    - expect: El contador indica una tarea pendiente.

#### 1.2. Rechazar el alta de una tarea vacía

**File:** `tests/operaciones-basicas/validar-tarea-vacia.spec.ts`

**Steps:**
  1. Abrir la aplicación con una lista vacía y dejar el campo de tarea sin contenido.
    - expect: No hay tareas en la lista.
  2. Pulsar «Add».
    - expect: Se muestra el aviso de que debe introducirse contenido.
    - expect: No se agrega ninguna tarea ni cambia el contador.

#### 1.3. Agregar una tarea con la tecla Enter

**File:** `tests/operaciones-basicas/agregar-con-enter.spec.ts`

**Steps:**
  1. Abrir la aplicación con una lista vacía, escribir «Llamar al dentista» en el campo de tarea y pulsar Enter.
    - expect: La tarea aparece una sola vez en la lista.
    - expect: El campo se limpia y la tarea queda pendiente.

#### 1.4. Completar, reabrir y filtrar una tarea

**File:** `tests/operaciones-basicas/completar-y-filtrar.spec.ts`

**Steps:**
  1. Crear una tarea pendiente llamada «Enviar informe».
    - expect: La tarea aparece en la vista «In Progress».
  2. Usar el control de finalización de esa tarea.
    - expect: La tarea se marca como completada y deja de contar como pendiente.
    - expect: La vista «Completed» permite encontrarla y la vista «In Progress» no la muestra.
  3. Usar el control «Mark as Incomplete» de la tarea.
    - expect: La tarea vuelve a estado pendiente y aparece nuevamente en «In Progress».

#### 1.5. Editar el texto de una tarea

**File:** `tests/operaciones-basicas/editar-tarea.spec.ts`

**Steps:**
  1. Crear una tarea llamada «Revisar borrador» y hacer doble clic sobre su texto.
    - expect: El texto de la tarea se convierte en un campo editable con el valor actual.
  2. Reemplazar el texto por «Revisar versión final» y guardar con Enter.
    - expect: La lista muestra el texto actualizado.
    - expect: El texto anterior ya no aparece como tarea.

#### 1.6. Mover una tarea a la papelera y restaurarla

**File:** `tests/operaciones-basicas/eliminar-restaurar-tarea.spec.ts`

**Steps:**
  1. Crear una tarea llamada «Reservar cita» y pulsar su control «Delete».
    - expect: La tarea desaparece de la vista principal.
    - expect: Aparece la vista «Trash» en los filtros.
  2. Abrir «Trash» y restaurar «Reservar cita» con el control «Restore».
    - expect: La tarea ya no aparece en «Trash».
    - expect: La tarea restaurada vuelve a estar disponible en la vista principal y conserva su estado anterior.

#### 1.7. Completar todas las tareas con confirmación

**File:** `tests/operaciones-basicas/completar-todas.spec.ts`

**Steps:**
  1. Crear dos tareas pendientes con nombres distintos y pulsar «Mark All Done».
    - expect: Se muestra el diálogo de confirmación para completar todas las tareas.
  2. Pulsar «OK» en el diálogo.
    - expect: Ambas tareas quedan completadas.
    - expect: La vista «Completed» contiene las dos tareas y no quedan tareas pendientes.

#### 1.8. Cancelar y confirmar la limpieza de la lista

**File:** `tests/operaciones-basicas/limpiar-lista.spec.ts`

**Steps:**
  1. Crear dos tareas y pulsar «Clear All».
    - expect: Se muestra un diálogo que pregunta si se deben limpiar todas las tareas.
  2. Pulsar «Cancel».
    - expect: El diálogo se cierra y ambas tareas permanecen en la lista.
  3. Pulsar «Clear All» otra vez y confirmar con «OK».
    - expect: El diálogo se cierra y la lista queda vacía.

#### 1.9. Exportar tareas e importarlas de nuevo

**File:** `tests/operaciones-basicas/exportar-importar.spec.ts`

**Steps:**
  1. Crear dos tareas, dejando una pendiente y completando la otra. Pulsar «Export data» y esperar la descarga.
    - expect: Se descarga un archivo de texto con nombre similar a «todos-<fecha>.txt».
    - expect: El archivo no está vacío e incluye los registros y estados de las tareas exportadas.
  2. Limpiar la lista confirmando el diálogo «Clear All». Pulsar «Import(txt/json)» y seleccionar el archivo descargado.
    - expect: La importación restablece las dos tareas.
    - expect: Los textos y estados pendiente/completada coinciden con los datos exportados.

#### 1.10. Rechazar un archivo de importación inválido

**File:** `tests/operaciones-basicas/rechazar-importacion-invalida.spec.ts`

**Steps:**
  1. Preparar un archivo de importación JSON malformado y crear en la aplicación la tarea «No perder». Pulsar «Import(txt/json)» y seleccionar el archivo inválido.
    - expect: La aplicación informa que el archivo no se pudo importar o que su formato no es válido.
    - expect: La tarea «No perder» permanece intacta y no se agregan registros parciales.

#### 1.11. Conservar tareas al recargar la página

**File:** `tests/operaciones-basicas/persistencia-recarga.spec.ts`

**Steps:**
  1. Crear una tarea «Persistir localmente» y recargar la página.
    - expect: La tarea sigue presente después de la recarga.
    - expect: El texto y el estado de la tarea se conservan.
