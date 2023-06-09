import { Entity } from "../core/entities/entity";
import { Optional } from "../core/types/optional";

interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name;
  }
  
  get password(): string {
    return this.props.password;
  }

  get email(): string {
    return this.props.email;
  }

  static create(props: Optional<UserProps, "createdAt">): User {
    const user = new User({
      ...props,
      createdAt: new Date(),
    });
    return user;
  }
}
