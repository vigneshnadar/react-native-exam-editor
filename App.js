import React from 'react';
import { StyleSheet, Text, ListItem,View , StatusBar,ScrollView} from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'

export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
          <StatusBar hidden={true} barStyle="light-content"/>
          <FixedHeader/>
          <TrueFalseQuestionEditor/>
          <QuestionTypeButtonGroupChooser/>
          <QuestionTypePicker/>
          <View style={{padding:20}}>
          <TextHeadings/>
              <Icons/>
<Exam/>
          </View>
      </ScrollView>
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
