/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const newProduct = this.productsRepository.create({
      ...createProductInput,
    });
    return this.productsRepository.save(newProduct);
  }

  findAll() {
    return this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      return { success: false, message: `Product with ID ${id} not found` };
    }

    return product;
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const product = await this.productsRepository.preload({
      ...updateProductInput,
    });

    if (!product) {
      return { success: false, message: `Product with ID ${id} not found` };
    }

    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      await this.productsRepository.delete(id);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

/*

mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}

*/
