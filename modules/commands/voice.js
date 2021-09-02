module.exports.config = {
    name: "voice",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "Voice từ zalo ngu",
    commandCategory: "voice",
    usages: "[text]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": ""
    },
    envConfig: {
        zaloKey: "oEqf6UKNYQ88TcoLWTgZnaNoSLGjc6R0"
    }
};

module.exports.run = async function ({ event, api, args }) {
    const axios = global.nodemodule.axios, fs = global.nodemodule['fs-extra'];
    const { data: { url } } = await axios({ url: 'https://api.zalo.ai/v1/tts/synthesize', method: 'POST', headers: { apikey: global.configModule.voice.zaloKey }, data: 'encode_type=1&speaker_id=4&speed=0.8&input=' + encodeURIComponent(args.join(" ").replace(/\n/g, ', ')) }), { data } = await axios.get(url, { respnseType: 'arraybuffer' });
    fs.writeFileSync(__dirname + "/cache/voice.mp3", Buffer.from(data, 'utf-8'));
    return api.sendMessage({ attachment: fs.createReadStream(__dirname + "/cache/voice.mp3") }, event.threadID, event.messageID);
}