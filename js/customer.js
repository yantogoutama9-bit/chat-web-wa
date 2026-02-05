let chat = JSON.parse(localStorage.getItem("chatCustomer")) || [];

function renderChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = "";
  chat.forEach(msg => {
    chatBox.innerHTML += `<p><b>${msg.name} (${msg.phone}):</b> ${msg.text}</p>`;
  });
}

function sendMessage() {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const input = document.getElementById("msg-input").value.trim();

  if(!name || !phone || !input) return alert("Nama, No. Telepon, dan Pesan harus diisi!");

  chat.push({ name, phone, text: input, sender: "Customer" });
  localStorage.setItem("chatCustomer", JSON.stringify(chat));

  document.getElementById("msg-input").value = "";
  renderChat();
}

renderChat();
