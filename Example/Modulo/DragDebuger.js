
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  PanResponder,//drag arround
  Animated,//return to center
  Dimensions,//get size of the device
  TouchableOpacity,
  Easing
} from 'react-native';
var ConsolePanel = require("react-native-console-panel").displayWhenDev();
import FlipView from 'react-native-flip-view';

class DragDebuger extends Component{

    static propTypes={
        positionX: PropTypes.number,
        positionY: PropTypes.number,
        sourceIMG: PropTypes.object
    };


    static defaultProps ={
        positionX: 0,
        positionY: 0,
    };


    constructor(props){
        super(props);

        this.state={
            dropZoneValues: null,
            pan: new Animated.ValueXY({x: this.props.positionX, y: this.props.positionY}),//valores inciales para el icono
            isFlipped: false
        };


        /*pan responder to move the bug icono*/
        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.flattenOffset();					
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
            },
            onPanResponderMove : Animated.event([null,{
                dx:this.state.pan.x,
                dy:this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) =>{
                if(!this.isDropZone(gesture)){	
                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:0,y:0}}
                    ).start();
                }
            }
        });
    }
    render(){
        return(
            //todo el contenido
            <View style={styles.mainContainer}>
                <View style={styles.coverDropZone}>
                    {this.renderDropZone()}	
                </View>
                {this.renderMainContent()}					
                {this.renderDraggable()}
            </View>
        );
    }







    //back div (zona en la que no quieres que caiga) no se debe de ver
	renderDropZone(){
		return(
			<View 
			onLayout={this.setDropZoneValues.bind(this)}
			style={styles.dropZone}>
					<Text>Do not drop me here!</Text>
			</View>
		);
	};
    //get the values of the drop zone to use it in the state
    setDropZoneValues(event){
		this.setState({
			dropZoneValues: event.nativeEvent.layout
		});
	};
    //es sona donde quieres dejar el icono (es un marco exterior)
	isDropZone(gesture){
		var DZ = this.state.dropZoneValues;
		return gesture.moveX < DZ.x || gesture.moveX > DZ.x + DZ.width ||
			   gesture.moveY < DZ.y || gesture.moveY > DZ.y + DZ.height ;
	};






    //el contenido principal de la pantalla, donde va el consol.panel(back) y la aplicacion (front=children)
	renderMainContent(){
		return (
			
			
			<FlipView style={{flex: 1}}
                front={this.props.children}
                back={this.renderBack()}
                isFlipped={this.state.isFlipped}
                onFlipped={() => {}}
                flipAxis="y"
                flipEasing={Easing.out(Easing.ease)}
                flipDuration={500}
                perspective={1000}/>
		);
	};
    //aqui puede ir el consol.panel o el debuger
	renderBack(){
		return (
			<View>
				{ConsolePanel}
			</View>
		);
	};






    //boton para arrastrar y click y todo 
	renderDraggable(){
        if(typeof this.props.sourceIMG === "undefined"){
            var option = <Image style={styles.bugimg} source={require('./../img/bug_icon.png')}/>
        }
        else{
            var option = this.props.sourceIMG;
        }
		return (
				<View style={styles.draggableContainer}>
						<Animated.View 
						{...this.panResponder.panHandlers}
						style={[styles.image, this.state.pan.getLayout()]}>
							<TouchableOpacity onPress={()=>{this.setState({isFlipped:!this.state.isFlipped})}}>
                                {option}
							</TouchableOpacity>
						</Animated.View>						
				</View>
		);
	};
};

const IMG = 50;
const Window = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
        flex    : 1,
		backgroundColor	: '#7f8c8d'
    },
    dropZone    : {			  
        height			: 6*(Window.height/8),
		top				: Window.height/8,
		bottom			: Window.height/8,
		width			: 3*(Window.width/5),
		left 			: Window.width/5,
		right			: Window.width/5,
        backgroundColor	:'#2c3e50',		
		position		: 'absolute'		
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - IMG/2,
        left        : Window.width/2 - IMG/2,
    },
    image      : {
        width   : IMG,
        height	: IMG,
		zIndex	: 999999
    },
	centertext	:	{
		textAlign   : 'center',
		color		: 'red'
	},
	Items	: {
		borderStyle			: 'solid',
		borderBottomColor	: 'red',
		borderBottomWidth 	: 1,
		padding				: 20,
		backgroundColor		: '#ffffff',
		flexDirection		: 'row',
		justifyContent		: 'space-between'
	},
	bugimg	:{
		width	: IMG,
		height	: IMG
	},
	coverDropZone:{
		opacity: 0
	}
});

module.exports = DragDebuger;