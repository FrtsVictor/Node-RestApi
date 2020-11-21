interface iAdress {
  email: string;
  name: string;
}

export interface iMessage {
  to: iAdress;
  from: iAdress;
  subject: string;
  body: string;
}

export interface iMailProvider {
  sendMail(message: iMessage): Promise<void>;
}
