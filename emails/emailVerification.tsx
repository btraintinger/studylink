import { Button } from '@react-email/button';
import { Link } from '@react-email/link';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { btn, link, text } from './styles';
import EmailWrapper from './emailWrapper';

interface EmailProps {
  verificationToken: string;
}

export default function EmailVerificationEmail({
  verificationToken,
}: EmailProps) {
  const inviteLink = `${process.env.NEXT_PUBLIC_DOMAIN}/auth/verifyEmail/${verificationToken}`;

  return (
    <EmailWrapper heading="E-Mail Verifikation">
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
        <Link href={inviteLink} target="_blank" style={link} rel="noreferrer">
          {inviteLink}
        </Link>
      </Text>
    </EmailWrapper>
  );
}
