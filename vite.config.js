import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // THIS IS THE FIX: Tell Vite your repo name
  base: '/design_disaster_RideAway/', 
  server: {
    port: 3000
  }
})