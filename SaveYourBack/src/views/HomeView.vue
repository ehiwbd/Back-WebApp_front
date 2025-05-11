<template>
	<div class="home-container">
		<PopUpReq />
		<img
			src="../assets/goodState.png"
			alt="Фон главной страницы"
			class="home-image"
		/>
		<div class="progress-container">
			<div class="progress-icon">
				<span class="progress-icon-text">Lvl</span>
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
							stroke="#F19EDC"
							stroke-width="4"
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
let z = 0

export default {
	name: 'HomeView',
	data() {
		return {
			Progress: { progress: 0 }, // Начинаем с 0
		}
	},
	components: {
		PopUpReq,
	},
	async mounted() {
		const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
		if (z !== 1) {
			await fetch(`http://127.0.0.1:8000/api/users/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ tg_id: tg_user.id, timer: 0 }),
			})
			z++
		}
	},
	mounted() {
		// Анимируем прогресс после загрузки компонента
		setTimeout(() => {
			this.Progress.progress = 75
		}, 200) // Небольшая задержка для гарантии применения начальных стилей
	},
}
</script>

<style scoped>
.home-container {
	height: 100vh; /* Занимает всю высоту экрана */
	display: flex;
	flex-direction: column; /* Размещаем контент вертикально */
	align-items: flex-end;
	justify-content: center;
	position: relative; /* Делаем контейнер относительным, чтобы позиционировать элементы внутри него */
	overflow: hidden; /* Скрываем все, что выходит за пределы контейнера */
}

.home-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
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
	z-index: 1; /* Помещаем контент поверх изображения */
	gap: 20px; /* Добавляем отступ между кнопками */
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
	background-color: #4caf50; /* Зеленый */
	width: 0%; /* Начинаем с 0% */
	transition: width 2s ease-in-out;
	border-radius: 10px; /* Добавим скругление */
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
}

.progress-icon-text {
	font-size: 20px;
}
</style>
