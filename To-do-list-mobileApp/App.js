/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase';
import ListItem from './components/ListItem.js';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  AppRegistry,
  TouchableOpacity,
  ListView,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

    var config = {
    apiKey: "xxxxxxx",
    authDomain: "xxxxxx",
    databaseURL: "xxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxxx",
    messagingSenderId: "xxxxx"
    };
    firebase.initializeApp(config);
    


type Props = {};
export default class App extends Component<Props> {
    
    
    constructor(props) {
        
        super(props)
        
        this.tasksRef = firebase.database().ref('listItems');
        const dataSource = new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2,
        });
        
        this.state = {
            
        dataSource: dataSource,

        TextInputValueHolder: ''
            
        };

        
    }
    
    componentDidMount() {
        // start listening for firebase updates
        this.listenForTasks(this.tasksRef);
    }
    
    
    listenForTasks(tasksRef) {
        tasksRef.on('value', (dataSnapshot) => {
                    var tasks = [];
                    dataSnapshot.forEach((child) => {
                                         tasks.push({
                                                    name: child.val().text,
                                                    _key: child.key
                                                    });
                                         });
                    
                    this.setState({
                                  dataSource: this.state.dataSource.cloneWithRows(tasks)
                                  });
                    });
    }
    
    
    _renderItem(task) {

        const onTaskCompletion= () => {
            this.tasksRef.child(task._key).remove()
            
        };
        return (
            <View>
                <ListItem task={task} onTaskCompletion={onTaskCompletion} />

            </View>
            );
    }
    
 
    GetValueFunction = () =>{
        
        const { TextInputValueHolder }  = this.state ;
        
        firebase.database().ref('listItems').push(
         {
             text:TextInputValueHolder
         })
        
        this._textInput.clear()
        Alert.alert('Success!')
        
    }
    
 

  render() {
     
      let pic = {
      uri: 'https://pbs.twimg.com/profile_images/886738242447519744/wS8x6JJP_400x400.jpg'

      };
      
    return (
            
      <View style={styles.container}>
         
            <Image source={pic} style={{width: 100, height: 100, alignSelf:'center', marginTop:30}}/>
        
            <Text style={styles.welcome}>
                Graspie Daily To-Do List
            </Text>
            <Text style={styles.author}>
            Created by: Emmanuel Cott
            </Text>
            
            <View style={styles.toDoInputContainer}>

                <View style={{flex:1, flexDirection:'row'}}>
                    <TextInput
                        ref={component => this._textInput = component}
                        blurOnSubmit={true}
                        underlineColorAndroid="transparent"
                        style={styles.enterTask}
                        placeholder ="Type here..."
                        onChangeText={TextInputValueHolder => this.setState({TextInputValueHolder})}
                    />
                </View>
            
                <View style={{flex:0, flexDirection:'row', marginLeft:5,marginRight:10, backgroundColor:'#3BF325'}}>
                    <TouchableOpacity onPress={this.GetValueFunction}>
                        <Text style={styles.buttonText}>Enter</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
            
            
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
                style={styles.listView}/>
            
      </View>
    );
      
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',  centers items in middle horizontally and vertically
   // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 5,
  },
 author: {
     fontSize: 15,
     textAlign: 'center',
     marginTop: 5,
     marginBottom: 15,
     color:'#2595F3'

 },
  toDoInputContainer:{
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom:20
 },
 enterTask:{
     height: 36,
     padding: 4,
     flex: 4,
     marginLeft:10,
     fontSize: 18,
     borderWidth: 1,
     borderColor: '#48afdb',
     borderRadius: 4,
     color: '#D63CC3'
                              //   flex: 2, marginLeft:25, borderBottomWidth:1,borderBottomColor:'#D63CC3'
     },

  instructions: {
    textAlign: 'center',
    color: '#D63CC3',
    margin: 15,
  },
 buttonContainer: {
    backgroundColor: '#D63CC3',
    margin: 20
 },
 buttonText: {
    padding: 10,
    color: 'black',
    textAlign: 'center'
 }
         
});
