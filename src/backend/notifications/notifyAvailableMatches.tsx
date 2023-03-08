import { render } from '@react-email/render';
import { getMailTransporter, sendMail } from '../mail/mailer';
import { TutorOffering, TutorRequest } from '@prisma/client';
import {
  getMatchesForTutorOffering,
  getMatchesForTutorRequest,
  Match,
} from '../graphql/match/getMatches';
import NewMatchAvailableNotification from '../../../emails/newMatchAvailableNotification';
import prisma from '../utils/prismadb';

interface availableMatchesNotificationProps {
  tutorAction: TutorOffering | TutorRequest;
  tutorActionType: string;
}

export async function notifyAvailableMatches({
  tutorAction,
  tutorActionType,
}: availableMatchesNotificationProps) {
  const fromStudent = await prisma.student.findUnique({
    where: {
      id: tutorAction.studentId,
    },
    include: {
      user: true,
    },
  });
  if (!fromStudent) {
    return;
  }

  let matches: Match[] = [];

  if (tutorActionType === 'REQUEST') {
    matches = await getMatchesForTutorRequest(tutorAction);
  } else if (tutorActionType === 'OFFERING') {
    matches = await getMatchesForTutorOffering(tutorAction);
  }

  matches.forEach(async (match) => {
    const toStudentId =
      tutorActionType === 'REQUEST'
        ? match.tutorOffering.studentId
        : match.tutorRequest.studentId;

    const toStudent = await prisma.student.findUnique({
      where: {
        id: toStudentId,
      },
      include: {
        user: true,
      },
    });
    if (!toStudent) {
      return;
    }

    if (fromStudent.user.allowEmailNotifications) {
      const inverseTutorActionType =
        tutorActionType === 'REQUEST' ? 'OFFERING' : 'REQUEST';
      const heading =
        inverseTutorActionType === 'REQUEST'
          ? 'Neue Nachhilfeanfrage verfügbar'
          : 'Neues Nachhilfeangebot verfügbar';
      const fromStudentMail = {
        from: process.env.MAIL_USER,
        to: fromStudent.user.email,
        subject: heading,
        html: render(
          <NewMatchAvailableNotification heading={inverseTutorActionType} />
        ),
      };

      await sendMail(fromStudentMail);
    }

    if (toStudent.user.allowEmailNotifications) {
      const heading =
        tutorActionType === 'REQUEST'
          ? 'Neue Nachhilfeanfrage verfügbar'
          : 'Neues Nachhilfeangebot verfügbar';
      const toStudentMail = {
        from: process.env.MAIL_USER,
        to: toStudent.user.email,
        subject: 'Neue Nachhilfe ist verfügbar',
        html: render(<NewMatchAvailableNotification heading={heading} />),
      };

      await sendMail(toStudentMail);
    }
  });
}
