import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";
// import { Cell } from "react-native-cell-components";

export default class GPHomePageScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      tableHead: ["Time", "Description"],
      tableData: []
    };
  }

  componentDidMount() {
    this.getData();
  }
  static navigationOptions = {
    header: null,
    title: "GPhomePage"
  };

  getData = (): void => {
    //retrieve data
    var retrievedTable = [
      {
        time: "12.01",
        description: "This is the descriptiom"
      },
      {
        time: "12.01",
        description: "This is the descriptiom"
      },
      {
        time: "12.01",
        description: "This is the descriptiom"
      }
    ];

    let newTableState: Array<{}> = [];

    retrievedTable.forEach(data => {
      newTableState.push([
        data.time,

        <TouchableOpacity
        // style={styles.button}
        // onPress={() => navigate("Home")}
        >
          <TouchableHighlight>
            <Image
              // style={styles.image}
              source={{
                uri:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-c6GABdTIfS6Rm1EIZdB8FlyGomnbrYSKNRKHvns2S9WVQroKQ"
              }}
            />
          </TouchableHighlight>
          <View>
            <Text>{data.description}</Text>
          </View>
        </TouchableOpacity>
      ]);
    });

    this.setState({
      tableData: newTableState
    });
  };

  // _showData = (data, index) => {
  //   if (index !== 3) return;
  //   console.log(data);
  // };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImage}
          />
          <Text style={styles.mainHeaderText}>Pocket GP</Text>
        </View>
        <View style={styles.MainContainer}>
          <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"Surgery Information Will Go Here."}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
          />
        </View>
        <View style={styles.tableContainer}>
          <Table>
            <Row
              data={this.state.tableHead}
              flexArr={[1, 4]}
              style={styles.head}
              textStyle={styles.text}
            />
            <TableWrapper style={styles.wrapper}>
              <Col
                data={this.state.tableTitle}
                style={styles.title}
                heightArr={[28, 28]}
                textStyle={styles.text}
              />
              <Rows
                data={this.state.tableData}
                flexArr={[1, 4]}
                style={styles.row}
                textStyle={styles.text}
                onPress={() => this.showNotes}
              />
            </TableWrapper>
          </Table>
        </View>
      </View>
    );
  }

  showNotes = () => {
    console.log("Hello");
  };
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    margin: 10,
    marginTop: 15,
    marginBottom: 0,
    flexDirection: "column",
    flexWrap: "wrap"
  },
  container: {
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap"
  },
  logoContainer: {
    marginTop: 30,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(61,176,215,0.2)"
  },
  logoImage: {
    position: "absolute",
    top: 0,
    width: 40,
    height: 50,
    resizeMode: "center",
    marginLeft: 20
  },
  mainHeaderText: {
    fontSize: 36,
    color: "rgba(0, 0, 0, 1)",
    lineHeight: 48,
    textAlign: "right",
    marginRight: 20
  },
  TextInputStyleClass: {
    textAlign: "left",
    height: 40,
    borderWidth: 2,
    borderColor: "#9E9E9E",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    height: 150
  },
  tableContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 10,
    backgroundColor: "#fff",
    marginBottom: 280
  },
  head: {
    height: 40,
    backgroundColor: "#00BFFF"
  },
  wrapper: {
    flexDirection: "row"
  },
  title: {
    flex: 1,
    backgroundColor: "#f6f8fa"
  },
  row: {
    height: 28
  },
  text: {
    textAlign: "center"
  }
});

{
  /* {tableData.map((data, i) => (
                <TableWrapper key={i} style={styles.row}>
                  {data.map((cell, j) => (
                    <TouchableOpacity
                      key={j}
                      style={styles.cell}
                      onPress={() => this._showData(cell, j)}
                    >
                      <Cell data={cell} textStyle={styles.text} />
                    </TouchableOpacity>
                  ))}
                </TableWrapper>
              ))} */
}
