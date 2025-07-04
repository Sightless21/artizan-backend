import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.product.findMany();
    }

    async findOne(id: string) {
        return this.prisma.product.findUnique({
            where: { id },
        })
    }

    // เมธอดสำหรับสร้างสินค้าใหม่
    async create(data: { name: string; description?: string; price: number; stock: number }) {
        return this.prisma.product.create({
            data,
        });
    }

    // เมธอดสำหรับอัปเดตสินค้า
    async update(id: string, data: { name?: string; description?: string; price?: number; stock?: number }) {
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }

    // เมธอดสำหรับลบสินค้า
    async remove(id: string) {
        return this.prisma.product.delete({
            where: { id },
        });
    }

}
