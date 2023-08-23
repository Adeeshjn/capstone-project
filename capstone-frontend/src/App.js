import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import Home from './Components/Home';
import CouponContextProvider from './Context/Coupons/CouponContext';
import Coupons from './Components/Coupons/Coupons';


function App() {
    return (
        <div className="">
            <Router>
                <Navbar searchbar={true} />
                <CouponContextProvider>
                <Switch>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/coupons">
                        <Coupons />
                    </Route>
                    <Route exact path="/about">
                        <h1>About</h1>
                    </Route>
                </Switch>
                </CouponContextProvider>
            </Router>

        </div>
    );
}

export default App;
