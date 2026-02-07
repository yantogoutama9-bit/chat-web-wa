const supabase = supabaseJs.createClient(
  "https://XXXX.supabase.co",
  "ANON_KEY_LO"
)

async function send() {
  const name = document.getElementById('name').value
  const phone = document.getElementById('phone').value
  const msg = document.getElementById('msg').value
  const log = document.getElementById('log')

  // 1. insert customer
  const { data: customer, error: cErr } = await supabase
    .from('customers')
    .insert({ name, phone })
    .select()
    .single()

  if (cErr) return log.textContent = cErr.message

  // 2. BUAT CHAT (KRUSIAL)
  const { data: chat, error: chErr } = await supabase
    .from('chats')
    .insert({ customer_id: customer.id })
    .select()
    .single()

  if (chErr) return log.textContent = chErr.message

  // 3. insert message
  const { error: mErr } = await supabase
    .from('messages')
    .insert({
      chat_id: chat.id,
      sender: 'customer',
      content: msg
    })

  if (mErr) return log.textContent = mErr.message

  log.textContent = "Pesan terkirim ✔"
}