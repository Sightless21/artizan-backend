import { IsString, IsNumber, IsOptional, IsNotEmpty, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty({
        description: 'Name of the product',
        example: 'Awesome T-Shirt',
        type: String,
    })

    @IsString()
    @IsNotEmpty()
    name: string;


    @ApiProperty({
        description: 'Description of the product',
        example: 'A very comfortable and stylish t-shirt.',
        required: false,
        type: String,
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'Price of the product',
        example: 25.99,
        type: Number,
        minimum: 0,
    }) // อธิบาย property 'price'
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({
        description: 'Stock quantity of the product',
        example: 100,
        type: Number,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    stock: number;
}