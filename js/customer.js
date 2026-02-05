function getData() {
  return {
    chatCustomer: JSON.parse(localStorage.getItem("chatCustomer")) || [],
    chatAdmin: JSON.parse(localStorage.getItem("chatAdmin")) || []
  };
}

function renderChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = "";
  const { chatCustomer, chatAdmin } = getData();

  // Gabungkan semua pesan
  let combined = [...chatCustomer, ...chatAdmin];
  combined.forEach(msg => {
    chatBox.innerHTML += `<p><b>${msg.name} (${msg.phone}):</b> ${msg.text}</p>`;
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const input = document.getElementById("msg-input").value.trim();

  if(!name || !phone || !input) return alert("Nama, No. Telepon, dan Pesan harus diisi!");

  const { chatCustomer } = getData();
  chatCustomer.push({ name, phone, text: input });
  localStorage.setItem("chatCustomer", JSON.stringify(chatCustomer));

  document.getElementById("msg-input").value = "";
  renderChat();
}

renderChat();
