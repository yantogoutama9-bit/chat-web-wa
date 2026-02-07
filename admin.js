const supabase = supabaseJs.createClient(
  "https://XXXX.supabase.co",
  "ANON_KEY_LO"
)

const ADMIN_PIN = "1234"

function login() {
  const pin = document.getElementById('pin').value
  if (pin !== ADMIN_PIN) {
    alert("PIN salah")
    return
  }

  document.getElementById('login').style.display = 'none'
  document.getElementById('dashboard').style.display = 'block'
  loadChats()
}

async function loadChats() {
  const { data, error } = await supabase
    .from('chats')
    .select(`
      id,
      customers(name, phone),
      messages(content, sender)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    document.getElementById('list').innerText = error.message
    return
  }

  if (!data.length) {
    document.getElementById('list').innerText = "Belum ada chat"
    return
  }

  document.getElementById('list').innerHTML =
    data.map(c => `
      <div style="border:1px solid #ccc;margin:10px;padding:10px">
        <b>${c.customers.name}</b> (${c.customers.phone})
        <ul>
          ${c.messages.map(m => `<li>${m.sender}: ${m.content}</li>`).join('')}
        </ul>
      </div>
    `).join('')
}
