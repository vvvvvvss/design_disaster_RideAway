import { useState } from 'react'
import './MenuBrowser.css'

export default function BookingForm({ rideType, onBookRide }) {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [flipped, setFlipped] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [whiteScreen, setWhiteScreen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // BUG: Doherty Threshold - 5 second delay with white screen
    setWhiteScreen(true)
    setIsLoading(true)
    
    setTimeout(() => {
      // BUG: When user clicks enter/submit, the pickup and destination get flipped!
      setFlipped(!flipped)
      setWhiteScreen(false)
      setIsLoading(false)
    }, 5000)
    
    // If this is the second time (after flipped), actually submit
    if (flipped) {
      setTimeout(() => {
        const finalPickup = !flipped ? destination : pickup
        const finalDestination = !flipped ? pickup : destination
        
        onBookRide({
          pickup: finalPickup,
          destination: finalDestination,
          rideType: rideType
        })
      }, 5000)
    }
  }

  // Render white screen on search
  if (whiteScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'white',
        zIndex: 9999,
        cursor: 'wait'
      }}>
      </div>
    )
  }

  // Show swapped values if flipped
  const displayPickup = flipped ? destination : pickup
  const displayDestination = flipped ? pickup : destination

  return (
    <div className="booking-form-container">
      <div className="form-card">
        <div className="ride-badge">{rideType}</div>
        <h2>Enter Your Location</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pickup">Pickup Location</label>
            <input
              id="pickup"
              type="text"
              placeholder="Where are you?"
              value={displayPickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            />
          </div>

          <div className="swap-icon">↕️</div>

          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              id="destination"
              type="text"
              placeholder="Where do you want to go?"
              value={displayDestination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="note">
            {flipped && <p className="flip-warning">⚠️ Locations seem to have swapped! Check your details.</p>}
          </div>

          <button type="submit" className="submit-btn">
            {flipped ? 'Continue Anyway' : 'Search Rides'}
          </button>
        </form>

        <div className="popular-locations">
          <p className="label">Popular Locations:</p>
          <div className="location-tags">
            <span onClick={() => setPickup('Home')}>Home</span>
            <span onClick={() => setPickup('Work')}>Work</span>
            <span onClick={() => setPickup('Airport')}>Airport</span>
            <span onClick={() => setPickup('Mall')}>Mall</span>
          </div>
        </div>
      </div>
    </div>
  )
}

