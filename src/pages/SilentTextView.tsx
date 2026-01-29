import React from 'react'
import { ChevronRight, Send, Globe } from 'lucide-react'

type Contact = { id: number; name: string; phone: string }

const SilentTextView: React.FC<{ onBack: () => void; onSend: (recipient: string) => void; contacts: Contact[]; token: string }> = ({ onBack, onSend, contacts, token }) => (
  <div className="h-full flex flex-col animate-in slide-in-from-bottom duration-300">
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack} className="p-2 bg-slate-900 rounded-lg"><ChevronRight className="rotate-180" /></button>
      <h2 className="text-2xl font-black">Silent SMS</h2>
    </div>
    <div className="space-y-6">
      <button onClick={() => onSend("911")} className="w-full p-8 bg-red-600 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
        <Send size={32} />
        <span className="font-black text-xl tracking-tighter">TEXT 911</span>
        <div className="bg-black/20 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Globe size={10} className="text-red-200" />
          <span className="text-[8px] uppercase tracking-widest font-black text-red-100">Attached tracking: {token}</span>
        </div>
      </button>
      <div className="space-y-3">
        {contacts.map(c => (
          <button key={c.id} onClick={() => onSend(c.phone)} className="w-full p-4 bg-slate-900 rounded-2xl flex items-center justify-between border border-slate-800 active:bg-indigo-900/20">
            <span className="font-bold text-sm">{c.name}</span>
            <Send size={16} className="text-indigo-400" />
          </button>
        ))}
      </div>
    </div>
  </div>
)

export default SilentTextView
