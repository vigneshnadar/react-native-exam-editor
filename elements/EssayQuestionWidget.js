import React from 'react'
import {View, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'


const QUESTION_API_URL = 'http://localhost:8080/api/exam/EID/essay';
let examid=0;

class EssayQuestionWidget extends React.Component {
    static navigationOptions = { title: "Essay Question"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0
        }

        this.updateForm = this.updateForm.bind(this)
        this.saveQuestion = this.saveQuestion.bind(this)

    }


    componentDidMount() {
        const {navigation} = this.props;
        examid = navigation.getParam("examId")
        // fetch("http://localhost:8080/api/lesson/"+lessonId+"/widget")
        //     .then(response => (response.json()))
        //     .then(widgets => this.setState({widgets}))
    }

    updateForm(newState) {
        this.setState(newState)
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

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({points: text})
                }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => this.saveQuestion()}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props.navigation
                               .navigate("WidgetList", {lessonId: lid})}/>

                <Text h3>Preview</Text>
               <Text><Text h2>{this.state.title}</Text><Text h2>{this.state.points}Pnts</Text></Text>
                <Text>{this.state.description}</Text>
                <TextInput
                multiline={true}
                numberOfLines={4}
                editable={true}
                value="Student enters answer here"/>

            </View>
        )
    }
}

export default EssayQuestionWidget