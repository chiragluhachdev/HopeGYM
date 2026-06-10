import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, Animated } from 'react-native';
import { colors, spacing } from '../theme';

export default function SplashScreen() {
  const lineAnim = useRef(new Animated.Value(-150)).current;

  useEffect(() => {
    // Fill the loading line smoothly from 0% to 100% over 1.5 seconds
    Animated.timing(lineAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.content}>
        
        <Image 
          source={require('../../assets/web-logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        
        <Text style={styles.subtitle}>STRONGER EVERY DAY</Text>
        
        {/* Custom Thin Loading Line */}
        <View style={styles.loaderTrack}>
          <Animated.View 
            style={[
              styles.loaderLine, 
              { transform: [{ translateX: lineAnim }] }
            ]} 
          />
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000000', // Pure black
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  content: { 
    alignItems: 'center' 
  },
  logo: { 
    width: 220, 
    height: 80, 
    marginBottom: spacing.md,
    // Logo needs to be above the glow
    zIndex: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 4,
    marginTop: spacing.sm,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    zIndex: 2,
  },
  loaderTrack: {
    marginTop: spacing.xl,
    width: 150,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    borderRadius: 2,
    zIndex: 2,
  },
  loaderLine: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
});
