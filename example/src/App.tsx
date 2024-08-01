import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useVisible } from 'react-native-hooks';

export default function App() {
  const modalExample = useVisible();

  return (
    <View style={styles.container}>
      <Pressable onPress={modalExample.toggle}>
        <Text>Toggle Button</Text>
      </Pressable>

      <Text>Visible: {modalExample.visible.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
