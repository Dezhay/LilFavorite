const discord = require('discord.js');
const {prefix,token,googlKey,giphyKey} = require('./config.json');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');
const client = new discord.Client();



client.on('ready' , () => {
    console.log("Connected as " + client.user.tag)
    console.log("Ready!")

    client.user.setActivity("Hentai", {type: "WATCHING"})

    client.guilds.forEach((guild) => {
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })
    })
})

const nibb = ['being the big spoon', 'being the little spoon', 'BIG SLEEP', 'matcha', 'pwu$$y', 'ABGs', 'black coffee', 'BBC', 'THOTS', 'being bottom', 'the wristy twisty hyuk hyuk', 'peeze chizza', 'some strange', 'the BOYS!!!', 'pressin that B button', 'anime tiddies', 'facebook memes :(',
                 'drinking too many mimosas at brunch'];

function newRando() {
    const randomer = nibb[Math.floor(Math.random()*nibb.length)];
    return randomer;
};

client.on('message', msg => {
    if (msg.content == 'i like') {
      msg.reply(newRando(nibb));
    } 
    
    const attachPlant = new discord.Attachment("images/plantgang.gif")
     if (msg.content == 'plant gang') {
        msg.reply(attachPlant);
    }
  });



const querystring = require('querystring');

const nemaattachment = new discord.Attachment("images/nematode.jpg")

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'yeet') {
        if (!args.length) {
            return message.channel.send('Pls supply a search term you friggin nematode' , nemaattachment);
        }

        const query = querystring.stringify({ tag: args.join(' ') });

        console.log(query);

        const body  = await fetch(`https://api.giphy.com/v1/gifs/random?${query}&api_key=${giphyKey}&limit=1`).then(response => response.json());

        console.log(body.data.embed_url);



        message.channel.send(body.data.embed_url);
    };
    
});


console.log(newRando(nibb)); 
client.login(token);