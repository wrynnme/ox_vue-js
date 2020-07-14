<template>
	<div id="his">
		<div class="score" v-for="(score, index) in sort_score" :key="index">
			<div class="text">
				<h2><b>NAME :</b> {{ score[1] }}</h2>
				<h3><b>SCORE:</b> {{ score[0] }}</h3>
				<h4><b>PLAY AS :</b> {{ score[2] }}</h4>
			</div>
			<div class="game">
				<div
					class="slot"
					v-bind:class="[{ disabled: slot.value === 0 }]"
					v-for="(slot, index) in score[3]"
					:key="slot.id"
					:index="index"
					:data="slot.value"
				>
					{{ slot.value }}
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class History extends Vue {
	private scores = Vue.prototype.$score;
	private sort_score: any[] = [];
	public created() {
		this.sort_score = this.scores;
	}
}
</script>

<style lang="scss" scoped>
#his {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.text {
	word-wrap: break-word;
}
.score {
	margin: 2em;
	border: 1px #000 solid;
}
.game {
	margin: 1em;
}
</style>
