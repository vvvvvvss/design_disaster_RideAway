import { useState } from 'react'
import './Checkout.css'

export default function RideMap({ pickup, destination, onConfirm, onBack }) {
  const [cancelButtonPosition, setCancelButtonPosition] = useState({ x: 0, y: 0 })
  const [mapZoom, setMapZoom] = useState(25) // Ridiculously zoomed in
  const [attempts, setAttempts] = useState(0)
  const [confirmClicked, setConfirmClicked] = useState(false)

  // BUG: Cancel button moves away when you try to hover/click it
  const handleCancelHover = () => {
    const randomX = Math.random() * 200 - 100
    const randomY = Math.random() * 200 - 100
    setCancelButtonPosition({ x: randomX, y: randomY })
    setAttempts(attempts + 1)
  }

  const handleZoomChange = (direction) => {
    if (direction === 'in') {
      // Zoom in makes it even MORE zoomed in (ridiculous)
      setMapZoom(mapZoom + 15)
    } else {
      // Zoom out goes to absurd levels
      setMapZoom(Math.max(1, mapZoom - 30))
    }
  }

  return (
    <div className="ride-map-container">
      <div className="map-section">
        <h2>Route Map</h2>
        <div className="map-placeholder" style={{zoom: mapZoom / 100}}>
          {/* BUG: Map is either completely zoomed in or zoomed out */}
          <div className="fake-map">
            <div className="location-marker pickup-marker">📍</div>
            <div className="location-marker destination-marker">📍</div>
            <div className="route-line"></div>
          </div>
        </div>

        <div className="zoom-controls">
          <button onClick={() => handleZoomChange('out')}>−</button>
          <span>{mapZoom}%</span>
          <button onClick={() => handleZoomChange('in')}>+</button>
        </div>

        <div className="info-section">
          <div className="location-info">
            <p><strong>Pickup:</strong> {pickup}</p>
            <p><strong>Destination:</strong> {destination}</p>
          </div>
        </div>
      </div>

      <div className="confirm-section">
        <h3>Confirm Your Ride</h3>
        <div className="ride-details">
          <p>Estimated fare: ₹{Math.floor(Math.random() * 400) + 150}</p>
          <p>Estimated time: {Math.floor(Math.random() * 15) + 5} mins</p>
        </div>

        <div className="button-group">
          {/* BUG: Fitts's Law violation - tiny confirm button hidden in T&C text */}
          <div style={{
            marginBottom: '20px',
            padding: '10px',
            fontSize: '12px',
            color: '#888',
            lineHeight: '1.6',
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#f9f9f9'
          }}>
            <p style={{margin: '0 0 8px 0', fontSize: '11px'}}>
              <strong>Terms and Conditions:</strong> By using this service, you agree to our terms. 
              This service is provided "as-is" without warranties. We reserve the right to modify 
              prices at any time. Your use of this application constitutes acceptance of these terms. 
              The driver may cancel without notice. Payments are non-refundable. <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setConfirmClicked(true)
                  onConfirm()
                }}
                style={{
                  fontSize: '10px',
                  color: '#4a90e2',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >Confirm</a> We are not 
              responsible for delays, accidents or driver behavior. Surge pricing may apply. 
              Your data is collected and processed according to our privacy policy.
            </p>
          </div>

          {/* BUG: Cancel button that keeps moving away */}
          <button
            className="cancel-btn"
            onMouseEnter={handleCancelHover}
            onClick={handleCancelHover}
            style={{
              transform: `translate(${cancelButtonPosition.x}px, ${cancelButtonPosition.y}px)`,
              transition: 'transform 0.2s',
            }}
          >
            Cancel
          </button>

          {attempts > 3 && (
            <p className="frustrated-msg">
              🎯 Still trying to cancel? Good luck!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

