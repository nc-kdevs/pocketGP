import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Modal,
  Text,
  Alert,
  View,
  ListView,
  RecyclerViewBackedScrollView
} from "react-native";

export interface NavlinksProps {
  modalVisible: boolean;
  setModalVisible: () => void;
}

export class Navlinks extends Component<NavlinksProps> {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(["Analytics", "Account Settings"])
    };
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View>
            <View
              style={{
                alignSelf: "stretch",
                height: 100,
                backgroundColor: "skyblue"
              }}
            >
              <ListView
                dataSource={this.state.dataSource}
                renderRow={rowData => <Text>{rowData}</Text>}
              />
            </View>
          </View>
          <Button
            onPress={() => this.props.setModalVisible()}
            title="Close"
            color="#841584"
            accessibilityLabel="Close Modal"
          />
        </Modal>
      </View>
    );
  }
}

export default Navlinks;
