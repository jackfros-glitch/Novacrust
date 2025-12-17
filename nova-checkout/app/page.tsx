"use client"
import Image from "next/image";
import CheckoutForm from "./components/checkoutForm";
import { useState } from "react";
import ReceiptDetailsForm from "./components/receiptDetails";
import { useAppContext } from "./context/AppContext";

export default function CheckoutPage() {
  const { stage } = useAppContext()
  
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black h-screen">
      <main className="">
       <div className="">
        {stage === 1 &&
          (
          <CheckoutForm/>
          )
        }
        </div>
        <div>
          { stage === 2 &&
          (<ReceiptDetailsForm />)
          }
        </div>
      </main>
    </div>
  );
}
