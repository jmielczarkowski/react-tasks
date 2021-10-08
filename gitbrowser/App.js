import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectRepository } from "../gitbrowser/components/SelectRepository";
import { IssueDetails } from "../gitbrowser/components/IssueDetails";
import { IssueList } from "../gitbrowser/components/IssueList";

export const SCREEN_SELECTREPOSITORY = "SelectRepository";
export const SCREEN_ISSUELIST = "IssueList";
export const SCREEN_ISSUEDETAILS = "IssueDetails";

const Stack = createNativeStackNavigator();
const App = () => {

    let selectRepository = "Select repository";
    let issues = "Issues";
    let issueDetails = "Issue details";

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={SCREEN_SELECTREPOSITORY}
                    component={SelectRepository}
                    options={{ title: selectRepository }}
                />

                <Stack.Screen
                    name={SCREEN_ISSUELIST}
                    component={IssueList}
                    options={{ title: issues }}
                />
                <Stack.Screen
                    name={SCREEN_ISSUEDETAILS}
                    component={IssueDetails}
                    options={{ title: issueDetails }}
                />



            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;