import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TouchableHighlight,
  Navigator,
  Image
} from 'react-native';

import DragDebugger from './Modulo/react-native-drag-debugger.js';

export default class reactNativeFirst extends Component {


	render(){
		const routes = [
			{title: 'First Scene', index: 0},
			{title: 'Second Scene', index: 1},
		];
		return(
			<DragDebugger positionX={325} positionY={550} sourceIMG={this.image()}>
				<Navigator
					initialRoute={routes[0]}
					initialRouteStack={routes}
					renderScene={(route, navigator) =>
						<TouchableHighlight onPress={() => {
						if (route.index === 0) {
							navigator.push(routes[1]);
							console.log("inicio");
						} else {
							navigator.pop();
							console.log("final");
						}
						}}>
						<Text>Hello {route.title}!</Text>
						</TouchableHighlight>
					}
					style={{borderColor: 'red',borderWidth:2, backgroundColor: 'white'}}
					/>
			</DragDebugger>
		);
	}
	image(){
		return(<Image style={{width:50,height:50}} source={{uri:'http://hitchcock.itc.virginia.edu/Slavery/next.gif'}}/>);
	};


}

AppRegistry.registerComponent('reactNativeFirst', () => reactNativeFirst);
