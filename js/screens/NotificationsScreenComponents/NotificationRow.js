/* @flow */
"use strict";

import React from "react";

import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import DiscourseUtils from "../../DiscourseUtils";

class NotificationRow extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={[styles.contentView, this._backgroundColor()]}
        underlayColor={"#ffffa6"}
        onPress={() => this.props.onClick()}
      >
        <View style={styles.container}>
          {this._iconForNotification(this.props.notification)}
          {this._textForNotification(this.props.notification)}
          <Image
            style={styles.siteIcon}
            source={{ uri: this.props.site.icon }}
          />
        </View>
      </TouchableHighlight>
    );
  }

  _iconForNotification(notification) {
    let name = DiscourseUtils.iconNameForNotification(notification);
    let FA5types = {};

    if (name === "heart" || name === "dot-circle") {
      FA5types.solid = true;
    }

    return (
      <FontAwesome5
        style={styles.notificationIcon}
        name={name}
        size={14}
        color="#919191"
        {...FA5types}
      />
    );
  }

  _textForNotification(notification) {
    let innerText;

    let data = this.props.notification.data;
    let displayName = data.display_username;

    if (notification.notification_type === 5) {
      // special logic for multi like
      if (data.count === 2) {
        displayName = `${displayName} and ${data.username2}`;
      } else if (data.count > 2) {
        let other = data.count === 2 ? "other" : "others";
        displayName = `${displayName}, ${data.username2} and ${data.count -
          2} ${other}`;
      }
    }

    switch (notification.notification_type) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 13:
      case 14:
      case 15:
      case 17:
      case 18:
        innerText = (
          <Text>
            {displayName}
            <Text style={styles.notificationText}>
              {" "}
              {this.props.notification.data.topic_title}
            </Text>
          </Text>
        );
        break;
      case 12:
        innerText = (
          <Text style={styles.notificationText}>
            {" "}
            {this.props.notification.data.badge_name}
          </Text>
        );
        break;
      case 16:
        let messages = data.inbox_count > 1 ? "messages" : "message";
        innerText = (
          <Text style={styles.notificationText}>
            {`${data.inbox_count} ${messages} in your ${data.group_name} inbox`}
          </Text>
        );
        break;
      case 19:
        innerText = (
          <Text>
            {displayName}
            <Text style={styles.notificationText}>
              {" "}
              {`liked ${data.count} of your posts`}
            </Text>
          </Text>
        );
        break;
      case 20:
        innerText = (
          <Text>
            <Text style={styles.notificationText}>
              {`"${notification.fancy_title}" approved`}
            </Text>
          </Text>
        );
        break;
      case 21:
        if (notification.fancy_title !== undefined) {
          innerText = (
            <Text>
              <Text style={styles.notificationText}>
                {`"${notification.fancy_title}" approved`}
              </Text>
            </Text>
          );
        } else {
          innerText = (
            <Text>
              <Text style={styles.notificationText}>
                {`${notification.data.num_approved_commits} commits approved`}
              </Text>
            </Text>
          );
        }
        break;
      case 22:
        innerText = (
          <Text>
            <Text style={styles.notificationText}>
              {`Membership accepted in "${notification.data.group_name}"`}
            </Text>
          </Text>
        );
        break;
      default:
        console.log("Couldn’t generate text for notification", notification);
        innerText = (
          <Text>Unmapped type: {notification.notification_type}</Text>
        );
    }

    return <Text style={styles.textContainer}>{innerText}</Text>;
  }

  _backgroundColor() {
    let read = this.props.notification.read;
    if (read) {
      return { backgroundColor: "white" };
    } else {
      return { backgroundColor: "#d1f0ff" };
    }
  }
}

const styles = StyleSheet.create({
  contentView: {
    borderBottomColor: "#ddd",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    fontSize: 14
  },
  notificationText: {
    color: "#08c"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 12
  },
  siteIcon: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginLeft: 12
  },
  notificationIcon: {
    alignSelf: "center",
    marginRight: 12
  }
});

export default NotificationRow;
