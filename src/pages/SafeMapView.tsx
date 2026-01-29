import React from 'react'
import { ChevronRight, MapPin } from 'lucide-react'

const SafeMapView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
    <div className="flex items-center gap-4 mb-6">
      <button onClick={onBack} className="p-2 bg-slate-900 rounded-lg"><ChevronRight className="rotate-180" /></button>
      <h2 className="text-2xl font-black">Safe Havens</h2>
    </div>
    <div className="space-y-3">
      {[
        { name: "Central General Hospital", dist: "0.8mi", type: "Medical" },
        { name: "Downtown Police Precinct", dist: "1.2mi", type: "Security" },
        { name: "24h Metro Diner", dist: "0.4mi", type: "Public" },
      ].map((place, i) => (
        <div key={i} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center group active:scale-95 transition-all">
          <div><p className="font-bold text-white text-sm">{place.name}</p><p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{place.type} • {place.dist}</p></div>
          <button className="p-3 bg-indigo-600 rounded-xl"><MapPin size={18} /></button>
        </div>
      ))}
    </div>
  </div>
)

export default SafeMapView
