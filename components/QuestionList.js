import React, {Component} from 'react'
import {View, Alert,Picker,Button} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import QuestionTypePicker from '../elements/QuestionTypePicker'

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: 1,
        questionType  : 'MultipleChoice'
    }

    this.addQuestion = this.addQuestion.bind(this);


  }
  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    fetch("http://localhost:8080/api/exam/"+examId+"/question")
      .then(response => (response.json()))
      .then(questions => this.setState({questions}))
  }


    addQuestion(newQuestionType) {
        this.setState({ questions: [ ...this.state.questions, {
          type: newQuestionType,title: 'new question',description: newQuestionType
            }]})
    }


  render() {
    return(
      <View style={{padding: 15}}>

          <Picker
              selectedValue={this.state.questionType}
              onValueChange={(itemValue, itemIndex) =>
                  this.setState({questionType: itemValue})}>
              <Picker.Item key="1" value="MultipleChoice" label="Multiple choice" />
              <Picker.Item key="2" value="Essay" label="Essay" />
              <Picker.Item key="3" value="TrueFalse" label="True or false" />
              <Picker.Item key="4" value="Fill in the blanks" label="Fill in the blanks" />
          </Picker>
          <Text>{this.state.questionType}</Text>
          <Button title="Add Question"
                  onPress={() => this.addQuestion
                  (this.state.questionType)}/>

      {this.state.questions.map(
        (question, index) => (
          <ListItem
            onPress={() => {
              if(question.type === "TrueFalse")
                this.props.navigation
                  .navigate("TrueFalseQuestionEditor", {questionId: question.id})
              if(question.type === "MultipleChoice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                if(question.type === "Essay")
                    this.props.navigation
                        .navigate("EssayQuestionWidget", {questionId: question.id})
            }}
            key={index}
            subtitle={question.description}
            title={question.title}/>))}
      </View>
    )
  }
}
export default QuestionList