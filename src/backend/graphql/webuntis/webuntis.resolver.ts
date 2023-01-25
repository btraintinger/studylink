import { PersonType, SessionInformation } from 'webuntis';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { authenticator as Authenticator } from 'otplib';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { WebUntisSecretAuth } from 'webuntis';
import type { Context } from '../context';
import { WebUntis } from './webuntis.type';

@Resolver((of) => WebUntis)
export class UserResolver {
  @Authorized('ADMIN')
  @Mutation((returns) => WebUntis)
  async updateSchoolData(
    @Ctx() ctx: Context,
    @Arg('loginData') loginData: WebUntis
  ) {
    const untis = new WebUntisSecretAuth(
      loginData.school,
      loginData.username,
      loginData.secret,
      `${loginData.server}.webuntis.com`,
      'custom-identity',
      Authenticator
    );

    let loginInfo: SessionInformation;
    try {
      loginInfo = await untis.login();
    } catch (error) {
      throw new Error('Login failed');
    }

    if (!ctx.user?.admin?.schoolId) throw new Error('School ID not found');
    const currentSchool = await ctx.prisma.school.findUnique({
      where: {
        id: ctx.user.admin.schoolId,
      },
    });
    if (!currentSchool) throw new Error('School not found');

    const latestSchoolYear = await untis.getLatestSchoolyear();

    const departments = await untis.getDepartments();
    const schoolDepartments = await ctx.prisma.department.findMany({
      where: {
        schoolId: currentSchool.id,
      },
    });
    departments.forEach(async (department) => {
      const currentDepartment = schoolDepartments.find(
        (schoolDepartment) => schoolDepartment.name === department.name
      );
      if (!currentDepartment) {
        await ctx.prisma.department.create({
          data: {
            name: department.name,
            longName: department.longName,
            schoolId: currentSchool.id,
          },
        });
      } else {
        await ctx.prisma.department.update({
          where: {
            id: currentDepartment.id,
          },
          data: {
            name: department.name,
            longName: department.longName,
            schoolId: currentSchool.id,
          },
        });
      }
    });

    const schoolClasses = await untis.getClasses(true, latestSchoolYear.id);
    const schoolSchoolClasses = await ctx.prisma.schoolClass.findMany({
      where: {
        department: {
          schoolId: currentSchool.id,
        },
      },
    });
    schoolClasses.forEach(async (schoolClass) => {
      const currentSchoolClass = schoolSchoolClasses.find(
        (schoolSchoolClass) => schoolSchoolClass.name === schoolClass.name
      );
      if (!currentSchoolClass) {
        await ctx.prisma.schoolClass.create({
          data: {
            name: schoolClass.name,
            longName: schoolClass.longName,
            departmentId: schoolClass.departmentId,
          },
        });
      } else {
        await ctx.prisma.schoolClass.update({
          where: {
            id: currentSchoolClass.id,
          },
          data: {
            name: schoolClass.name,
            longName: schoolClass.longName,
            departmentId: schoolClass.departmentId,
          },
        });
      }
    });

    const subjects = await untis.getSubjects();
    const schoolSubjects = await ctx.prisma.schoolSubject.findMany({
      where: {
        classHasSubject: {
          some: {
            schoolClass: {
              department: {
                schoolId: currentSchool.id,
              },
            },
          },
        },
      },
    });
    subjects.forEach(async (subject) => {
      const currentSubject = schoolSubjects.find(
        (schoolSubject) => schoolSubject.name === subject.name
      );
      if (!currentSubject) {
        await ctx.prisma.schoolSubject.create({
          data: {
            name: subject.name,
            longName: subject.longName,
          },
        });
      } else {
        await ctx.prisma.schoolSubject.update({
          where: {
            id: currentSubject.id,
          },
          data: {
            name: subject.name,
            longName: subject.longName,
          },
        });
      }
    });

    if (loginInfo.personType === PersonType.TEACHER) {
      const students = await untis.getStudents();
      const schoolStudents = await ctx.prisma.student.findMany({
        where: {
          schoolClass: {
            department: {
              schoolId: currentSchool.id,
            },
          },
        },
        include: {
          user: true,
        },
      });
      students.forEach(async (student) => {
        const currentStudent = schoolStudents.find(
          (schoolStudent) => schoolStudent.user.name === student.name
        );
        if (!currentStudent) {
          const createdUser = await ctx.prisma.user.create({
            data: {
              email: '',
              password: '',
              name: student.name,
              firstName: student.foreName,
              lastName: student.longName,
              role: 'STUDENT',
            },
          });
          await ctx.prisma.student.create({
            data: {
              user: {
                connect: {
                  id: createdUser.id,
                },
              },
              schoolClass: {
                connect: {
                  id: student.cid,
                },
              },
            },
          });
        } else {
          await ctx.prisma.user.update({
            where: {
              id: currentStudent.user.id,
            },
            data: {
              name: student.name,
              firstName: student.foreName,
              lastName: student.longName,
            },
          });
          await ctx.prisma.student.update({
            where: {
              id: currentStudent.id,
            },
            data: {
              schoolClass: {
                connect: {
                  id: student.cid,
                },
              },
            },
          });
        }
      });

      const teachers = await untis.getTeachers();
      const schoolTeachers = await ctx.prisma.teacher.findMany({
        where: {
          schoolId: currentSchool.id,
        },
      });
      teachers.forEach(async (teacher) => {
        const currentTeacher = schoolTeachers.find(
          (schoolTeacher) => schoolTeacher.name === teacher.name
        );
        if (!currentTeacher) {
          await ctx.prisma.teacher.create({
            data: {
              name: teacher.name,
              school: {
                connect: {
                  id: currentSchool.id,
                },
              },
            },
          });
        } else {
          await ctx.prisma.teacher.update({
            where: {
              id: currentTeacher.id,
            },
            data: {
              name: teacher.name,
            },
          });
        }
      });
    }

    const rooms = await untis.getRooms();
    const schoolRooms = await ctx.prisma.room.findMany({
      where: {
        schoolId: currentSchool.id,
      },
    });
    rooms.forEach(async (room) => {
      const currentRoom = schoolRooms.find(
        (schoolRoom) => schoolRoom.name === room.name
      );

      if (!currentRoom) {
        await ctx.prisma.room.create({
          data: {
            name: room.name,
            school: {
              connect: {
                id: currentSchool.id,
              },
            },
          },
        });
      } else {
        await ctx.prisma.room.update({
          where: {
            id: currentRoom.id,
          },
          data: {
            name: room.name,
          },
        });
      }
    });

    await untis.logout();

    return loginData;
  }
}
