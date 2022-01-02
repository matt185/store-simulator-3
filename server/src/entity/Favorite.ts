import {Field, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {User} from "./User";

@ObjectType()
@Entity()
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  itemId: string;

  @Field()
  @Column()
  customerId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.favorites, {onDelete: "CASCADE"})
  customer: User;
}
