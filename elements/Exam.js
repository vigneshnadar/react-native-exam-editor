import React, {Component} from 'react'
import {ListItem} from 'react-native-elements'
import {View, Text} from 'react-native'


const questions = [
    {	title: 'Question 1', subtitle: 'Multiple choice',
        icon: 'list'},
    {	title: 'Question 2', subtitle: 'Fill-in the blanks',
        icon: 'code'},
    {	title: 'Question 3', subtitle: 'True or false',
        icon: 'check'},
    {	title: 'Question 4', subtitle: 'Essay',
        icon: 'subject'}]

export default class Exam extends Component {


    render(){
        return (
            <View style={{padding:15}}>
                <Text h1>Lists</Text>
                {questions.map((question, index) => (
                    <ListItem
                        key={index}
                        title={question.title}
                        leftIcon={{name: question.icon}}
                        subtitle={question.subtitle}/>
                ))}
            </View>

        )
    }
}



