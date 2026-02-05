const ADMIN_PIN = "1234";

function checkPin() {
  const pinInput = document.getElementById("admin-pin").value;
  if(pinInput === ADMIN_PIN) {
    document.getElementById("chat-container").style.display = "block";
    document.getElementById("admin-pin").parentElement.style.display = "none";
    renderChat();
  } else {
    alert("PIN salah!");
  }
}

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
  chat.push({ sender: "Admin", text: input.value });
  localStorage.setItem("chatCustomer", JSON.stringify(chat));
  input.value = "";
  renderChat();
}
