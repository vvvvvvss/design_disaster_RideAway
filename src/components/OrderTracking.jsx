import { useState, useEffect } from 'react'
import './OrderTracking.css'

export default function RideTracking({ rides }) {
  const [driverUpdates, setDriverUpdates] = useState({})

  useEffect(() => {
    // Simulate random driver position updates (not synchronized properly)
    const interval = setInterval(() => {
      const updates = {}
      rides.forEach(ride => {
        updates[ride.id] = {
          lat: 28.6139 + (Math.random() - 0.5) * 0.1,
          lng: 77.2090 + (Math.random() - 0.5) * 0.1,
          eta: Math.floor(Math.random() * 30) + 2
        }
      })
      setDriverUpdates(updates)
    }, 3000)

    return () => clearInterval(interval)
  }, [rides])

  return (
    <div className="ride-tracking-container">
      <div className="tracking-header">
        <h1>Your Ride</h1>
        <p>Track your driver in real-time</p>
      </div>

      {rides.length === 0 ? (
        <div className="no-rides">
          <p>No active rides</p>
        </div>
      ) : (
        <div className="rides-list">
          {rides.map((ride) => (
            <div key={ride.id} className="ride-card">
              <div className="ride-header">
                <h2>{ride.rideType} - #{ride.id.toString().slice(0, 6)}</h2>
                <span className="ride-status">{ride.status}</span>
              </div>

              <div className="ride-locations">
                <div className="location">
                  <p className="label">📍 From:</p>
                  <p className="address">{ride.pickup}</p>
                </div>
                <div className="location">
                  <p className="label">🎯 To:</p>
                  <p className="address">{ride.destination}</p>
                </div>
              </div>

              <div className="driver-info">
                <h3>Driver Information</h3>
                <p><strong>Name:</strong> Rajesh Kumar</p>
                <p><strong>Rating:</strong> 4.8 ⭐</p>
                <p><strong>Vehicle:</strong> Silver {ride.rideType}</p>
                <p><strong>License Plate:</strong> DL-01-AB-1234</p>
              </div>

              <div className="eta-info">
                <div className="eta-item">
                  <span className="eta-label">Estimated Arrival:</span>
                  <span className="eta-value">
                    {driverUpdates[ride.id]?.eta || ride.eta} mins
                  </span>
                </div>
                <div className="eta-item">
                  <span className="eta-label">Fare:</span>
                  <span className="eta-value">₹{ride.price}</span>
                </div>
              </div>

              <div className="map-mini">
                <div className="driver-location">
                  📍{' '}
                  {driverUpdates[ride.id] ? (
                    <span>
                      {driverUpdates[ride.id].lat.toFixed(4)},
                      {driverUpdates[ride.id].lng.toFixed(4)}
                    </span>
                  ) : (
                    <span>Loading location...</span>
                  )}
                </div>
              </div>

              <div className="action-buttons">
                <button className="call-btn">📞 Call Driver</button>
                <button className="chat-btn">💬 Message</button>
                <button className="cancel-ride-btn">❌ Cancel Ride</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

