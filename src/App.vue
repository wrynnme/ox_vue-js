<template>
	<div id="app">
		<Menu />
		<router-view />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// @ is an alias to /src
import Menu from '@/components/Menu.vue';

Vue.prototype.$score = [];
@Component({
	components: {
		Menu,
	},
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
