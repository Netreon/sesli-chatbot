require("./index.js")

const Discord = require("discord.js")
const client = new Discord.Client({ intents: [Object.values(Discord.GatewayIntentBits)], partials: [Object.values(Discord.Partials)] })
const config = require("./config.js")

const gtts = require('node-gtts')("tr")
    
client.commands = new Discord.Collection();

client.on(Discord.Events.ClientReady, async () => {
  let channel = client.guilds.cache.get(config.guild).channels.cache.get(config.channel)
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false
  });

connection.receiver.speaking.on("start", (userId) => {
  transcriber.listen(connection.receiver, userId, client.users.cache.get(userId)).then(async (data) => {
    if (!data.transcript.text) return;
    let text = data.transcript.text;
    let user = data.user;
    console.log(text)
    const response = await axios.get("https://apis-h9h8.onrender.com/apis/chatbot/v1/?message=" + text)
    console.log(response.data)
    const gttsStream = gtts.stream(response.data.reply)
      const audioPlayer = createAudioPlayer();
      const audioResource = createAudioResource(gttsStream, { inputType: StreamType.Arbitrary });

      audioPlayer.play(audioResource);
      connection.subscribe(audioPlayer);
  });
});
});

const axios = require("axios")

client.login(config.token)

var witApiKey = config.witai;
const { StreamType, createAudioPlayer, joinVoiceChannel, getVoiceConnection, NoSubscriberBehavior, createAudioResource, createStream } = require('@discordjs/voice');

const Transcriber = require("discord-speech-to-text");

const transcriber = new Transcriber(config.witai);