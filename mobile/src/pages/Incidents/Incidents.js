import React, { useState, useEffect } from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

const Incidents = () => {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loadIncident = () => {
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    api.get(`/incidents?page=${page}`).then(({ data, headers }) => {
      setIncidents([...incidents, ...data]);
      setTotal(headers['x-total-count']);
      setLoading(false);
      setPage(page + 1);
    });
  };
  useEffect(() => {
    loadIncident();
  }, []);
  const navigateToDetil = incident => {
    navigation.navigate('Detail', { incident });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de
          <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos Casos abaixo e salve o dia.
      </Text>
      <FlatList
        data={incidents}
        onEndReached={loadIncident}
        onEndReachedThreshold={0.2}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                navigateToDetil(incident);
              }}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name='arrow-right' size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
export default Incidents;
