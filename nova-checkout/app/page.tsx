"use client"
import Image from "next/image";
import CheckoutForm from "./components/checkoutForm";
import { useState } from "react";
import ReceiptDetailsForm from "./components/receiptDetails";

export default function CheckoutPage() {
  const [stage, setStage] = useState<number>(1)
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black h-screen">
      <main className="">
       <div className="">
        {stage === 1 &&
          (
          <CheckoutForm setStage={setStage}/>
          )
        }
        </div>
        <div>
          { stage === 2 &&
          (<ReceiptDetailsForm setStage={setStage} />)
          }
        </div>
      </main>
    </div>
  );
}
