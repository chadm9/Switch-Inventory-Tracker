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
            alertInfo: []
        };
        this.manageAlerts = this.manageAlerts.bind(this);
    }

    manageAlerts(event){
        event.preventDefault();
        var newTask = document.getElementById('new-task').value;
        var newTaskDate = document.getElementById('new-task-date').value;
        // console.log(newTask)
        // console.log(newTaskDate)
        // THis is a POST request, so we can't use $.getJSON (only does get)
        // $.ajax expects an object that tells it what to send (data),
        // where to send it (url), and how to send it (method)
        // $.ajax is a promise which has a "done" method that will run when
        // ajax is back. It gets a param of whatever JSON was returned by the API request
        // Inside that funciton, we update REact state (theClass), which causes
        // a re-render, which updates the list because we are mapping through this.state.theClass.

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/manageAlerts",
            data: {
                taskName: newTask,
                taskDate: newTaskDate
            }
        }).done((serverResponse)=>{
            this.setState({
                alertInfo: serverResponse
            })
        })
    }



    render() {

        return(

            <div className="inventory-tracker">
                <form onSubmit={this.manageAlerts} >
                    <div>
                        <label >Email address</label>
                        <input className="" placeholder="email" type="email" id="email-input"/>
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input className="" type="tel" id="telephone-input" placeholder="phone number"/>
                    </div>
                    <div>
                        <label>Action</label>
                        <select id="manage-alerts-option">
                            <option value="volvo">Create New Stock Alert</option>
                            <option value="saab">Cancel Existing Stock Alert</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }
}

export default Alerts;