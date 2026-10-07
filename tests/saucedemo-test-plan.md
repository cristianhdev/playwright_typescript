# Plan de pruebas base - SauceDemo

## Application Overview

Validación funcional del flujo de compra estándar de SauceDemo: autenticación con standard_user, selección del Sauce Labs Backpack, checkout y confirmación del pedido. Incluye un caso negativo de validación de campos obligatorios. En la revisión exploratoria, el flujo feliz se completó y el formulario rechazó correctamente datos de checkout vacíos. Se observaron errores 401 de envío de telemetría a events.backtrace.io en consola; no bloquearon la navegación ni la compra.

## Test Scenarios

### 1. Compra estándar y validaciones de checkout

**Seed:** `tests\seed.spec.ts`

#### 1.1. Completar compra estándar desde login hasta confirmación

**File:** `tests\saucedemo\purchase-happy-path.spec.ts`

**Steps:**
  1. Iniciar el caso desde una sesión nueva, sin productos en el carrito, en https://www.saucedemo.com/.
    - expect: Se muestra la página Swag Labs con los campos Username y Password y el botón Login.
  2. Ingresar standard_user como Username y secret_sauce como Password; seleccionar Login.
    - expect: Se autentica correctamente y se abre la página Products en /inventory.html.
  3. Localizar Sauce Labs Backpack y seleccionar Add to cart.
    - expect: El botón del producto cambia a Remove o equivalente y el contador del carrito indica 1.
  4. Abrir el carrito.
    - expect: La página Your Cart contiene exactamente una unidad de Sauce Labs Backpack a $29.99.
  5. Seleccionar Checkout.
    - expect: Se muestra Checkout: Your Information con campos First Name, Last Name y Zip/Postal Code.
  6. Ingresar Ana en First Name, Tester en Last Name y 10001 en Zip/Postal Code; seleccionar Continue.
    - expect: Se avanza a Checkout: Overview y el resumen conserva Sauce Labs Backpack, cantidad 1, pago SauceCard #31337 y envío Free Pony Express Delivery!.
    - expect: Los importes muestran subtotal de $29.99, impuesto de $2.40 y total de $32.39.
  7. Seleccionar Finish.
    - expect: Se muestra Checkout: Complete! con el mensaje Thank you for your order! y el carrito queda vacío.

#### 1.2. Impedir continuar con información de checkout vacía

**File:** `tests\saucedemo\checkout-required-fields.spec.ts`

**Steps:**
  1. Iniciar desde una sesión nueva sin artículos en el carrito; iniciar sesión con standard_user / secret_sauce.
    - expect: Se muestra Products en /inventory.html.
  2. Agregar Sauce Labs Backpack, abrir el carrito y seleccionar Checkout.
    - expect: Se abre Checkout: Your Information con los campos de información de cliente vacíos.
  3. Sin completar First Name, Last Name ni Zip/Postal Code, seleccionar Continue.
    - expect: No se avanza de /checkout-step-one.html.
    - expect: Se muestra una alerta con el texto Error: First Name is required.
