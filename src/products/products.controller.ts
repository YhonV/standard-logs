import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-producto.dto';
import { ProductStatusPipe } from './pipe/product-status.pipe';
import { Product, ProductStatus } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController{

    logger = new Logger(ProductsController.name);
    constructor(private service: ProductsService){}

    @Get()
    getProducts(): Product[]{
        this.logger.debug({message: 'getting all products'})
        return this.service.getAllProductos();
    }

    @Get('/:id')
    getProductById(@Param('id') id:string): Product{
        this.logger.debug({message: 'getting product by id'})
        return this.service.getProductById(id);
    }

    @Post()
    createProduct(@Body() productDto: CreateProductDto): Product{
        return this.service.createProduct(productDto);
    }

    @Delete('/:id')
    deleteProduct(@Param('id') id:string): Product[]{
        return this.service.deleteProduct(id);
    }

    @Patch('/:id/status')
    changeStatus(@Param('id') id: string, @Body('status', ProductStatusPipe) newStatus: ProductStatus):Product{
        return this.service.updateStatus(id, newStatus);
    }
}