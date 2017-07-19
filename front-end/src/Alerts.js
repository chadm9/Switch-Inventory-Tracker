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
        var emailAddress = document.getElementById('email-input').value;
        //var phoneNumber = document.getElementById('phone-input').value;
        var action = document.getElementById('manage-action').value;
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
            url: "http://localhost:4001/manageAlerts",
            data: {
                emailAddress: emailAddress,
                phoneNumber: null,
                action: action
            }
        }).done((serverResponse)=>{
            this.setState({
                alertInfo: serverResponse

            });
            console.log(serverResponse);

        })
    }



    render() {
        console.log(this.state);



        if(this.state.alertInfo[0] !== undefined){
            if(this.state.alertInfo[0].status === 'Pending'){
                //var userPhoneNumber = this.state.alertInfo[0].phone;
                var userEmailAddress = this.state.alertInfo[0].email;
                // var msg = 'Stock alerts for email: ' + userEmailAddress +
                //     ', and phone: ' + userPhoneNumber + ', are pending activation.'
                var msg = 'This feature is coming soon!'
            }else if(this.state.alertInfo[0].status === 'Active'){
                //var userPhoneNumber = this.state.alertInfo[0].phone;
                var userEmailAddress = this.state.alertInfo[0].email;
                // var msg = 'Stock alerts for email: ' + userEmailAddress +
                //     ', and phone: ' + userPhoneNumber + ', are active.'
                var msg = 'This feature is coming soon!'
            }else if(this.state.alertInfo[0].status === 'Inactive'){
                //var userPhoneNumber = this.state.alertInfo[0].phone;
                var userEmailAddress = this.state.alertInfo[0].email;
                // var msg = 'Stock alerts for email: ' + userEmailAddress +
                //     ', and phone: ' + userPhoneNumber + ', have been deactivated.'
                var msg = 'This feature is coming soon!'
            }


        }

        return(

            <div className="inventory-tracker">
                <h4>Manage Automatic Alerts</h4>
                <p>Receive an email notification when the Switch becomes available for online purchase.</p>
                <form onSubmit={this.manageAlerts} >
                    <div>
                        <input className="manage-alerts" placeholder="Email Address" type="email" id="email-input"/>
                    </div>

                    <div>
                        <select className="manage-alerts" id="manage-action">
                            <option value="new">Create New Stock Alert</option>
                            <option value="delete">Cancel Existing Stock Alert</option>
                            <option value="check">Check Status of Existing Stock Alert</option>
                        </select>
                    </div>
                    <button id='alert-button' type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div><p id="alert-message">{msg}<br/></p></div>
            </div>

        )
    }
}

export default Alerts;