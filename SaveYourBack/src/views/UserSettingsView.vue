<template>
	<div class="userset-container">
		<div class="userset-info">
			<img class="avatar" :src="user.avatar" alt="" />
			<p class="tgid">id:{{ user.id }}</p>
		</div>
		<ul class="userset-info-blocks">
			<li class="userset-info-block">
				<span class="userset-text">Ваше имя:</span>
				<span class="userset-text">{{ user.name }}</span>
			</li>
			<li class="userset-info-block">
				<router-link to="/timeset" class="userset-text"
					><span class="userset-text giga"
						>Таймер:
						<span class="userset-text">{{ user.timer }} минут</span>
					</span></router-link
				>
			</li>
		</ul>
		<div class="userset-friend-container">
			<h2 class="userset-friend-title">Друзья</h2>
			<ul class="userset-friend-list">
				<li class="userset-friend-card">
					<div class="friend-avatar">
						<img src="" alt="Аватар пользователя" />
						<p class="friend-name">Имя пользователя</p>
						<p class="friend-lvl">Уровень пользователя</p>
					</div>
				</li>
				<li class="userset-friend-card">
					<div class="friend-avatar">
						<img src="" alt="Аватар пользователя" />
						<p class="friend-name">Имя пользователя</p>
						<p class="friend-lvl">Уровень пользователя</p>
					</div>
				</li>
				<li class="userset-friend-card">
					<div class="friend-avatar">
						<img src="" alt="Аватар пользователя" />
						<p class="friend-name">Имя пользователя</p>
						<p class="friend-lvl">Уровень пользователя</p>
					</div>
				</li>
				<li class="userset-friend-card">
					<div class="friend-avatar">
						<img src="" alt="Аватар пользователя" />
						<p class="friend-name">Имя пользователя</p>
						<p class="friend-lvl">Уровень пользователя</p>
					</div>
				</li>
				<li class="userset-friend-card">
					<div class="friend-avatar">
						<img src="" alt="Аватар пользователя" />
						<p class="friend-name">Имя пользователя</p>
						<p class="friend-lvl">Уровень пользователя</p>
					</div>
				</li>
				<li class="userset-friend-card">
					<div class="friend-avatar">
						<img src="" alt="Аватар пользователя" />
						<p class="friend-name">Имя пользователя</p>
						<p class="friend-lvl">Уровень пользователя</p>
					</div>
				</li>
				<li class="userset-friend-card">
					<div class="friend-avatar">
						<img src="" alt="Аватар пользователя" />
						<p class="friend-name">Имя пользователя</p>
						<p class="friend-lvl">Уровень пользователя</p>
					</div>
				</li>
				<li class="userset-friend-card">
					<div class="friend-avatar">
						<img src="" alt="Аватар пользователя" />
						<p class="friend-name">Имя пользователя</p>
						<p class="friend-lvl">Уровень пользователя</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserSettingsView',
	data() {
		return {
			user: {
				id: '',
				name: '',
				timer: '',
				avatar: '',
			},
		}
	},
	async mounted() {
		await this.fetchProfile()
	},
	methods: {
		async fetchProfile() {
			try {
				const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
				const response = await fetch(
					`http://127.0.0.1:8080/api/users/${tg_user.id}`
				)
				const data = await response.json()
				console.log(data)
				this.user.id = tg_user.id
				this.user.name = data.username
				this.user.timer = data.timer
				this.user.avatar = tg_user.photo_url
			} catch (error) {
				console.log(error)
			}
		},
	},
}
</script>

<style scoped>
.userset-container {
	height: 98vh;
}
p {
	color: #fff;
}

.userset-info {
	margin-top: 48px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.tgid {
	margin-top: 10px;
}

.avatar {
	width: 100px; /* или другой желаемый размер */
	height: 100px;
	border-radius: 50%; /* для круглого аватара */
	object-fit: cover; /* чтобы изображение заполняло контейнер */
}

.giga {
	display: flex;
	flex-direction: column;
	text-align: center;
}

.userset-info-blocks {
	display: flex;
	justify-content: space-around;
	margin-top: 25px;
}

.userset-info-block {
	background-color: #555252;
	width: 150px;
	height: 60px;
	border-radius: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: column;
	text-align: center;
}

.userset-friend-container {
	align-self: center;
	justify-self: center;
	margin-top: 60px;
	overflow: auto;
	background-color: #686868;
	border-radius: 40px;
}

.userset-friend-container::-webkit-scrollbar {
	display: none;
}

.userset-friend-list {
	width: 300px;
	height: 250px;
	padding: 20px;
}

.userset-friend-card {
	margin-bottom: 32px;
}
.userset-friend-card:last-child {
	padding-bottom: 20px;
}

.userset-friend-title {
	text-align: center;
	margin-top: 18px;
	font-size: 20px;
}
</style>
