"use client"
import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import {ConversionRate, BlockchainNetwork, Currency, Wallet } from '@/lib/types'

// 1️⃣ Define the shape of your context state
interface AppContextType {
  stage: number,
  setStage: (amount: number) => void;
  amountToPay: number;
  setAmountToPay: (amount: number) => void;
  amountToReceive: number;
  setAmountToReceive: (amount: number) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  selectedPaymentWallet: Wallet | null;
  setSelectedPaymentWallet: (wallet: Wallet | null) => void;
  selectedReceivingWallet: Wallet | null;
  setSelectedReceivingWallet: (wallet: Wallet | null) => void;
  selectedCheckoutOption: string;
  setSelectedCheckoutOption: (option: string) => void;
  selectedNetwork: BlockchainNetwork;
  setSelectedNetwork: (network: BlockchainNetwork) => void;
  selectedBank: string;
  setSelectedBank: (bank: string)=> void;
  accountNumber: string; 
  setAccountNumber: (accountNumber: string)=> void;
}

// 2️⃣ Create default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3️⃣ Create a provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {

  const [stage, setStage] = useState<number>(1)
  const [amountToPay, setAmountToPay] = useState<number>(1);
  const [amountToReceive, setAmountToReceive] = useState<number>(0);

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    code: "NGN",
    country: "Nigeria",
    thumbnail: "/image.svg",
  });

  const [selectedPaymentWallet, setSelectedPaymentWallet] = useState<Wallet | null>(null);
  const [selectedReceivingWallet, setSelectedReceivingWallet] = useState<Wallet | null>(null);
  const [selectedCheckoutOption, setSelectedCheckoutOption] = useState<string>("Crypto to cash");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");

  const [selectedNetwork, setSelectedNetwork] = useState<BlockchainNetwork>({
    name: "USDT - ETH",
    thumbnail: "/image 6.svg",
    conversionRates: {
      Nigeria: { currencyCode: "NGN", rate: 4312967, thumbnail: "" },
      Ghana: { currencyCode: "GHS", rate: 33971.55, thumbnail: "" },
    },
  });

  // Recalculate amountToReceive whenever dependencies change
  useMemo(() => {
    const rateObject = selectedNetwork.conversionRates[selectedCurrency.country];
    const rate = rateObject ? rateObject.rate : 0;
    setAmountToReceive(amountToPay * rate);
  }, [amountToPay, selectedNetwork, selectedCurrency]);
  return (
    <AppContext.Provider
      value={{
        stage,
        setStage,
        amountToPay,
        setAmountToPay,
        amountToReceive,
        setAmountToReceive,
        selectedCurrency,
        setSelectedCurrency,
        selectedPaymentWallet,
        setSelectedPaymentWallet,
        selectedReceivingWallet,
        setSelectedReceivingWallet,
        selectedCheckoutOption,
        setSelectedCheckoutOption,
        selectedNetwork,
        setSelectedNetwork,
        selectedBank,
        setSelectedBank,
        accountNumber, 
        setAccountNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 4️⃣ Create a hook for easier usage
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
