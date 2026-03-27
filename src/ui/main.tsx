/**
 * UI Entry Point
 * 
 * Initializes the React application.
 * In Vite mode, we fetch initial data from the API.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './styles.css';

// Type definitions for global utilities (AppData declared in App.tsx)
declare global {
  interface Window {
    GRADIENT_TEMPLATES: Record<string, string>;
    DEFAULT_PALETTES: Record<string, { primary: string; secondary: string; accent: string }>;
    applyPaletteToGradient: (template: string, palette: { primary: string; secondary: string; accent: string }) => string;
  }
}

// Initialize global palette utilities
window.GRADIENT_TEMPLATES = {};
window.DEFAULT_PALETTES = {};
window.applyPaletteToGradient = (template: string, palette: { primary: string; secondary: string; accent: string }) => {
  return template
    .replace(/\{primary\}/g, palette.primary)
    .replace(/\{secondary\}/g, palette.secondary)
    .replace(/\{accent\}/g, palette.accent);
};

// Fetch initial data and mount application
async function init() {
  try {
    let appData = (window as any).__APP_DATA__;
    
    // If data wasn't injected by server, fetch it from API
    if (!appData || !appData.config) {
      const response = await fetch('/api/init');
      if (!response.ok) {
        throw new Error(`Failed to load app data: ${response.status}`);
      }
      appData = await response.json();
    }
    
    // Store global utilities for palette system
    window.__APP_DATA__ = appData;
    window.GRADIENT_TEMPLATES = appData.gradientTemplates || {};
    window.DEFAULT_PALETTES = appData.palettes || {};
    
    // Mount application
    const root = createRoot(document.getElementById('root')!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize app:', error);
    document.getElementById('root')!.innerHTML = `
      <div class="flex items-center justify-center h-screen bg-[#0f0f0f] text-white font-sans">
        <div class="text-center p-8 max-w-md">
          <div class="text-red-500 text-5xl mb-4">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h1 class="text-2xl font-bold mb-2">Connection Error</h1>
          <p class="text-zinc-400 mb-6">
            The application could not connect to the API server.
          </p>
          <div class="bg-zinc-800/50 p-4 rounded text-left border border-zinc-700">
            <p class="text-xs text-zinc-500 uppercase font-bold mb-2">Troubleshooting:</p>
            <ul class="text-sm text-zinc-300 space-y-2 list-disc ml-4">
              <li>Ensure the server is running.</li>
              <li>Check your network connection.</li>
              <li>Refresh the page to try again.</li>
            </ul>
          </div>
          <button onclick="location.reload()" class="mt-8 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-medium transition-colors">
            Try Again
          </button>
        </div>
      </div>
    `;
  }
}

init();
