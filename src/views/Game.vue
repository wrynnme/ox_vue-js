<template>
	<div id="app">
		<h1 @click="select(1)">
			Turn is <font color="red">{{ turn }}</font>
		</h1>
		<div class="game">
			<div
				class="slot"
				:turn="turn"
				v-bind:class="[{ disabled: slot.value === 0 }]"
				v-for="(slot, index) in slots"
				:key="slot.id"
				:index="index"
				@click="select(slot.id)"
			>
				{{ slot.value }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Swal from "sweetalert2";

@Component
export default class Game extends Vue {
	private slots: any[] = [];
	private turn: string = "X";

	public created() {
		this.settingBoard();
	}

	private checkScore(slots: any[]) {
		return slots === null;
	}

	private async saveScore(slots: any[], who: string) {
		return new Promise((resolve, reject) => {
			let name: string;
			let score = 0;
			Swal.mixin({
				input: "text",
				confirmButtonText: "Next &rarr;",
				showCancelButton: true
			})
				.queue([
					{
						title: "Your Name",
						text: "Who win this game"
					}
				])
				.then((result: any) => {
					if (result.value) {
						// name = JSON.stringify(result.value);
						name = result.value[0];

						Swal.fire({
							title: "All done!",
							html: `Your name:<pre><code>${name}</code></pre>`,
							confirmButtonText: "Lovely!"
						}).then(() => {
							// console.log(name);
							const array: any[] = [score, name, who.toUpperCase(), slots];
							// this.score.push(array);
							Vue.prototype.$score.push(array);
						});
					}
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.settingBoard();
					this.turn = "X";
				});
			for (let index = 0; index < slots.length; index++) {
				const element = slots[index];
				element.value === null ? score++ : null;
			}
		});
	}

	private async wincase(who: string) {
		const wintext = who.toUpperCase() + ` Win this game`;
		let win: number = 0;

		/**
		 * ! Row win case
		 */

		if (
			this.slots[0].value === who &&
			this.slots[1].value === who &&
			this.slots[2].value === who &&
			this.slots[3].value === who
		) {
			win = 1;
		}
		if (
			this.slots[4].value === who &&
			this.slots[5].value === who &&
			this.slots[6].value === who &&
			this.slots[7].value === who
		) {
			win = 1;
		}
		if (
			this.slots[8].value === who &&
			this.slots[9].value === who &&
			this.slots[10].value === who &&
			this.slots[11].value === who
		) {
			win = 1;
		}
		if (
			this.slots[12].value === who &&
			this.slots[13].value === who &&
			this.slots[14].value === who &&
			this.slots[15].value === who
		) {
			win = 1;
		}

		/**
		 * !Column win case
		 */

		if (
			this.slots[0].value === who &&
			this.slots[4].value === who &&
			this.slots[8].value === who &&
			this.slots[12].value === who
		) {
			win = 1;
		}
		if (
			this.slots[1].value === who &&
			this.slots[5].value === who &&
			this.slots[9].value === who &&
			this.slots[13].value === who
		) {
			win = 1;
		}
		if (
			this.slots[2].value === who &&
			this.slots[6].value === who &&
			this.slots[10].value === who &&
			this.slots[14].value === who
		) {
			win = 1;
		}
		if (
			this.slots[3].value === who &&
			this.slots[7].value === who &&
			this.slots[11].value === who &&
			this.slots[15].value === who
		) {
			win = 1;
		}

		/**
		 * ! Crosswise win case
		 */

		if (
			this.slots[0].value === who &&
			this.slots[5].value === who &&
			this.slots[10].value === who &&
			this.slots[15].value === who
		) {
			win = 1;
		}
		if (
			this.slots[3].value === who &&
			this.slots[6].value === who &&
			this.slots[9].value === who &&
			this.slots[12].value === who
		) {
			win = 1;
		}
		/**
		 * ! Nerver win
		 */

		if (
			this.slots[0].value !== null &&
			this.slots[1].value !== null &&
			this.slots[2].value !== null &&
			this.slots[3].value !== null &&
			this.slots[4].value !== null &&
			this.slots[5].value !== null &&
			this.slots[6].value !== null &&
			this.slots[7].value !== null &&
			this.slots[8].value !== null &&
			this.slots[9].value !== null &&
			this.slots[10].value !== null &&
			this.slots[11].value !== null &&
			this.slots[12].value !== null &&
			this.slots[13].value !== null &&
			this.slots[14].value !== null &&
			this.slots[15].value !== null &&
			win === 0
		) {
			Swal.fire("Game Over!");
			this.settingBoard();
		}

		if (win === 1) {
			Swal.fire(wintext, "", "success");
			await this.saveScore(this.slots, who);
		}
	}
	private select(slot: number): void {
		if (this.turn === "X") {
			if (this.slots[slot].value === null) {
				this.slots[slot].value = "X";
				this.wincase("X");
				this.turn = "O";
			}
		} else {
			if (this.slots[slot].value === null) {
				this.slots[slot].value = "O";
				this.wincase("O");
				this.turn = "X";
			}
		}
	}
	private settingBoard(): void {
		const random = (Math.random() * Math.floor(15)).toFixed(0);
		this.slots = [
			{ id: 0, value: null },
			{ id: 1, value: null },
			{ id: 2, value: null },
			{ id: 3, value: null },
			{ id: 4, value: null },
			{ id: 5, value: null },
			{ id: 6, value: null },
			{ id: 7, value: null },
			{ id: 8, value: null },
			{ id: 9, value: null },
			{ id: 10, value: null },
			{ id: 11, value: null },
			{ id: 12, value: null },
			{ id: 13, value: null },
			{ id: 14, value: null },
			{ id: 15, value: null }
		];
		this.slots[+random].value = 0;
	}
}
</script>

<style lang="scss">
h1 {
	text-transform: uppercase;
}
#app {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.game {
	user-select: none !important;

	display: grid;
	grid-template-columns: auto auto auto auto;
}
.slot {
	display: flex;
	width: 100px;
	height: 100px;
	align-items: center;
	justify-content: center;
	font-size: 3rem;
	font-weight: bold;
	transition: background 0.2s ease-in-out;
	border-bottom: 1px #000 solid;

	&.disabled {
		user-select: none !important;
		cursor: not-allowed !important;
		background: #000 !important;
		color: #000 !important;
	}
}

[turn="X"] {
	&:hover {
		cursor: pointer;
		background: #ff000055;
	}
}

[turn="O"] {
	&:hover {
		cursor: pointer;
		background: #0000ff55;
	}
}

@for $var from 12 through 15 {
	[index="#{$var}"] {
		border-bottom: none;
	}
}
@for $var from 0 through 2 {
	[index="#{$var}"] {
		border-right: 1px #000 solid;
	}
}
@for $var from 4 through 6 {
	[index="#{$var}"] {
		border-right: 1px #000 solid;
	}
}
@for $var from 8 through 10 {
	[index="#{$var}"] {
		border-right: 1px #000 solid;
	}
}
@for $var from 12 through 14 {
	[index="#{$var}"] {
		border-right: 1px #000 solid;
	}
}
</style>
