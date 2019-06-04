import React, {Component} from 'react';
import './App.css';
import Footer from "./component/Footer";
import RegisterForm from "./component/RegisterForm";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./component/Login"

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container mt-30">
                    <Route exact path="/" component={RegisterForm} />
                    <Route exact path="/login" component={Login} />
                    <Footer/>
                </div>
            </Router>
        );
    }
}
export default App;
