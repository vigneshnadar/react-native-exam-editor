import React from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox, Icon} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage,ListItem}
  from 'react-native-elements'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'


let examid=0;
let lid=0;

const QUESTION_API_URL = 'http://localhost:8080/api/exam/EID/choice';

class MultipleChoiceQuestionEditor extends React.Component {
  static navigationOptions = { title: "Multiple Choice"}
  constructor(props) {
      super(props)
      this.state = {
          title: '',
          description: '',
          points: 0,
          options: '',
          choices: [],
          correctChoice:'',
          isTrue: true,
          instructions:'MultipleChoice'
      }

      this.updateForm = this.updateForm.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.addChoice = this.addChoice.bind(this);
      this.saveQuestion = this.saveQuestion.bind(this)
  }


    componentDidMount() {
        const {navigation} = this.props;
        examid = navigation.getParam("examId")
        lid = navigation.getParam("lessonId")
        // fetch("http://localhost:8080/api/lesson/"+lessonId+"/widget")
        //     .then(response => (response.json()))
        //     .then(widgets => this.setState({widgets}))
    }

  updateForm(newState) {
    this.setState(newState)
  }

    addChoice(newChoice) {
        this.setState({ choices: [ ...this.state.choices, {
            choice: newChoice
            }]})
    }


    saveQuestion(){
        var DYNAMIC_URL = QUESTION_API_URL.replace('EID',examid)
        console.log(DYNAMIC_URL);
        return fetch(DYNAMIC_URL,{
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            //return response.json();
            console.log("essay done");
        })
    }


    onSelect(index,value){
      this.setState({
          correctChoice: value
      })
    }

  render() {
    return(
      <ScrollView>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({title: text})
        }/>
        <FormValidationMessage>
          Title is required
        </FormValidationMessage>

        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({description: text})
        }/>
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>

        <FormLabel>Choices</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({options: text})
        }/>
          <FormValidationMessage>
              Choice is required
          </FormValidationMessage>
          <Button title="Add Choice"
                  onPress={() => this.addChoice
                  (this.state.options)}/>



        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                   onPress={() => this.saveQuestion()}/>
        <Button	backgroundColor="red"
                 color="white"
                 title="Cancel"
                   onPress={() => this.props.navigation
                       .navigate("WidgetList", {widgetId:examid,lessonId: lid})}/>

        <Text h1>Preview</Text>
        <Text h3>{this.state.title}</Text>
        <Text>{this.state.description}</Text>
          <RadioGroup
              onSelect = {(index, value) => this.onSelect(index, value)}>

              {this.state.choices.map(
                  (ch, index) => (
                      <RadioButton key={index} value={ch.choice}
                      >
                          <Text>{ch.choice+"       "}
                              <Icon
                                  name='times-circle'
                                  type='font-awesome'
                                  color='#517fa4'
                                  size={20}
                              />
                          </Text>
                      </RadioButton>

                  ))}
          </RadioGroup>

      </ScrollView>
    )
  }
}

export default MultipleChoiceQuestionEditor