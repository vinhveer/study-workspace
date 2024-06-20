package com.example.controller;

import com.example.entity.Product;
import com.example.exception.NoProductFoundException;
import com.example.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/product/")
public class ProductController {
    @Autowired
    IProductService productService;

    @PostMapping("/save")
    public ResponseEntity<String> createProduct(@RequestBody Product product) {
        return new ResponseEntity<String>(productService.saveProduct(product),HttpStatus.OK);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Product>> readAllProduct() {
        return new ResponseEntity<List<Product>>(productService.getAllProduct(), HttpStatus.OK);
    }

    @GetMapping("/get/{prodId}")
    public ResponseEntity<Product> readProductById(@PathVariable Long prodId) {
        return new ResponseEntity<Product>(productService.getProductById(prodId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{prodId}")
    public ResponseEntity<String> deleteById(@PathVariable Long prodId) {
        return new ResponseEntity<String>(productService.deleteProductById(prodId), HttpStatus.OK);
    }

    @PutMapping("/update/{prodId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long prodId, @RequestBody Product product) throws NoProductFoundException {
        return new ResponseEntity<Product>(productService.updateProduct(prodId, product),HttpStatus.OK);
    }
}
