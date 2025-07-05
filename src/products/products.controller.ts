import { Controller, Get, Post, Body, Param, Put, Patch, Delete, HttpCode, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // Endpoint: GET /products
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all products' })
    @ApiOkResponse({ description: 'List of products retrieved successfully.', type: [ProductEntity] })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.productsService.findAll();
    }

    // Endpoint: GET /products/:id
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiParam({ name: 'id', description: 'ID of the product to retrieve' })
    @ApiOkResponse({ description: 'The product has been successfully retrieved.', type: ProductEntity })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @HttpCode(HttpStatus.OK)
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
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new product' })
    @ApiBody({ type: CreateProductDto, description: 'Data for creating a new product' })
    @ApiCreatedResponse({ description: 'The product has been successfully created.', type: ProductEntity })
    @ApiResponse({ status: 400, description: 'Bad Request (e.g., validation failed)' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    // Endpoint: PUT /products/:id
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update an existing product' })
    @ApiParam({ name: 'id', description: 'ID of the product to update' })
    @ApiBody({ type: UpdateProductDto, description: 'Data for updating the product' })
    @ApiOkResponse({ description: 'The product has been successfully updated.', type: ProductEntity })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    // Endpoint: DELETE /products/:id
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a product' })
    @ApiParam({ name: 'id', description: 'ID of the product to delete' })
    @ApiNoContentResponse({ description: 'The product has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @HttpCode(HttpStatus.NO_CONTENT) // กำหนด Status Code เป็น 204 No Content (ไม่มีเนื้อหาคืนกลับ)
    async remove(@Param('id') id: string) {
        await this.productsService.remove(id);
    }
}
