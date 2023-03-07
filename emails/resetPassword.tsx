import { Button } from '@react-email/button';
import { Link } from '@react-email/link';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { btn, link, text } from './styles';
import EmailWrapper from './emailWrapper';

interface EmailProps {
  passwordResetToken: string;
}

export default function ResetPasswordEmail({ passwordResetToken }: EmailProps) {
  const inviteLink = `${process.env.NEXT_PUBLIC_DOMAIN}/auth/resetPassword/${passwordResetToken}`;

  return (
    <EmailWrapper heading="Passwort zurücksetzen">
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
        <Link href={inviteLink} target="_blank" style={link} rel="noreferrer">
          {inviteLink}
        </Link>
      </Text>
    </EmailWrapper>
  );
}
