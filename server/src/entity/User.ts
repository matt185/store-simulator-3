import {Field, ObjectType} from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import {Favorite} from "./Favorite";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true})
  userId: string;

  @Field()
  @Column({unique: true, nullable: false})
  username!: string;

  @Field()
  @Column({unique: true, nullable: false})
  email!: string;

  @Column({nullable: false})
  password!: string;

  @Field({defaultValue: "-"})
  @Column({nullable: true})
  phone?: string;

  @Field({defaultValue: "-"})
  @Column({nullable: true})
  address?: string;

  @Field()
  @Column({nullable: false})
  role: string;

  @Field(() => [Favorite], {nullable: true})
  @OneToMany(() => Favorite, favorite => favorite.customer)
  favorites: Favorite[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
