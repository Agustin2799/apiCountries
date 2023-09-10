document.addEventListener('DOMContentLoaded', () => {
    //Ubicamos los elementos del dom con los que vamos a interactuar
    const contenedor = document.getElementById('contenedor');
    const select = document.getElementById('nombrePais');
    const apiCountries = 'https://restcountries.com/v3.1/all';
    let objJsPaises = '';
//Realizamos la petición a la api de países
    fetch(apiCountries)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de red o solicitud fallida');
            }
            return response.json();//Si Ok es true, convierte la respuesta en json a un objeto js
        })
        .then(data => {
            objJsPaises = data;
            data.forEach(pais => {//Para cada nómbre común de los países en español, lo agregamos al select
                select.innerHTML += `<option>${pais.translations.spa.common}</option>`
            });
        })
        .catch(error => {
            console.error('Error:', error);
        })

    select.addEventListener('change', () => {
        let indicePais;
        //El for busca el indice del objeto padre del país elegido en el select, donde buscará la información relacionada a el.
        for (i = 0; i < objJsPaises.length; i++) {
            if (objJsPaises[i].translations.spa.common === select.value) {
                indicePais = i;
                break; // cuando lo encuentra sale del bucle
            }
        }
        if (select.value === "ninguno") { //Si el select tiene marcada la opción "ninguno" entonces muestra el siguiente texto.
            contenedor.innerHTML = `<div><p> No se ha seleccionado ningún país</p></div>`
        }
        else {//Cuando se selecciona un país muesta el siguiente contenido
            //Se muesta su bandera, el nómbre oficial, los idiomas, la población y el continente
            contenedor.innerHTML =
                `<img src=${objJsPaises[indicePais].flags.png}>
            <div id="datos">
            <p><span>País:</span> ${objJsPaises[indicePais].translations.spa.common}</p>
            <p><span>Nombre oficial:</span> ${objJsPaises[indicePais].translations.spa.official}</p>
            <p><span>Lenguas:</span>  ${Object.values(objJsPaises[indicePais].languages).join(', ')}</p>
            <p><span>Población:</span> ${Number(objJsPaises[indicePais].population).toLocaleString()}</p>
            <p><span>Continente:</span> ${objJsPaises[indicePais].continents}</p></div>`
        }
    })

})