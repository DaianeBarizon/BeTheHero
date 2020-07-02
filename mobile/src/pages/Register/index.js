import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Logon() {
  const [incidents, setIncidents] = useState([]);
  const [nameOng, setNameOng] = useState();
  const [emailOng, setEmailOng] = useState();
  const [whatsAppOng, setWhatsAppOng] = useState();
  const [cityOng, setCityOng] = useState();
  const [ufOng, setUfOng] = useState();
  const [total, setTotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToLogon() {
    navigation.navigate('Logon');
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {params: {page}});

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setpage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      <View style={styles.registerContainer}>
        <View style={styles.registerHeader}>
          <Image style={styles.registerLogoImg} source={logoImg} />
        </View>
        <Text style={styles.registerTitle}>Cadastro</Text>
        <Text style={styles.registerSubTitle}>
          Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
          os casos da sua ONG.
        </Text>
        <TextInput
          onChangeText={(text) => setNameOng(text)}
          placeholderTextColor={'#999'}
          placeholder={'Nome da ONG'}
          style={styles.registerInput}
          value={nameOng}
        />
        <TextInput
          onChangeText={(text) => setEmailOng(text)}
          placeholderTextColor={'#999'}
          placeholder={'Email'}
          style={styles.registerInput}
          value={emailOng}
        />
        <TextInput
          onChangeText={(text) => setWhatsAppOng(text)}
          placeholderTextColor={'#999'}
          placeholder={'WhatsApp'}
          style={styles.registerInput}
          value={whatsAppOng}
        />
        <View style={styles.registerInputContainer}>
          <TextInput
            onChangeText={(text) => setCityOng(text)}
            placeholderTextColor={'#999'}
            placeholder={'Cidade'}
            style={styles.registerInputCity}
            value={cityOng}
          />
          <TextInput
            onChangeText={(text) => setUfOng(text)}
            placeholderTextColor={'#999'}
            placeholder={'UF'}
            style={styles.registerInputUf}
            value={ufOng}
          />
        </View>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigateToLogon()}>
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToLogon()}
          style={styles.logonRegisterContainer}>
          <Feather
            style={styles.logonRegisterIcon}
            name="arrow-left-circle"
            size={20}
            color={'#e02041'}
          />
          <Text style={styles.logonRegisterText}>Voltar ao logon</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
