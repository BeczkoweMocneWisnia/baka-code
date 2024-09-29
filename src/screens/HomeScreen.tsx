import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { RouteProp, useNavigation } from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedText, setScannedText] = useState<string | null>(null);
  const [quizId, setQuizId] = useState<string | null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedText(data);

    const idMatch = data.match(/quiz\/(.+)/);
    if (idMatch && idMatch[1]) {
      setQuizId(idMatch[1]);
      navigation.navigate('Quiz', { quizId: idMatch[1] });
    } else {
      Alert.alert('Invalid QR Code', 'This QR code does not contain a valid quiz ID.');
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Scanner</Text>

      {!scanned ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.text}>Scanned QR Code Text: {scannedText}</Text>

          {quizId && (
            <Button title="Go to Quiz" onPress={() => navigation.navigate('Quiz', { quizId })} />
          )}

          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#BCD3D8',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAgainButton: {
    marginTop: 20,
  },
});

export default HomeScreen;
