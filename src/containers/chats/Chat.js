import React, { PureComponent } from 'react';
import { TextField, List, ListItem, ListItemText} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import firebase from "firebase"
import config from '../../firebases'

class Chat extends PureComponent {
    constructor(props) {
        super(props)
        this.state = { text: "", messages: [] }
      }
      componentDidMount() {
        firebase.initializeApp(config)
        this.getMessages()
      }
    
      onSubmit = event => {
        if (event.charCode === 13 && this.state.text.trim() !== "") {
          this.writeMessageToDB(this.state.text)
          this.setState({ text: "" })
        }
      }
    
      writeMessageToDB = message => {
        firebase
          .database()
          .ref("messages/")
          .push({
            text: message
          })
      }
    
      getMessages = () => {
        var messagesDB = firebase
          .database()
          .ref("messages/")
          .limitToLast(500)
        messagesDB.on("value", snapshot => {
          let newMessages = []
          snapshot.forEach(child => {
            var message = child.val()
            newMessages.push({ id: child.key, text: message.text })
          })
          this.setState({ messages: newMessages })
          this.bottomSpan.scrollIntoView({ behavior: "smooth" })
        })
      }
    
      renderMessages = () => {
        return this.state.messages.map(message => (
          <ListItem>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText
              style={{ wordBreak: "break-word" }}
              primary={message.text}
            />
          </ListItem>
        ))
      }
    
      render() {
        return (
          <div>
            <List>
              {this.renderMessages()}
            </List>
            <TextField
              autoFocus={true}
              multiline={true}
              rowsMax={3}
              placeholder="votre message.."
              onChange={event => this.setState({ text: event.target.value })}
              value={this.state.text}
              onKeyPress={this.onSubmit}
              style={{ width: "98vw", overflow: "hidden" }}
            />
            <span ref={el => (this.bottomSpan = el)} />
          </div>
        )
      }
}

export default Chat;
