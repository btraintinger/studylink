import { TutorOffering, TutorRequest } from '@prisma/client';
import prisma from '../../utils/prismadb';

export interface Match {
  id: number;
  rating: number;
  type: string;
  tutorOffering: TutorOffering;
  tutorRequest: TutorRequest;
}

function matchRating(request: TutorRequest, offering: TutorOffering): number {
  let rating = 0;
  if (request.grade === offering.grade) rating += 2;
  if (request.teacherId === offering.teacherId) rating += 1;
  return rating;
}

export async function getMatchesOfStudent(studentId: number): Promise<Match[]> {
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
    include: {
      tutorRequests: true,
      tutorOfferings: true,
    },
  });
  const requests = student?.tutorRequests ?? [];
  const offerings = student?.tutorOfferings ?? [];

  const matches: Match[] = [];

  let id = 0;
  for (const request of requests) {
    const matchingOfferings = await prisma.tutorOffering.findMany({
      where: {
        AND: [
          {
            schoolSubjectId: request.schoolSubjectId,
          },
          {
            grade: {
              gte: request.grade,
            },
          },
        ],
      },
    });

    for (const offering of matchingOfferings) {
      matches.push({
        id: id++,
        type: 'OFFERING',
        tutorRequest: request,
        tutorOffering: offering,
        rating: matchRating(request, offering),
      });
    }
  }

  for (const offering of offerings) {
    const matchingRequests = await prisma.tutorRequest.findMany({
      where: {
        AND: [
          {
            schoolSubjectId: offering.schoolSubjectId,
          },
          {
            grade: {
              lte: offering.grade,
            },
          },
        ],
      },
    });

    for (const request of matchingRequests) {
      matches.push({
        id: id++,
        type: 'REQUEST',
        tutorRequest: request,
        tutorOffering: offering,
        rating: matchRating(request, offering),
      });
    }
  }
  return matches;
}

export async function getMatchesForTutorOffering(
  offering: TutorOffering
): Promise<Match[]> {
  const matchingRequests = await prisma.tutorRequest.findMany({
    where: {
      AND: [
        {
          schoolSubjectId: offering.schoolSubjectId,
        },
        {
          grade: {
            lte: offering.grade,
          },
        },
      ],
    },
  });

  const matches: Match[] = [];
  let id = 0;

  for (const request of matchingRequests) {
    matches.push({
      id: id++,
      type: 'REQUEST',
      tutorRequest: request,
      tutorOffering: offering,
      rating: matchRating(request, offering),
    });
  }
  return matches;
}

export async function getMatchesForTutorRequest(
  request: TutorRequest
): Promise<Match[]> {
  const matchingOfferings = await prisma.tutorOffering.findMany({
    where: {
      AND: [
        {
          schoolSubjectId: request.schoolSubjectId,
        },
        {
          grade: {
            gte: request.grade,
          },
        },
      ],
    },
  });

  const matches: Match[] = [];
  let id = 0;

  for (const offering of matchingOfferings) {
    matches.push({
      id: id++,
      type: 'OFFERING',
      tutorRequest: request,
      tutorOffering: offering,
      rating: matchRating(request, offering),
    });
  }
  return matches;
}
