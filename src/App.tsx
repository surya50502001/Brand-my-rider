import React, { useState, Suspense } from 'react';
import Scene from './components/Scene';
import { HELMETS, DEMO_AUCTION } from './data';
import { Helmet } from './types';
import { ShieldCheck, Info, ChevronRight, Wind, Activity } from 'lucide-react';

export default function App() {
  const [selectedHelmetId, setSelectedHelmetId] = useState<string>(HELMETS[0].id);
  
  const selectedHelmet = HELMETS.find(h => h.id === selectedHelmetId) || HELMETS[0];
  const featuredHelmet = HELMETS.find(h => h.id === DEMO_AUCTION.helmetId);

  return (
    <div className="w-full h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden relative selection:bg-red-900 selection:text-white">
      
      {/* 3D WEBGL BACKGROUND SCENE */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center text-zinc-500 font-mono text-sm tracking-widest">
            LOADING SCENE...
          </div>
        }>
          <Scene selectedHelmet={selectedHelmet} />
        </Suspense>
      </div>

      {/* UI OVERLAY LAYER */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10">
        
        {/* TOP ROW: Branding & Sponsorship */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          
          {/* HEADER */}
          <header className="pointer-events-auto">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none uppercase">
              Ride the<br />Moment.
            </h1>
            <p className="text-sm text-zinc-400 font-medium tracking-wide max-w-xs">
              Explore premium helmets on a rider in motion. The moment lasts forever.
            </p>
          </header>

          {/* AUCTION / SPONSORSHIP PANEL */}
          {featuredHelmet && (
            <div className="pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 w-full max-w-[260px] shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  Featured Helmet
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white leading-tight">
                {featuredHelmet.brand} <span className="font-light">{featuredHelmet.model}</span>
              </h3>
              
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Current Bid</span>
                  <span className="text-lg font-mono font-bold text-red-400">
                    ₹{DEMO_AUCTION.currentBid.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Ends In</span>
                  <span className="text-xs font-mono font-bold text-white">04:21:38</span>
                </div>
              </div>
              
              <button className="mt-4 w-full py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider rounded transition-colors">
                View Auction
              </button>
            </div>
          )}
        </div>

        {/* MIDDLE-LEFT: Helmet Details (Only visible on Desktop or Tablets) */}
        <div className="hidden md:block pointer-events-auto bg-black/20 backdrop-blur-sm border border-white/5 rounded-xl p-6 w-full max-w-[320px] self-start mt-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">
              {selectedHelmet.brand}
            </h2>
            <span className="text-sm font-bold text-red-500 font-mono">
              ${selectedHelmet.price}
            </span>
          </div>
          
          <h3 className="text-lg font-medium text-zinc-300 mb-6">{selectedHelmet.model}</h3>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-zinc-500" />
              <span>{selectedHelmet.certification}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <Activity className="w-4 h-4 text-zinc-500" />
              <span>{selectedHelmet.type}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <Wind className="w-4 h-4 text-zinc-500" />
              <span>{selectedHelmet.weight}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded transition-colors">
              Buy Now
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded transition-colors">
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BOTTOM ROW: Helmet Selector Carousel */}
        <div className="pointer-events-auto w-full">
          <div className="mb-3">
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
              Choose Your Helmet
            </span>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar">
            {HELMETS.map((helmet) => {
              const isSelected = helmet.id === selectedHelmetId;
              return (
                <button
                  key={helmet.id}
                  onClick={() => setSelectedHelmetId(helmet.id)}
                  className={`flex-shrink-0 snap-start relative overflow-hidden group w-[160px] h-[90px] rounded-xl border transition-all duration-300 flex flex-col justify-end p-3 text-left
                    ${isSelected 
                      ? 'border-red-500 bg-black/60 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                      : 'border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/30'}`}
                >
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />
                  
                  {/* Subtle color hint bar */}
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: helmet.color }} />
                  
                  <div className="relative z-10">
                    <h4 className={`font-black text-sm uppercase tracking-tight truncate ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                      {helmet.brand}
                    </h4>
                    <p className="text-[10px] text-zinc-400 truncate">{helmet.model}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Global styles for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
