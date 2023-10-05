

const chatLog = document.getElementById('chatArea');
const userInput = document.getElementById('searchBox');
const sendButton = document.getElementById('send-button');

function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('card');
    messageElement.classList.add(sender);
    messageElement.innerText = message;
    chatLog.appendChild(messageElement);
    // chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom of the chat log
}
function addLoading(){
    const messageElement=document.createElement('div');
    messageElement.classList.add('card');
    messageElement.innerHTML =
    `<div class="ball-container">
        <div class="ball ball1"></div>
        <div class="ball ball2"></div>
        <div class="ball ball3"></div>
    </div>`
    chatLog.appendChild(messageElement);
}
function appendMessageOk(message, sender) {
    const messageElement = chatLog.lastElementChild;
    // messageElement.classList.add('card');
    messageElement.classList.add(sender);
    messageElement.innerText = message;
    chatLog.appendChild(messageElement);
    // chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom of the chat log
}

function sendMessage() {
    const userMessage = userInput.value;
    appendMessage(userMessage, 'user');
    addLoading();
    // Clear the input field
    userInput.value = '';

    const url = `https://chat-gpt-3-5-turbo.p.rapidapi.com/${userMessage}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3d02af4cd7msh6aa7ae6f9b93c67p1e8b94jsnbfa8f5f339cc',
            'X-RapidAPI-Host': 'chat-gpt-3-5-turbo.p.rapidapi.com'
        }
    };
    // Make an API request to OpenAI
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const aiResponse = data;
        appendMessageOk(aiResponse, 'ai');
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('An error occurred while processing your request.', 'ai');
    });

   
}

sendButton.addEventListener('click', sendMessage);

