import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Settings, 
  EyeOff, 
   
   
  User, 
  Lock,
  MessageSquare,
  Newspaper,
  Power,
  ChevronRight,
  HeartPulse,
  Phone,
  X,
  
  Plus,
  Trash2,
  
  Mic,
  
  
  Map,
  Volume2,
  
  
  
  
  AlertCircle,
  ShieldCheck,
  
  
  Siren,
  FileText,
  Gavel,
  
  Flame,
  Users,
  Key,
  Video,
  
  CheckCircle
} from 'lucide-react';


const App = () => {
  // --- NAVIGATION & UI STATE ---
  const [view, setView] = useState('main'); 
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);
  const [holdingSafe, setHoldingSafe] = useState(false);
  const [isFakeDead, setIsFakeDead] = useState(false);
  const [isSirenOn, setIsSirenOn] = useState(false);
  const [isPoliceStrobeOn, setIsPoliceStrobeOn] = useState(false);
  const [isCoerced, setIsCoerced] = useState(false);
  const [showIntelPanel, setShowIntelPanel] = useState(false);
  const [evidenceSealed, setEvidenceSealed] = useState(false);
  const [showAllClearPrompt, setShowAllClearPrompt] = useState(false);
  
  // --- SAFETY DATA ---
  const [safetyTimer, setSafetyTimer] = useState(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [location, setLocation] = useState({ lat: "44.350", lng: "-78.730" }); // Mock current location
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [pin, setPin] = useState("");
  const [showPinPad, setShowPinPad] = useState(false);
  const [pinReason, setPinReason] = useState(null); 
  const [isDuressMode, setIsDuressMode] = useState(false);

  // --- DISPATCH & EMERGENCY SERVICES ---
  const [dispatchStatus, setDispatchStatus] = useState('offline'); // offline, connecting, connected, acknowledged
  const [incidentLogs, setIncidentLogs] = useState([]);
  const [trackingToken] = useState(Math.random().toString(36).substring(2, 10).toUpperCase());
  const [videoStreamActive, setVideoStreamActive] = useState(false);

  // --- SETTINGS & SENSORS ---
  const [voiceTriggerEnabled, setVoiceTriggerEnabled] = useState(false);
  const [shakeToSos, setShakeToSos] = useState(true);
  const [fallDetection, setFallDetection] = useState(true);
  const [silentRecording, setSilentRecording] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_cloudSyncActive, setCloudSyncActive] = useState(false);

  const [contacts] = useState([
    { id: 1, name: "Sarah (Sister)", phone: "+15550123" },
    { id: 2, name: "Marcus (Partner)", phone: "+15550987" }
  ]);

  // --- HAPTIC ENGINE ---
  const vibrate = (pattern) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  // --- BATTERY MONITORING ---
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100));
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
      });
    }
  }, []);

  // --- DISPATCH SIMULATION ---
  useEffect(() => {
    if (isSOSActive) {
      // HAPTIC CONFIRMATION OF SOS
      vibrate([500, 100, 500]); // Heavy-Light-Heavy pulse

      setDispatchStatus('connecting');
      addLog("Initializing NG911 Secure Tunnel...");
      
      const t0 = setTimeout(() => {
        addLog("Generating 320-bit Session Keys...");
      }, 1500);

      const t1 = setTimeout(() => {
        setDispatchStatus('connected');
        addLog("Live Telemetry Stream Established.");
        vibrate([200]); // Short pulse on connect
      }, 3500);

      const t2 = setTimeout(() => {
        setVideoStreamActive(true);
        addLog("Ghost Lens Video: CONNECTED (Background)");
      }, 5000);

      const t3 = setTimeout(() => {
        setDispatchStatus('acknowledged');
        addLog("INCIDENT ACKNOWLEDGED BY DISPATCHER #402");
        addLog("DISPATCH: We have visual. Units en route.");
        vibrate([200, 100, 200]); // Double pulse on acknowledgement
      }, 8000);

      return () => {
        clearTimeout(t0);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      setDispatchStatus('offline');
      setIncidentLogs([]);
      setEvidenceSealed(false);
      setIsPoliceStrobeOn(false);
      setVideoStreamActive(false);
    }
  }, [isSOSActive]);

  const addLog = (msg) => {
    setIncidentLogs(prev => [`[${new Date().toLocaleTimeString([], {hour12:false})}] ${msg}`, ...prev].slice(0, 5));
  };

  const reportIntel = (type) => {
    vibrate([50]); // Feedback for button press
    addLog(`TACTICAL INTEL: ${type}`);
    setTimeout(() => {
      addLog(`DISPATCH: Copy ${type}. Units advised.`);
    }, 1500);
  };

  // --- MOTION DETECTION (SHAKE & FALL) ---
  useEffect(() => {
    let lastUpdate = 0;
    let lastX, lastY, lastZ;
    
    const handleMotion = (e) => {
      if (isSOSActive) return;
      
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      
      const currTime = Date.now();
      if ((currTime - lastUpdate) > 100) {
        const diffTime = currTime - lastUpdate;
        lastUpdate = currTime;
        
        // Calculate Force
        const force = Math.abs(acc.x + acc.y + acc.z - lastX - lastY - lastZ) / diffTime * 10000;
        
        // SHAKE DETECTION
        if (shakeToSos && force > 800) {
          triggerSOS();
        }

        // FALL DETECTION (Simulated High G-Force)
        if (fallDetection && force > 2500) {
          // In real app: verify with gyroscope orientation change
          console.log("CRITICAL: Fall detected");
          triggerSOS(); 
        }

        if (acc.x !== null) {
            lastX = acc.x; lastY = acc.y; lastZ = acc.z;
        }
      }
    };
    if (typeof window !== 'undefined' && window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleMotion);
    }
    return () => {
        if (typeof window !== 'undefined' && window.DeviceMotionEvent) {
            window.removeEventListener('devicemotion', handleMotion);
        }
    };
  }, [shakeToSos, fallDetection, isSOSActive]);

  // --- GPS TRACKING ---
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) });
          if (isSOSActive) {
            setCloudSyncActive(true);
            if (Math.random() > 0.8) addLog(`GPS Update: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
          }
        }, 
        (_err) => console.warn("Geo Denied"), 
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isSOSActive]);

  // --- SOS & PIN LOGIC ---
  const triggerSOS = () => {
    if (isSOSActive) return;
    setIsSOSActive(true);
    setCountdown(null);
    setView('main');
    setIsDuressMode(false);
    setIsCoerced(false);
    if (isFakeDead) setIsFakeDead(false);
  };

  const handleHoldSafeStart = () => {
    setHoldingSafe(true);
    vibrate([50]); // Feedback
  };
  
  const handleHoldSafeRelease = () => {
    setHoldingSafe(false);
    if (!isSOSActive && !isDuressMode) setCountdown(10);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(c => c - 1);
        vibrate([30]); // Ticking haptic
      }, 1000);
    } else if (countdown === 0) {
      triggerSOS();
    }
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === "1234") { 
        if (pinReason === 'cancelSOS') {
          setIsSOSActive(false);
          setIsDuressMode(false);
          setIsSirenOn(false);
          setIsPoliceStrobeOn(false);
          setShowIntelPanel(false);
          setVideoStreamActive(false);
          setShowAllClearPrompt(true); // ASK TO  "I'M SAFE"
        }
        if (pinReason === 'stopTimer') {
          setIsTimerRunning(false);
          setSafetyTimer(0);
        }
        if (pinReason === 'revivePhone') setIsFakeDead(false);
        if (pinReason === 'sealEvidence') setEvidenceSealed(true);
        setShowPinPad(false);
        setCountdown(null);
      } else if (pin === "9999") { 
        setIsSOSActive(false);
        setIsDuressMode(true);
        setIsSirenOn(false);
        setIsPoliceStrobeOn(false);
        setShowIntelPanel(false);
        setShowPinPad(false);
        setView('main');
      } else if (pin === "0000") { 
        setIsCoerced(true);
        setShowPinPad(false);
        setIsSOSActive(false);
        setIsDuressMode(true); 
      }
      setPin("");
    }
  }, [pin, pinReason]);

  // --- SAFETY TIMER ---
  useEffect(() => {
    let interval;
    if (isTimerRunning && safetyTimer > 0) {
      interval = setInterval(() => setSafetyTimer(t => t - 1), 1000);
    } else if (safetyTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      triggerSOS();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, safetyTimer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const openSilentText = (recipient = "911", customBody = null) => {
    const body = customBody || `EMERGENCY. SILENT ALERT. HELP NEEDED. Track live: https://guardian-secure.live/t/${trackingToken} Location: https://maps.google.com/?q=${location.lat},${location.lng}`;
    window.location.href = `sms:${recipient}${window.navigator.userAgent.match(/iPhone/i) ? '&' : '?'}body=${encodeURIComponent(body)}`;
  };

  // --- UI DYNAMIC CLASSES ---
  const getMainContainerClass = () => {
    let base = "min-h-screen font-sans flex flex-col p-6 max-w-md mx-auto shadow-2xl relative transition-colors duration-300 ";
    if (isPoliceStrobeOn) return base + "bg-blue-600 animate-[pulse_0.1s_ease-in-out_infinite] border-8 border-red-600";
    if (isSirenOn) return base + "bg-red-600 animate-pulse";
    return base + "bg-slate-950 text-white";
  };

  // --- OVERLAYS ---

  if (showAllClearPrompt) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-[300] flex flex-col items-center justify-center p-8 animate-in zoom-in duration-300">
        <CheckCircle size={64} className="text-emerald-500 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2">SOS Deactivated</h2>
        <p className="text-slate-400 text-center mb-8">Do you want to notify your contacts that you are safe?</p>
        
        <button 
          onClick={() => {
             openSilentText("", "I AM SAFE. The previous SOS alert was a false alarm/resolved. No further help needed.");
             setShowAllClearPrompt(false);
          }}
          className="w-full py-4 bg-emerald-600 rounded-xl font-bold text-white mb-4"
        >
           "I'm Safe" Message
        </button>
        
        <button 
          onClick={() => setShowAllClearPrompt(false)}
          className="w-full py-4 bg-slate-800 rounded-xl font-bold text-slate-400"
        >
          No, Dismiss
        </button>
      </div>
    );
  }

  if (isCoerced) {
    return (
      <div className="fixed inset-0 bg-slate-100 flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-700">
        <AlertCircle size={64} className="text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Connection Error</h2>
        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          The application could not establish a secure connection to the server (Error 0x442). Please contact support.
        </p>
        <button onDoubleClick={() => setIsCoerced(false)} className="mt-12 text-slate-300 text-[10px] uppercase tracking-widest">Retrying in 60s...</button>
      </div>
    );
  }

  if (isFakeDead) {
    return (
      <div className="fixed inset-0 bg-black z-[200] cursor-none" onDoubleClick={() => { setPinReason('revivePhone'); setShowPinPad(true); }} />
    );
  }

  // --- STEALTH NEWS MODE ---
  if (stealthMode && !isSOSActive) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 font-sans select-none overflow-hidden">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Newspaper size={20} className="text-blue-600" /> Daily Brief</h1>
          <button onClick={() => setStealthMode(false)} className="opacity-0 w-20 h-10"></button>
        </div>
        <div className="space-y-6">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100"><p className="text-xs text-blue-500 font-bold mb-1">LOCAL</p><h2 className="font-bold text-slate-900">New library opening downtown</h2><p className="text-slate-600 text-sm mt-1">The facility will feature a digital lounge and community spaces...</p></div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100"><p className="text-xs text-green-500 font-bold mb-1">TECH</p><h2 className="font-bold text-slate-900">Why smart cities are the future</h2><p className="text-slate-600 text-sm mt-1">Urban planning is getting a massive digital upgrade this year...</p></div>
        </div>
        <div className="fixed bottom-0 inset-x-0 h-48 bg-transparent" onDoubleClick={triggerSOS} />
      </div>
    );
  }

  const PinPadOverlay = () => (
    <div className="fixed inset-0 bg-slate-950/98 z-[250] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
      <h2 className="text-xl font-bold mb-8 text-indigo-400 font-black">IDENTITY VERIFICATION</h2>
      <div className="flex gap-4 mb-12">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`w-4 h-4 rounded-full border-2 border-indigo-500/50 ${pin.length >= i ? 'bg-indigo-500 scale-125' : ''} transition-all`} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0].map((num, i) => (
          <button 
            key={i} 
            onClick={() => {
              if (num !== "") {
                setPin(p => p + num);
                vibrate([20]); // Haptic click
              }
            }}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-colors ${num === "" ? 'opacity-0' : 'bg-slate-900 border border-slate-800 active:bg-indigo-600'}`}
          >
            {num}
          </button>
        ))}
        <button onClick={() => { setShowPinPad(false); setPin(""); }} className="w-16 h-16 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center font-bold text-[10px] uppercase">Abort</button>
      </div>
    </div>
  );

  // --- INTEL PANEL OVERLAY ---
  const IntelPanel = () => (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 mt-4 animate-in slide-in-from-bottom">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-black uppercase text-indigo-400 tracking-widest">Tactical Intel Report</h3>
        <button onClick={() => setShowIntelPanel(false)}><X size={16} className="text-slate-500" /></button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => reportIntel("WEAPON SEEN")} className="p-3 bg-slate-800 rounded-xl flex items-center gap-2 hover:bg-red-900/40 active:bg-red-900 transition-colors border border-slate-700">
          <AlertCircle size={16} className="text-red-500" /> <span className="text-[10px] font-bold">WEAPON</span>
        </button>
        <button onClick={() => reportIntel("USER INJURED")} className="p-3 bg-slate-800 rounded-xl flex items-center gap-2 hover:bg-red-900/40 active:bg-red-900 transition-colors border border-slate-700">
          <HeartPulse size={16} className="text-red-500" /> <span className="text-[10px] font-bold">INJURY</span>
        </button>
        <button onClick={() => reportIntel("MULTIPLE SUSPECTS")} className="p-3 bg-slate-800 rounded-xl flex items-center gap-2 hover:bg-amber-900/40 active:bg-amber-900 transition-colors border border-slate-700">
          <Users size={16} className="text-amber-500" /> <span className="text-[10px] font-bold">GROUP</span>
        </button>
        <button onClick={() => reportIntel("FIRE/HAZARD")} className="p-3 bg-slate-800 rounded-xl flex items-center gap-2 hover:bg-orange-900/40 active:bg-orange-900 transition-colors border border-slate-700">
          <Flame size={16} className="text-orange-500" /> <span className="text-[10px] font-bold">FIRE</span>
        </button>
      </div>
      <p className="text-[9px] text-slate-500 mt-3 text-center">Tapping sends instant data packet to dispatch.</p>
    </div>
  );

  // --- MAIN APP RENDER ---
  return (
    <div className={getMainContainerClass()}>
      {showPinPad && <PinPadOverlay />}
      
      {/* Header */}
      {view === 'main' && (
        <div className="flex justify-between items-center mb-8 shrink-0 relative z-10">
          <div className="flex items-center gap-2" onClick={() => setView('main')}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg ${isSirenOn ? 'bg-white text-red-600' : 'bg-indigo-600 text-white shadow-indigo-900/30'}`}>
              <Shield size={22} />
            </div>
            <h1 className="text-xl font-black tracking-tighter">GUARDIAN<span className={isSirenOn ? 'text-white' : 'text-indigo-400'}>SILENT</span></h1>
          </div>
          <div className="flex items-center gap-3">
            {isDuressMode && <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />}
            {voiceTriggerEnabled && <Mic size={18} className="text-red-500 animate-pulse" />}
            <button onClick={() => setStealthMode(true)} className={`p-2 rounded-full transition-all border ${isSirenOn ? 'bg-white/20 border-white text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <EyeOff size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main View Logic */}
      <div className="flex-grow overflow-y-auto hide-scrollbar relative z-10">
        {view === 'main' && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 py-4">
            {isSOSActive ? (
              <div className="w-full space-y-4 text-center animate-in zoom-in duration-300">
                
                {/* Visual Status Indicator */}
                {!showIntelPanel && (
                  <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(220,38,38,0.4)] animate-pulse ${isSirenOn ? 'bg-white' : 'bg-red-600'}`}>
                    {evidenceSealed ? <Lock size={50} className="text-white" /> : <ShieldAlert size={60} className={isSirenOn ? 'text-red-600' : 'text-white'} />}
                  </div>
                )}
                
                {/* Dispatch Status Panel */}
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-left space-y-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Emergency Dispatch Feed</p>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${dispatchStatus === 'offline' ? 'bg-slate-500' : 'bg-emerald-500 animate-pulse'}`} />
                      <span className="text-[9px] font-bold uppercase">{dispatchStatus}</span>
                    </div>
                  </div>

                  {/* Encryption Badge */}
                  <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 p-1.5 rounded-lg w-fit">
                    <Key size={10} className="text-indigo-400" />
                    <span className="text-[8px] font-mono text-indigo-300 font-bold tracking-wider">320-BIT ENCRYPTION ACTIVE</span>
                  </div>

                  {/* Video Stream Badge - Stealth Mode */}
                  {videoStreamActive && (
                    <div className="flex items-center gap-2 bg-red-950/40 border border-red-500/30 p-2 rounded-lg animate-pulse">
                      <Video size={12} className="text-red-400" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-red-200">Ghost Lens Feed: LIVE</span>
                    </div>
                  )}
                  
                  {dispatchStatus === 'acknowledged' && (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg text-emerald-400 animate-in fade-in slide-in-from-top">
                      <ShieldCheck size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Responders In Route</span>
                    </div>
                  )}

                  <div className="space-y-1 mt-2">
                    {incidentLogs.map((log, i) => (
                      <p key={i} className={`text-[9px] font-mono tracking-tight ${i === 0 ? 'text-indigo-400' : 'text-slate-400'}`}>
                        {log}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Intel & Actions */}
                {showIntelPanel ? <IntelPanel /> : (
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button onClick={() => setShowIntelPanel(true)} className="p-4 bg-slate-900 rounded-2xl border border-slate-700 flex flex-col items-center gap-2 hover:bg-slate-800 active:scale-95 transition-all">
                      <FileText size={20} className="text-indigo-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Report Intel</span>
                    </button>
                    
                    <button 
                      onClick={() => { setIsPoliceStrobeOn(!isPoliceStrobeOn); setIsSirenOn(false); }}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2 active:scale-95 transition-all ${isPoliceStrobeOn ? 'bg-blue-600 border-blue-400' : 'bg-slate-900 border-slate-700'}`}
                    >
                      <Siren size={20} className={isPoliceStrobeOn ? 'text-white' : 'text-blue-500'} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{isPoliceStrobeOn ? 'STROBE ON' : 'POLICE BEACON'}</span>
                    </button>
                    
                    <button 
                      onClick={() => setIsSirenOn(!isSirenOn)} 
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2 active:scale-95 transition-all ${isSirenOn ? 'bg-red-100 border-white text-red-600' : 'bg-slate-900 border-slate-700'}`}
                    >
                      <Volume2 size={20} className={isSirenOn ? 'text-red-600' : 'text-red-500'} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{isSirenOn ? 'SILENCE' : 'PANIC SIREN'}</span>
                    </button>

                    <button 
                      onClick={() => { setPinReason('sealEvidence'); setShowPinPad(true); }}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2 active:scale-95 transition-all ${evidenceSealed ? 'bg-emerald-900/40 border-emerald-500' : 'bg-slate-900 border-slate-700'}`}
                    >
                      <Gavel size={20} className={evidenceSealed ? 'text-emerald-400' : 'text-slate-400'} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{evidenceSealed ? 'SEALED' : 'SEAL EVIDENCE'}</span>
                    </button>
                  </div>
                )}
                
                <button onClick={() => { setPinReason('cancelSOS'); setShowPinPad(true); }} className="w-full py-4 bg-red-950/50 border border-red-900/50 rounded-2xl text-red-400 font-bold text-xs tracking-widest active:bg-red-900">
                  STOP EMERGENCY (PIN)
                </button>
              </div>
            ) : (
              <>
                {/* Hold to Safeguard */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-indigo-600 rounded-full blur-3xl opacity-20 transition-all duration-700 ${holdingSafe ? 'opacity-50 scale-150' : ''}`} />
                  <button 
                    onMouseDown={handleHoldSafeStart} onMouseUp={handleHoldSafeRelease}
                    onTouchStart={handleHoldSafeStart} onTouchEnd={handleHoldSafeRelease}
                    className={`relative w-52 h-52 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${holdingSafe ? 'bg-indigo-600 border-indigo-400 scale-105 rotate-3' : 'bg-slate-900 border-slate-800 active:scale-95'}`}
                  >
                    <Power size={64} className={holdingSafe ? 'text-white' : 'text-slate-600'} />
                    <span className="text-[11px] font-black mt-5 tracking-[0.3em] uppercase px-4 text-center">
                      {holdingSafe ? 'SURVEILLANCE ON' : 'HOLD IF UNEASY'}
                    </span>
                  </button>
                </div>

                {countdown !== null && (
                  <div className="text-center animate-bounce">
                    <div className="bg-red-600/20 border border-red-500/50 px-6 py-2 rounded-full inline-block">
                      <p className="text-red-500 font-black tracking-widest text-sm uppercase tracking-wider">SOS in {countdown}s</p>
                    </div>
                  </div>
                )}

                {/* Main Feature Grid */}
                <div className="w-full grid grid-cols-2 gap-4 mt-4">
                  <button onClick={() => setView('text911')} className="p-5 bg-slate-900 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col gap-3 active:scale-95 text-left">
                    <MessageSquare size={20} className="text-red-400" />
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-tight">Silent Text</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">SMS 911</p>
                    </div>
                  </button>
                  <button onClick={() => setView('safemap')} className="p-5 bg-slate-900 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col gap-3 active:scale-95 text-left">
                    <Map size={20} className="text-emerald-400" />
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-tight">Havens</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Safe Points</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => {
                      if (!isTimerRunning) {
                        setSafetyTimer(15 * 60);
                        setIsTimerRunning(true);
                      } else {
                        setPinReason('stopTimer');
                        setShowPinPad(true);
                      }
                    }} 
                    className={`p-5 rounded-3xl border transition-all flex flex-col gap-3 active:scale-95 text-left ${isTimerRunning ? 'bg-indigo-950/40 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}
                  >
                    <Clock size={20} className="text-indigo-400" />
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-tight">{isTimerRunning ? formatTime(safetyTimer) : 'Safety Timer'}</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{isTimerRunning ? 'SOS READY' : '15:00 Start'}</p>
                    </div>
                  </button>
                  <button onClick={() => setView('health')} className="p-5 bg-slate-900 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col gap-3 active:scale-95 text-left">
                    <HeartPulse size={20} className="text-pink-400" />
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-tight">Health ID</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Medical</p>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Dynamic Sub-views */}
        {view === 'health' && <HealthIDView onBack={() => setView('main')} />}
        {view === 'text911' && <SilentTextView onBack={() => setView('main')} onSend={openSilentText} contacts={contacts} token={trackingToken} />}
        {view === 'safemap' && <SafeMapView onBack={() => setView('main')} />}
        {view === 'settings' && <SettingsView 
          onBack={() => setView('main')}
          shakeToSos={shakeToSos} setShakeToSos={setShakeToSos}
          voiceTriggerEnabled={voiceTriggerEnabled} setVoiceTriggerEnabled={setVoiceTriggerEnabled}
          silentRecording={silentRecording} setSilentRecording={setSilentRecording}
          fallDetection={fallDetection} setFallDetection={setFallDetection}
          token={trackingToken}
        />}
        
        {view === 'fakecall' && <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col items-center justify-between py-24 px-12 animate-in fade-in zoom-in">
          <div className="text-center">
            <div className="w-24 h-24 bg-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl"><User size={50} className="text-white" /></div>
            <h2 className="text-4xl font-light text-white">Mom</h2>
            <p className="text-indigo-400 mt-2 tracking-widest animate-pulse uppercase text-sm font-bold">Inbound calling...</p>
          </div>
          <div className="flex justify-between w-full max-w-xs">
            <button onClick={() => setView('main')} className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg"><Phone className="rotate-[135deg] text-white" size={32} /></button>
            <button onClick={() => setView('main')} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg"><Phone className="text-white" size={32} /></button>
          </div>
        </div>}

        {view === 'contacts' && (
          <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setView('main')} className="p-2 bg-slate-900 rounded-lg"><ChevronRight className="rotate-180" /></button>
              <h2 className="text-2xl font-black">Guardians</h2>
            </div>
            <div className="space-y-3">
              {contacts.map(c => (
                <div key={c.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex justify-between items-center group">
                  <div>
                    <p className="font-bold text-white text-sm">{c.name}</p>
                    <p className="text-xs text-slate-500 mt-1 font-mono tracking-tighter">{c.phone}</p>
                  </div>
                  <button className="p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
              ))}
              <button className="w-full py-5 border-2 border-dashed border-slate-800 rounded-2xl text-slate-600 font-bold flex items-center justify-center gap-2 hover:border-indigo-500 hover:text-indigo-400 transition-all mt-4 uppercase text-xs tracking-widest">
                <Plus size={20} /> Add New Guard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Nav */}
      <div className={`mt-8 pt-6 border-t border-slate-900 flex justify-between items-center shrink-0 relative z-10 ${isSirenOn || isPoliceStrobeOn ? 'bg-transparent' : 'bg-slate-950'}`}>
        <button onClick={() => setView('main')} className={`flex flex-col items-center gap-1 transition-all ${view === 'main' ? 'text-indigo-400 scale-110 font-bold' : 'opacity-30'}`}>
          <Shield size={22} />
          <span className="text-[9px] uppercase tracking-tighter font-black">Protect</span>
        </button>
        <button onClick={() => setView('contacts')} className={`flex flex-col items-center gap-1 transition-all ${view === 'contacts' ? 'text-indigo-400 scale-110 font-bold' : 'opacity-30'}`}>
          <User size={22} />
          <span className="text-[9px] uppercase tracking-tighter font-black">Guards</span>
        </button>
        <button onClick={() => setView('settings')} className={`flex flex-col items-center gap-1 transition-all ${view === 'settings' ? 'text-indigo-400 scale-110 font-bold' : 'opacity-30'}`}>
          <Settings size={22} />
          <span className="text-[9px] uppercase tracking-tighter font-black">Setup</span>
        </button>
      </div>

      {/* GPS Bar */}
      <div className={`mt-6 flex items-center justify-center gap-6 text-[9px] font-mono tracking-tighter uppercase font-bold relative z-10 ${isSirenOn || isPoliceStrobeOn ? 'text-white' : 'text-slate-700'}`}>
        <div className="flex items-center gap-1.5"><MapPin size={10} className={isSirenOn || isPoliceStrobeOn ? 'text-white' : 'text-emerald-900'} /> {location.lat}, {location.lng}</div>
        <div className="flex items-center gap-1.5"><Lock size={10} className={isSirenOn || isPoliceStrobeOn ? 'text-white' : 'text-indigo-900'} /> {batteryLevel}% Power</div>
      </div>
    </div>
  );
};


// --- SUB-COMPONENTS ---
// Subcomponents moved to `src/pages/*` for better organization

export default App;
