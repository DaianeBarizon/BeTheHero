import React from 'react';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import MailCompose from 'react-native-mail-compose';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  const message = `Olá ${incident.name} de ${incident.city}/${
    incident.uf
  }, estou entranto em contato, pois gostaria de ajudar no caso ${
    incident.title
  } no valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  console.log('email', incident.email);
  function sendEmail() {
    console.log('aqui');
    MailCompose.send({
      toRecipients: [incident.email],
      //ccRecipients: ['cc1@example.com', 'cc2@example.com'],
      //bccRecipients: ['bcc1@example.com', 'bcc2@example.com'],
      subject: `Herói do caso: ${incident.title}`,
      text: message,
      //html: '<p>This is <b>html</b> body</p>', // Or, use this if you want html body. Note that some Android mail clients / devices don't support this properly.
      attachments: [
        {
          filename: 'mytext', // [Optional] If not provided, UUID will be generated.
          ext: '.txt',
          mimeType: 'text/plain',
          text: 'Hello my friend', // Use this if the data is in UTF8 text.
          data: '...BASE64_ENCODED_STRING...', // Or, use this if the data is not in plain text.
        },
      ],

      //recipients: [incident.email],
    });
  }

  console.log('whatsapp', incident.whatsapp);
  function sendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={16} color="#e02041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.value)}
        </Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
