export type UserProps = {
  id?: string;
  telegramChatId: string;
  firstName?: string | null;
  username?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  private readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get telegramChatId(): string {
    return this.props.telegramChatId;
  }

  get firstName(): string | null | undefined {
    return this.props.firstName;
  }

  get username(): string | null | undefined {
    return this.props.username;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
