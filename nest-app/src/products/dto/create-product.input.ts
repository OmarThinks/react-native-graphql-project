import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String, {
    description: 'The name of the product',
    nullable: false,
  })
  name: string;
  @Field(() => String, {
    description: 'The description of the product',
    nullable: false,
  })
  description: string;
  @Field(() => Number, {
    description: 'The price of the product',
    nullable: false,
  })
  price: number;
}
