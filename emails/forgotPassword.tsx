import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import * as React from 'react';

interface EmailProps {
  passwordResetToken: string;
}

export default function ForgotPasswordEmail({
  passwordResetToken,
}: EmailProps) {
  const inviteLink = `${process.env.NEXT_PUBLIC_DOMAIN}/auth/forgotPassword/${passwordResetToken}`;

  return (
    <Html>
      <Head />
      <Preview>Passwort Zurücksetzen</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ marginTop: '32px' }}>
            <Img
              src={`${process.env.NEXT_PUBLIC_DOMAIN}/favicon.ico`}
              width="50"
              height="50"
              alt="Studylink Logo"
              style={logo}
            />
          </Section>
          <Heading style={h1}>Passwort Zurücksetzen</Heading>
          <Text style={text}>
            Diese E-Mail ist 15 Minuten lang gültig. Wenn du eine neue E-Mail
            anforderst verfällt die Gültigkeit dieser E-Mail.
          </Text>
          <Text style={text}>
            Setze dein Passwort zurück, indem du auf den diesen Button klickst.
          </Text>
          <Section
            style={{
              textAlign: 'center',
              marginTop: '26px',
              marginBottom: '26px',
            }}
          >
            <Button pX={20} pY={12} style={btn} href={inviteLink}>
              Passwort zurücksetzen
            </Button>
          </Section>
          <Text style={text}>
            oder kopiere und füge diese URL in deinen Browser ein:{' '}
            <Link
              href={inviteLink}
              target="_blank"
              style={link}
              rel="noreferrer"
            >
              {inviteLink}
            </Link>
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Wenn du diese Email nicht angefordert hast, kannst du sie einfach
            löschen.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
};

const container = {
  border: '1px solid #eaeaea',
  borderRadius: '5px',
  margin: '40px auto',
  padding: '20px',
  width: '465px',
};

const logo = {
  margin: '0 auto',
};

const h1 = {
  color: '#000',
  fontSize: '24px',
  fontWeight: 'normal',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
};

const link = {
  color: '#067df7',
  textDecoration: 'none',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};

const btn = {
  backgroundColor: '#4caf50',
  borderRadius: '5px',
  color: '#000000',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '50px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};

const hr = {
  border: 'none',
  borderTop: '1px solid #eaeaea',
  margin: '26px 0',
  width: '100%',
};

const footer = {
  color: '#666666',
  fontSize: '12px',
  lineHeight: '24px',
};
