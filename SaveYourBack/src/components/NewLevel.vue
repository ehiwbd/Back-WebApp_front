<template>
	<div>
		<div class="new_level-container">
			<div class="new_level-shadow"></div>
			<div class="new_level">
				<p class="new_level-text">Поздравляю!</p>
				<span class="new_level-goal">У вас новый уровень</span>
				<button class="new_level-btn" @click="closeWindow">ОК</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'New_Level',
	methods: {
		closeWindow() {
			this.$emit('close')
		},
	},
}
</script>

<style scoped>
.new_level {
	width: 300px;
	height: 300px;
	background-color: #161414;
	border-radius: 40px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	z-index: 2;
	box-shadow: 0 0 10px 5px rgba(32, 31, 31, 0.9);
}

.new_level-goal {
	font-size: 18;
	text-align: center;
	margin-top: 90px;
	color: #fff;
}

.new_level-text {
	font-size: 24px;
	margin-top: 18px;
}

.new_level-shadow {
	background-color: rgba(0, 0, 0, 0.8);
	top: 0;
	left: 0;
	position: absolute;
	height: 100vh;
	width: 100%;
	z-index: -1;
}

.new_level-btn {
	margin-top: 18px;
	height: 30px;
	width: 70px;
	border-radius: 40px;
}

.new_level-container {
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
