<template>
    <div class="main_container">
        <div @click="detailPage(index + 1)" v-for="(pokemon, index) in pokemonList" :key="index" class="pokemon_box">
            <router-link :to="'/pokemonDetail' + (index + 1)">
                <img class="pokemonImg" :src="getImg(index + 1)" alt="">
                <p class="pokemonName">{{ pokemon.name }}</p>
                <!-- <ul>
                    <li v-for="type in pokemonInfo" :key="type.type.name">
                        {{ type.id }}
                    </li>
                </ul> -->
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router';
import pokemonDetail from './PokemonDetail.vue'

export default {
    name: 'Home',
    data() {
        return {
            pokemonList: []
        }
    },
    methods: {
        async getPokemons() {
            try {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0');
                return res.data.results;
            } catch (error) {
                console.error(error);
            }
        },
        getImg(id) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        },
        detailPage(id) {
            
        }
    },
    async mounted() {
        this.pokemonList = await this.getPokemons();
    },
}
</script>

<style scoped>
.main_container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 90%;
    margin: auto;
    border-radius: 10px;
    padding: 3%;
}
.pokemon_box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #3269c5;
    width: 150px;
    margin: 1.5%;
    border-radius: 15px;
    box-shadow: 0px 2px 3px 2px #00000052;
}
.pokemonName {
    color: white;
    text-shadow: 1px 3px 5px #000000ba;
    font-size: 20px;
    font-weight: normal;
    text-transform: capitalize;
}
.pokemonImg {
    background-color: #03030414;
    border-radius: 7%;
    margin-top: 6%;
    width: 91%;
}

a {
    text-decoration: none !important;
}

</style>