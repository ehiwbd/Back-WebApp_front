<script>
import { onMounted } from 'vue'
let k = 0
export default {
	name: 'PopUpReq',
	data() {
		return {
			characterName: '',
		}
	},
	methods: {
		createCharacter() {
			document.getElementsByClassName('popup-container')[0].style.visibility =
				'hidden'
			k = 1
		},
	},
	mounted() {
		if (k == 1) this.createCharacter()
	},
}
</script>

<template>
	<div class="popup-container">
		<div class="popup-shadow"></div>
		<div class="popup">
			<p class="popup-text">Добро пожаловать!</p>
			<span class="popup-goal">Укажите имя персонажа</span>
			<input
				v-model.lazy="characterName"
				class="popup-input"
				type="text"
				placeholder="Имя персонажа"
			/>
			<button class="popup-btn" @click="createCharacter">Создать</button>
		</div>
	</div>
</template>

<style>
.popup {
	width: 300px;
	height: 300px;
	background-color: #161414;
	border-radius: 40px;
	z-index: 100;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	z-index: 2;
	box-shadow: 0 0 10px 5px rgba(32, 31, 31, 0.9);
}

.popup-goal {
	font-size: 18;
	text-align: center;
	margin-top: 90px;
	color: #fff;
}

.popup-text {
	font-size: 24;
	margin-top: 18px;
}

.popup-input {
	margin-top: 18px;
	height: 25px;
	border-radius: 40px;
	padding-left: 10px;
}

.popup-shadow {
	background-color: rgba(0, 0, 0, 0.8);
	top: 0;
	left: 0;
	position: absolute;
	height: 100vh;
	width: 100%;
	z-index: -1;
}

.popup-btn {
	margin-top: 18px;
	height: 30px;
	width: 70px;
	border-radius: 40px;
}

.popup-container {
	visibility: visible;
	z-index: 3;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
