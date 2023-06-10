import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, SafeAreaView, Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
const Stack = createNativeStackNavigator();
const colors = {
  primary: '#202040',
  secondary: '#202060',
  accent: '#602080',
  text: '#D1DEEE',
};

const StartScreen = () => {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate('ChatScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor={colors.text}
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

const renderInputToolbar = (props, text) => {
  return (
    <InputToolbar
      {...props}
      // primaryStyle={{ marginBottom: 20 }}
      // primaryStyle={{ justifyContent: 'center', alignItems: 'center' }}
      // accessoryStyle={{ marginBottom: 20 }}
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: '#d33',
        borderRadius: 12,
        // borderWidth: 0.5,
        // borderColor: '#ddd',
        padding: 3,
        // marginBottom: 20,
      }}
    >
      <TextInput
        // onLayout={(event) => {
        //   if (this.state.textInputHeight === 0) {
        //     this.setState({ text: event.nativeEvent.layout.height });
        //   }
        // }}
        // onContentSizeChange={(event) => {
        //   this.setState({ text: event.nativeEvent.contentSize.height });
        // }}
        {...props}
      // ref={(input) => {
      //   this.textInput = input;
      // }}
      // onChangeText={(text) => this.setState({ text: text })}
      />
    </InputToolbar>
  );
}

// const ChatScreen = () => {
//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />
//       <TextInput
//         style={styles.input}
//         placeholder="Digite seu nome"
//         placeholderTextColor={colors.text}
//       />
//     </View>
//   );
// };
const ChatScreen = () => {
  const [images, setImages] = useState([]);

  // useEffect(() => {
  // fetchImages();
  //}, []);

  const fetchImages = async () => {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      'x-apikey': '5f682c8e-dbb5-4539-9278-d15652084af6',
      'Content-Type': 'application/json',
    };

    let bodyContent = JSON.stringify({
      prompt: 'An monster sized ant destroying New York with fire',
    });

    try {
      let response = await fetch('https://chatapi-mqyb.api.codehooks.io/dev/images', {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.json();
      setImages(data.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const renderItem = ({ item }) => {
    return <Image source={{ uri: item.url }} style={styles.image} />;
  };
  const [messages, setMessages] = useState([])
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'An monster sized ant destroying New York with fire',
        image: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-rQGWRlRgiOczmKnRTV8H3bHT/user-dk5t1uy8wjVkXMaldyB0VtDh/img-3yCqLgfIPzp76AkpaVpIJhEI.png?st=2023-06-10T17%3A32%3A53Z&se=2023-06-10T19%3A32%3A53Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-09T20%3A40%3A29Z&ske=2023-06-10T20%3A40%3A29Z&sks=b&skv=2021-08-06&sig=EHaJtSnAAQ5iJPCMR52KEKJ3KWhLbVcMgQ6ND32y%2BAo%3D",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Dall-e',
          avatar: 'https://static.wikia.nocookie.net/dalle/images/d/d0/Openai-avatar.png/revision/latest?cb=20220604071641',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    // <SafeAreaView style={styles.chatContainer}>
    //   <StatusBar style="light" />
    //   <KeyboardAvoidingView
    //     style={{
    //       flex: 1,
    //       paddingHorizontal: 24,
    //       width: '100%',
    //     }}
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   >
    //     <FlatList
    //       data={[{
    //         "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-rQGWRlRgiOczmKnRTV8H3bHT/user-dk5t1uy8wjVkXMaldyB0VtDh/img-3yCqLgfIPzp76AkpaVpIJhEI.png?st=2023-06-10T17%3A32%3A53Z&se=2023-06-10T19%3A32%3A53Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-09T20%3A40%3A29Z&ske=2023-06-10T20%3A40%3A29Z&sks=b&skv=2021-08-06&sig=EHaJtSnAAQ5iJPCMR52KEKJ3KWhLbVcMgQ6ND32y%2BAo%3D"
    //       },
    //       {
    //         "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-rQGWRlRgiOczmKnRTV8H3bHT/user-dk5t1uy8wjVkXMaldyB0VtDh/img-Pwbyjm5Xl0oO9VIzzoUh86Kw.png?st=2023-06-10T17%3A32%3A53Z&se=2023-06-10T19%3A32%3A53Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-09T20%3A40%3A29Z&ske=2023-06-10T20%3A40%3A29Z&sks=b&skv=2021-08-06&sig=uP8zFLvcG7lmBuv9SB8nryD5q2kEQg%2BrmI2ySMA7ogQ%3D"
    //       }]}
    //       renderItem={renderItem}
    //       keyExtractor={(item) => item.url}
    //       contentContainerStyle={styles.imageList}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Digite seu nome"
    //       placeholderTextColor="#D1DEEE"
    //     />
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
    <View style={{
      flex: 1,
      backgroundColor: colors.primary,
    }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: colors.primary,
          // marginTop: -54,
          // marginBottom: 64,
        }}
        imageStyle={{
          width: 300,
          height: 300,
        }}
        renderInputToolbar={props => {
          return (

            <InputToolbar {...props}
              primaryStyle={{
                // backgroundColor: 'red',
                backgroundColor: colors.primary,
                marginHorizontal: 24,
                borderRadius: 16,
                // borderWidth: StyleSheet.hairlineWidth,
                // borderColor: colors.text,
                color: 'white'
              }}

              containerStyle={{
                // justifyContent: 'center',
                backgroundColor: colors.primary,
              }}
            />
            // <View style={{
            //   flexDirection: 'row',
            //   alignItems: 'center',
            //   justifyContent: 'space-between',
            //   // backgroundColor: colors.accent,
            //   backgroundColor: colors.primary,
            //   width: '100%',
            //   borderRadius: 16,
            //   // marginTop: 12,
            //   // marginBottom: 24,
            //   // paddingVertical: 12,
            //   // paddingHorizontal: 24,
            // }}>
            //   <InputToolbar {...props} 
            //   primaryStyle={{
            //     // backgroundColor: 'red',
            //     backgroundColor: colors.primary,
            //     marginHorizontal: 24,
            //     borderRadius: 16,
            //     // borderWidth: StyleSheet.hairlineWidth,
            //     // borderColor: colors.text,
            //     color: 'white'
            //   }}

            //   containerStyle={{
            //     // justifyContent: 'center',
            //     backgroundColor: colors.primary,
            //   }}
            //   />
            // </View>
          )
        }}

        user={{
          _id: 1,
        }}
      />
    </View>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
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
    // backgroundColor: '#333',
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
