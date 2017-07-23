/**
 * Created by mephisto on 7/9/17.
 */
import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import Alerts from "./Alerts";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inventoryData: []
        };
        this.loadData = this.loadData.bind(this)
        // Make sure addNewTask uses the class "this"
    }

    // compondentDidMount runs AFTER the first render
    componentDidMount() {
        // getJSON request to localhost:3000 ... that's where Express is listening



        this.loadData();
        setInterval(this.loadData, 30000)



        // Update the state... this will cause a re-render
        // this.setState({
        //   theClass: [1,2,3,4]
        // })
    }

    loadData(){
    $.getJSON('http://localhost:4001/getInventoryData', (serverData)=>{
        // log the JSON response from Express
        console.log(serverData);
        this.setState({
            inventoryData: serverData
        })
    })
}






    render(){

        // Create an array to dump into our return. It will contain
        // components or HTML tags
        var dataArray = [];
        // Loop throuhg our state var. The frist time through, it will be empty
        this.state.inventoryData.map((element,index)=>{
            console.log(element);
            var inlineStyle = {};
            var inStock;
            if (element.in_stock === 0){
                inlineStyle = {
                    "color": "red"
                };
                inStock = 'Out of Stock';
            }else{
                inlineStyle = {
                    "color": "green"
                };
                inStock = 'In Stock';
            }
            // push an li tag onto our array for each element in the state var
            dataArray.push(
                <tr key={index}>
                    <td><a href={`${element.link}`}><img className="logo" src={`${element.logo}`} /></a></td>
                    <td>{element.product}</td>
                    <td>${element.price}</td>
                    <td style={inlineStyle}>{inStock}</td>
                    <td>{element.updated}</td>
                </tr>);
        });

        return(
            <div className="App">
                <div className="App-header">

                    <h1 className="header">Nintendo Switch Inventory Tracker</h1>
                </div>
                <div className="container col-sm-12 col-xs-12 col-md-12">

                    <table id='infoTable' className="table table-bordered">
                        <thead>
                        <tr>
                            <th className="text-center table-data">Retailer</th>
                            <th className="text-center table-data">Product</th>
                            <th className="text-center table-data">Price</th>
                            <th className="text-center table-data">Availability</th>
                            <th className="text-center table-data">Last Update (UTC)</th>
                        </tr>
                        </thead>
                        <tbody className="table-data">
                        {dataArray}
                        </tbody>
                    </table>
                </div>
                <Alerts />
            </div>
        )
    }

}

export default Home;