<template>
	<div class="timer-container">
		<div class="time-container">
			<div class="time-icon">
				<svg
					width="89"
					height="89"
					viewBox="0 0 89 89"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M44.5 22.25V44.5L59.3334 51.9167M81.5834 44.5C81.5834 64.9806 64.9806 81.5833 44.5 81.5833C24.0195 81.5833 7.41669 64.9806 7.41669 44.5C7.41669 24.0194 24.0195 7.41667 44.5 7.41667C64.9806 7.41667 81.5834 24.0194 81.5834 44.5Z"
						stroke="#F19EDC"
						stroke-width="4"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="time-form">
				<button class="timebtn tenminbtn" @click="setTimer(0)">
					Оключить таймер
				</button>
				<button class="timebtn fifteenminbtn" @click="setTimer(15)">15</button>
				<button class="timebtn twentyminbtn" @click="setTimer(20)">20</button>
				<button class="timebtn thirtyminbtn" @click="setTimer(30)">30</button>
			</div>
			<p class="time-choose">Выберите время</p>
		</div>
		<div class="timer-hint">
			<div class="timer-hint-container">
				<span
					>Нажимая на кнопку вы определяете промежуток времени, через который
					вам будут приходить напоминания о необходимости держать спину
					прямой</span
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TimeSettingsView',
	data() {
		return {
			currentTimer: 0,
			user: {
				id: '',
				name: '',
				timer: '',
				coins: '',
				experience: '',
			},
		}
	},

	methods: {
		setTimer(minutes) {
			this.currentTimer = minutes
			this.CreateTimer(this.currentTimer)
		},

		async CreateTimer(minutes) {
			try {
				const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
				const response = await fetch(
					`http://127.0.0.1:8080/api/users/${tg_user.id}`
				)
				const data = await response.json()
				this.user.id = tg_user.id
				this.user.name = tg_user.username
				this.user.timer = data.timer
				this.user.coins = data.coins
				this.user.experience = data.experience
				console.log(minutes)
				await fetch(`http://127.0.0.1:8080/api/users/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						tg_id: tg_user.id,
						timer: minutes,
						coins: data.coins,
						experience: data.experience,
						username: tg_user.username,
					}),
				})
			} catch (error) {
				console.log('Ошибка', error)
			}
		},
	},
}
</script>

<style>
.time-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.timebtn {
	width: 80px;
	height: 35px;
	border-radius: 40px;
	margin-top: 20px;
	transition: transform 0.2s ease-in-out;
	-webkit-tap-highlight-color: transparent;
}
.timebtn:active {
	transform: scale(1.1);
}

.time-choose {
	font-size: 20px;
	margin-top: 30px;
	color: #fff;
}

.time-form {
	display: grid;
	grid-template-columns: repeat(2, 1fr); /* 2 колонки */
	grid-template-rows: auto auto; /* 2 строки */
	gap: 5px; /* Расстояние между кнопками */
}

.time-icon {
	margin-top: 35px;
}

.timer-hint {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 60px;
}

.timer-hint-container {
	padding: 20px;
	width: 300px;
	height: 200px;
	border: 2px solid #333131;
	background-color: #3a3939;
	border-radius: 40px;
	text-align: start;
	color: #fff;
}
</style>
