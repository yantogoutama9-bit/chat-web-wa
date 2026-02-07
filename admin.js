const supabase = supabaseJs.createClient(
  "https://XXXX.supabase.co",
  "ANON_KEY_LO"
)

async function load() {
  const { data, error } = await supabase
    .from('chats')
    .select(`
      id,
      customers(name, phone),
      messages(content, sender)
    `)
    .order('id', { ascending: false })

  if (error) {
    document.body.innerText = error.message
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

load()