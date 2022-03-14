package com.Happykart.ecommerce.dto;

import com.Happykart.ecommerce.entity.Address;
import com.Happykart.ecommerce.entity.Customer;
import com.Happykart.ecommerce.entity.Order;
import com.Happykart.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase   {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
