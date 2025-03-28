import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../screens/CalanderScreen/CalanderScreen';
import LocationSettingScreeen from '../screens/LocationScreen/LocationSettingsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import { useTheme } from '../hooks/ThemeContext';
import { useLanguage } from '../hooks/LanguageContext';
import { directions, languages } from '@/assets/LanguageConfig';


const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  const { translations, language ,direction} = useLanguage();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: direction === directions.rtl ? 'right' : 'left',
        headerTitleAlign: 'center' ,
      }}
    >

            <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ 
              title: translations.home || 'Home',
            }}
            />
            <Drawer.Screen
            name="Profile"
            component={LocationSettingScreeen}
            options={{ 
              title: translations.profile || 'User Profile',
            }}
            />
            <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ 
              title: translations.settings || 'App Settings',
            }}
            />
            <Drawer.Screen
            name="Help"
            component={HelpScreen}
            options={{ 
              title: translations.help || 'Help',
            }}
            />
    </Drawer.Navigator>
      
  );
}

function CustomDrawerContent(props: any) {
  const { theme } = useTheme();
  const { translations ,direction} = useLanguage();

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{translations.app_name}</Text>
        <Text style={[styles.headerSubtitle, { color: theme.text }]}>{translations.welcome}</Text>
      </View>

      <View style={{ paddingHorizontal: 20, alignItems: direction === directions.rtl ? 'flex-end' : 'flex-start' }}>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Home')}>
        <Text>{translations.home}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Profile')}>
        <Text>{translations.profile}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Settings')}>
        <Text>{translations.settings}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Help')}>
        <Text>{translations.help}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
});