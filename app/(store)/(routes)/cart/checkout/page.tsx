"use client";
import Container from "@/components/Store/container";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import CheckoutClientCart from "./componenets/CheckoutClientCart";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default async function CartCheckoutPage() {
  const user = await currentUser();
  const UserId = user?.id;

  const CartProducts = await db.cartItems.findMany({
    where: {
      userId: UserId,
    },
    include: {
      product: {
        include: {
          images: { select: { url: true } },
          category: { select: { name: true } },
          colors: { select: { name: true, value: true } },
          sizes: { select: { name: true, value: true } },
        },
      },
    },
  });

  const prices = CartProducts.map((item) => item.price);
  const quantities = CartProducts.map((item) => item.quantity);

  const [currentStep, setCurrentStep] = useState('login');

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    setCurrentStep('payment');
  };

  return (
    <div className="bg-white">
      <Container>
        {currentStep === 'login' && (
          <div>
            <h2>Please login or register to place an order</h2>
            {/* Add your login/register form here */}
            <button onClick={() => setCurrentStep('address')}>Login/Register</button>
          </div>
        )}
        
        {currentStep === 'address' && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Address Form</h2>
            <div>
              <label>First Name</label>
              <input {...register('firstName', { required: true })} />
              {errors.firstName && <span>This field is required</span>}
            </div>
            <div>
              <label>Last Name</label>
              <input {...register('lastName', { required: true })} />
              {errors.lastName && <span>This field is required</span>}
            </div>
            <div>
              <label>Address</label>
              <input {...register('address', { required: true })} />
              {errors.address && <span>This field is required</span>}
            </div>
            <div>
              <label>City</label>
              <input {...register('city', { required: true })} />
              {errors.city && <span>This field is required</span>}
            </div>
            <div>
              <label>Postal Code</label>
              <input {...register('postalCode', { required: true })} />
              {errors.postalCode && <span>This field is required</span>}
            </div>
            <button type="submit">Submit</button>
          </form>
        )}

        {currentStep === 'payment' && (
          <div>
            <h2>Payment</h2>
            <CheckoutClientCart prices={prices} quantities={quantities} />
            {/* Add your payment form here */}
          </div>
        )}
      </Container>
    </div>
  );
}
