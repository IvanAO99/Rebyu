import React from "react";

import LogInForm from "../components/LogInForm.jsx";

/**
 * Página de Inicio de Sesión
 *
 * Esta página representa la página de inicio de sesión de la aplicación. Muestra un formulario de inicio de sesión
 * donde los usuarios pueden ingresar sus credenciales para iniciar sesión en sus cuentas.
 *
 */

function LogInPage() {
  return (
    <>
      <div>
        <LogInForm />
      </div>
    </>
  );
}

export default LogInPage;
