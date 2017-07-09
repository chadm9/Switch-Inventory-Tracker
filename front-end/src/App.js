import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './Home'
import Alerts from './Alerts'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryData: []
        }
    }



    render() {

        return(
            <Router>
                <div className="inventory-tracker">
                    <Route exact path="/" component={Home} />
                    <Route path="/task/delete/:taskId" component={Alerts} />
                </div>
            </Router>
        )
    }
}

export default App;