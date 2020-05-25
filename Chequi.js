import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class App extends Component {
    state = {
        checked: false,
    };

    render() {
        return (
            <View style={styles.container}>
                <CheckBox
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        flex: 1,
        position: 'relative',
    },
});
