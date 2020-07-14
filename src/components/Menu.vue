<template>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/Game">Game</router-link> |
		<router-link to="/History">History</router-link>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Menu extends Vue {}
</script>

<style lang="scss" scoped>
#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
