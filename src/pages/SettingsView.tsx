import React from 'react'
import { ChevronRight, Lock, Share2 } from 'lucide-react'

const SettingsView: React.FC<{
  onBack: () => void;
  shakeToSos: boolean; setShakeToSos: (v: boolean) => void;
  
  silentRecording: boolean; setSilentRecording: (v: boolean) => void;
  fallDetection: boolean; setFallDetection: (v: boolean) => void;
  token: string;
}> = ({ onBack, shakeToSos, setShakeToSos, silentRecording, setSilentRecording, fallDetection, setFallDetection, token }) => (
  <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack} className="p-2 bg-slate-900 rounded-lg"><ChevronRight className="rotate-180" /></button>
      <h2 className="text-2xl font-black">Security</h2>
    </div>
    <div className="space-y-4">
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div><p className="font-bold text-white text-sm">Emergency Shake</p><p className="text-[10px] text-slate-500 mt-1 uppercase">Instant SOS on struggle</p></div>
        <button onClick={() => setShakeToSos(!shakeToSos)} className={`w-10 h-5 rounded-full relative transition-colors ${shakeToSos ? 'bg-indigo-600' : 'bg-slate-700'}`}>
          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${shakeToSos ? 'left-6' : 'left-1'}`} />
        </button>
      </div>
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div><p className="font-bold text-white text-sm">Fall Detection</p><p className="text-[10px] text-slate-500 mt-1 uppercase">Trigger SOS on impact</p></div>
        <button onClick={() => setFallDetection(!fallDetection)} className={`w-10 h-5 rounded-full relative transition-colors ${fallDetection ? 'bg-indigo-600' : 'bg-slate-700'}`}>
          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${fallDetection ? 'left-6' : 'left-1'}`} />
        </button>
      </div>
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div><p className="font-bold text-white text-sm">Silent Recording</p><p className="text-[10px] text-slate-500 mt-1 uppercase">Evidence Locker</p></div>
        <button onClick={() => setSilentRecording(!silentRecording)} className={`w-10 h-5 rounded-full relative transition-colors ${silentRecording ? 'bg-indigo-600' : 'bg-slate-700'}`}>
          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${silentRecording ? 'left-6' : 'left-1'}`} />
        </button>
      </div>
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between group cursor-pointer">
        <div className="flex-grow">
          <p className="font-bold text-white text-sm">NG911 Tracking ID</p>
          <p className="text-[10px] text-indigo-400 mt-1 font-mono">{token}</p>
        </div>
        <Share2 size={18} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
      </div>
      <div className="bg-indigo-900/10 p-5 rounded-2xl border border-indigo-500/20 mt-4">
        <p className="text-[10px] text-indigo-400 font-black uppercase mb-2 flex items-center gap-2 tracking-widest"><Lock size={12} /> Neural Encryption</p>
        <p className="text-xs text-slate-400 leading-relaxed italic">Guardian Silent uses advanced 320-bit encryption algorithms for all audio logs, location snapshots, and telemetry.</p>
      </div>
    </div>
  </div>
)

export default SettingsView
