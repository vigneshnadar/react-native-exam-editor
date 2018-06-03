import React, {Component} from 'react'
import {ButtonGroup} from 'react-native-elements'

export default class QuestionTypeButtonGroupChooser extends Component {
    static navigationOptions = {title: 'Create Question'};

    constructor() {
        super()
        this.state = {selectedIndex: 2}
        this.selectQuestionType = this.selectQuestionType.bind(this)
    }

    selectQuestionType = (newQuestionTypeIndex) => {
        this.setState({selectedIndex : newQuestionTypeIndex})
    }

    // updateIndex(selectedIndex) {
    //     this.setState({selectedIndex})
    // }

    render() {
        const buttons = ['Multiple Choice',
            'Fill in the blank', 'Essay', 'True or\nfalse']
        const {selectedIndex} = this.state
        return (
            <ButtonGroup
                onPress={this.selectQuestionType}
                selectedIndex={this.state.selectedIndex}
                buttons={buttons}
                containerStyle={{height: 75}}/>)
    }

}

