fetch('/datos.json')
  .then(respuesta => respuesta.json())
  .then(data => {
    const claves = Object.keys(data);

    if (claves.length > 0) {
      claves.forEach(clave => {
        const valor = data[clave];
        PROCESAR_JSON(clave, valor);
      });
    } else {
      console.log('No hay claves');
    }
  })
  .catch(e => {
    console.log('Error al importar datos', e);
  });

const PROCESAR_JSON = (clave, valor) => {
  switch (clave) {
    case 'header':
      valor.forEach((item, index) => {
        if (index === 0) {
          const Titulo = document.querySelector('.manosalaobrart');
          if (Titulo && item.titulo) {
            Titulo.innerHTML = item.titulo;
            if (item.id) Titulo.id = item.id;
          }
        } else if (index === 1) {
          const box_logotipo = document.querySelector('.box_logotipo');
          if (box_logotipo) {
            const logo = document.createElement('img');
            logo.src = item.url || '';
            logo.className = item.clase || '';
            logo.id = item.id || '';
            logo.alt = item.alt || '';
            box_logotipo.appendChild(logo);
          }
        }
      });
      break;

    case 'body':
      valor.forEach(item => {
        const contenedor = document.querySelector('.contenido');
        if (contenedor && item.titulo) {
          const titulo = document.createElement('h2');
          titulo.textContent = item.titulo;
          contenedor.appendChild(titulo);
        }
      });
      break;

    default:
      console.log('Clave no reconocida:', clave);
  }
};

