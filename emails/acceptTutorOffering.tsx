import { Text } from '@react-email/text';
import { text } from './styles';
import EmailWrapper from './emailWrapper';
import React from 'react';
import type { TutorActionInfo } from '../src/backend/notifications/notifyMatchAcception';

interface EmailProps {
  tutorActionInfo: TutorActionInfo;
}

export default function YourTutorOfferingGotAcceptedNotification({
  tutorActionInfo,
}: EmailProps) {
  return (
    <EmailWrapper heading={'Dein Nachhilfeangebot wurde angenommen'}>
      <Text style={text}>
        {tutorActionInfo.matchedStudent} hat ein Match angenommen.
      </Text>
      <Text style={text}>
        {tutorActionInfo.matchedStudent} ist in der{' '}
        {tutorActionInfo.schoolClass} (der {tutorActionInfo.grade}. Schulstufe)
        und möchte Hilfe in {tutorActionInfo.subject}.
      </Text>
      <Text style={text}>
        {tutorActionInfo.matchedStudent} wird von {tutorActionInfo.teacher}{' '}
        unterrichtet.
      </Text>
      <Text style={text}>
        {tutorActionInfo.matchedStudent} hat folgende Beschreibung hinterlassen:
      </Text>
      <Text style={text}>{tutorActionInfo.description}</Text>
      <Text style={text}>
        Setzte dich bitte mit {tutorActionInfo.matchedStudent} in Verbindung und
        teile mit wann und wo du Nachhilfe geben könntest.
      </Text>
      <Text style={text}>
        {tutorActionInfo.matchedStudent} hat folgende E-Mail-Adresse:{' '}
        {tutorActionInfo.matchedStudentEmail}
      </Text>
      <Text style={text}>
        Besuche am besten die Klasse {tutorActionInfo.schoolClass}, um ihn
        darauf aufmerksam zu machen.
      </Text>
    </EmailWrapper>
  );
}
