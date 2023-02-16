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
import React from 'react';
import {
  btn,
  container,
  footer,
  h1,
  hr,
  link,
  logo,
  main,
  text,
} from './styles';

interface EmailProps {
  verificationToken: string;
}

export default function EmailVerificationEmail({
  verificationToken,
}: EmailProps) {
  const inviteLink = `${process.env.NEXT_PUBLIC_DOMAIN}/auth/verifyEmail/${verificationToken}`;

  return (
    <Html>
      <Head />
      <Preview>Email Verifizierung</Preview>
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
          <Heading style={h1}>E-Mail Verifizierung</Heading>
          <Text style={text}>
            Diese E-Mail ist 15 Minuten lang gültig. Wenn du eine neue E-Mail
            anforderst verfällt die Gültigkeit dieser E-Mail.
          </Text>
          <Text style={text}>
            Verifiziere deine E-Mail, indem du auf den diesen Button klickst.
          </Text>
          <Section
            style={{
              textAlign: 'center',
              marginTop: '26px',
              marginBottom: '26px',
            }}
          >
            <Button pX={20} pY={12} style={btn} href={inviteLink}>
              Email verifizieren
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
