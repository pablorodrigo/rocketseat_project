import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

//creating routes
const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Github Perfil'
            }
        }
    }, {
        //for all screens
        defaultNavigationOptions: {
            headerTintColor: '#ffffff',
            headerBackTitleVisible: false, //hide title on back button (ios)
            headerStyle: {
                backgroundColor: '#7d40e7'
            }
        }
    })
);

export default Routes