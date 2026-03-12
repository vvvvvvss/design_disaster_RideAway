import './Navigation.css'

export default function Navigation({ currentPage, setCurrentPage, activeRidesCount }) {
  return (
    <nav className="navigation-bar">
      <div className="nav-left">
        <div className="app-logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-text">🚕 RideAway</span>
        </div>
      </div>

      <div className="nav-center">
        {currentPage === 'home' && <span className="nav-title">Book a Ride</span>}
        {currentPage === 'booking' && <span className="nav-title">Enter Location</span>}
        {currentPage === 'map' && <span className="nav-title">Confirm Details</span>}
        {currentPage === 'tracking' && <span className="nav-title">Your Ride ({activeRidesCount})</span>}
      </div>

      <div className="nav-right">
        <button className="nav-button" onClick={() => setCurrentPage('home')}>
          Home
        </button>
      </div>
    </nav>
  )
}
