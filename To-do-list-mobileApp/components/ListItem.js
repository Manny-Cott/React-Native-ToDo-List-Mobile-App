import React, {
  Component
} from 'react';
import {
  View,
  Text,
    TouchableHighlight,
    Image,
  StyleSheet
} from 'react-native';


class ListItem extends Component {
  render() {
    return (
            
            <View style={styles.listItem}>
                <Text style={styles.listItemTitle}>{this.props.task.name}</Text>
                    <TouchableHighlight onPress={this.props.onTaskCompletion}>
                        <Text style={{color:'#F32F25'}}>
                            Delete
                        </Text>
                    </TouchableHighlight>
            </View>

    );
  }
}

const styles = StyleSheet.create({
                                 placeholder: {
                                 borderColor: 'gray',
                                 alignItems:'center',
                                 borderWidth: 1,
                                 },
     listItem: {
         borderBottomColor: '#eee',
         borderColor: 'gray',
         flexDirection:'row',
         alignItems:'center',
         borderWidth: 1,
         padding:20
         },
     listItemTitle: {
         flex: 6,
         color: '#000',
         fontSize: 16,
     },
     listItemAction: {
         flex: 1,
         width: 40,
         height: 40
     },
 });

module.exports = ListItem;


