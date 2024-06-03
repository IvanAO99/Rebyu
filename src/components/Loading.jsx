import React from "react";

/**
 * Componente Loading
 *
 * Este componente muestra un indicador de carga animado mientras se cargan los datos.
 * Utiliza una animación de giro para indicar que la página está cargando.
 *
 */
const Loading = () => {
  return (
    <>
      <div>
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-e-transparent align-[-0.125em] text-purple-600 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </>
  );
};

export default Loading;
