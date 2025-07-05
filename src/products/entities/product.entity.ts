import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity {
    @ApiProperty({
        description: 'Unique identifier of the product',
        example: 'clx0j2m7w000008jp8p8q8s8t',
        type: String,
    })
    id: string;

    @ApiProperty({
        description: 'Name of the product',
        example: 'Laptop Pro',
        type: String,
    })
    name: string;

    @ApiProperty({
        description: 'Detailed description of the product',
        example: 'Powerful laptop with 16GB RAM and 512GB SSD.',
        required: false,
        type: String,
    })
    description?: string;

    @ApiProperty({
        description: 'Price of the product',
        example: 1200.00,
        type: Number,
    })
    price: number;

    @ApiProperty({
        description: 'Available stock quantity',
        example: 50,
        required: false,
        type: Number,
    })
    stock?: number;

    @ApiProperty({
        description: 'Timestamp when the product was created',
        example: '2025-07-05T10:00:00.000Z',
        type: Date,
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Timestamp when the product was last updated',
        example: '2025-07-05T10:30:00.000Z',
        type: Date,
    })
    updatedAt: Date;
}