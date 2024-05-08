package com.example.service;

import com.example.entity.Product;
import com.example.exception.NoProductFoundException;
import com.example.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService{

    @Autowired
    ProductRepository prodRepo;

    @Override
    public String saveProduct(Product product) {
        prodRepo.save(product);
        return "Product id: " + product.getProdId() + " is save successfully!";
    }

    @Override
    public List<Product> getAllProduct() {
        return prodRepo.findAll();
    }

    @Override
    public Product getProductById(Long prodId) {
        return prodRepo.findById(prodId).get();
    }

    @Override
    public String deleteProductById(Long ProdId) {
        boolean delete = false;
        if (prodRepo.existsById(ProdId)) {
            prodRepo.deleteById(ProdId);
            delete = true;
        }

        return "Product with Id: " + ProdId + " deleted status" + delete;
    }

    @Override
    public Product updateProduct(Long prodId, Product product) throws NoProductFoundException {
        Optional<Product> existing = prodRepo.findById(prodId);
        Product existProduct = null;
        if (existing.isPresent()) {
            existProduct = existing.get();
            existProduct.setProdName(product.getProdName());
            existProduct.setPrice(product.getPrice());
            existProduct.setDesc(product.getDesc());

            prodRepo.save(existProduct);
        }
        if (existProduct==null)
        {
            throw new NoProductFoundException("Product Not Found");
        }
        return existProduct;
    }
}
