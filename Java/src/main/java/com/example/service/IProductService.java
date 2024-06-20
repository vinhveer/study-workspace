package com.example.service;

import com.example.entity.Product;
import com.example.exception.NoProductFoundException;

import java.util.List;

public interface IProductService {
    String saveProduct(Product product);
    List<Product> getAllProduct();
    Product getProductById(Long prodId);
    String deleteProductById(Long ProdId);
    Product updateProduct(Long prodId, Product product) throws NoProductFoundException;
}
