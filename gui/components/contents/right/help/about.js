import React, { Component } from 'react';

export class About extends Component {
	render() {
        return(
        	<div>
	        	<div className="about-ccres-content p-0">
		            <label className="font-size-4 black-text about-text">ABOUT CCRES</label>
		            <label className="font-size-1 help-text black-text">Our coastal ecosystems — coral reefs, mangroves and seagrass beds — provide fish to eat and sell, support tourism and protect the coastline from storms. Coastal communities rely on these ecosystems for their livelihoods and food security.</label>
		        </div>
		        <img className="sesame-app-img" src="assets/about_ccres.JPG"></img>
		        <div className="about-ccres-content-2 p-0">
		            <label className="font-size-1 help-text black-text">The Capturing Coral Reef & Related Ecosystem Services (CCRES) project is working to ensure the long term sustainability of these coastal ecosystems with models, tools and knowledge products to support planning. At the same time the project seeks to unlock new, sustainable income streams for the communities which rely on these ecosystems.</label>
		        </div>
		    </div>
		)
	}
}
