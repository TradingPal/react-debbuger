# react-debbuger

react-native component that let you see the console inside your app, in just one click

##Demo
![](http://i.giphy.com/3oz8xDUoOIPw1UCqJ2.gif)

##Pre-Requirements

###react-native-console-panel
```sh
npm install --save react-native-console-panel
```
###react-native-flip-view
```sh
npm install --save react-native-flip-view
```
you will have to edit a file in flip-view
(react-native-flip-view/index.js)
```js
var interpolationConfig = {inputRange: [0, 1], outputRange: ["0deg", "180deg"]};
```
line 50


##Installation
```sh
npm i react-debbuger
```

##Example 
```js
import DragDebuger from "DragDebuger.js";
...

render(){
		const routes = [
			{title: "First Scene", index: 0},
			{title: "Second Scene", index: 1},
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
					style={{borderColor: "red",borderWidth:2, backgroundColor: "white"}}
					/>
			</DragDebuger>
		);
}
```

##Props
positionX= initial x value for Animates.ValueXY();
positionY= initial y value for Animates.ValueXY();

##Customize
you can chagne the image in the following path of the <Image> tag, maxHeigth and maxWidth 50
```js
<TouchableOpacity onPress={()=>{this.setState({isFlipped:!this.state.isFlipped})}}>
    <Image style={styles.bugimg} source={require('./../img/bug_icon.png')}/>
</TouchableOpacity>
```

##Thanks To 
[NativeSH](https://github.com/NativeSH/react-native-console-panel) (for the console panel)

[kevinstumpf](https://github.com/kevinstumpf/react-native-flip-view) (for the flip view animation)

