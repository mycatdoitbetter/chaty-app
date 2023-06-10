import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import {
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';

const Stack = createNativeStackNavigator();
const colors = {
  primary: '#202040',
  secondary: '#202060',
  accent: '#602080',
  text: '#D1DEEE',
};

const StartScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const handleStart = () => {
    navigation.navigate('ChatScreen', { name });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor={colors.text}
        value={name}
        onChangeText={setName}
      />
      <Pressable style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Começar</Text>
        <AntDesign name="arrowright" size={16} color={colors.text} />
      </Pressable>
      <Pressable>
        <Text style={styles.anonymousText}>Entrar como anônimo</Text>
      </Pressable>
    </View>
  );
};

const ChatScreen = ({ route }) => {
  const { name } = route.params;
  const [images, setImages] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'An monster sized ant destroying New York with fire',
        image:
          'https://oaidalleapiprodscus.blob.core.windows.net/private/org-rQGWRlRgiOczmKnRTV8H3bHT/user-dk5t1uy8wjVkXMaldyB0VtDh/img-3yCqLgfIPzp76AkpaVpIJhEI.png?st=2023-06-10T17%3A32%3A53Z&se=2023-06-10T19%3A32%3A53Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-09T20%3A40%3A29Z&ske=2023-06-10T20%3A40%3A29Z&sks=b&skv=2021-08-06&sig=EHaJtSnAAQ5iJPCMR52KEKJ3KWhLbVcMgQ6ND32y%2BAo%3D',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Dall-e',
          avatar:
            'https://static.wikia.nocookie.net/dalle/images/d/d0/Openai-avatar.png/revision/latest?cb=20220604071641',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        messagesContainerStyle={{
          backgroundColor: colors.primary,
        }}
        imageStyle={{
          width: 300,
          height: 300,
        }}
        renderInputToolbar={(props) => {
          return (
            <InputToolbar
              {...props}
              primaryStyle={{
                backgroundColor: colors.primary,
                marginHorizontal: 24,
                borderRadius: 16,
                color: 'white',
              }}
              containerStyle={{
                backgroundColor: colors.primary,
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: colors.text,
    borderWidth: 1,
    fontWeight: '500',
    width: '100%',
    color: colors.text,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.accent,
    width: '100%',
    borderRadius: 16,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: colors.text,
    fontWeight: '600',
  },
  anonymousText: {
    color: colors.text,
    marginTop: 18,
    fontWeight: '300',
    textDecorationLine: 'underline',
  },
  imageList: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-start',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
  },
});
