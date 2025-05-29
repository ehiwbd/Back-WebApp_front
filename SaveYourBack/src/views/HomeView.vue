<template>
	<div class="home-container">
		<PopUpReq v-if="openPopUp" @close-pop-up="handlePopUpClose" />
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

// Импортируем изображения как модули — Vite сам вставит правильные пути
import loFiTop from '../assets/LoFi_Boy.png'
import loFiMid from '../assets/lo-fi-mid.png'
import loFiTired from '../assets/lo-fi-tired.png'

import japanTop from '../assets/Japan.png'
import japanMid from '../assets/Japan-mid.png'
import japanTired from '../assets/Japan-tired.png'

import cyberTop from '../assets/CyberPhunk.png'
import cyberMid from '../assets/CyberPhunk-mid.png'
import cyberTired from '../assets/CyberPhunk-tired.png'

import synthTop from '../assets/SynthWave_Girl.png'
import synthMid from '../assets/SynthWave-mid.png'
import synthTired from '../assets/SytnthWave-tired.png'

export default {
	name: 'HomeView',
	components: {
		PopUpReq,
		New_Level,
	},
	data() {
		return {
			openPopUp: true,
			openNewLevel: false,
			Progress: { progress: 0 },
			value: 0,
			imageSrc: '',
			items: {
				0: {
					top_form: loFiTop,
					middle_form: loFiMid,
					tired_form: loFiTired,
				},
				1: {
					top_form: japanTop,
					middle_form: japanMid,
					tired_form: japanTired,
				},
				2: {
					top_form: cyberTop,
					middle_form: cyberMid,
					tired_form: cyberTired,
				},
				3: {
					top_form: synthTop,
					middle_form: synthMid,
					tired_form: synthTired,
				},
			},
		}
	},
	methods: {
		handlePopUpClose() {
			this.openPopUp = false
		},
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
				if (data && typeof data.id !== 'undefined' && data.id !== null) {
					return parseInt(data.id)
				}
				console.error(
					'Ошибка: ID картинки не получен от API или некорректен.',
					data
				)
				return null
			} catch (error) {
				console.error('Ошибка при получении картинки:', error)
			}
		},
		async loadUserData() {
			try {
				const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
				if (!tg_user?.id) {
					console.error('Telegram user ID not found in loadUserData')
					return null
				}
				const response = await fetch(
					`http://127.0.0.1:8080/api/users/${tg_user.id}`
				)
				if (!response.ok) {
					console.error(
						`Ошибка HTTP: ${response.status} при получении пользователя`
					)
					return null
				}
				const data = await response.json()
				const originalLevel = data.level_cnt
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
				return {
					data,
					originalLevel,
					hasLeveledUpInThisCheck,
				}
			} catch (error) {
				console.error('Ошибка при получении пользователя:', error)
				return null
			}
		},
	},
	async mounted() {
		const result = await this.loadUserData()
		const { data, originalLevel } = result
		if (this.openPopUp) {
			const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
			try {
				await fetch(`http://127.0.0.1:8080/api/picture/`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: 0,
						tg_id: tg_user.id,
						level_to_open: 0,
						price: 0,
						is_opened: true,
					}),
				})

				await fetch(`http://127.0.0.1:8080/api/pictures/opened`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						tg_id: tg_user.id,
						picture_id: 0,
					}),
				})
			} catch (error) {
				console.log('Ошибка при покупке:', error)
			}
		}
		const picId = await this.getPicture()
		console.log('это дата', picId)
		if (
			data &&
			typeof data.level_cnt !== 'undefined' &&
			typeof picId !== 'undefined' &&
			this.items[picId]
		) {
			if (originalLevel < 3) {
				this.imageSrc = this.items[picId].tired_form
			} else if (originalLevel < 10) {
				this.imageSrc = this.items[picId].middle_form
			} else {
				this.imageSrc = this.items[picId].top_form
			}
		} else {
			this.imageSrc = loFiTop
			console.error(
				'Не удалось загрузить нужную картинку, используется дефолт.'
			)
		}
	},
}
</script>

<style>
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
	width: 100% !important;
	height: 100% !important;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
	object-fit: fill;
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
