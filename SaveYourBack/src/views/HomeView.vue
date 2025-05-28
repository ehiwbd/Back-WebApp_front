<template>
	<div class="home-container">
		<PopUpReq />
		<New_Level v-if="openNewLevel" @close="handleNewLevelClose" />
		<img :src="imageSrc" class="home-image" />

		<div class="progress-container">
			<div class="progress-icon">
				<span class="progress-icon-text">Lvl</span>
				<span class="progress-icon-value">{{ value }}</span>
			</div>
			<div class="progress-bar">
				<div
					class="progress-fill"
					:style="{ width: Progress.progress + '%' }"
				></div>
			</div>
		</div>

		<div class="home-content">
			<div class="timeSet">
				<router-link to="/timeset" class="timeSetBtn">
					<svg
						width="28"
						height="28"
						viewBox="0 0 89 89"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M44.5 22.25V44.5L59.3334 51.9167M81.5834 44.5C81.5834 64.9806 64.9806 81.5833 44.5 81.5833C24.0195 81.5833 7.41669 64.9806 7.41669 44.5C7.41669 24.0194 24.0195 7.41667 44.5 7.41667C64.9806 7.41667 81.5834 24.0194 81.5834 44.5Z"
							stroke="#81C784"
							stroke-width="8"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import PopUpReq from '../components/PopUpReq.vue'
import New_Level from '../components/NewLevel.vue'

export default {
	name: 'HomeView',
	components: {
		PopUpReq,
		New_Level,
	},
	data() {
		return {
			openNewLevel: false,
			Progress: { progress: 0 },
			value: 5,
			imageSrc: '', // путь к картинке
			items: {
				1: '/assets/Japan-DNnXEsqc.png',
				2: '/assets/CyberPhunk-CmrR5ov6.png',
				3: '/assets/SynthWave_Girl-DuPdRgqQ.png',
			},
		}
	},
	methods: {
		handleNewLevelClose() {
			this.openNewLevel = false
		},
		async getPicture() {
			try {
				const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
				if (!tg_user?.id) return
				const response = await fetch(
					`http://127.0.0.1:8080/api/picture/${tg_user.id}`
				)
				const data = await response.json()
				console.log(data)
				return parseInt(data.id)
			} catch (error) {
				console.error('Ошибка при получении картинки:', error)
			}
		},
		async loadUserData() {
			try {
				const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
				if (!tg_user?.id) return
				const response = await fetch(
					`http://127.0.0.1:8080/api/users/${tg_user.id}`
				)
				const data = await response.json()
				let hasLeveledUpInThisCheck = false
				while (data.experience >= 100) {
					data.experience -= 100
					data.level_cnt += 1
					hasLeveledUpInThisCheck = true
				}
				if (hasLeveledUpInThisCheck) {
					this.openNewLevel = true
				}
				this.Progress.progress = data.experience
				this.value = data.level_cnt
				try {
					await fetch(`http://127.0.0.1:8080/api/users/`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							tg_id: tg_user.id,
							timer: data.timer,
							coins: data.coins,
							experience: data.experience,
							level_cnt: data.level_cnt,
							username: tg_user.username,
						}),
					})
				} catch (error) {
					console.log(error)
				}
			} catch (error) {
				console.error('Ошибка при получении пользователя:', error)
			}
		},
	},
	async mounted() {
		await this.loadUserData()
		const picId = await this.getPicture()
		if (picId && this.items[picId]) {
			this.imageSrc = this.items[picId]
		} else {
			this.imageSrc = '/assets/LoFi_Boy-D4gghZ9P.png'
		}
	},
}
</script>

<style scoped>
.home-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	position: relative;
	overflow: hidden;
}

.home-image {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
}

.home-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 1;
	gap: 20px;
}

.timeSetBtn {
	padding: 10px 20px;
	border-radius: 5px;
	text-decoration: none;
	color: #333;
	font-weight: bold;
	transition: background-color 0.3s ease;
}

.userSet {
	display: flex;
	align-items: center;
	justify-content: start;
}

.progress-bar {
	width: 230px;
	height: 20px;
	background-color: #eee;
	border-radius: 10px;
	overflow: hidden;
	position: absolute;
	top: 60px;
	left: 50px;
	border: 2px solid #7a945c;
}

.progress-fill {
	height: 100%;
	background-color: #4caf50;
	width: 0%;
	transition: width 2s ease-in-out;
	border-radius: 10px;
}

.progress-icon {
	position: absolute;
	top: 45px;
	left: 10px;
	z-index: 2;
	width: 50px;
	height: 50px;
	background: #4caf50;
	border-radius: 50%;
	border: 2px solid #7a945c;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.progress-icon-text {
	font-size: 20px;
}
</style>
