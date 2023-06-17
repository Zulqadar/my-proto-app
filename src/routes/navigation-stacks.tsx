import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { routes } from './routes';

const Stack = createNativeStackNavigator();

export const NavigationStacks = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Initial">
                {(routes || []).map(route => (
                    !route.isDisabled && <Stack.Screen
                        key={route.name}
                        name={route.name}
                        component={route.component}
                        options={route.options}
                        {...route?.restProps}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}