const d = document;
const $main = d.querySelector("main");
const $links = d.querySelector("#links");
const $spinerDiv = d.querySelector("#spiner")


/*const pintarPokemons = (url)=> {
    
    if(url){
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            for(let i of data.results){                
                fetch(i.url)
                .then(pokemon => pokemon.json())
                .then(pokemon =>{    
                        $main.innerHTML += 
                            `
                            <div class = "card">
                                <img src="${pokemon.sprites.front_default}" alt="imagen de pokemon">
                                <p>${pokemon.name}</p>
                            </div>                    
                            `     
                    });                                 
            }

            //boton hacia atras
            $links.innerHTML = (data.previous) ? `<button onclick="pintarPokemons('${data.previous}')">Atrás</button>` : "";
            //Botón hacia adelante
            $links.innerHTML = (data.next) ? `<button onclick="pintarPokemons('${data.next}')">Siguiente</button>` : "";


        }); 
    }
}

pintarPokemons("https://pokeapi.co/api/v2/pokemon");*/

function updatePokemons(url) {
    
    $spinerDiv.innerHTML = `<img src="/assets/three-dots.svg" alt="Cargando..." >`;

    if (url) {
      $main.innerHTML = "";
      // Llamamos a la API de pokemon con Fetch
      fetch(url)
        .then(res => res.json())
        .then(res => {
          
          // Obtenemos y recorremos a los primeros 20 pokemones obtenidos
          for (let i of res.results) {
  
            // Realizamos otra solicitud Fetch con la URL especifica del pokemon actual recorrido, para obtener datos mas especficos como la imagen
            fetch(i.url)
              .then(x => x.json())
              .then(x => {

                $spinerDiv.innerHTML = "";
                // Vamos pintando o ingresando la imagen y nombre del pokemon actual que se esta evaluando 
                $main.innerHTML += `<div class="card">
                                                    <img src="${x.sprites.front_default}" alt="">
                                                    <p>${x.name}</p>
                                                </div>`;
              });
          };
          // Pintamos los enlaces de siguiente o anterior de la paginacion de los pokemones 
          //Boton hacia atrás
          $links.innerHTML = (res.previous) ? `<button onclick="updatePokemons('${res.previous}')"><span>Atrás</span></button>` : "";
          //Botón hacia adelante
          $links.innerHTML += (res.next) ? `<button onclick="updatePokemons('${res.next}')"><span>Siguiente</span></button>` : "";
  
        });
    }
  
  }
  
  updatePokemons("https://pokeapi.co/api/v2/pokemon");








