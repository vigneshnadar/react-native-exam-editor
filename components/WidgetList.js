import React, {Component} from 'react'
import {View, Alert, Picker, Button} from 'react-native'
import {Text, ListItem,ButtonGroup} from 'react-native-elements'



let lid=0;
class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      courseId: 1,
      moduleId: 1,
        selectedIndex:1,
        widgetType  : 'Assignment'
    }

      this.selectWidgetType = this.selectWidgetType.bind(this)
  }
  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId")
      lid=lessonId
    fetch("http://localhost:8080/api/lesson/"+lessonId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({widgets}))
  }

    selectWidgetType = (newWidgetTypeIndex) => {
        this.setState({selectedIndex : newWidgetTypeIndex})
    }


    addWidget(newWidgetType) {
        this.setState({ widgets: [ ...this.state.widgets, {
                widgetType: newWidgetType,title: 'new widget',description: newWidgetType
            }]})
    }


  render() {


    return(
      <View style={{padding: 15}}>
          <Picker
              selectedValue={this.state.widgetType}
              onValueChange={(itemValue, itemIndex) =>
                  this.setState({widgetType: itemValue})}>
              <Picker.Item key="1" value="Assignment" label="Assignment" />
              <Picker.Item key="2" value="Exam" label="Exam" />
          </Picker>
          <Text>{this.state.widgetType}</Text>
          <Button title="Add Widget"
                  onPress={() => this.addWidget
                  (this.state.widgetType)}/>

          {this.state.widgets.map(
              (widget, index) => (
                  <ListItem
                      onPress={() => {
                          if(widget.widgetType === "Assignment")
                              this.props.navigation
                                  .navigate("AssignmentWidget", {widgetId: widget.id, lessonId: lid})
                          if(widget.widgetType === "Exam")
                              this.props.navigation
                                  .navigate("QuestionList", {widgetId: widget.id, lessonId: lid})
                      }}
                      key={index}
                      subtitle={widget.widgetType}
                      title={widget.title}/>))}
      {/*{this.state.widgets.map(*/}
        {/*(widget, index) => (*/}
          {/*<ListItem*/}
            {/*onPress={() => this.props.navigation*/}
              {/*.navigate("QuestionList", {examId: widget.id})}*/}
            {/*key={index}*/}
            {/*subtitle={widget.description}*/}
            {/*title={widget.title}/>))}*/}
      </View>
    )
  }
}
export default WidgetList