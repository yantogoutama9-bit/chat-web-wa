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

let chatCustomer = JSON.parse(localStorage.getItem("chatCustomer")) || [];
let chatAdmin = JSON.parse(localStorage.getItem("chatAdmin")) || [];

function renderChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = "";

  // Gabung pesan Customer + Admin
  let combined = [...chatCustomer, ...chatAdmin];
  combined.forEach(msg => {
    chatBox.innerHTML += `<p><b>${msg.name} (${msg.phone}):</b> ${msg.text}</p>`;
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("msg-input").value.trim();
  if(!input) return alert("Pesan kosong!");

  const adminMsg = { name: "Admin", phone: "-", text: input };
  chatAdmin.push(adminMsg);
  localStorage.setItem("chatAdmin", JSON.stringify(chatAdmin));

  document.getElementById("msg-input").value = "";
  renderChat();
}
