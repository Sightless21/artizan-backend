import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// PartialType จะทำให้ทุก field ใน CreateProductDto เป็น optional
// และสืบทอด validation rules มาด้วย
export class UpdateProductDto extends PartialType(CreateProductDto) {}