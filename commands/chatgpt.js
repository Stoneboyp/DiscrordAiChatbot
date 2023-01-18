//TRY PROMPT GPT BOT
const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { openAIKey } = require("../config.json");

const configuration = new Configuration({
  apiKey: openAIKey,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chatgpt")
    .setDescription("chat gpt Bot")
    .addStringOption((option) =>
      option.setName("prompt").setDescription("The input to echo back")
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString("prompt") ?? "";
    if (!prompt) {
      await interaction.reply("Please input a prompt");
      return;
    }
    
    await interaction.reply("Working on it:");

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 60,
      temperature: 0.5,
    });

    const response = completion.data.choices[0].text;
    // console.log(response);
    await interaction.editReply(`You questuion: + ${prompt}\n` + response);
  },
};
