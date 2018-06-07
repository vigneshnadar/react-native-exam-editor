import React from 'react'
import {View, TextInput,ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'


const QUESTION_API_URL = 'http://localhost:8080/api/exam/EID/blanks';
let examid=0;
let lid=0;
let qid=0;

class FillInTheBlanksQuestionWidget extends React.Component {
    static navigationOptions = { title: "Fill in the Blanks"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            variables: '',
            points: 0,
            instructions:'Fill in the blanks'
        }

        this.updateForm = this.updateForm.bind(this)
        this.saveQuestion = this.saveQuestion.bind(this)

    }


    componentDidMount() {
        const {navigation} = this.props;
        examid = navigation.getParam("examId")
        lid = navigation.getParam("lessonId")

        qid = navigation.getParam("questionId")

if(qid!=0) {
    fetch("http://localhost:8080/api/blanks/" + qid)
        .then(response => (response.json()))
        .then(widgets => this.setState({
            title: widgets.title,
            description: widgets.description,
            points: widgets.points,
            variables: widgets.variables,
            instructions: widgets.instructions
        }))
}
    }

    updateForm(newState) {
        this.setState(newState)
    }


    renderBlanks(){
        var str = this.state.variables.split("]")

        if(str.length==0) return "";

        let wid = str.map(
            (s, index) => {
                var cur = s.split("[")
                return <Text key={index}><Text>{cur[0]}</Text><FormInput placeholder="fill blank" style={{width:30,backgroundColor: '#ffffff'}}/></Text>
            })

        return wid;
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
                }
                           multiline={true}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Variables</FormLabel>
                <FormInput value={this.state.variables} onChangeText={
                    text => this.updateForm({variables: text})
                }
                multiline={true}/>
                <FormValidationMessage>
                    Variables is required
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
                           title="Save"
                           onPress={() => this.saveQuestion()}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props.navigation
                               .navigate("QuestionList", {widgetId:examid,lessonId: lid})}/>

                <Text h3>Preview</Text>
                <Text><Text h2>{this.state.title}</Text><Text h2>{this.state.points}Pnts</Text></Text>
                <Text>{this.state.description}</Text>
                <Text>{this.renderBlanks()}</Text>
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

export default FillInTheBlanksQuestionWidget