'use strict';

import {log as logger} from './Log.js';
let log = logger.Logger('InstallConnector');

const React = require('react');
const {Component} = React;

import {buildUrl} from './wwwroutes.js';
import {BrowserDetect} from './browserdetect.js';
import {VerticalExpandable} from './VerticalExpandable.js';

let browser = BrowserDetect.browser;

const config = window.zoteroConfig;
const installData = config.installData;

const {firefoxHash, firefoxDownload, chromeDownload, safariDownload, operaDownload} = installData;

const imagePath = config.imagePath;

/*
const chromeExtensionImagePath = imagePath + '/start/chrome-extension.jpg';
const firefoxExtensionImagePath = imagePath + '/start/firefox-extension.jpg';
const safariExtensionImagePath = imagePath + '/start/safari-extension.jpg';
const chromeExtension2xImagePath = imagePath + '/start/chrome-extension@2x.jpg';
const firefoxExtension2xImagePath = imagePath + '/start/firefox-extension@2x.jpg';
const safariExtension2xImagePath = imagePath + '/start/safari-extension@2x.jpg';
*/

const zoteroIconImagePath = imagePath + '/extensions/zotero-icon.png';
const zoteroIcon2xImagePath = imagePath + '/extensions/zotero-icon-2x.png';

const chromeBrowserImagePath = imagePath + '/extensions/chrome-icon.png';
const chromeBrowser2xImagePath = imagePath + '/extensions/chrome-icon-2x.png';
const firefoxBrowserImagePath = imagePath + '/extensions/firefox-icon.png';
const firefoxBrowser2xImagePath = imagePath + '/extensions/firefox-icon-2x.png';
const safariBrowserImagePath = imagePath + '/extensions/safari-icon.png';
const safariBrowser2xImagePath = imagePath + '/extensions/safari-icon-2x.png';
const operaBrowserImagePath = imagePath + '/theme/browser_icons/64-opera.png';
const operaBrowser2xImagePath = imagePath + '/theme/browser_icons/64-opera.png';

class InstallFirefoxButton extends Component{
	installFirefox(){
		if (typeof InstallTrigger == 'undefined') {
			return true;
		}
		let params = {
			'Zotero': {
				URL: firefoxDownload,
				Hash: firefoxHash
			}
		};

		window.InstallTrigger.install(params);
		return false;
	}
	render(){
		if(this.props.type == 'button'){
			return (
				<a href={firefoxDownload} className='btn' onClick={this.installFirefox}>Install</a>
			);
		} else if(this.props.type == 'image') {
			return (
				<a href={firefoxDownload} onClick={this.installFirefox}><img src={firefoxBrowserImagePath} srcSet={`${firefoxBrowser2xImagePath} 2x`} /></a>
			);
		} else if(this.props.type == 'full') {
			return (
				<div className='download-full'>
					<div className='browser-image'><img src={firefoxBrowserImagePath} srcSet={`${firefoxBrowser2xImagePath} 2x`} /></div>
					<div className='browser-text'><b>Firefox extension</b></div>
					<div><a href={firefoxDownload} className='btn' onClick={this.installFirefox}>Install</a></div>
				</div>
			);
		}
	}
}
InstallFirefoxButton.defaultProps = {type:'button'};

class InstallChromeButton extends Component{
	installChrome(){
		//window.chrome.webstore.install();
		/*
		window.chrome.webstore.install(undefined, ()=>{
			//success
		}, ()=>{
			//failure
		});
		*/
	}
	render(){
		if(this.props.type == 'button') {
			return <a href={chromeDownload} id="chrome-connector-download-button" className="btn download-link">Install</a>;
			//return <a className='button' onClick={this.installChrome}>Install</a>;
		} else if(this.props.type == 'image') {
			return (
				<a href={chromeDownload} onClick={this.installChrome}><img src={chromeBrowserImagePath} srcSet={`${chromeBrowser2xImagePath} 2x`} /></a>
			);
		} else if(this.props.type == 'full') {
			return (
				<div className='download-full'>
					<div className='browser-image'><img src={chromeBrowserImagePath} srcSet={`${chromeBrowser2xImagePath} 2x`} /></div>
					<div className='browser-text'><b>Chrome extension</b></div>
					<div className='install-button'><a href={chromeDownload} id="chrome-connector-download-button" className="btn download-link">Install</a></div>
				</div>
			);
		}
	}
}
InstallChromeButton.defaultProps = {type:'button'};

