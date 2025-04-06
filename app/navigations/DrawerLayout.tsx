import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CalendarScreen from '@/app/screens/CalanderScreen/CalanderScreen';
import LocationSettingScreeen from '@/app/screens/LocationScreen/LocationSettingsScreen';
import SettingsScreen from '@/app/screens/SettingsScreen';
import HelpScreen from '@/app/screens/HelpScreen';
import { useTheme } from '@/app/hooks/ThemeContext';
import { useLanguage } from '@/app/hooks/LanguageContext';
import { useAuth } from '@/app/hooks/AuthContext';
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
            name="CalendarScreen"
            component={CalendarScreen}
            options={{ 
              title: translations.home || 'Home',
            }}
            />
            <Drawer.Screen
            name="Locations"
            component={LocationSettingScreeen}
            options={{ 
              title: translations.Locations || 'Locations',
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
  const { logout } = useAuth(); // Assuming you have a logout function in your auth context

  const handleLogout = () => {
    logout();
    props.navigation.replace('Login'); // Navigate to the login screen after logout
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{translations.app_name}</Text>
        <Text style={[styles.headerSubtitle, { color: theme.text }]}>{translations.welcome}</Text>
      </View>

      <View style={{ paddingHorizontal: 20, alignItems: direction === directions.rtl ? 'flex-end' : 'flex-start' }}>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('CalendarScreen')}>
        <Text>{translations.home}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Locations')}>
        <Text>{translations.Locations}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Settings')}>
        <Text>{translations.settings}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Help')}>
        <Text>{translations.help}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
          <Text style={{ color: 'red' }}>{translations.Logout}</Text>
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