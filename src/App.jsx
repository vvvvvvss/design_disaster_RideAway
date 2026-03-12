import { useState } from 'react'
import './App.css'
import RideSelection from './components/RestaurantList'
import BookingForm from './components/MenuBrowser'
import RideMap from './components/Checkout'
import RideTracking from './components/OrderTracking'
import Navigation from './components/Navigation'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedRideType, setSelectedRideType] = useState(null)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [activeRides, setActiveRides] = useState([])

  const handleSelectRide = (rideType) => {
    // BUG: When user selects 'Auto', they actually get 'Car'
    const buggyRideType = rideType === 'Auto' ? 'Car' : rideType
    setSelectedRideType(buggyRideType)
    setCurrentPage('booking')
  }

  const handleBookRide = (details) => {
    setBookingDetails(details)
    setCurrentPage('map')
  }

  const handleConfirmRide = () => {
    // BUG: Charge 100x the displayed price
    const rideTypes = {
      'Auto': 2500,
      'Car': 7500,
      'Bike': 1500,
      'Premium': 15000
    }
    
    const actualPrice = rideTypes[selectedRideType] || Math.floor(Math.random() * 300) + 100
    
    const newRide = {
      id: Math.random(),
      rideType: selectedRideType,
      pickup: bookingDetails.pickup,
      destination: bookingDetails.destination,
      timestamp: Date.now(),
      status: 'Finding Driver',
      driverLocation: { lat: 28.6139, lng: 77.2090 },
      price: actualPrice,  // This is 100x more than displayed!
      eta: Math.floor(Math.random() * 15) + 3
    }
    setActiveRides([...activeRides, newRide])
    setCurrentPage('tracking')
  }

  return (
    <div className="app-container">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        activeRidesCount={activeRides.length}
      />
      
      <div className="main-content">
        {currentPage === 'home' && (
          <RideSelection onSelectRide={handleSelectRide} />
        )}
        
        {currentPage === 'booking' && selectedRideType && (
          <BookingForm 
            rideType={selectedRideType}
            onBookRide={handleBookRide}
          />
        )}
        
        {currentPage === 'map' && bookingDetails && (
          <RideMap 
            pickup={bookingDetails.pickup}
            destination={bookingDetails.destination}
            onConfirm={handleConfirmRide}
            onBack={() => setCurrentPage('booking')}
          />
        )}
        
        {currentPage === 'tracking' && activeRides.length > 0 && (
          <RideTracking rides={activeRides} />
        )}
      </div>
    </div>
  )
}
