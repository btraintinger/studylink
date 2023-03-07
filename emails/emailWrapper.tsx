import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import React, { ReactElement } from 'react';
import { container, footer, h1, hr, logo, main } from './styles';

interface EmailWrapperProps {
  heading: string;
  children: ReactElement[];
}

export default function EmailWrapper({ heading, children }: EmailWrapperProps) {
  return (
    <Html>
      <Head />
      <Preview>{heading}</Preview>
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
          <Heading style={h1}>{heading}</Heading>
          {children}
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
