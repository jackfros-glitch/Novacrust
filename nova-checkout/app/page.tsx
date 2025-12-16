import Image from "next/image";
import CheckoutForm from "./components/checkoutForm";

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="">
       <div>
        <CheckoutForm/>
       </div>
       <div className="mt-50">

       </div>
      </main>
    </div>
  );
}
