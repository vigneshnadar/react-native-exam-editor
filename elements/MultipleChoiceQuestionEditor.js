import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage,ListItem}
  from 'react-native-elements'

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
      }

      this.updateForm = this.updateForm.bind(this);
      this.addChoice = this.addChoice.bind(this);
  }

  updateForm(newState) {
    this.setState(newState)
  }

    addChoice(newChoice) {
        this.setState({ choices: [ ...this.state.choices, {
            description: newChoice
            }]})
    }

  render() {
    return(
      <View>
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

          {this.state.choices.map(
              (choice, index) => (
                  <ListItem
                      key={index}
                      subtitle={choice.description}
                      title={choice.description}/>))}

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"/>
        <Button	backgroundColor="red"
                 color="white"
                 title="Cancel"/>

        <Text h3>Preview</Text>
        <Text h2>{this.state.title}</Text>
        <Text>{this.state.description}</Text>

      </View>
    )
  }
}

export default MultipleChoiceQuestionEditor