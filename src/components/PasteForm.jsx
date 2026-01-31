
import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000"

export default function PasteForm() {
  const [content, setContent] = useState('')
  const [ttl, setTtl] = useState('')
  const [link, setLink] = useState('')

  async function submit() {
    const res = await fetch(`${API_BASE}/api/pastes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined
      })
    })
    const data = await res.json()
    setLink(data.url)
  }

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Pastebin Lite</h1>
      <textarea
        className="w-full border p-2 rounded mb-3"
        rows="6"
        placeholder="Write your paste here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <input
        type="number"
        placeholder="TTL in seconds (optional)"
        className="w-full border p-2 rounded mb-3"
        value={ttl}
        onChange={e => setTtl(e.target.value)}
      />
      <button
        onClick={submit}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Create Paste
      </button>

      {link && (
        <div className="mt-4 text-sm break-all">
          <p className="font-semibold">Shareable Link:</p>
          <a className="text-blue-600 underline" href={link} target="_blank">
            {link}
          </a>
        </div>
      )}
    </div>
  )
}
