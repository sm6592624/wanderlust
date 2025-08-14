import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

// Component imports
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import Admin from './components/Admin'
import './App.css'
import { AdminProvider } from './utils/Context/admin'
import { UserProvider } from './utils/Context/user'
import Other from './components/Other'
import ErrorBoundary from './utils/Comp/ErrorBoundary'

// API functions
import {
    getServices,
    getTrending,
    getCarousel,
    getAdvtBanner,
    getDestinations,
    getPrices,
} from './api/admin'

// Other components
import Bookings from './components/Bookings'
import Individual from './components/Individual'
import Forgot from './components/PasswordReset/Forgot'
import Update from './components/PasswordReset/Update'
import CreateOwn from './components/CreateOwn'

function App() {
    // State for modal and data
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [carousel, setCarousel] = useState([])
    const [services, setServices] = useState([])
    const [trending, setTrending] = useState([])
    const [advt, setAdvt] = useState([])
    const [destinations, setDestinations] = useState([])
    const [prices, setPrices] = useState({})

    // Fetch carousel data from API
    const fetchCarousel = async () => {
        try {
            const response = await getCarousel();
            if (response && response.data) {
                setCarousel(response.data);
            } else {
                setCarousel([]);
            }
        } catch (err) {
            console.error('Failed to fetch carousel:', err);
            // Set empty array on error to prevent crashes
            setCarousel([]);
        }
    }

    useEffect(() => {
        fetchCarousel();
    }, [])

    // Get all available services from the backend
    const loadServices = async () => {
        try {
            const result = await getServices();
            if (result && result.data) {
                setServices(result.data);
            }
        } catch (error) {
            console.error('Error loading services:', error);
            setServices([]); // fallback to empty array
        }
    }

    // Load services on component mount
    useEffect(() => {
        loadServices();
    }, [])

    // Fetch trending destinations for homepage
    const loadTrendingPlaces = async () => {
        try {
            const trendingData = await getTrending();
            setTrending(trendingData.data || []);
        } catch (error) {
            console.error('Could not load trending destinations:', error);
            setTrending([]);
        }
    }

    useEffect(() => {
        loadTrendingPlaces();
    }, [])

    // Load advertisement banners
    const getAdvertisements = async () => {
        try {
            const advtResponse = await getAdvtBanner();
            setAdvt(advtResponse.data || []);
        } catch (err) {
            console.error('Advertisement loading failed:', err);
            setAdvt([]);
        }
    }

    useEffect(() => {
        getAdvertisements();
    }, [])

    // Load destinations for "Create Your Own Trip" feature
    const loadDestinationsList = async () => {
        try {
            const destinationsResponse = await getDestinations();
            setDestinations(destinationsResponse.data || []);
        } catch (error) {
            console.error('Failed to load destinations:', error);
            setDestinations([]);
        }
    }

    useEffect(() => {
        loadDestinationsList();
    }, [])

    // Get pricing information for trip creation
    const loadPricingData = async () => {
        try {
            const pricingResponse = await getPrices();
            setPrices(pricingResponse.data || {});
        } catch (error) {
            console.error('Could not load pricing data:', error);
            setPrices({});
        }
    }

    useEffect(() => {
        loadPricingData();
    }, [])

    return (
        <ErrorBoundary title="Application Error">
            <Router>
                {window.location.pathname === '/' && <Redirect to="/user" />}
                <div className="app">
                <Route exact path="/admin">
                    <AdminProvider>
                        <Admin />
                    </AdminProvider>
                </Route>

                <UserProvider>
                    <Route path="/user">
                        <Header
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </Route>
                    <Route
                        exact
                        path="/user"
                        render={(props) => (
                            <Home
                                carouselData={carousel}
                                servicesData={services}
                                trendingServices={trending}
                                setIsModalOpen={setIsModalOpen}
                                advtData={advt.length >= 1 ? advt[0] : null}
                                {...props}
                            />
                        )}
                    ></Route>
                    <Route exact path="/user/treks">
                        <Other
                            tab={'Treks'}
                            servicesData={services}
                            advtData={advt.length >= 2 ? advt[1] : null}
                        />
                    </Route>
                    <Route exact path="/user/camps">
                        <Other
                            tab={'Camps'}
                            servicesData={services}
                            advtData={advt.length >= 3 ? advt[2] : null}
                        />
                    </Route>
                    <Route exact path="/user/packages">
                        <Other
                            tab={'Packages'}
                            servicesData={services}
                            advtData={advt.length >= 4 ? advt[3] : null}
                        />
                    </Route>
                    <Route exact path="/user/bookings">
                        <Bookings
                            setIsModalOpen={setIsModalOpen}
                            advtData={advt.length >= 5 ? advt[4] : null}
                        />
                    </Route>
                    <Route
                        path="/user/service/:serviceID"
                        render={(props) => (
                            <Individual
                                {...props}
                                setIsModalOpen={setIsModalOpen}
                                advtData={advt.length >= 6 ? advt[5] : null}
                            />
                        )}
                    />
                    <Route path="/user/create-own">
                        <CreateOwn
                            destinationsData={destinations}
                            pricesData={prices}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </Route>

                    <Route path="/user" component={Footer} />

                    <Route exact path="/password-reset/forgot">
                        <Forgot />
                    </Route>
                    <Route
                        path="/password-reset/:userID/:token"
                        render={(props) => <Update {...props} />}
                    ></Route>
                </UserProvider>
            </div>
        </Router>
        </ErrorBoundary>
    )
}

export default App
