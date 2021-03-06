'use strict';

//import {log as logger} from './Log.js';
//let log = logger.Logger('Icons');

const React = require('react');
const {Component} = React;

import classnames from 'classnames';

const config = window.zoteroConfig;
const imagePath = config.imagePath;

class ZoteroIcon extends Component {
	render() {
		let iconImagePath = `${imagePath}/icons/zotero-icon-${this.props.width}-${this.props.height}`;
		let iconImagePath2x = iconImagePath + '@2x.png';
		iconImagePath += '.png';

		let p = {...this.props, src:iconImagePath, srcSet:`${iconImagePath2x} 2x`, className:classnames('zotero-icon', this.props.className)};
		delete p.browser;
		return (<img {...p} />);
	}
}
ZoteroIcon.defaultProps = {
	width: 147,
	height: 160
};

//BrowserIcon returns a browser icon image tag based on browser and size props
class BrowserIcon extends Component {
	render() {
		let browserImagePath = `${imagePath}/icons/${this.props.browser.toLowerCase()}-icon-${this.props.size}`;
		let browserImagePath2x = browserImagePath + '@2x.png';
		browserImagePath += '.png';

		let p = {...this.props, src:browserImagePath, srcSet:`${browserImagePath2x} 2x`, className:classnames('browser-icon', this.props.className)};
		delete p.browser;
		return (<img {...p} />);
	}
}
BrowserIcon.defaultProps = {
	size:64
};

class BrowserExtensionIcon extends Component{
	render(){
		return (
			<figure className="browser-plus-extension">
				<BrowserIcon
					browser={this.props.browser}
					size={this.props.browserIconSize}/>
				<span className="icon-plus"></span>
				<ZoteroIcon
					alt="Zotero Extension"
					width={this.props.zoteroIconWidth}
					height={this.props.zoteroIconHeight}
					className="zotero-icon"
				/>
			</figure>
		);
	}
}
BrowserExtensionIcon.defaultProps = {
	browserIconSize:128,
	zoteroIconWidth:128,
	zoteroIconHeight:140
};

class PluginsIcon extends Component{
	render(){
		let pluginsIconImagePath = imagePath + '/icons/plugins-icon.svg';
		return (
			<img className='plugins-icon' width={this.props.width} height={this.props.height} src={pluginsIconImagePath} />
		);
	}
}

export {ZoteroIcon, BrowserIcon, BrowserExtensionIcon, PluginsIcon};
