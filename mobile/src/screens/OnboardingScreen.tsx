import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Image, 
  Animated,
  Pressable,
  StatusBar
} from 'react-native';
import { colors, radius, spacing } from '../theme';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }: any) {
  // Animation Values
  const imgFade = useRef(new Animated.Value(0)).current;
  const imgScale = useRef(new Animated.Value(1.1)).current; // Added for zoom-out effect
  const logoScale = useRef(new Animated.Value(0.8)).current; // Start slightly smaller
  
  const headingSlide = useRef(new Animated.Value(20)).current; // Reduced travel distance
  const headingFade = useRef(new Animated.Value(0)).current;
  
  const subFade = useRef(new Animated.Value(0)).current;
  
  const feat1Fade = useRef(new Animated.Value(0)).current;
  const feat2Fade = useRef(new Animated.Value(0)).current;
  const feat3Fade = useRef(new Animated.Value(0)).current;
  
  const btnSlide = useRef(new Animated.Value(30)).current; // Reduced travel distance
  const btnFade = useRef(new Animated.Value(0)).current;
  
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Background zoom-out effect (UX enhancement)
    Animated.timing(imgScale, { 
      toValue: 1, 
      duration: 3000, 
      useNativeDriver: true 
    }).start();

    // Staggered entry animation
    Animated.parallel([
      Animated.timing(imgFade, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, tension: 40, friction: 5, useNativeDriver: true }),
      
      Animated.timing(headingFade, { toValue: 1, duration: 600, delay: 200, useNativeDriver: true }),
      Animated.spring(headingSlide, { toValue: 0, tension: 50, friction: 7, delay: 200, useNativeDriver: true }),
      
      Animated.timing(subFade, { toValue: 1, duration: 600, delay: 400, useNativeDriver: true }),
      
      Animated.timing(feat1Fade, { toValue: 1, duration: 400, delay: 600, useNativeDriver: true }),
      Animated.timing(feat2Fade, { toValue: 1, duration: 400, delay: 750, useNativeDriver: true }),
      Animated.timing(feat3Fade, { toValue: 1, duration: 400, delay: 900, useNativeDriver: true }),
      
      Animated.timing(btnFade, { toValue: 1, duration: 500, delay: 1000, useNativeDriver: true }),
      Animated.spring(btnSlide, { toValue: 0, tension: 60, friction: 6, delay: 1000, useNativeDriver: true })
    ]).start();
  }, []);

  const onPressIn = () => Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={styles.container}>
      <StatusBar hidden translucent backgroundColor="transparent" />
      
      <Animated.View style={[styles.backgroundContainer, { opacity: imgFade }]}>
        <Animated.Image
          source={{ uri: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} 
          style={[styles.background, { transform: [{ scale: imgScale }] }]}
        />
        {/* Background gradient overlay */}
        <View style={styles.overlay}>
          {/* Faint Background Typography */}
          <View style={styles.bgTextContainer}>
            <Text style={styles.bgText} numberOfLines={1}>STRONGER</Text>
            <Text style={styles.bgText} numberOfLines={1}>EVERY DAY</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.contentOverlay}>
        {/* Center Logo */}
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
          <Image 
            source={require('../../assets/web-logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </Animated.View>

        {/* Bottom Content Area */}
        <View style={styles.bottomSection}>
          
          {/* Title & Subtitle */}
          <Animated.View style={[styles.textContainer, { opacity: headingFade, transform: [{ translateY: headingSlide }] }]}>
            <Text style={styles.titleWhite}>YOUR FITNESS</Text>
            <Text style={styles.titleYellow}>JOURNEY STARTS HERE</Text>
          </Animated.View>

          <Animated.View style={{ opacity: subFade, marginBottom: 24 }}>
            <Text style={styles.subtitle}>
              Transform your body and build a healthier{'\n'}lifestyle with Hope Gym.
            </Text>
          </Animated.View>

          {/* 3-Column Features Section */}
          <View style={styles.featuresContainer}>
            <Animated.View style={[styles.featureColumn, { opacity: feat1Fade }]}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="dumbbell" size={20} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>PREMIUM</Text>
              <Text style={styles.featureSub}>EQUIPMENT</Text>
            </Animated.View>
            
            <Animated.View style={[styles.featureColumn, styles.featureBorder, { opacity: feat2Fade }]}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="account-tie" size={20} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>EXPERT</Text>
              <Text style={styles.featureSub}>TRAINERS</Text>
            </Animated.View>
            
            <Animated.View style={[styles.featureColumn, { opacity: feat3Fade }]}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="star-circle-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>PROVEN</Text>
              <Text style={styles.featureSub}>RESULTS</Text>
            </Animated.View>
          </View>

          {/* CTA Button */}
          <Animated.View style={{ 
            width: '100%', 
            alignItems: 'center',
            opacity: btnFade, 
            transform: [{ translateY: btnSlide }, { scale: buttonScale }] 
          }}>
            <Pressable 
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={() => navigation.replace('Login')}
            >
              <Text style={styles.buttonText}>GET STARTED</Text>
              <FontAwesome5 name="arrow-right" size={16} color="#000" style={styles.buttonIcon} />
            </Pressable>
          </Animated.View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(11, 11, 11, 0.75)', // Slightly darker for better contrast
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    paddingBottom: 40, // More compact bottom padding
  },
  bgTextContainer: {
    position: 'absolute',
    top: height * 0.08,
    width: '100%',
    alignItems: 'center',
    zIndex: 0,
  },
  bgText: {
    color: 'rgba(255, 255, 255, 0.04)', // Even fainter
    fontSize: 64, // Reduced from 90 to prevent aggressive zoomed look
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 4, // Increased spacing for a cleaner look
    lineHeight: 70, // Tightened line height
    textAlign: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: height * 0.05, // Shifted up slightly
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    width: width * 0.5, // Reduced from 0.65
    height: 60, // Reduced from 80
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWhite: {
    color: '#FFF',
    fontSize: 24, // Reduced from 28
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  titleYellow: {
    color: colors.primary,
    fontSize: 24, // Reduced from 28
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  subtitle: {
    color: '#A0A0A0', 
    fontSize: 13, // Reduced from 14
    lineHeight: 20, // Tighter line height
    textAlign: 'center',
    fontWeight: '400',
    paddingHorizontal: 16,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 32, // Reduced from spacing.xxl
    paddingHorizontal: 10,
  },
  featureColumn: {
    alignItems: 'center',
    flex: 1,
  },
  featureBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)', // Thinner, softer border
  },
  iconCircle: {
    width: 40, // Reduced from 44
    height: 40, // Reduced from 44
    borderRadius: 20,
    backgroundColor: 'rgba(255, 212, 0, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    color: '#FFF',
    fontSize: 11, // Reduced slightly
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  featureSub: {
    color: '#777',
    fontSize: 10, // Reduced slightly
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: colors.primary,
    width: '80%', // Shrunk from 85% to look more pill-like
    height: 54, // Reduced from 58
    borderRadius: 27, 
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // Softened shadow
    shadowRadius: 6,
    elevation: 5, 
  },
  buttonPressed: {
    opacity: 0.8,
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#000',
    fontSize: 15, // Reduced from 16
    fontWeight: '900', 
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: 'absolute',
    right: 20, // Adjusted padding
  },
});