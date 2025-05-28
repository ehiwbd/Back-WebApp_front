<script>
import Learning from '../components/Learning.vue'
export default {
	name: 'PopUpReq',
	data() {
		return {
			characterName: '',
			showLearning: false,
			showPopup: true,
		}
	},
	components: {
		Learning,
	},
	async mounted() {
		const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
		if (!tg_user?.id) return

		const response = await fetch(
			`http://127.0.0.1:8080/api/users/${tg_user.id}`
		)

		if (response.status === 404) {
			// Показываем popup
			const popupContainer =
				document.getElementsByClassName('popup-container')[0]
			popupContainer.style.visibility = 'visible'

			// Устанавливаем фокус на input
			const popupInput = document.getElementsByClassName('popup-input')[0]
			if (popupInput) {
				// Небольшая задержка для гарантии применения стилей
				setTimeout(() => popupInput.focus(), 50)
			}
		}
	},

	methods: {
		async createCharacter() {
			if (!this.characterName) {
				alert('Введите имя персонажа')
				return
			}

			const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
			if (!tg_user?.id) return // Проверяем наличие ID
			// Если пользователь не найден (404), создаём его

			await fetch(`http://127.0.0.1:8080/api/users/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					tg_id: tg_user.id,
					timer: 0,
					experience: 0,
					coins: 10,
					username: this.characterName,
				}),
			})
			this.showLearning = true
			this.showPopup = false
		},
		handleLearningFinish() {
			this.showLearning = false
			this.$emit('close-pop-up') // пробрасываем наверх в HomeView
		},
	},
}
</script>

<template>
	<div>
		<div class="popup-container">
			<div class="popup-shadow" v-if="showPopup"></div>
			<div class="popup" v-if="showPopup">
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
		<Learning
			class="popup-learning"
			v-if="showLearning"
			@close-pop-up="handleLearningFinish"
		/>
	</div>
</template>

<style scoped>
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

.popup-learning {
	position: absolute;
	top: 0;
	left: 0;
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
	visibility: hidden;
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
