let chat = JSON.parse(localStorage.getItem("chatCustomer")) || [];

function renderChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = "";
  chat.forEach(msg => {
    chatBox.innerHTML += `<p><b>${msg.sender}:</b> ${msg.text}</p>`;
  });
}

function sendMessage() {
  const input = document.getElementById("msg-input");
  if(input.value.trim() === "") return;
  chat.push({ sender: "Customer", text: input.value });
  localStorage.setItem("chatCustomer", JSON.stringify(chat));
  input.value = "";
  renderChat();
}

renderChat();
