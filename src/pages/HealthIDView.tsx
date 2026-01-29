import React from 'react'
import { ChevronRight } from 'lucide-react'

const HealthIDView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack} className="p-2 bg-slate-900 rounded-lg"><ChevronRight className="rotate-180" /></button>
      <h2 className="text-2xl font-black">Health ID</h2>
    </div>
    <div className="space-y-4">
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800"><p className="text-[10px] text-indigo-400 font-bold uppercase mb-1 tracking-widest">Blood Type</p><p className="text-lg text-white font-black">O Positive</p></div>
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800"><p className="text-[10px] text-indigo-400 font-bold uppercase mb-1 tracking-widest">Allergies</p><p className="text-sm text-white font-bold leading-relaxed">Peanuts, Penicillin</p></div>
      <div className="bg-red-900/10 p-5 rounded-2xl border border-red-900/30"><p className="text-[10px] text-red-400 font-bold uppercase mb-1 tracking-widest">Emergency Note</p><p className="text-white italic text-sm">"Contact Sarah immediately. Critical asthma risk."</p></div>
    </div>
  </div>
)

export default HealthIDView
