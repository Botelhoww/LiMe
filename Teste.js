import { React, Component} from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';

class AppleStyleSwipeableRow extends Component {
    renderLeftActions = (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
      });
      return (
        <RectButton style={styles.leftAction} onPress={this.close}>
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{ translateX: trans }],
              },
            ]}>
            Archive
          </Animated.Text>
        </RectButton>
      );
    };
    render() {
      return (
        <Swipeable
          renderLeftActions={this.renderLeftActions}>
          <Text>
             "hello"
           </Text>
        </Swipeable>
      );
    }
  }