import {Field, Int, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({nullable: false})
  orderId!: string;

  @Field()
  @Column({unique: true, nullable: false})
  itemId!: string;

  @Field()
  @Column({nullable: false})
  userId: string;

  @Field(() => Int)
  @Column({nullable: false})
  quantity!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
