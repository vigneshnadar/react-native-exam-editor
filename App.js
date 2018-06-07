import React from 'react';
import { StyleSheet, Text, ListItem,View , StatusBar,ScrollView} from 'react-native';
import { Button} from 'react-native-elements';
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import { createStackNavigator } from 'react-navigation'
import ScreenX from './elements/ScreenX'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import EssayQuestionWidget from "./elements/EssayQuestionWidget";
import AssignmentWidget from "./elements/AssignmentWidget";
import FillInTheBlanksQuestionWidget from './elements/FillInTheBlanksQuestionWidget';

class Home extends React.Component
{
    static navigationOptions = { title: 'Home' };

    constructor(props) {
        super(props)
    }


    render()
    {
        return(
            <ScrollView>
                <StatusBar hidden={true} barStyle="light-content"/>
                <FixedHeader/>
                <Button title="Go to Screen A"
                        onPress={() => this.props.navigation
                            .navigate('ScreenA')}/>
                <Button title="Go to Screen B"
                        onPress={() => this.props.navigation
                            .navigate('ScreenB')}/>
                <Button title="Go to Screen X"
                        onPress={() => this.props.navigation
                            .navigate('ScreenX',{'parameter': 'some value'})}/>
                <Button title="Go to Course List"
                        onPress={() => this.props.navigation
                            .navigate('CourseList')}/>




                <QuestionTypeButtonGroupChooser/>
                <QuestionTypePicker/>
                <View style={{padding: 20}}>
                    <TextHeadings/>
                    <Icons/>
                    <Exam/>
                </View>
            </ScrollView>
        )
    }
}


class ScreenA extends React.Component {

    static navigationOptions = { title: 'ScreenA' };
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .navigate('Home')} />
            </View>
        )
    }
}


class ScreenB extends React.Component{
    static navigationOptions = { title: 'ScreenB' };
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <View>
                <Text h1>Screen B</Text>
            </View>
        )
    }
}

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    QuestionList,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    AssignmentWidget,
    EssayQuestionWidget,
    FillInTheBlanksQuestionWidget,
    Exam,
    ScreenA,
    ScreenB,
    ScreenX
});


export default App;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
