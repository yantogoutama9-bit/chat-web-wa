const supabase = supabaseJs.createClient(
  "https://XXXX.supabase.co",
  "ANON_KEY_LO"
)

async function send() {
  const nameEl = document.getElementById('name')
  const phoneEl = document.getElementById('phone')
  const msgEl = document.getElementById('msg')
  const log = document.getElementById('log')

  const name = nameEl.value.trim()
  const phone = phoneEl.value.trim()
  const msg = msgEl.value.trim()

  if (!name || !phone || !msg) {
    log.textContent = "Lengkapi semua field"
    return
  }

  log.textContent = "Mengirim..."

  // 1. customer
  const { data: customer, error: cErr } = await supabase
    .from('customers')
    .insert({ name, phone })
    .select()
    .single()

  if (cErr) {
    log.textContent = cErr.message
    return
  }

  // 2. chat
  const { data: chat, error: chErr } = await supabase
    .from('chats')
    .insert({ customer_id: customer.id })
    .select()
    .single()

  if (chErr) {
    log.textContent = chErr.message
    return
  }

  // 3. message
  const { error: mErr } = await supabase
    .from('messages')
    .insert({
      chat_id: chat.id,
      sender: 'customer',
      content: msg
    })

  if (mErr) {
    log.textContent = mErr.message
    return
  }

  // ✅ CLEAR INPUT (INI YANG LO TANYA)
  msgEl.value = ''

  log.textContent = "Pesan terkirim ✔"
}
