import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
//import useResults from '../hooks/useResults';
import ResultsList from '../screens/ResultsList';

const Match = () => {
  const [term, setTerm] = useState('');
  //const [searchApi, results, errorMessage] = useResults();


  return (
    <>
      <ScrollView>
        <ResultsList
          //results={filterResultsByPrice('$')}
          title="Cost Effective"
        />
        <ResultsList title="Bit Pricier" />
        <ResultsList
          //results={filterResultsByPrice('$$$')}
          title="Big Spender"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default Match;
