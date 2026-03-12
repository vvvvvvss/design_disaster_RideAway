import './RestaurantList.css'

export default function RideSelection({ onSelectRide }) {
  // BUG: Show lower prices - but actual booking will be 100x more
  const rideTypes = [
    { id: 1, name: 'Auto', icon: '🛺', basePrice: '₹25', actualPrice: 2500, time: '3-5 min' },
    { id: 2, name: 'Bike', icon: '🏍️', basePrice: '₹15', actualPrice: 1500, time: '2-3 min' },
    { id: 3, name: 'Car', icon: '🚗', basePrice: '₹75', actualPrice: 7500, time: '5-8 min' },
    { id: 4, name: 'Premium', icon: '🚙', basePrice: '₹150', actualPrice: 15000, time: '8-10 min' },
  ]

  return (
    <div className="ride-selection-container">
      <div className="ride-selection-header">
        <h1>Choose Your Ride</h1>
        <p>Select the ride type that works for you</p>
      </div>

      <div className="rides-grid">
        {rideTypes.map((ride) => (
          <div 
            key={ride.id}
            className="ride-card"
            onClick={() => onSelectRide(ride.name)}
          >
            <div className="ride-icon">{ride.icon}</div>
            <h3>{ride.name}</h3>
            <p className="ride-price">{ride.basePrice}</p>
            <p className="ride-eta">{ride.time} away</p>
            <button className="select-btn">Select {ride.name}</button>
          </div>
        ))}
      </div>

      <div className="info-banner">
        <p>✓ 24/7 Available | ✓ Safe Rides | ✓ Trusted Drivers</p>
      </div>
    </div>
  )
}