class InstallSafariButton extends Component{
	installSafari(){
	}
	render(){
		if(this.props.type == 'button') {
			return (
				<a href={safariDownload} id="safari-connector-download-button" className="btn download-link">Install</a>
			);
		} else if(this.props.type == 'image'){
			return (
				<a href={safariDownload} onClick={this.installSafari}><img src={safariBrowserImagePath} srcSet={`${safariBrowser2xImagePath} 2x`} /></a>
			);
		} else if(this.props.type == 'full') {
			return (
				<div className='download-full'>
					<div className='browser-image'><img src={safariBrowserImagePath} srcSet={`${safariBrowser2xImagePath} 2x`} /></div>
					<div className='browser-text'><b>Safari extension</b></div>
					<a href={safariDownload} id="safari-connector-download-button" className="btn download-link">Install</a>
				</div>
			);
		}
	}
}
InstallSafariButton.defaultProps = {type:'button'};

class InstallOperaButton extends Component{
	installOpera(){
	}
	render(){
		if(this.props.type == 'button') {
			return (
				<a href={operaDownload} id="opera-connector-download-button" className="btn download-link">Install</a>
			);
		} else if(this.props.type == 'image') {
			return (
				<a href={operaDownload} onClick={this.installOpera}><img src={operaBrowserImagePath} srcSet={`${operaBrowser2xImagePath} 2x`} /></a>
			);
		} else if(this.props.type == 'full') {
			return (
				<div className='download-full'>
					<div className='browser-image'><img src={operaBrowserImagePath} srcSet={`${operaBrowser2xImagePath} 2x`} /></div>
					<div className='browser-text'><b>Opera extension</b></div>
					<a href={operaDownload} id="opera-connector-download-button" className="btn download-link">Install</a>
				</div>
			);
		}
	}
}
InstallOperaButton.defaultProps = {type:'button'};

class InstallButton extends Component{
	render(){
		let browserName = browser;
		log.debug('InstallButton render');
		log.debug(browserName);
		
		switch(browserName){
			case 'Firefox':
				return <InstallFirefoxButton />;
			case 'Chrome':
				return <InstallChromeButton />;
			case 'Safari':
				return <InstallSafariButton />;
			case 'Opera':
				return <InstallOperaButton />;
			default:
				//TODO: unknown browser download?
				return null;
		}
	}
}

class ChromeExtensionIcon extends Component{
	render(){
		return (
			<figure className="browser-plus-extension">
				<img
					src={chromeBrowserImagePath}
					alt="Google Chrome"
					width="128"
					height="128"
					className="browser-icon"
					srcSet={`${chromeBrowser2xImagePath} 2x`}
				/>
				<span className="icon-plus"></span>
				<img
					src={zoteroIconImagePath}
					alt="Zotero Extension"
					width="144"
					height="144"
					className="zotero-icon"
					srcSet={`${zoteroIcon2xImagePath} 2x`}
				/>
			</figure>
		);
	}
}

class FirefoxExtensionIcon extends Component{
	render(){
		return (
			<figure className="browser-plus-extension">
				<img
					src={firefoxBrowserImagePath}
					alt="Mozilla Firefox"
					width="128"
					height="128"
					className="browser-icon"
					srcSet={`${firefoxBrowser2xImagePath} 2x`}
				/><span> </span>
				<span className="icon-plus"> </span>
				<span> </span>
				<img
					src={zoteroIconImagePath}
					alt="Zotero Extension"
					width="144"
					height="144"
					className="zotero-icon"
					srcSet={`${zoteroIcon2xImagePath} 2x`}
				/>
			</figure>
		);
		//return <img className='extensionIconImage' src={firefoxExtensionImagePath} srcSet={`${firefoxExtension2xImagePath} 2x`} />;
	}
}

