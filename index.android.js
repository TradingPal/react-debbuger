import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TouchableHighlight,
  Navigator
} from 'react-native';

import DragDebuger from './Modulo/DragDebuger.js';

export default class reactNativeFirst extends Component {


	render(){
		const routes = [
			{title: 'First Scene', index: 0},
			{title: 'Second Scene', index: 1},
		];
		return(
			<DragDebuger positionX={175} positionY={275}>
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
			</DragDebuger>
		);
	}


}

AppRegistry.registerComponent('reactNativeFirst', () => reactNativeFirst);

//http://reactscript.com/react-native-flip-view-component-2/