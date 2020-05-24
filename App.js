import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";

export default function App() {
  const [list, setlist] = useState([
    {
      title: "Fatma",
      case: true
    },
    {
      title: "Aya",
      case: false
    },
    {
      title: "Smsm",
      case: true
    }
  ]);

  const [status, setstatus] = useState("all");
  const [value, setvalue] = useState("");
  const [displayedList, setDisplayedList] = useState();

  useEffect(() => {
    if (status == "all") {
      setDisplayedList(list);
    } else if (status == "done") {
      setDisplayedList(
        list.filter(item => {
          return item.case == true;
        })
      );
    } else {
      setDisplayedList(
        list.filter(item => {
          return item.case == false;
        })
      );
    }
  }, [status, list]);

  const handelitempress = (itemTitle, itemCase) => {
    let newlist = [];
    list.map(element => {
      if (element.title != itemTitle) {
        newlist.push(element);
      } else {
        newlist.push({ title: itemTitle, case: !itemCase });
      }
    });
    setlist(newlist);
  };

  const handelPress = () => {
    setlist([...list, { title: value, case: false }]);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headertext}>Baby Shark</Text>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text
            style={{
              marginStart: 30,
              textAlign: "center",
              color: "#fff",
              fontSize: 20
            }}
          >
            Todo
          </Text>
          <Text style={{ textAlign: "center", color: "#fff", marginTop: 5 }}>
            doddddd
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TextInput
            style={styles.buttons}
            value={value}
            onChangeText={setvalue}
          />
          <TouchableOpacity
            onPress={() => {
              handelPress();
            }}
          >
            <Ionicons name="md-add-circle" size={24} color="orange" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              setstatus("all");
            }}
            style={styles.buttons}
          >
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setstatus("active");
            }}
            style={styles.buttons}
          >
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setstatus("done");
            }}
            style={styles.buttons}
          >
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={displayedList}
        renderItem={({ item }) => (
          <Item
            style={styles.item}
            title={item.title}
            case={item.case}
            handelitempress={handelitempress}
          />
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
}
function Item(props) {
  const [icon, setIcon] = useState();
  const [casee, setCasee] = useState();
  useEffect(() => {
    setCasee(props.case);
    if (casee == false) {
      setIcon("square");
    } else if (casee == true) {
      setIcon("check-square");
    }
  }, [casee]);
  return (
    <TouchableOpacity
      style={{ flex: 1, flexDirection: "row" }}
      onPress={() => {
        setCasee(!props.case);
        props.handelitempress(props.title, props.case);
      }}
    >
      <Feather name={icon} size={24} color="orange" />
      <Feather name={icon} size={24} color="black" />
      <Text style={{ color: "orange" }}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  headertext: {
    flex: 1,
    color: "orange",
    fontSize: 30,
    textAlign: "center",
    borderRadius: 20
  },

  item: {
    width: 10,
    backgroundColor: "#f00"
  },
  buttons: {
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 5
  }
});
