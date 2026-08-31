# Formulario de contacto — FormSubmit

El formulario de `/contacto` envía con [FormSubmit](https://formsubmit.co) en
**modo AJAX** (`fetch` desde el navegador), sin backend ni claves. El usuario
**no sale de la página**: ve el estado de éxito/error dentro de la misma tarjeta.
No hay captcha ni redirección. No hay panel ni registro: la activación es manual
y **debe hacerla el responsable del correo de destino** (Juan).

## Activación (una sola vez)

1. En `src/config/site.ts`, deja temporalmente el correo real como alias:

   ```ts
   export const formSubmitAlias = "servcliente@e-solutionsystems.net";
   ```

2. Abre `/contacto` (sirve en local con `npm run dev`) y **envía el formulario
   una vez**. Eso dispara un correo de confirmación de FormSubmit a esa
   dirección. No requiere dominio público: el envío AJAX funciona desde
   `localhost`.

3. Abre ese correo y pulsa el botón de confirmación. En el mismo mensaje llega
   un **alias aleatorio** (una cadena tipo `a1b2c3d4e5f6`).

4. Reemplaza el correo por ese alias en `src/config/site.ts`:

   ```ts
   export const formSubmitAlias = "a1b2c3d4e5f6";
   ```

   El alias no es secreto (cualquiera lo ve en el HTML), pero **no revela la
   dirección de destino**, así que evita el scraping de spam.

> Mientras no confirmes el correo (paso 3), **no llega ningún envío**. Es el
> error más común con este servicio.

## Campos enviados

`nombre`, `apellido`, `email`, `telefono` (opcional), `empresa` (opcional),
`mensaje`, `autorizacion` (constancia del consentimiento, Ley 1581 de 2012).

Campos de control de FormSubmit: `_subject`, `_template=table`, `_captcha=false`
(sin captcha), `_autoresponse`, `_blacklist`, `_replyto` (= correo del titular),
`_honey` (honeypot). El envío real es por AJAX; no se usa `_next` porque no hay
redirección.

> **Autorespuesta (`_autoresponse`)**: en modo AJAX puede no dispararse (según la
> documentación de FormSubmit solo está garantizada en el POST con redirección).
> Se incluye igualmente; verifica en la prueba real si el prospecto la recibe. Si
> es imprescindible, habría que pasar al modo con redirección.

## Sin JavaScript (respaldo)

El `action` del formulario apunta al endpoint nativo solo como respaldo: si el
JS no carga, el envío se hace por POST nativo (el navegador sí saldría a la
página de FormSubmit). Con JS —el caso normal— el submit se intercepta y se
envía por AJAX sin salir del sitio.

## Seguridad (CSP)

Cuando se añadan cabeceras de seguridad (`public/_headers`, CLAUDE.md §7.1), la
`Content-Security-Policy` debe permitir la conexión a FormSubmit. Como el envío
real es `fetch` (AJAX) y el respaldo es POST nativo, incluye ambas directivas:

```
connect-src 'self' https://formsubmit.co;
form-action 'self' https://formsubmit.co;
```

Sin ellas el navegador **cancela el envío en silencio** y el formulario parece
"no hacer nada".

## Cumplimiento (Ley 1581 de 2012) — TODO cliente

FormSubmit (Devro LABS) es un tercero que procesa datos personales fuera de
Colombia y conserva los envíos ~30 días accesibles por su API. La **Política de
Tratamiento de Datos** debe mencionar la transferencia a este proveedor y, si
detalla plazos de conservación, ese periodo. Revisión legal del cliente antes de
publicar.
