<template>
	<div class="learning-container">
		<div class="step1" v-if="currentStep === 1">
			<div class="learning-shadow"></div>
			<div class="learning">
				<p class="learning-text">Привет, {{ PlayerName }}!</p>
				<span class="learning-goal"
					>Вижу ты тоже готов поработать над своей осанкой, чтож
					похвально!</span
				>
				<button class="learning-btn" @click="NextStep">Продолжить</button>
			</div>
		</div>
		<div class="step2" v-if="currentStep === 2">
			<div class="learning-shadow"></div>
			<div class="learning">
				<span class="learning-goal"
					>Позволь помочь тебе разобраться с основами приложения</span
				>
				<button class="learning-btn" @click="NextStep">Продолжить</button>
			</div>
		</div>
		<div class="step3" v-if="currentStep === 3">
			<div class="learning-shadow"></div>
			<div class="learning">
				<span class="learning-goal"
					>Во первых кнопка таймер - тебе стоит выбрать один и предложенных
					таймеров чтобы не забывать следить за своей осанкой</span
				>
				<button class="learning-btn" @click="NextStep">Продолжить</button>
			</div>
		</div>
		<div class="step4" v-if="currentStep === 4">
			<div class="learning-shadow"></div>
			<div class="learning">
				<span class="learning-goal"
					>Во вторых, у нас есть магазин где ты можешь купить себе фоны для
					главного экрана (в качестве поощрения за твою работу над собой)</span
				>
				<button class="learning-btn" @click="NextStep">Продолжить</button>
			</div>
		</div>
		<div class="step5" v-if="currentStep === 5">
			<div class="learning-shadow"></div>
			<div class="learning">
				<span class="learning-goal"
					>Нуу вобщем то всё! Теперь тебе осталось лишь быть честным с собой и
					усердно стараться испольльзуя приложение как стимул развиваться</span
				>
				<button class="learning-btn" @click="NextStep">Начнем!</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Learning',
	data() {
		return {
			PlayerName: '',
			currentStep: 1,
			totalSteps: 5,
		}
	},
	methods: {
		NextStep() {
			this.currentStep++
			if (this.currentStep == 6) {
				const component =
					document.getElementsByClassName('learning-container')[0]
				component.style.display = 'none'
			}
		},
	},
	async mounted() {
		try {
			const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
			const response = await fetch(
				`http://127.0.0.1:8080/api/users/${tg_user.id}`
			)
			const data = await response.json()
			this.PlayerName = data.username
		} catch (error) {
			console.log(error)
		}
	},
}
</script>

<style>
.learning {
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

.learning-goal {
	font-size: 18;
	text-align: center;
	margin-top: 90px;
	color: #fff;
}

.learning-text {
	font-size: 24;
	margin-top: 18px;
}

.learning-input {
	margin-top: 18px;
	height: 25px;
	border-radius: 40px;
	padding-left: 10px;
}

.learning-shadow {
	background-color: rgba(0, 0, 0, 0.8);
	top: 0;
	left: 0;
	position: absolute;
	height: 100vh;
	width: 100%;
	z-index: -1;
}

.learning-btn {
	margin-top: 18px;
	height: 30px;
	width: 70px;
	border-radius: 40px;
}

.learning-container {
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
