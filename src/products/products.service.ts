import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product, ProductStatus } from './product.model';
import { CreateProductDto} from './dto/create-producto.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService{

    products: Product[] =  [];
    private logger = new Logger(ProductsService.name);

    createProduct(productDto: CreateProductDto): Product{

        this.logger.log({message: 'creating a product', contextMap : { product: productDto.name}});

        const {name, description} = productDto;
        const product: Product = {
            id: uuidv4(),
            name,
            description,
            status: ProductStatus.OPEN
        };

        this.products.push(product);

        this.logger.log({message: 'product saved', contextMap :{product: productDto.name}})
        return product;
    }

    getAllProductos(): Product[]{
        this.logger.log({message: 'getting all products'})
        return this.products;
    }

    getProductById(id: string): Product{
        this.logger.log({message: `searching producto with id ${id}`})
        const product = this.products.find(product => product.id === id);
        
        if (!product){
            this.logger.error({message: `Not found product with id ${id}`})
            throw new NotFoundException(`Product Not Found`);
        }
        return product;
    }

    deleteProduct(id: string): Product[]{
        return this.products.filter(product => product.id !== id);
    }

    updateStatus(id:string, newStatus: ProductStatus): Product{
        const product = this.getProductById(id);

        product.status = newStatus;
        return product;
    }

    
}