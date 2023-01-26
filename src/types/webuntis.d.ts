import 'webuntis';

declare module 'webuntis' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Klasse {
    id: number;
    name: string;
    longName: string;
    active: boolean;
    did: number;
  }

  interface Student {
    id: number;
    key: number;
    name: string;
    foreName: string;
    longName: string;
    gender: string;
    klasseId: number;
    birthday: string;
  }

  type SessionInformation = {
    klasseId?: number;
    personId?: number;
    sessionId?: string;
    personType?: number;
    jwt_token?: string;
  };

  enum PersonType {
    STUDENT = 5,
    TEACHER = 2,
  }
}
