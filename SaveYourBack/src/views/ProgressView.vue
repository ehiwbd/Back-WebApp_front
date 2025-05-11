<template>
	<div class="progress-container">
		<svg
			class="progress-icon"
			width="66"
			height="66"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M24 40V20M36 40V8M12 40V32"
				stroke="#1E1E1E"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>

		<h1 class="progress-title">Прогресс</h1>
		<div class="progress-bar-container">
			<div class="progress-bar-item inday">
				<div class="progress-bar-iconContainer">
					<svg
						class="progress-bar-icon"
						width="36"
						height="36"
						viewBox="0 0 36 35"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M24 23.3333C24 23.3333 21.75 20.4167 18 20.4167C14.25 20.4167 12 23.3333 12 23.3333M13.5 13.125H13.515M22.5 13.125H22.515M33 17.5C33 25.5541 26.2843 32.0833 18 32.0833C9.71573 32.0833 3 25.5541 3 17.5C3 9.44584 9.71573 2.91666 18 2.91666C26.2843 2.91666 33 9.44584 33 17.5Z"
							stroke="#fff"
							stroke-width="4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<svg
						class="progress-bar-icon"
						width="36"
						height="36"
						viewBox="0 0 37 37"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.3334 23.125H24.6667M13.875 13.875H13.8905M23.125 13.875H23.1405M33.9167 18.5C33.9167 27.0144 27.0144 33.9167 18.5 33.9167C9.98565 33.9167 3.08337 27.0144 3.08337 18.5C3.08337 9.98562 9.98565 3.08334 18.5 3.08334C27.0144 3.08334 33.9167 9.98562 33.9167 18.5Z"
							stroke="#fff"
							stroke-width="4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<svg
						class="progress-bar-icon"
						width="36"
						height="36"
						viewBox="0 0 36 36"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.315 20.835L10.5 34.5L18 30L25.5 34.5L23.685 20.82M28.5 12C28.5 17.799 23.799 22.5 18 22.5C12.201 22.5 7.5 17.799 7.5 12C7.5 6.20101 12.201 1.5 18 1.5C23.799 1.5 28.5 6.20101 28.5 12Z"
							stroke="#fff"
							stroke-width="4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<p class="progress-label">Сегодня</p>
				<div class="progress-bar">
					<div
						class="progress-fill"
						:style="{ width: dayProgress.progress + '%' }"
					></div>
				</div>
				<div class="progress-percentage">{{ dayProgress.progress }}%</div>
			</div>
			<div class="progress-bar-item alltime">
				<div class="progress-bar-iconContainer">
					<svg
						class="progress-bar-icon"
						width="36"
						height="36"
						viewBox="0 0 36 35"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M24 23.3333C24 23.3333 21.75 20.4167 18 20.4167C14.25 20.4167 12 23.3333 12 23.3333M13.5 13.125H13.515M22.5 13.125H22.515M33 17.5C33 25.5541 26.2843 32.0833 18 32.0833C9.71573 32.0833 3 25.5541 3 17.5C3 9.44584 9.71573 2.91666 18 2.91666C26.2843 2.91666 33 9.44584 33 17.5Z"
							stroke="#fff"
							stroke-width="4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<svg
						class="progress-bar-icon"
						width="36"
						height="36"
						viewBox="0 0 37 37"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.3334 23.125H24.6667M13.875 13.875H13.8905M23.125 13.875H23.1405M33.9167 18.5C33.9167 27.0144 27.0144 33.9167 18.5 33.9167C9.98565 33.9167 3.08337 27.0144 3.08337 18.5C3.08337 9.98562 9.98565 3.08334 18.5 3.08334C27.0144 3.08334 33.9167 9.98562 33.9167 18.5Z"
							stroke="#fff"
							stroke-width="4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<svg
						class="progress-bar-icon"
						width="36"
						height="36"
						viewBox="0 0 36 36"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.315 20.835L10.5 34.5L18 30L25.5 34.5L23.685 20.82M28.5 12C28.5 17.799 23.799 22.5 18 22.5C12.201 22.5 7.5 17.799 7.5 12C7.5 6.20101 12.201 1.5 18 1.5C23.799 1.5 28.5 6.20101 28.5 12Z"
							stroke="#fff"
							stroke-width="4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<p class="progress-label">За все время</p>
				<div class="progress-bar">
					<div
						class="progress-fill"
						:style="{ width: AllTimeProgress.progress + '%' }"
					></div>
				</div>
				<div class="progress-percentage">{{ AllTimeProgress.progress }}%</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProgressView',
	data() {
		return {
			dayProgress: { progress: 0 }, // Начинаем с 0
			AllTimeProgress: { progress: 0 }, // Начинаем с 0
		}
	},
	mounted() {
		// Анимируем прогресс после загрузки компонента
		setTimeout(() => {
			this.dayProgress.progress = 75
			this.AllTimeProgress.progress = 50
		}, 200) // Небольшая задержка для гарантии применения начальных стилей
	},
}
</script>

<style scoped>
.progress-container {
	height: 98vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
}

.progress-bar-iconContainer {
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: absolute;
	top: 75px;
	left: 0;
	z-index: 1;
}

.progress-icon {
	margin-top: 36px;
}

.alltime {
	margin-top: 96px;
}

.progress-title {
	font-size: 24px;
	margin-bottom: 20px;
	color: #fff;
}

.progress-bar-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: 20px;
}

.progress-bar-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
	margin-bottom: 20px;
	position: relative;
}

.progress-label {
	margin-bottom: 5px;
	font-weight: bold;
	color: #fff;
}

.progress-bar {
	width: 100%;
	height: 20px;
	background-color: #eee;
	border-radius: 10px;
	overflow: hidden;
	position: relative;
}

.progress-fill {
	height: 100%;
	background-color: #4caf50; /* Зеленый */
	width: 0%; /* Начинаем с 0% */
	transition: width 2s ease-in-out;
	border-radius: 10px; /* Добавим скругление */
}

.progress-percentage {
	margin-top: 5px;
	color: #fff;
}
</style>
