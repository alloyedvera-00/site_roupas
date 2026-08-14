import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00ff87',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopWidth: 1,
          borderTopColor: '#222',
          borderBottomWidth: 1,
          borderBottomColor: '#222',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 1,
          textTransform: 'uppercase',
        },
        tabBarPosition: 'top',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'DROPS',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'shirt' : 'shirt-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="editImage"
        options={{
          title: 'EDITOR',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'create' : 'create-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="toDoList"
        options={{
          title: 'STOCK',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'list' : 'list-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="buscaCep"
        options={{
          title: 'CEP',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'location' : 'location-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'INFO',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'layers' : 'layers-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}