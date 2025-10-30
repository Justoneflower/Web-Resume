document.getElementById("downloadBtn").addEventListener("click", () => {
    window.print();
  });
  
  AOS.init({
    duration: 800,
    offset: 200,
  });
  
const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.createElement("div");
chatContainer.className = "chat-container hidden";
chatContainer.innerHTML = `
  <div class="chat-box">
    <div class="chat-header">💬 Chat with Lily</div>
    <div class="chat-messages" id="chatMessages"></div>
    <div class="chat-input">
      <input type="text" id="userInput" placeholder="Say hi..." />
      <button id="sendBtn">Send</button>
    </div>
  </div>
`;
document.body.appendChild(chatContainer);


chatToggle.addEventListener("click", () => {
  chatContainer.classList.toggle("hidden");
});


function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => v.name.toLowerCase().includes("female") || v.gender === "female");
  utterance.voice = femaleVoice || voices[0];
  utterance.rate = 1;
  utterance.pitch = 1.2;
  speechSynthesis.speak(utterance);
}


const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener("click", () => {
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage("user", userText);
  userInput.value = "";

  setTimeout(() => {
    let botReply = "";

    if (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("hi") ||userText.toLowerCase().includes("hey") ) {
      botReply = "Hey there! I’m Lily, Kusum's bot-half. Can I help you with something?";
    } else if (userText.toLowerCase().includes("name")) {
      botReply = "I’m Lily, your smart chatbot!";
    } else if (userText.toLowerCase().includes("resume")) {
      botReply = "You can find Kusum’s resume right here on this site.";
    } else {
      botReply = "You seem interested in hiring her! Contact her on 6367681958 or drop a mail on kusumindoria5@gmail.com.";
    }

    addMessage("bot", botReply);
    speak(botReply);
  }, 500);
});

