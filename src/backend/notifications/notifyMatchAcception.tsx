import {
  SchoolClass,
  SchoolSubject,
  Student,
  Teacher,
  TutorOffering,
  TutorRequest,
  User,
} from '@prisma/client';
import prisma from '../utils/prismadb';
import { render } from '@react-email/render';
import YourTutorRequestGotAcceptedNotification from '../../../emails/acceptTutorRequest';
import YourTutorOfferingGotAcceptedNotification from '../../../emails/acceptTutorOffering';
import { getMailTransporter, sendMail } from '../mail/mailer';

export interface TutorActionInfo {
  subject: string;
  description: string;
  teacher: string;
  grade: number;
  schoolClass: string;
  matchedStudent: string;
  matchedStudentEmail: string;
}

interface availableMatchesNotificationProps {
  tutorOfferingId: number;
  tutorRequestId: number;
}

function getTutorActionInfo(
  tutorAction:
    | (TutorOffering & {
        student: Student & { user: User; schoolClass: SchoolClass | null };
        schoolSubject: SchoolSubject;
        teacher: Teacher;
      })
    | (TutorRequest & {
        student: Student & { user: User; schoolClass: SchoolClass | null };
        schoolSubject: SchoolSubject;
        teacher: Teacher;
      })
): TutorActionInfo | null {
  if (!tutorAction.student.schoolClass) {
    return null;
  }
  return {
    subject: `${tutorAction.schoolSubject.name} - ${tutorAction.schoolSubject.longName}`,
    description: tutorAction.description,
    teacher: `${tutorAction.teacher.name} - ${tutorAction.teacher.longName}`,
    grade: tutorAction.grade,
    schoolClass: `${tutorAction.student.schoolClass.name} - ${tutorAction.student.schoolClass.longName}`,
    matchedStudent: `${tutorAction.student.user.firstName} ${tutorAction.student.user.lastName}`,
    matchedStudentEmail: tutorAction.student.user.email,
  };
}

export async function notifyMatchAccept({
  tutorOfferingId,
  tutorRequestId,
}: availableMatchesNotificationProps) {
  const tutorOffering = await prisma.tutorOffering.findUnique({
    where: {
      id: tutorOfferingId,
    },
    include: {
      student: { include: { user: true, schoolClass: true } },
      schoolSubject: true,
      teacher: true,
    },
  });

  const tutorRequest = await prisma.tutorRequest.findUnique({
    where: {
      id: tutorRequestId,
    },
    include: {
      student: { include: { user: true, schoolClass: true } },
      schoolSubject: true,
      teacher: true,
    },
  });

  if (!tutorOffering || !tutorRequest) return;

  const tutorOfferingInfo = getTutorActionInfo(tutorOffering);
  const tutorRequestInfo = getTutorActionInfo(tutorRequest);

  if (!tutorOfferingInfo || !tutorRequestInfo) return;

  const studentMail = {
    from: process.env.MAIL_USER,
    to: tutorRequest.student.user.email,
    subject: 'Deine Nachhilfeanfrage wurde angenommen',
    html: render(
      <YourTutorRequestGotAcceptedNotification
        tutorActionInfo={tutorOfferingInfo}
      />
    ),
  };

  await sendMail(studentMail);

  const tutorMail = {
    from: process.env.MAIL_USER,
    to: tutorOffering.student.user.email,
    subject: 'Dein Nachhilfeangebot wurde angenommen',
    html: render(
      <YourTutorOfferingGotAcceptedNotification
        tutorActionInfo={tutorRequestInfo}
      />
    ),
  };

  await sendMail(tutorMail);
}
