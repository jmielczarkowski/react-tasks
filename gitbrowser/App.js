import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectRepository } from "../gitbrowser/components/SelectRepository";
import { IssueDetails } from "../gitbrowser/components/IssueDetails";
import { IssueList } from "../gitbrowser/components/IssueList";

const Stack = createNativeStackNavigator();
const App = () => {
  let selectRepository = "Select repository";
  let issues = "Issues";
  let issueDetails = "Issue details";

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name={selectRepository}
        component={SelectRepository}
        options={{ title: selectRepository }}
        />
        <Stack.Screen
          name={issues}
          component={IssueList}
          options={{ title: issues }}
        />
        <Stack.Screen
          name={issueDetails}
          component={IssueDetails}
          options={{ title: issueDetails }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