class SafariExtensionIcon extends Component{
	render(){
		return (
			<figure className="browser-plus-extension">
				<img
					src={safariBrowserImagePath}
					alt="Safari"
					width="128"
					height="128"
					className="browser-icon"
					srcSet={`${safariBrowser2xImagePath} 2x`}
				/>
				<span className="icon-plus"></span>
				<img
					src={zoteroIconImagePath}
					alt="Zotero Extension"
					width="144"
					height="144"
					className="zotero-icon"
					srcSet={`${zoteroIcon2xImagePath} 2x`}
				/>
			</figure>
		);
		//return <img className='extensionIconImage' src={safariExtensionImagePath} srcSet={`${safariExtension2xImagePath} 2x`} />;
	}
}

class AllExtensionsSection extends Component{
	render(){
		return (
			<div id='all-extensions'>
				<InstallChromeButton type='full' />
				<InstallFirefoxButton type='full' />
				<InstallSafariButton type='full' />
				<InstallOperaButton type='full' />
			</div>
		);
	}
}

class InstallConnectorPrompt extends Component{
	constructor(props){
		super(props);
		this.state = {
			browser:browser,
			showAllExtensions:false
		};
		this.showAllExtensions = this.showAllExtensions.bind(this);
	}
	componentDidMount(){
		//detect browser and set correct browser image
	}
	showAllExtensions(evt){
		this.setState({showAllExtensions:true});
		evt.preventDefault();
	}
	render(){
		let connectorText = '';
		let connectorImage = null;
		let installButton = <InstallButton browser='chrome' />;
		switch(this.state.browser){
			case 'Chrome':
				connectorText = 'Chrome Extension';
				connectorImage = <ChromeExtensionIcon />;
				break;
			case 'Firefox':
				connectorText = 'Firefox Extension';
				connectorImage = <FirefoxExtensionIcon />;
				break;
			case 'Safari':
				connectorText = 'Safari Extension';
				connectorImage = <SafariExtensionIcon />;
				break;
		}

		let showExtensionsLink = <p className='showExtensions'>&nbsp;</p>;
		if(!this.state.showAllExtensions) {
			showExtensionsLink = (
				<p className='showExtensions'>
					<a href='#' onClick={this.showAllExtensions}>Not using {this.state.browser}? Show all extensions.</a>
				</p>
			);
		}

		let allExtensions = (
			<div>
				<VerticalExpandable expand={this.state.showAllExtensions}>
					<AllExtensionsSection />
				</VerticalExpandable>
			</div>
		);

		let getStandaloneSection = null;
		if(this.props.showStandalone) {
			getStandaloneSection = (
				<div className='get-standalone-container'>
					<div className='get-standalone-aside'>
						<p><a href={buildUrl('download')}>Get Zotero Standalone</a><br />
						Zotero Standalone runs as a separate application and plugs into your choice of browser.</p>
					</div>
				</div>
			);
		}

		let headerText = `Install the ${connectorText}`;
		if(this.props.numbered) {
			headerText = `1. Install the ${connectorText}`;
		}

		return (
			<div id='install-connector'>
				<div className='content'>
					{connectorImage}
					<div className='install-connector'>
						<h1>{headerText}</h1>
						<p>Zotero connectors allow you to save to Zotero directly from your web browser.</p>
						{installButton}
						{getStandaloneSection}
						{showExtensionsLink}
						{allExtensions}
					</div>
				</div>
			</div>
		);
	}
}

InstallConnectorPrompt.defaultProps = {
	numbered:false,
	showStandalone:false
};

export {InstallConnectorPrompt};
