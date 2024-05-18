const Event = require('../../structures/EventClass'); // Adjust the path as needed
const { ActivityType } = require('discord.js');

module.exports = class ReadyEvent extends Event {
	constructor(client) {
		super(client, {
			name: 'ready',
			once: true,
		});
	}

	async run() {
		const { client } = this;

		// Array of statuses to cycle through
		const statuses = [
			{ name: '👋 Hello World!', type: ActivityType.Playing },
			{ name: '📢 Use /help for commands', type: ActivityType.Listening },
			{ name: `🚀 Serving ${client.guilds.cache.size} servers`, type: ActivityType.Watching },
			{ name: '🎮 Playing with Discord.js', type: ActivityType.Playing },
		];

		// Function to set a random status from the statuses array
		const updateStatus = () => {
			const status = statuses[Math.floor(Math.random() * statuses.length)];
			client.user.setActivity(status.name, { type: status.type });
		};

		// Set an initial status
		updateStatus();

		// Update status every 10 minutes (600000 milliseconds)
		setInterval(updateStatus, 6000);

		// Log bot's online status and additional information
		console.log(`online`);
		console.log(`Logged in as: ${client.user.tag} (ID: ${client.user.id})`);
		console.log(`Discord Bot is now online with ${client.guilds.cache.size} servers and ${client.users.cache.size} users.`);
	}
};
