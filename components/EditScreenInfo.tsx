import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor='rgba(0,0,0,0.8)'
          darkColor='rgba(255,255,255,0.8)'
        >
          This Convex Hull Visualizer uses Graham Scan's Algorithm published in 1972 by Graham. 
          To use this app you can tap anywhere and a convex hull will be drawn automatically. 
          Use the reset button located in header to start afresh!
        </Text>
        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor='rgba(255,255,255,0.05)'
          lightColor='rgba(0,0,0,0.05)'
        >
          <MonoText>Time Complexity - O(n log n)</MonoText>
        </View>
      </View>      

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
          Convex Hull construction Algorithm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://cp-algorithms.com/geometry/convex-hull.html'
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
