const { Client, Message } = require('discord.js');
const { token } = require('./config.json');
const response = require('./reponses');

const bot = new Client();

const PREFIX = '¦';
const waitTime = 1000 * 60;
let lastMessaged;


bot.once('ready', () => {
    console.log(`${bot.user.username} ready!`);
});

bot.on('message', msg => {
    if(msg.author.id != '500648375297900545') return;
    
    if(commands(msg)) return;
    if(!lastMessaged || lastMessaged + waitTime < Date.now()) {
        msg.channel.send('Welcome back!');
        lastMessaged = Date.now();
        return;
    }
    lastMessaged = Date.now();

    msg.channel.send(response[Math.floor(Math.random() * response.length)]);

});

/**
 * 
 * @param {Message} msg 
 */
function commands(msg) {
    const args = msg.content.split(/[ ]+/);
    const cmd = args[0].toLowerCase().substr(PREFIX.length);


    switch(cmd) {
        case 'img':
        case 'image':
            msg.channel.send('uwu', { files: ['./girl.jpg'] });
            break;

        case 'help':
            msg.channel.send('This is help');
            break;
    }

    if(cmd) return true;
    return false;
}

bot.login(token)