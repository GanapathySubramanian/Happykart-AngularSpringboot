package com.Happykart.ecommerce.controller;

import com.Happykart.ecommerce.dto.Purchase;
import com.Happykart.ecommerce.dto.PurchaseResponse;
import com.Happykart.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService=checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeorder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse=checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }
}
