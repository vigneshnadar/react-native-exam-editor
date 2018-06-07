
import React, {Component} from 'react'
import { View } from 'react-native'
import { Text,Button,FormLabel,FormInput,FormValidationMessage,CheckBox } from 'react-native-elements'

const QUESTION_API_URL = 'http://localhost:8080/api/exam/EID/truefalse';

let examid=0;
let lid=0;
let qid=0;
export default class TrueFalseQuestionEditor extends Component {


    constructor(props) {
        super(props)

        this.state = {title: '',
            description: '',
            points: 0,
        isTrue: true,
            instructions:'TrueFalse'}
        this.formUpdate = this.formUpdate.bind(this)
        this.saveQuestion = this.saveQuestion.bind(this)
    }


    componentDidMount() {
        const {navigation} = this.props;
        examid = navigation.getParam("examId")
        lid = navigation.getParam("lessonId")
        qid = navigation.getParam("questionId")

        if (qid != 0) {
            fetch("http://localhost:8080/api/truefalse/" + qid)
                .then(response => (response.json()))
                .then(widgets => this.setState({
                    title: widgets.title,
                    description: widgets.description,
                    points: widgets.points,
                    instructions: widgets.instructions,
                    isTrue: widgets.isTrue
                }))
        }

        }


    formUpdate(update) {
        this.setState(update)
    }


    saveQuestion(){
        //console.log(this.state.)
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
            console.log("question done");
        })
    }



    render(){
        return (
            <View>
            <FormLabel>Title</FormLabel>
            <FormInput value={this.state.title} onChangeText={
                text => this.formUpdate({title: text}) }/>
        <FormValidationMessage>
            Title is required
        </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.formUpdate({description: text}) }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput value={this.state.points+""} onChangeText={
                    text => this.formUpdate({points: text})
                }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <CheckBox title='The answer is true'
                          onPress={() => this.formUpdate
                          ({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue}/>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => this.saveQuestion()}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h3>Preview</Text>
                <Text>{this.state.description} {this.state.title}</Text>
            </View>
        )
    }
}