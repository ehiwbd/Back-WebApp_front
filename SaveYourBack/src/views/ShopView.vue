<template>
	<div class="shop-container">
		<div class="money-icon">
			<img src="../assets/Money_icon.svg" alt="" />
			<span style="color: aliceblue">{{ coins }}</span>
		</div>

		<svg
			class="shop-icon"
			width="66"
			height="66"
			viewBox="0 0 28 29"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3.5 7.25002L7 2.41669H21L24.5 7.25002M3.5 7.25002V24.1667C3.5 24.8076 3.74583 25.4223 4.18342 25.8755C4.621 26.3287 5.21449 26.5834 5.83333 26.5834H22.1667C22.7855 26.5834 23.379 26.3287 23.8166 25.8755C24.2542 25.4223 24.5 24.8076 24.5 24.1667V7.25002M3.5 7.25002H24.5M18.6667 12.0834C18.6667 13.3652 18.175 14.5946 17.2998 15.501C16.4247 16.4075 15.2377 16.9167 14 16.9167C12.7623 16.9167 11.5753 16.4075 10.7002 15.501C9.825 14.5946 9.33333 13.3652 9.33333 12.0834"
				stroke="#02542D"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>

		<h1 class="shop-title">Магазин</h1>
		<div class="product-list">
			<div v-for="product in products" :key="product.id" class="product-item">
				<img src="../assets/home_icon.svg" alt="" />
				<div class="product-details">
					<button class="add-to-cart-button">{{ product.price }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ShopView',
	data() {
		return {
			coins: '',
			products: [
				{
					id: 1,
					price: '500',
					imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL
				},
				{
					id: 2,
					price: '1200',
					imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL
				},
				{
					id: 3,
					price: '1800',
					imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL
				},
				{
					id: 4,
					price: '1000',
					imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL
				},
				{
					id: 5,
					price: '1000',
					imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL
				},
				{
					id: 6,
					price: '1000',
					imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL
				},
				{
					id: 7,
					price: '1000',
					imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL
				},
				{
					id: 8,
					price: '1000',
					imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL
				},
				{
					id: 9,
					price: '1000',
					imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL
				},
			],
		}
	},
	async mounted() {
		await this.fetchMoneyCnt()
	},
	methods: {
		async fetchMoneyCnt() {
			try {
				const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
				const response = await fetch(
					`http://127.0.0.1:8080/api/users/${tg_user.id}`
				)
				const data = await response.json()
				console.log(data)
				this.coins = data.coins
			} catch (error) {
				console.log(error)
			}
		},
	},
}
</script>

<style scoped>
.shop-container {
	height: 98vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
}

.shop-icon {
	margin-top: 36px;
}

.shop-title {
	font-size: 24px;
	margin-bottom: 20px;
}

.product-list {
	margin-top: 57px;
	display: grid;
	grid-template-columns: repeat(3, 100px);
	grid-template-rows: auto 100px;
	gap: 20px;
	max-width: 224px;
	min-height: 260px;
	align-items: center;
	justify-content: center;
}

.product-item {
	border: none;
	padding: 10px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100px;
}

.product-image {
	width: 150px;
	height: 150px;
	margin-bottom: 10px;
}

.product-details {
	text-align: center;
}

.product-name {
	font-weight: bold;
	margin-bottom: 5px;
}

.product-description {
	margin-bottom: 5px;
}

.product-price {
	font-weight: bold;
	margin-bottom: 10px;
}

.add-to-cart-button {
	background-color: #4caf50; /* Зеленый */
	border: none;
	padding: 10px 20px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	border-radius: 5px;
	cursor: pointer;
}

.money-icon {
	position: absolute;
	top: 15px;
	right: 55px;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 5px;
}
</style>
