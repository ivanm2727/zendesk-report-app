import {axios as http} from "./axios"

export const getPokemonByName = async (name:string)=>{
    const URL=`https://pokeapi.co/api/v2/pokemon/${name}/`;
    const response = await http.get(URL);
    return response
}
