import React from 'react';
import { StyleSheet, Text, ListItem,View , StatusBar} from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'

export default class App extends React.Component {
  render() {
    return (
      <View>
          <StatusBar hidden={true} barStyle="light-content"/>
          <FixedHeader/>
          <QuestionTypeButtonGroupChooser/>
          <QuestionTypePicker/>
          <View style={{padding:20}}>
          <TextHeadings/>
              <Icons/>
<Exam/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
