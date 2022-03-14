package com.Happykart.ecommerce.service;

import com.Happykart.ecommerce.dto.Purchase;
import com.Happykart.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
