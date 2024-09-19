function talk(){
    var know ={
        "Hi":"Hello",
        "How Are You?":"Great !",
        "Bye":"Have A Nice Day !",
        "Hello":"Hi , Whats Up",
         "I am depressed":"You are the best so why??",
      "Do you think I can make it":"Yes you can and you will",
      "I am cancer free":"Omg yayyyyy congratulations"
    };
    var user = document.getElementById('userBox').value;
    document.getElementById('chatLog').innerHTML = user + "<br>";
    if(user in know){
        document.getElementById('chatLog').innerHTML = know[user] + "<br>";
    }else{
        document.getElementById('chatLog').innerHTML = "Sorry, I Didn't get it.";
    }
}

const chatbotMessages = document.querySelector('.chatbot-messages');
const inputField = document.querySelector('.chatbot-input input');

function addMessage(message, sender) {
  const newMessage = document.createElement('div');
  newMessage.classList.add('chatbot-message', sender);
  newMessage.innerHTML = `<p>${message}</p>`;
  chatbotMessages.appendChild(newMessage);
}

async function getResponse(input) {
  const openaiApiKey = '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'; 
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      prompt: `Q: ${input}\nA:`,
      max_tokens: 60,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  });
  const data = await response.json();
  return data.choices[0].text.trim();
}

document.querySelector('.chatbot-input button').addEventListener('click', async () => {
  const message = inputField.value.trim();
  if (message !== '') {
    addMessage(message, 'user');
    inputField.value = '';
    const response = await getResponse(message);
    addMessage(response, 'bot');
  }
});
