import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./helpers/setAuthToken";
import jwt_decode from "jwt-decode";
// Components
import Home from "../src/pages/Auth/Home";
import Login from "../src/pages/Auth/Login";
import Register from "../src/pages/Auth/Register";

import PrivateDoctorRoute from "./utils/PrivateDoctorRoute";
import PrivatePatientRoute from "./utils/PrivatePatientRoute";

import DoctorHomepage from "./pages/doctor/DoctorHomepage";
import PatientHomepage from "./pages/patient/PatientHomepage";
// Actions
import { setCurrentUser } from "./actions/authorizationAction";

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Route exact path="/" component={Home} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Switch>
							<PrivatePatientRoute
								exact
								path="/patient/home"
								component={PatientHomepage}
							/>
							<PrivateDoctorRoute
								exact
								path="/doctor/home"
								component={DoctorHomepage}
							/>
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
