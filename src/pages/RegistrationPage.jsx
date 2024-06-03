import React from "react";

import RegistrationForm from "../components/RegistrationForm.jsx";

/**
 * Página de Registro
 *
 * Esta página proporciona un formulario de registro para que los usuarios puedan crear una nueva cuenta en la plataforma.
 * El formulario incluye campos para el nombre de usuario, correo electrónico y contraseña.
 *
 */
function RegistrationPage() {
  return (
    <>
      <div>
        <RegistrationForm />
      </div>
    </>
  );
}

export default RegistrationPage;
