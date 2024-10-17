const { Command } = require('commander');
const axios = require('axios');
const fs = require('fs');
const program = new Command();

program
  .name('mini CLI ')
  .version('12.1.0')
  .description('CLI app description')
  .option('-n, --name <name>', 'Specify your name');

// Define your command
program
  .command("username <username>")
  .alias("-n")
  .description("Fetch GitHub repositories for a given username")
  .action(async (username) => {
    try {
      // Fetch repositories from GitHub API
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      const repos = response.data.map(repo => repo.name); // Get the repository names

      // Write repository names to a file named 'USERNAME.txt'
      fs.writeFileSync(`${username}.txt`, repos.join('\n'));

      console.log(`Repository names for user ${username} have been saved to ${username}.txt`);
    } catch (error) {
      console.error('Error fetching repositories:', error.message);
    }
  });

program.addHelpText('after', `
  ---------------------------------
  Welcome to the CLI app
  Use this application to fetch GitHub repositories of any user.
  Example:
    node .\index.js username KhaledNashat123
  ---------------------------------
`);

// Make sure this is at the end
program.parse(process.argv);
