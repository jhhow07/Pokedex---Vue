<template>
    <div class="main_container">
        <div class="pokemon_box">
            <img class="pokeImg" :src="splitUrl(pokemonUrl)" alt="">
            <span class="defaultFont">{{ pokemonName }}</span>
        </div>
        <div class="evolutionCards" v-for="evolution in evolution.evolves_to" :key="pokemonId">
            <div class="pokemon_box">
                <img class="pokeImg" :src="splitUrl(evolution.species.url)" alt="">
                <span class="defaultFont">{{ evolution.species.name }}</span>
            </div>
            <div class="pokemon_box" v-for="evo in evolution.evolves_to" :key="evo.species.name">
                <img class="pokeImg" :src="splitUrl(evo.species.url)" alt="">
                <span class="defaultFont">{{ evo.species.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { computed } from '@vue/runtime-core';

export default {
    data() {
        return {
            pokemonId: 0,
            pokemonName: '',
            pokemonUrl: '',
            evolution: {}
        }
    },
    created() {

    },
    mounted() {
        this.pokemonId = this.$route.params.id;
        this.getEvolutionChain();
        // this.splitUrl();
    },
    methods: {
        async getEvolutionChain() {
            const res = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${this.pokemonId}/`);
            // return this.evolution = res.data.chain;
            this.evolution = res.data.chain;
            this.pokemonName = this.evolution.species.name;
            this.pokemonUrl = this.evolution.species.url;
            return this.evolution;
        },
        getImg(id) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        },
        splitUrl(url) {
            const parts = url.split('/');
            const finalValue = parts[parts.length - 2];
            console.log(finalValue);
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${finalValue}.png`
        }
    },
}
</script>

<style scoped>
.main_container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
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

.evolutionCards {
    display: flex;
}

.pokeImg {
    width: 180px;
}

.defaultFont {
    color: white;
    text-shadow: 1px 3px 5px #000000ba;
    font-size: 20px;
    font-weight: normal;
    text-transform: capitalize;
}
</style>