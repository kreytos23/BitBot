const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const API_KEY = 'AIzaSyD2IkDfCJZo7hmKbuXq06GlRmga31FmjJg';
const {google} = require('googleapis');
const URL = 'https://www.youtube.com/watch?v=';


client.on("ready", () => {
    console.log("Estoy Listo");
});

client.on("guildMemberAdd", (member) => {
    client.channels.fetch('691502117952815210')
    .then(channel => {
        channel.send(`Mira llegó ${member.displayName}, que asko`);
    })
    .catch(console.error);
});

client.on("message", (message) => {
    if(message.content.startsWith("!Hola")){
        message.channel.send("Manuel es Joto");
    }
    if(message.content.startsWith("!Manuel es")){
        message.channel.send("Joto");
    }
    if(message.content.startsWith("Sale uno de rojo")){
        message.channel.send("Mmmmm Guanabana Roja");
    }
    if(message.content.startsWith("Insultar a Garuselo")){
        message.channel.send("El garus es un hijo de su perra bomba madre");
    }

});


client.on("message", message => {
    // if (message.content === 'join') { 

    //     let Canalvoz = message.member.voice.channel;

    //     if (!Canalvoz || Canalvoz.type !== 'voice') {
    //         message.channel.send('¡Necesitas unirte a un canal de voz primero!.')
    //         .catch(error => message.channel.send(error));

    //     } else if (message.guild.voiceConnection) {
    //         message.channel.send('Ya estoy conectado en un canal de voz.');
            
    //     } else {
    //         message.channel.send('Conectando...')
    //         .then(m => {
    //             Canalvoz.join().then(() => {
    //                 m.edit(':white_check_mark: | Conectado exitosamente.')
    //                 .catch(error => message.channel.send(error));
    //             }).catch(error => message.channel.send(error));
    //         }).catch(error => message.channel.send(error));
    //     }
    // }

    if (message.content === 'a chingar a su madre') { 
        let Canalvoz = message.member.voice.channel;
        if (!Canalvoz) {
            message.channel.send('No estoy en un canal de voz.');
        } else {
            message.channel.send("Bueno bai u.u").then(() => {
            Canalvoz.leave();
            }).catch(error => message.channel.send(error));
        }   
    }    
});

client.on("message", message => {      
    if (message.content.substring(0,4) === 'play') {
        
        const ytdl = require('ytdl-core');
        let searchTrim = message.content.trim();
        let search = searchTrim.substring(5,searchTrim.length);
        let voiceChannel = message.member.voice.channel;
        
        const fetchData = async (search,message) => {
            const response = await google.youtube('v3').search.list({
                key: API_KEY,
                part: 'snippet',
                q: search,
            });

            const videoId = response.data.items[0].id.videoId;
            const videoTitle = response.data.items[0].snippet.title;
            
            if(!voiceChannel){
                return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            }else { 
                voiceChannel.join()
                .then(connection => {
                    console.log(`${URL}${videoId}`);
                    dispatcher = connection.play(ytdl(`${URL}${videoId}`, { filter : 'audioonly' }));
                    message.channel.send(`Reproduciendo ahora: ${videoTitle}`);
                })
                .catch(console.error);
            }
        }
        fetchData(search,message);
    }
});

// dispatcher.on('end', () => {
//     // Se activa cuando la transmisión/canción ha terminado.
//   });

//   dispatcher.on('error', e => {
//     // Se activa cuando detecta cualquier error que pueda surgir.
//     console.log(e);
//   });

client.login(config.TOKEN);