<template>
	<nav class="navbar">
		<router-link to="/" class="nav-link">
			<img class="home-icon" src="../assets/home_icon.svg" alt="Home" />
		</router-link>
		<router-link to="/shop" class="nav-link">
			<img class="home-icon" src="../assets/shop_icon.svg" alt="Home" />
		</router-link>
		<router-link to="/userset" class="nav-link">
			<img class="home-icon" src="../assets/profile_icon.svg" alt="Home" />
		</router-link>
	</nav>
</template>

<script>
export default {
	name: 'NavBar',
}
</script>

<style scoped>
.navbar {
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 60px;
	position: absolute; /* Позиционируем панель абсолютно */
	top: 92%;
	left: 0px;
	width: 100%; /* Растягиваем на всю ширину */
	z-index: 2; /* Помещаем панель поверх всего */
}
.nav-link {
}

.home-icon {
}
</style>
