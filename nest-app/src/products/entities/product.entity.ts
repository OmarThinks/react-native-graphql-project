import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The unique identifier of the product' })
  id: number;

  @Column()
  @Field(() => String, { description: 'The name of the product' })
  name: string;

  @Column()
  @Field(() => String, { description: 'The description of the product' })
  description: string;

  @Column('decimal')
  @Field(() => Number, { description: 'The price of the product' })
  price: number;
}
