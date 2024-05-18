const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class Help extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('help')
				.setDescription('Returns command information.')
				.setDMPermission(true)
				.addStringOption(option =>
					option
						.setName('command')
						.setDescription('The command you want to get help for.')
						.setRequired(false)
						.addChoices(
							{ name: 'Hello', value: 'hello' },
							{ name: 'Avatar', value: 'avatar' },
							{ name: 'User Info', value: 'userinfo' },
							{ name: 'Help', value: 'help' },
							{ name: 'Ping', value: 'ping' },
							{ name: 'Prefix', value: 'prefix' },
							{ name: 'Not Found', value: 'notfound' }
						)
				),
			usage: 'help <command>',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}

	async run(client, interaction) {
		const query = interaction.options.getString('command');

		if (!query) {
			await interaction.reply({ content: 'Please specify a command to get help for.', ephemeral: true });
			return;
		}

		const command = client.commands.get(query.toLowerCase());
		if (!command) {
			await interaction.reply({ content: `Command **\`${query}\`** was not found.`, ephemeral: true });
			return;
		}

		const commandEmbed = new EmbedBuilder()
			.setTitle(`**\`${command.name}\`** Command Information`)
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
			.setColor('#57f287')
			.setDescription(stripIndents`
				> ${command.contextDescription ? command.contextDescription : command.description}
				**Usage:** ${command.contextDescription ? 'Right-Click > Apps > ' : '/'}${command.usage}
				**Category:** ${command.category}
				**Permissions Needed:** ${command.permissions.length ? command.permissions.join(', ') : 'None'}
			`);

		await interaction.reply({ embeds: [commandEmbed] });
	}
};
