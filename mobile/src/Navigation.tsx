import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './AuthContext';
import { colors } from './theme';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import DietScreen from './screens/DietScreen';
import MembershipScreen from './screens/MembershipScreen';
import BranchesScreen from './screens/BranchesScreen';
import FacilitiesScreen from './screens/FacilitiesScreen';
import GalleryScreen from './screens/GalleryScreen';
import ContactScreen from './screens/ContactScreen';
import SettingsScreen from './screens/SettingsScreen';

const AppTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.brand,
    background: colors.ink,
    card: colors.ink800,
    text: colors.white,
    border: 'rgba(255,255,255,0.1)',
    notification: colors.brand,
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(22, 22, 22, 0.95)',
          borderTopWidth: 0,
          bottom: Platform.OS === 'ios' ? 25 : 15,
          left: 20,
          right: 20,
          height: 65,
          borderRadius: 32,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: Platform.OS === 'ios' ? 20 : 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 20,
          elevation: 10,
        },
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.whiteA40,
        tabBarShowLabel: false, // Cleaner look without text, just icons for premium feel
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Workout') iconName = focused ? 'barbell' : 'barbell-outline';
          else if (route.name === 'Attendance') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Notifications') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const stackScreenOpts = {
  headerStyle: { backgroundColor: colors.ink800 },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: '700' as const },
  headerShadowVisible: false,
};

export default function Navigation() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Diet" component={DietScreen} options={{ ...stackScreenOpts, headerShown: false, title: 'Diet Plan' }} />
            <Stack.Screen name="Membership" component={MembershipScreen} options={{ ...stackScreenOpts, headerShown: false, title: 'Membership' }} />
            <Stack.Screen name="Branches" component={BranchesScreen} options={{ ...stackScreenOpts, headerShown: false, title: 'Our Branches' }} />
            <Stack.Screen name="Facilities" component={FacilitiesScreen} options={{ ...stackScreenOpts, headerShown: false, title: 'Facilities' }} />
            <Stack.Screen name="Gallery" component={GalleryScreen} options={{ ...stackScreenOpts, headerShown: false, title: 'Gallery' }} />
            <Stack.Screen name="Contact" component={ContactScreen} options={{ ...stackScreenOpts, headerShown: false, title: 'Contact Us' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ ...stackScreenOpts, headerShown: false, title: 'Settings' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
