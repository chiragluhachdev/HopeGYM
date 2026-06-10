import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  StatusBar,
  ImageBackground,
  Animated,
  Pressable
} from 'react-native';
import { colors, spacing } from '../theme';
import { requestOtp } from '../api';
import { useAuth } from '../AuthContext';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function LoginScreen() {
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 7, useNativeDriver: true })
    ]).start();
  }, []);

  async function handleRequestOtp() {
    if (phone.length < 8) return Alert.alert('Error', 'Enter a valid phone number');
    setLoading(true);
    try {
      await requestOtp(phone);
      // Fade out, change step, fade in
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        setStep('otp');
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to send OTP');
    }
    setLoading(false);
  }

  async function handleVerify() {
    if (code.length < 4) return Alert.alert('Error', 'Enter the OTP code');
    setLoading(true);
    try {
      await login(phone, code);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Verification failed');
    }
    setLoading(false);
  }

  const onPressIn = () => Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Cinematic Background */}
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' }} // Premium dark gym interior
          style={styles.background}
          imageStyle={{ resizeMode: 'cover' }}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>

      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          
          <Image 
            source={require('../../assets/web-logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />

          <Text style={styles.title}>
            {step === 'phone' ? 'WELCOME BACK' : 'VERIFY IDENTITY'}
          </Text>
          <Text style={styles.desc}>
            {step === 'phone'
              ? 'Enter your phone number to sign in or create a new Hope Gym account.'
              : `Secure code sent to ${phone}.\nEnter it below to proceed.`}
          </Text>

          <View style={styles.inputWrapper}>
            {step === 'phone' ? (
              <View style={styles.inputBox}>
                <MaterialCommunityIcons name="phone" size={20} color={colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  autoFocus
                />
              </View>
            ) : (
              <View style={styles.inputBox}>
                <MaterialCommunityIcons name="lock-outline" size={20} color={colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  placeholderTextColor="#666"
                  keyboardType="number-pad"
                  value={code}
                  onChangeText={setCode}
                  autoFocus
                  maxLength={6}
                />
              </View>
            )}
          </View>

          <Animated.View style={{ width: '100%', alignItems: 'center', transform: [{ scale: buttonScale }] }}>
            <Pressable 
              style={({ pressed }) => [
                styles.button, 
                (pressed || loading) && styles.buttonPressed
              ]}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={step === 'phone' ? handleRequestOtp : handleVerify}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'PROCESSING...' : step === 'phone' ? 'CONTINUE' : 'VERIFY & LOGIN'}
              </Text>
              {!loading && (
                <FontAwesome5 name="arrow-right" size={18} color="#000" style={styles.buttonIcon} />
              )}
            </Pressable>
          </Animated.View>

          {step === 'otp' && (
            <Pressable onPress={() => {
              Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
                setStep('phone');
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
              });
            }} style={styles.changePhoneBtn}>
              <Text style={styles.changePhoneText}>CHANGE PHONE NUMBER</Text>
            </Pressable>
          )}

        </Animated.View>
      </KeyboardAvoidingView>
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
    top: 0, bottom: 0, left: 0, right: 0,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(11, 11, 11, 0.85)', // Heavy dark fade
  },
  innerContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  logo: {
    width: 220,
    height: 70,
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: spacing.sm,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  desc: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 22,
    fontWeight: '400',
    paddingHorizontal: spacing.md,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 212, 0, 0.2)',
    borderRadius: 16,
    width: '90%',
    paddingHorizontal: spacing.md,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    letterSpacing: 2,
  },
  button: {
    backgroundColor: colors.primary,
    width: '90%',
    height: 58,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.8,
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: 'absolute',
    right: 24,
  },
  changePhoneBtn: {
    marginTop: spacing.xl,
    padding: spacing.sm,
  },
  changePhoneText: {
    color: '#777',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
