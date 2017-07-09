/**
 * Created by mephisto on 7/9/17.
 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import {BrowserRouter as Router, Route} from 'react-router-dom'


class Alerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryData: []
        }
    }



    render() {

        return(

            <div className="inventory-tracker">

            </div>

        )
    }
}

export default Alerts;