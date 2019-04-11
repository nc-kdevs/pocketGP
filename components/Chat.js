import React, { Component } from "react";
import { GiftedChat, SystemMessage } from "react-native-gifted-chat";

import Fire from "../Fire";

class Chat extends Component {
  state = {
    messages: []
  };

  get user() {
    return {
      name: this.props.name,
      _id: Fire.shared.uid
    };
  }

  render() {
    return (
      <GiftedChat
        renderSystemMessage={this.renderSystemMessage}
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;
