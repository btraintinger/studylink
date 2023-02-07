import 'webuntis';

declare module 'webuntis' {
  interface Klasse {
    id: number;
    name: string;
    longName: string;
    active: boolean;
    did: number?;
    departmentId: number?;
  }

  type SessionInformation = {
    klasseId?: number;
    personId?: number;
    sessionId?: string;
    personType?: number;
    jwt_token?: string;
  };
}
