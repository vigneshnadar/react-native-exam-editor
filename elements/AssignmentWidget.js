import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'


let lid=0;
let widId=0;


const LESSON_API_URL = 'http://localhost:8080/api/lesson/LID/assignment';
const LESSON_DELETE_API_URL = 'http://localhost:8080/api/lesson/LID';

class AssignmentWidget extends React.Component {
    static navigationOptions = { title: "Assignment Question"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            widgetType: 'Assignment'
        }

        this.addAssignment = this.addAssignment.bind(this);
    }


    componentDidMount() {
        const {navigation} = this.props;
        lid = navigation.getParam("lessonId")
        widId= navigation.getParam("widgetId")


        fetch("http://localhost:8080/api/assignment/"+widId)
            .then(response => (response.json()))
            .then(widgets => this.setState({title: widgets.title,
            description: widgets.description,
            points: widgets.points,
            widgetType: widgets.widgetType}))
    }


    addAssignment(){
        var DYNAMIC_URL = LESSON_API_URL.replace('LID',lid)
        console.log(DYNAMIC_URL);
        return fetch(DYNAMIC_URL,{
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            //return response.json();
            console.log("assignment done");
        })
    }



    updateForm(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <ScrollView>
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
                <FormInput value={this.state.points + ""} onChangeText={
                    text => this.updateForm({points: text})
                }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => this.addAssignment()}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props.navigation
                               .navigate("WidgetList", {lessonId: lid})}/>

                <Text h2>Preview</Text>
                <Text><Text h4>{this.state.title+"     "}</Text><Text h4 style={{textAlign:'right',marginLeft:20}}>{this.state.points}Pts</Text></Text>
                <Text>{this.state.description}</Text>
                <Text h3>Essay Answer</Text>
                <FormInput
                    multiline={true}
                    numberOfLines={4}
                    editable={true}
                    value="Student enters answer here"/>
                <Text h3>Upload a file</Text>
                <FormInput
                    multiline={true}
                    numberOfLines={4}
                    editable={true}
                    value="File Upload"/>
                <Text h3>Submit a link</Text>s
                <FormInput
                    multiline={true}
                    numberOfLines={4}
                    editable={true}
                    value="Link"/>
                <Button	backgroundColor="blue"
                           color="white"
                           title="Submit"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

            </ScrollView>
        )
    }
}

export default AssignmentWidget