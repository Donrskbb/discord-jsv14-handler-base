const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
require('dotenv').config();

const deploy = async () => {
  const commandData = [];

  // Read and load all commands from subdirectories
  const categories = fs.readdirSync('./commands/');
  
  for (const category of categories) {
    const commands = fs.readdirSync(`./commands/${category}/`).filter(file => file.endsWith('.js'));

    for (const file of commands) {
      const command = require(`./commands/${category}/${file}`);

      // Ensure the command structure is valid
      if (command && command.data && typeof command.data.toJSON === 'function') {
        commandData.push(command.data.toJSON());
      } else {
        console.error(`Invalid command structure: ${category}/${file}`);
      }
    }
  }

  // Initialize REST client with the latest API version
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.DEPLOY_GUILD_ID;

    console.log('Started refreshing Slash Commands and Context Menus...');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commandData }
    );

    console.log('Slash Commands and Context Menus have now been deployed.');
  } catch (error) {
    console.error('Error deploying commands:', error);
  }
};

deploy();