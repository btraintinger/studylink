import { Button } from '@react-email/button';
import { Link } from '@react-email/link';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { btn, link, text } from './styles';
import EmailWrapper from './emailWrapper';
import { TutorActionInfo } from '../src/backend/types/notification';
import React from 'react';

interface EmailProps {
  heading: string;
}

export default function NewMatchAvailableNotification({ heading }: EmailProps) {
  return (
    <EmailWrapper heading={heading}>
      <Text style={text}>Besuche Studylink, um das neue Match zu finden.</Text>
      <Section
        style={{
          textAlign: 'center',
          marginTop: '26px',
          marginBottom: '26px',
        }}
      >
        <Button
          pX={20}
          pY={12}
          style={btn}
          href={process.env.NEXT_PUBLIC_DOMAIN}
        >
          Studylink
        </Button>
      </Section>
    </EmailWrapper>
  );
}
