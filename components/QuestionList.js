import React, {Component} from 'react'
import {View, TextInput,Alert,Picker,ScrollView} from 'react-native'
import {Text,ListItem,Icon, Button} from 'react-native-elements'

import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'

const EXAM_API_URL = 'http://localhost:8080/api/lesson/LID/exam';


let lid=0;
let examId=0;

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: 1,
        questionType  : 'MultipleChoice',
            title: '',
            description: '',
            points: 0,
            widgetType: 'Exam'

    }

    this.addQuestion = this.addQuestion.bind(this);
      this.addExam = this.addExam.bind(this);

  }


  componentDidMount() {
    const {navigation} = this.props;
      lid = navigation.getParam("lessonId")
      examId = navigation.getParam("widgetId")


      widId= navigation.getParam("widgetId")


      fetch("http://localhost:8080/api/exam/"+examId)
          .then(response => (response.json()))
          .then(widgets => this.setState({title: widgets.title,
              description: widgets.description,
              points: widgets.points,
              widgetType: widgets.widgetType}))

    // const examId = navigation.getParam("examId")
    fetch("http://localhost:8080/api/exam/"+examId+"/question")
      .then(response => (response.json()))
      .then(questions => this.setState({questions}))
  }


    addQuestion(newQuestionType) {


        if(newQuestionType === "TrueFalse")
            this.props.navigation
                .navigate("TrueFalseQuestionEditor", {examId: examId,questionId: 0,lessonId:lid})
        if(newQuestionType === "MultipleChoice")
            this.props.navigation
                .navigate("MultipleChoiceQuestionEditor", {examId: examId,questionId: 0,lessonId:lid})
        if(newQuestionType === "Essay")
            this.props.navigation
                .navigate("EssayQuestionWidget", {examId: examId,questionId: 0,lessonId:lid})

        // this.setState({ questions: [ ...this.state.questions, {
        //   type: newQuestionType,title: 'new question',description: newQuestionType
        //     }]})
    }





    addExam(){
        var DYNAMIC_URL = EXAM_API_URL.replace('LID',lid)
        console.log(DYNAMIC_URL);
        return fetch(DYNAMIC_URL,{
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            //return response.json();
            console.log("done");
        })
    }

    updateForm(newState) {
        this.setState(newState)
    }


  render() {
    return(
      <ScrollView style={{padding: 15}}>

          <FormLabel>Title</FormLabel>
          <FormInput value={this.state.title} onChangeText={
              text => this.updateForm({title: text})
          }/>
          <FormValidationMessage>
              Title is required
          </FormValidationMessage>

          <FormLabel>Description</FormLabel>
          <FormInput value={this.state.description} onChangeText={
              text => this.updateForm({description: text})
          }/>
          <FormValidationMessage>
              Description is required
          </FormValidationMessage>

          <FormLabel>Points</FormLabel>
          <FormInput value={this.state.points+""} onChangeText={
              text => this.updateForm({points: text})
          }/>
          <FormValidationMessage>
              Points is required
          </FormValidationMessage>

          <Button	backgroundColor="green"
                     color="white"
                     title="Save before adding question"
                     onPress={() => this.addExam()}/>
          <Button	backgroundColor="red"
                     color="white"
                     title="Cancel"
                     onPress={() => this.props.navigation
                         .navigate("WidgetList", {lessonId: lid})}/>

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
                  .navigate("TrueFalseQuestionEditor", {examId: examId,questionId: question.id})
              if(question.type === "MultipleChoice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor", {examId: examId,questionId: question.id})
                if(question.type === "Essay")
                    this.props.navigation
                        .navigate("EssayQuestionWidget", {examId: examId,questionId: question.id})
            }}
            key={index}
            subtitle={question.description}
            title={question.title}
          />))}
      </ScrollView>
    )
  }
}
export default QuestionList