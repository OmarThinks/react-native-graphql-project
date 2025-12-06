import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  /*@Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;*/

  @Field(() => String, { description: 'The name of the product' })
  name: string;
  @Field(() => String, { description: 'The description of the product' })
  description: string;
  @Field(() => Number, { description: 'The price of the product' })
  price: number;
}
