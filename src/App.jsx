import { useState, useEffect } from 'react'
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
  
  // Drama States
  const [scamMessage, setScamMessage] = useState("");
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountX, setDiscountX] = useState(50);
  const [fakeDriverPos, setFakeDriverPos] = useState({ lat: 28.6139, lng: 77.2090 });

  // 1. Hick's Law & Mental Model Violation: Swap Ride Types
  const handleSelectRide = (rideType) => {
    const buggyRideType = rideType === 'Auto' ? 'Car' : rideType
    setSelectedRideType(buggyRideType)
    setCurrentPage('booking')
  }

  const handleBookRide = (details) => {
    setBookingDetails(details)
    setCurrentPage('map')
  }

  // 2. Ethical Violation: Price Gaslighting
  const handleConfirmRide = () => {
    const rideTypes = {
      'Auto': 8500,
      'Car': 10500,
      'Bike': 5500,
      'Premium': 55000
    }
    
    const actualPrice = rideTypes[selectedRideType] || Math.floor(Math.random() * 300) + 100
    
    const newRide = {
      id: Math.random(),
      rideType: selectedRideType,
      pickup: bookingDetails.pickup,
      destination: bookingDetails.destination,
      timestamp: Date.now(),
      status: 'Finding Driver',
      driverLocation: fakeDriverPos, // Linked to the unreliable movement
      price: actualPrice,
      eta: Math.floor(Math.random() * 15) + 3
    }
    setActiveRides([...activeRides, newRide])
    setCurrentPage('tracking')
  }

  // 3. Fitts's Law & Dark Pattern: The Discount Trap
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 'booking' || currentPage === 'map') setShowDiscount(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleScamDiscount = () => {
    const scamPrice = 12500; // Hardcoded extreme price
    setScamMessage(`SIKEEE! Discount Applied. BUT FOR US.... Your updated total is ₹${scamPrice}. A "Convenience Surcharge" of ₹5000 has been added for using a coupon.`);
    
    setTimeout(() => {
      setShowDiscount(false);
      setScamMessage("");
    }, 6000);
  };

  // 4. Unreliable Feedback: The Teleporting Driver
  useEffect(() => {
    if (currentPage === 'tracking') {
      const interval = setInterval(() => {
        setFakeDriverPos({
          lat: 28.6139 + (Math.random() - 0.5) * 0.2, 
          lng: 77.2090 + (Math.random() - 0.5) * 0.2
        });
      }, 1000); 
      return () => clearInterval(interval);
    }
  }, [currentPage]);

  return (
    <div className="app-container">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        activeRidesCount={activeRides.length}
      />
      
      <div className="main-content">
        {/* State 1: Home (RideSelection) */}
        {currentPage === 'home' && (
          <RideSelection onSelectRide={handleSelectRide} />
        )}
        
        {/* State 2: Booking Form */}
        {currentPage === 'booking' && selectedRideType && (
          <BookingForm 
            rideType={selectedRideType}
            onBookRide={handleBookRide}
          />
        )}
        
        {/* State 3: The Map Checkpoint */}
        {currentPage === 'map' && bookingDetails && (
          <RideMap 
            pickup={bookingDetails.pickup}
            destination={bookingDetails.destination}
            onConfirm={handleConfirmRide}
            onBack={() => setCurrentPage('booking')}
          />
        )}
        
        {/* State 4: Tracking (The Final Chaos) */}
        {currentPage === 'tracking' && activeRides.length > 0 && (
          <div className="tracking-wrapper">
             <RideTracking rides={activeRides} fakePos={fakeDriverPos} />
             <div className="teleport-alert">⚠️ WARNING: Driver is currently in a parallel dimension</div>
          </div>
        )}

        {/* THE DISASTER OVERLAY */}
        {showDiscount && (
          <div className="discount-overlay">
            <div className="discount-modal">
              {!scamMessage ? (
                <>
                  <h2>🎉 MEGA SURPRISE! 🎉</h2>
                  <p>You've unlocked a "Negative Discount"!</p>
                  <small>*By clicking, you agree to pay for the driver's lunch.</small>
                  
                  <div className="button-group" style={{marginTop: '20px'}}>
                    <button onClick={handleScamDiscount} className="scam-btn">
                      CLAIM NOW
                    </button>
                    <button 
                      onMouseEnter={() => setDiscountX(Math.random() * 80)}
                      style={{ 
                        position: 'absolute',
                        left: `${discountX}%`,
                        fontSize: '8px',
                        padding: '2px'
                      }}
                      className="moving-close-btn"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <div className="scam-success-ui">
                  <h1 style={{fontSize: '4rem'}}>💸</h1>
                  <p className="scam-text">{scamMessage}</p>
                  <div className="fake-loader"></div>
                  <p style={{fontSize: '10px'}}>Stealing... I mean, processing your data...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}