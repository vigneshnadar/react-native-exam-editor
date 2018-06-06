import React from 'react'
import {View, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'


let lid=0;


const LESSON_API_URL = 'http://localhost:8080/api/course/CID/module/MID/lesson';
const LESSON_DELETE_API_URL = 'http://localhost:8080/api/lesson/LID';

class AssignmentWidget extends React.Component {
    static navigationOptions = { title: "Assignment Question"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            options: ''

        }
    }


    componentDidMount() {
        const {navigation} = this.props;
        lid = navigation.getParam("lessonId")
        // fetch("http://localhost:8080/api/lesson/"+lessonId+"/widget")
        //     .then(response => (response.json()))
        //     .then(widgets => this.setState({widgets}))
    }


    addAssignment(){
        var DYNAMIC_URL = LESSON_API_URL.replace('CID',courseId)
        DYNAMIC_URL = DYNAMIC_URL.replace('MID',moduleId)
        console.log(DYNAMIC_URL);
        return fetch(DYNAMIC_URL,{
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }



    updateForm(newState) {
        this.setState(newState)
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
                           onPress={() => this.addAssignment
                           (this.state.widgetType)}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

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