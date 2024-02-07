const displayName = document.getElementById("displayName");
const displayId = document.getElementById("displayId");
const pokemonImage = document.getElementById("pokemonImage");
const displayTypes = document.getElementById("displayTypes");
const displayHeight = document.getElementById("displayHeight");
const displayWeight = document.getElementById("displayWeight");
const pokemonValue = document.getElementById("pokemonValue");

let pokemonId = 1;
let isFound = true;
let hasError = 0;

pokedexUpdate(pokemonId);

async function fetchData(id){

    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
    }
    catch(error){ 
        hasError++;
        if(hasError == 1){
             alert("Pokemon not found!");
        }
        isFound = false;
    }

}

async function pokedexUpdate(id){

    const data = await fetchData(id); 
    
    if(isFound){
        let pokemonName = data.name;
        pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        displayName.textContent = pokemonName;

        pokemonId = data.id;

        pokemonImage.src = data.sprites.front_default;
        displayId.textContent = pokemonId;
        displayTypes.textContent = `Types: `; 

        for(let i=0; i<data.types.length; i++){

            if(i != data.types.length-1){
                displayTypes.textContent += data.types[i].type.name + " - ";
            }
            else{
                displayTypes.textContent += data.types[i].type.name;
            }
        }

        displayHeight.textContent = `Height: ${(data.height/10).toFixed(1)}m`;
        displayWeight.textContent = `Weight: ${(data.weight/10).toFixed(1)}kg`;

        animateInfo()
    }
    else{
        isFound = true;
    }

}

function prevPokemon(){
    if(pokemonId != 1){
        pokemonId--;
        pokedexUpdate(pokemonId)
    }
}

function nextPokemon(){
    pokemonId++;
    pokedexUpdate(pokemonId)
}

async function submitInput(){

    hasError = 0;
    pokedexUpdate(pokemonValue.value.toLowerCase());
   
}

function animateInfo(){

    displayName.style.display = "none";
    displayId.style.display = "none";
    pokemonImage.style.display = "none";
    displayTypes.style.display = "none";
    displayHeight.style.display = "none";
    displayWeight.style.display = "none";

    setTimeout(() => {displayName.style.display = "block";
    displayId.style.display = "block";
    pokemonImage.style.display = "block";
    displayTypes.style.display = "block";
    displayHeight.style.display = "block";
    displayWeight.style.display = "block";
    }, 100);
    
}