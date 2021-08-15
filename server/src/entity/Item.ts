import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true, nullable: false})
  itemId!: string;

  @Field()
  @Column({nullable: true, unique: true})
  itemName!: string;

  @Field()
  @Column({nullable: false})
  itemClass!: string;

  @Field()
  @Column({nullable: false})
  itemType!: string;

  @Field()
  @Column({nullable: false})
  itemBrand!: string;

  @Field()
  @Column({nullable: false})
  itemPic: string;

  @Field()
  @Column({nullable: false, type: "float"})
  price!: number;

  @Field(() => Int)
  @Column({type: "int", nullable: true})
  quantity!: number;

  @Field(() => Int)
  @Column({type: "int", nullable: true})
  minQuantity!: number;

  @Field()
  @Column({default: 0})
  popular: number;

  @Field()
  @Column({default: false})
  home: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}