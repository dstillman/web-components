'use strict';

//import {log as logger} from './Log.js';
//let log = logger.Logger('Downloads');

const React = require('react');
const {Component} = React;

const config = window.zoteroConfig;
const installData = config.installData;

const windowsDownloadUrl = installData.windowsDownload;
const macDownloadUrl = installData.macDownload;
const linux32DownloadUrl = installData.linux32Download;
const linux64DownloadUrl = installData.linux64Download;

const imagePath = config.imagePath;

const standaloneImagePath = imagePath + '/downloads/zotero-icon.png';
const standaloneImagePath2x = imagePath + '/downloads/zotero-icon@2x.png';

const browserExtensionImagePath = imagePath + '/downloads/browser-extension.png';
const browserExtensionImagePath2x = imagePath + '/downloads/browser-extension@2x.png';

const pluginsIconImagePath = imagePath + '/downloads/plugins-icon.svg';

import {buildUrl} from './wwwroutes.js';

import {BrowserDetect} from './browserdetect.js';

class DownloadStandaloneButton extends Component {
	render(){
		return (<div className='downloadButton'><a className='btn' href={this.props.href}>Download</a></div>);
	}
}

class OtherDownloadLinkListItem extends Component {
	render(){
		return (
			<li>
				<a href={this.props.href}>{this.props.OS}</a>
			</li>
		);
	}
}

class DownloadStandalone extends Component {
	render(){
		let standaloneDownloadUrls = {
			Windows: windowsDownloadUrl,
			'Mac OS X': macDownloadUrl,
			'Linux i686': linux32DownloadUrl,
			'Linux x86_64': linux64DownloadUrl
		};

		let featuredOS = this.props.featuredOS;
		let featuredButton;
		let otherVersions = [
			'Windows',
			'Mac OS X',
			'Linux i686',
			'Linux x86_64'
		];
		let OSLabel = featuredOS;

		switch(featuredOS) {
			case 'Windows':
				featuredButton = <DownloadStandaloneButton href={standaloneDownloadUrls['Windows']} />;
				otherVersions.splice(0, 1);
				break;
			case 'Mac':
				featuredButton = <DownloadStandaloneButton href={standaloneDownloadUrls['Mac']} />;
				otherVersions.splice(1, 1);
				break;
			case 'Linux':
				if(this.props.arch == 'x86_64'){
					OSLabel = 'Linux 64-bit';
					featuredButton = <DownloadStandaloneButton href={standaloneDownloadUrls['Linux x86_64']} />;
					otherVersions.splice(3, 1);
				} else {
					OSLabel = 'Linux 32-bit';
					featuredButton = <DownloadStandaloneButton href={standaloneDownloadUrls['Linux i686']} />;
					otherVersions.splice(2, 1);
				}
				break;
		}

		let otherNodes = otherVersions.map((os)=>{
			let downloadUrl = standaloneDownloadUrls[os];
			return <OtherDownloadLinkListItem key={os} OS={os} href={downloadUrl} />;
		});

		return (
			<section className='standalone'>
				<img className='download-image' src={standaloneImagePath} srcSet={`${standaloneImagePath2x} 2x`} />
				<h1>Zotero 5.0 for {OSLabel}</h1>
				<p className='lead'>Your personal research assistant</p>
				{featuredButton}
				<p className='other-versions'>Other versions</p>
				<ul className='os-list'>
					{otherNodes}
				</ul>
			</section>
		);
	}
}

class DownloadConnector extends Component {
	render(){
		return (
			<section className='connector'>
				<img className='download-image' src={browserExtensionImagePath} srcSet={`${browserExtensionImagePath2x} 2x`} />
				<h1>Browser Extension</h1>
				<div className='install-connector-section'>
					<p className='lead'>Get Zotero connectors for your browser</p>
					<div className='downloadButton'><a href={buildUrl('extensions')} className='btn'>Download</a></div>
					<p className='description'>The Zotero Connector automatically senses content as you browse the web and allows you to save it to Zotero with a single click.</p>
				</div>
			</section>
		);
	}
}

class DownloadPlugins extends Component {
	render(){
		return (
			<section className='plugins'>
				<div className='plugins-container clearfix'>
					<img className='plugins-icon' src={pluginsIconImagePath} />
					<h1>Plugins</h1>
					<p>
						Install one of the many third-party plugins and become even more productive.<br />
					  <a href={buildUrl('pluginSupport')}>Browse Plugins</a>
					</p>
				</div>
			</section>
		);
	}
}

class Downloads extends Component{
	render(){
		window.BrowserDetect = BrowserDetect;

		let featuredOS = BrowserDetect.OS;
		let featuredBrowser = BrowserDetect.browser;
		let arch = (navigator.userAgent.indexOf('x86_64') != -1) ? 'x86_64' : 'x86';

		return (
			<div className='downloads'>
				<div className="container">
					<div className='row loose jumbotron'>
						<DownloadStandalone featuredOS={featuredOS} arch={arch} />
						<DownloadConnector featuredBrowser={featuredBrowser} />
					</div>
					<DownloadPlugins />
				</div>
			</div>
		);
	}
}

export {Downloads};
