import { Controller, Get, Post, Body, Param, Put, Patch, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // Endpoint: GET /products
    @Get()
    async findAll() {
        return this.productsService.findAll();
    }

    // Endpoint: GET /products/:id
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const product = await this.productsService.findOne(id);
        if (!product) {
            // อาจจะ throw NotFoundException ที่นี่ในโปรเจกต์จริง
            return new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    // Endpoint: POST /products
    @Post()
    @HttpCode(HttpStatus.CREATED) // กำหนด Status Code เป็น 201 Created
    async create(@Body() createProductDto: { name: string; description?: string; price: number; stock: number }) {
        return this.productsService.create(createProductDto);
    }

    // Endpoint: PUT /products/:id
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: { name?: string; description?: string; price?: number; stock?: number }) {
        return this.productsService.update(id, updateProductDto);
    }

    // Endpoint: DELETE /products/:id
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // กำหนด Status Code เป็น 204 No Content (ไม่มีเนื้อหาคืนกลับ)
    async remove(@Param('id') id: string) {
        await this.productsService.remove(id);
    }
}
