import React,{Component} from 'react';
import {Animated,Dimensions,StyleSheet,Text,TouchableHighlight,View} from 'react-native';

import {ListItem,Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

import db from '../config';

export default class SwipeableFlatlist extends Component{
constructor(props){
    super(props)
    this.state={
        allNotifications:this.props.allNotifications
    }
}

updateMarkAsread=notification=>{
    db.collection("all_notifications")
    .doc(notification.doc_id)
    .update({
        notification_status:"read"
    })
}

onSwipeValueChange=swipeData=>{
    var allNotifications = this.state.allNotifications;
    const {key,value} = swipeData;
    if(value<-Dimensions.get("window").width){
        const newData=[...allNotifications];
        this.updateMarkAsread(allNotifications[key]);
        newData.splice(key,1);
        this.setState({
            allNotifications: newData
        })
    }
}

renderItem=data=>(
    <Animated.View>
        <Text>Item Name: {data.item.Item_name}</Text>
        <Text>Message:{data.item.message}</Text>
    </Animated.View>
)

renderHiddenItems=()=>(
    <View style={styles.rowBack}>
        <View style={[styles.backRightBtn,styles.backRightBtnRight]}>
            <Text style={styles.backTextWhite}>Mark as read</Text>
        </View>
    </View>
)

render(){
    return(
        <View style={styles.container}>
            <SwipeListView
            disableRigthSwipe
            data={this.state.allNotifications}
            renderItem={this.renderItem}
            renderHiddenItem={this.renderHiddenItems}
            rightOpenValue={-Dimensions.get("window").width}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onSwipeValueChange={this.onSwipeValueChange}
            keyExtractor={(item,index)=>index.toString()}
            />
        </View>
    )
}

}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1
    },
    backTextWhite:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:15,
        textAlign:'center',
        alignSelf:'flex-start'
    },
    rowBack:{
        alignItems:'center',
        backgroundColor:'#29b6f6',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:15
    },
    backRightBtn:{
        alignItems:'center',
        bottom:0,
        justifyContent:'center',
        position:'absolute',
        top:0,
        width:100
    },
    backRightBtnRight:{
        backgroundColor:'#29b6f6',
        right:0
    }
})