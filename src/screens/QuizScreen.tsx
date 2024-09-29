import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { apiRequest } from '../apiServices';
import Config from 'react-native-config';

interface QuizScreenProps {
  route: RouteProp<RootStackParamList, 'Quiz'>;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ route }) => {
  const { quizId } = route.params;
  const [quizData, setQuizData] = useState<any>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Track current quiz ID index
  const [currentQuizDetails, setCurrentQuizDetails] = useState<any>(null); // To store current quiz details

  // Function to fetch the main quiz data
  const fetchQuizData = async () => {
    try {
      const response = await apiRequest(`${Config.REACT_NATIVE_API_URL}/article/${quizId}`, {
        method: 'GET',
      });
      const data = await response.json();

      setQuizData(data);
      console.log(data)

      if (data.quizzes_public_ids && data.quizzes_public_ids.length > 0) {
        fetchQuizDetails(data.quizzes_public_ids[0], 0);
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const fetchQuizDetails = async (quizPublicId: string, index: number) => {
    try {
      const response = await apiRequest(`${Config.REACT_NATIVE_API_URL}/quiz/id/${quizPublicId}`, {
        method: 'GET',
      });
      const quizDetails = await response.json();

      console.log('Quiz details:', quizDetails);
      setCurrentQuizDetails(quizDetails); // Store quiz details
      setCurrentQuizIndex(index); // Update the current index
    } catch (error) {
      console.error('Error fetching quiz details:', error);
    }
  };

  // Function to go to the next quiz in the list
  const handleNextQuiz = () => {
    if (quizData && quizData.quizzes_public_ids && currentQuizIndex + 1 < quizData.quizzes_public_ids.length) {
      const nextQuizId = quizData.quizzes_public_ids[currentQuizIndex + 1];
      fetchQuizDetails(nextQuizId, currentQuizIndex + 1);
    }
  };

  useEffect(() => {
    fetchQuizData(); // Initial call to fetch quiz data
  }, [quizId]);

  return (
    <View style={styles.container}>
      {/* Display the quiz data if it's available */}
      {quizData ? (
        <View>
          <Text style={styles.text}>Quiz Title: {quizData.title}</Text>
          {currentQuizDetails && (
            <View>
              <Text style={styles.text}>Current Quiz Question: {currentQuizDetails.description}</Text>
              
            </View>
          )}
          {quizData.quizzes_public_ids && currentQuizIndex + 1 < quizData.quizzes_public_ids.length && (
            <Button title="Next" onPress={handleNextQuiz} />
          )}
        </View>
      ) : (
        <Text style={styles.text}>Loading quiz data...</Text>
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
  },
});

export default QuizScreen;
