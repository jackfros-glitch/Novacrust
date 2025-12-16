"use client"
import React, { use, useEffect, useMemo, useState } from 'react'

interface CheckoutFormProp{
  setStage: React.Dispatch<React.SetStateAction<number>>
}

interface ConversionRate{
  currencyCode : string;
  rate : number;
  thumbnail: string;
}


interface BlockchainNetwork {
  name: string;
  thumbnail: string;
  conversionRates: {
    [country: string]: ConversionRate;
  };
}

interface Currency {
  code : string;
  country : string;
  thumbnail: string;
}

interface Wallet{
  name: string;
  thumbnail: string;
}

const CheckoutForm : React.FC<CheckoutFormProp> = ({ setStage }) => {

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState<boolean>(false);
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState<boolean>(false);
  const [amountToPay, setAmountToPay] = useState<number>(1.00)
  const [amountToReceive, setAmountToReceive] = useState<number>(0.00)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({ "code": "NGN", "country": "Nigeria", "thumbnail": "image.svg" }, );
  const [selectedPaymentWallet, setSelectedPaymentWallet] = useState<Wallet | null>();
  const [selectedReceivingWallet, setSelectedReceivingWallet] = useState<Wallet | null>()
  const [selectedCheckoutOption, setSelectedCheckoutOption] = useState<string>("Crypto to cash");

  const [selectedNetwork, setSelectedNetwork] = useState<BlockchainNetwork>({
      "name": "USDT - ETH",
      "thumbnail": "/image 6.svg",
      "conversionRates": {
        "Nigeria": {
        "currencyCode": "NGN",
        "rate": 4312967,
        "thumbnail": ""
        },
        "Ghana": {
        "currencyCode": "GHS",
        "rate": 33971.55,
        "thumbnail": ""
        }
    }    });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currencySearchTerm, setCurrencySearchTerm] = useState<string>("");
  const [isPayFromSearchTerm,setIsPayFromSearchTerm] = useState<string>("");
  const [isPayToSearchTerm, setIsPayToSearchTerm] = useState<string>("");
  const [isPayFromDropdownOpen,setIsPayFromDropdownOpen] = useState<boolean>(false);
  const [isPayToDropdownOpen,setIsPayToDropdownOpen] = useState<boolean>(false);

  const availableCurrencies: Currency[] = [
    { "code": "NGN", "country": "Nigeria", "thumbnail": "image.svg" }, 
    { "code" : "GHS", "country" : "Ghana", "thumbnail": "Flag_of_Ghana.svg" }
  ]

  const availableWallets: Wallet [] = [
    {
      "name": "Metamask",
      "thumbnail": "/Rectangle 4414.svg"
    },
    {
      "name": "Rainbow",
      "thumbnail": "/Rectangle 4415.svg"
    },
    {
      "name": "WalletConnect",
      "thumbnail": "/Rectangle 4413.svg"
    },
    {
      "name": "Other Crypto Wallets (Binance, Conibase, Bybit etc)",
      "thumbnail": ""
    }
  ]
  const availableBlockchainNetworks: BlockchainNetwork[] = [
    {
      "name": "USDT - ETH",
      "thumbnail": "/image 6.svg",
      "conversionRates": {
        "Nigeria": {
        "currencyCode": "NGN",
        "rate": 4312967,
        "thumbnail": ""
        },
        "Ghana": {
        "currencyCode": "GHS",
        "rate": 33971.55,
        "thumbnail": ""
        }
      }
    },
    { 
      "name" : "USDT - CELO",
      "thumbnail" : "/Rectangle 4410.svg",
      "conversionRates": {
        "Nigeria": {
        "currencyCode": "NGN",
        "rate": 198.23,
        "thumbnail": ""
        },
        "Ghana": {
        "currencyCode": "GHS",
        "rate": 1.56,
        "thumbnail": ""
        }
      }
    }, 
    {
      "name" : "USDT - TON",
      "thumbnail" : "/Rectangle 4411.svg",
      "conversionRates": {
        "Nigeria": {
        "currencyCode": "NGN",
        "rate": 2225.42,
        "thumbnail": ""
        },
        "Ghana": {
        "currencyCode": "GHS",
        "rate": 17.60,
        "thumbnail": ""
        }
      }
    },
    {
      "name": "USDT - BNB",
      "thumbnail": "/Rectangle 4412.svg",
      "conversionRates": {
        "Nigeria": {
        "currencyCode": "NGN",
        "rate": 1233358.73,
        "thumbnail": ""
        },
        "Ghana" : {
        "currencyCode": "GHS",
        "rate": 9988.41,
        "thumbnail": ""
        }
      }
    }
    
  ]
  const filteredNetworks = useMemo<BlockchainNetwork[]>(() => {
    return availableBlockchainNetworks.filter((network) =>
      network.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredCurrencies = useMemo<Currency[]>(() => {
    return availableCurrencies.filter((currency) =>
      currency.country.toLowerCase().includes(currencySearchTerm.toLowerCase())
    );
  }, [currencySearchTerm]);
  
  const filteredWallets = useMemo<Wallet[]>(() => {
    return availableWallets.filter((wallet) =>
      wallet.name.toLowerCase().includes(isPayFromSearchTerm.toLowerCase())
    );
  }, [isPayFromSearchTerm]);

  const filteredPayToWallets = useMemo<Wallet[]>(() => {
    return availableWallets.filter((wallet) =>
      wallet.name.toLowerCase().includes(isPayToSearchTerm.toLowerCase())
    );
  }, [isPayToSearchTerm]);

  const CalculateAmountToPay = ()=>{
    const rateObject = selectedNetwork.conversionRates[selectedCurrency.country];

  
    const rate = rateObject ? rateObject.rate : 0; 
    const amountToReceive = amountToPay * rate;

    setAmountToReceive(amountToReceive)
  }

  const checkoutOptions = ["Crypto to cash", "Cash to crypto", "Crypto to fiat loan"]

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    if (!selectedPaymentWallet){
      alert("please select a Payment Wallet")
      return 
    }
    if (!selectedReceivingWallet){
      alert("please select a Wallet to send it to")
      return 

    }
    setStage(2);
  }

  useEffect(()=>{
    CalculateAmountToPay()
  }, [])

  return (
    <form className='bg-white border border-slate-100 rounded-2xl p-2 h-[90vh] my-auto overflow-clip'>
      <div className='h-full overflow-y-auto p-8'>
        <nav className='flex gap-x-3 gap-y-4  bg-[#F2F2F2] rounded-2xl mb-8'>{
          checkoutOptions.map((option, index)=>(
            <div key={index + option}
              className={` text-[#828282] rounded-2xl px-2 py-1 ${selectedCheckoutOption === option ? 'bg-[#013941] text-white': 'bg-[#F2F2F2]'} hover:bg-[#013941] hover:text-white cursor-pointer`}
              onClick={()=> setSelectedCheckoutOption(option)}
              >
              {option}
            </div>
          ))}</nav>
        
          <div  className='border px-4 py-4 rounded-3xl border-[#F5F5F5]'>
            <div className='mb-2 text-[#828282]'>You Pay</div>
            <div className='flex justify-between'>
              <input id="crypto-payment"
              step={0.01}
              min={1}
              value={String(amountToPay)}
              onChange={(e) => {
                setAmountToPay(parseFloat(e.target.value))
                CalculateAmountToPay()
              }}
              className='w-fit border border-[#F5F5F5] rounded-xl focus:border-blue-500 focus:outline-blue-500 px-2 py-1 font-semibold'
              type="number" />
              <div className='w-fit flex flex-col'>
                <button
                  onClick={(e)=>{
                    e.preventDefault()
                    setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}}
                  id="dropdownUsersSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
                  className="inline-flex items-center self-end justify-center text-black bg-brand box-border border bg-[#F5F5F5] border-[#E0E0E0] rounded-2xl shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
                  <span> <img src={selectedNetwork.thumbnail} className="w-5 h-5 mr-2"/></span>
                  {selectedNetwork.name.replace("USDT -", "")}
                  <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
                </button>
                <div className="relative inline-block "></div>
        
                {/* <!-- Dropdown menu --> */}
                <div>
                  {
                  isNetworkDropdownOpen && (
                    <div className="relative">
                        <div id="dropdownSearch" className="absolute z-10 bg-neutral-primary-medium rounded-base shadow-lg w-54">
                      <div className='absolute bg-white rounded-2xl -left-40 top-1 border border-[#E0E0E0] p-2'>
                        <div className="flex items-center bg-white rounded-3xl border border-[#E0E0E0] px-2 py-1">
                          <label htmlFor="search" className="sr-only">Search</label>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.9422 17.0578L14.0305 13.1469C15.1642 11.7857 15.7296 10.0398 15.6089 8.27244C15.4883 6.50506 14.6909 4.85223 13.3826 3.65779C12.0744 2.46334 10.356 1.81926 8.58492 1.85951C6.81388 1.89976 5.12653 2.62125 3.87389 3.87389C2.62125 5.12653 1.89976 6.81388 1.85951 8.58492C1.81926 10.356 2.46334 12.0744 3.65779 13.3826C4.85223 14.6909 6.50506 15.4883 8.27244 15.6089C10.0398 15.7296 11.7857 15.1642 13.1469 14.0305L17.0578 17.9422C17.1159 18.0003 17.1848 18.0463 17.2607 18.0777C17.3366 18.1092 17.4179 18.1253 17.5 18.1253C17.5821 18.1253 17.6634 18.1092 17.7393 18.0777C17.8152 18.0463 17.8841 18.0003 17.9422 17.9422C18.0003 17.8841 18.0463 17.8152 18.0777 17.7393C18.1092 17.6634 18.1253 17.5821 18.1253 17.5C18.1253 17.4179 18.1092 17.3366 18.0777 17.2607C18.0463 17.1848 18.0003 17.1159 17.9422 17.0578ZM3.125 8.75C3.125 7.63748 3.4549 6.54994 4.07298 5.62491C4.69106 4.69989 5.56957 3.97892 6.5974 3.55317C7.62524 3.12743 8.75624 3.01604 9.84738 3.23308C10.9385 3.45012 11.9408 3.98585 12.7275 4.77252C13.5141 5.55919 14.0499 6.56147 14.2669 7.65261C14.484 8.74376 14.3726 9.87476 13.9468 10.9026C13.5211 11.9304 12.8001 12.8089 11.8751 13.427C10.9501 14.0451 9.86252 14.375 8.75 14.375C7.25866 14.3733 5.82888 13.7802 4.77435 12.7256C3.71981 11.6711 3.12665 10.2413 3.125 8.75Z" fill="#828282"/>
                          </svg>
                          <input type="text" id="search"  value={searchTerm}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ): void => setSearchTerm(e.target.value)}
                            className="bg-neutral-secondary-strong border-none outline-0 text-heading text-sm rounded focus:ring-brand focus:border-brand block w-full px-2.5 py-2 placeholder:text-body" placeholder="Search for users" required />
                        </div>
                        <ul className="max-h-48 p-2 text-sm text-body font-medium overflow-y-auto" aria-labelledby="dropdownSearchButton">
                          {filteredNetworks.length === 0 && (
                            <li className="text-sm text-gray-400 px-3 py-2">
                              No results found
                            </li>
                          )}
                          {filteredNetworks.map(
                            (network: BlockchainNetwork) => (
                              <li
                                key={network.name}
                                onClick={(): void => {
                                  setSelectedNetwork(network);
                                  setIsNetworkDropdownOpen(false);
                                  setSearchTerm("");
                                }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F5F5F5] ${selectedNetwork.name === network.name ? 'bg-[#F5F5F5]': ''} cursor-pointer`}
                              >
                                <img
                                  src={network.thumbnail}
                                  alt={"network icon"}
                                  className="w-5 h-5"
                                />
                                <span>{network.name}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      </div>
                    </div>
                        )
                      }
                </div>
        
              </div>
            </div>
          </div>
          <div  className='border px-4 py-4 rounded-3xl border-[#F5F5F5] mt-8'>
            <div className='mb-2 text-[#828282]'>You Receive</div>
            <div className='flex justify-between'>
              <input id="amount-to-receive"
              step={0.01}
              min={1}
              value={String(amountToReceive)}
              readOnly={true}
              className='w-fit border border-[#F5F5F5] rounded-xl focus:border-blue-500 focus:outline-blue-500 outline-none px-2 py-1 font-semibold'
              type="number" />
              <div className='w-fit flex flex-col'>
                <button
                  onClick={()=> setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                  id="dropdownUsersSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
                  className="inline-flex items-center self-end justify-center text-black bg-brand box-border border bg-[#F5F5F5] border-[#E0E0E0] rounded-2xl shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
                  <span> <img src={selectedCurrency.thumbnail} className="w-5 h-5 mr-2"/></span>
                  {selectedCurrency.code}
                  <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
                </button>
                <div className="relative inline-block "></div>
        
                {/* <!-- Dropdown menu --> */}
                <div>
                  {
                  isCurrencyDropdownOpen && (
                      <div className="relative">
                        <div id="dropdownSearch" className="absolute z-10 bg-neutral-primary-medium rounded-base shadow-lg w-54">
                                          <div className='absolute bg-white rounded-2xl -left-40 top-1 border border-[#E0E0E0] p-2'>
                        <div className="flex items-center bg-white rounded-3xl border border-[#E0E0E0] px-2 py-1">
                          <label htmlFor="search" className="sr-only">Search</label>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.9422 17.0578L14.0305 13.1469C15.1642 11.7857 15.7296 10.0398 15.6089 8.27244C15.4883 6.50506 14.6909 4.85223 13.3826 3.65779C12.0744 2.46334 10.356 1.81926 8.58492 1.85951C6.81388 1.89976 5.12653 2.62125 3.87389 3.87389C2.62125 5.12653 1.89976 6.81388 1.85951 8.58492C1.81926 10.356 2.46334 12.0744 3.65779 13.3826C4.85223 14.6909 6.50506 15.4883 8.27244 15.6089C10.0398 15.7296 11.7857 15.1642 13.1469 14.0305L17.0578 17.9422C17.1159 18.0003 17.1848 18.0463 17.2607 18.0777C17.3366 18.1092 17.4179 18.1253 17.5 18.1253C17.5821 18.1253 17.6634 18.1092 17.7393 18.0777C17.8152 18.0463 17.8841 18.0003 17.9422 17.9422C18.0003 17.8841 18.0463 17.8152 18.0777 17.7393C18.1092 17.6634 18.1253 17.5821 18.1253 17.5C18.1253 17.4179 18.1092 17.3366 18.0777 17.2607C18.0463 17.1848 18.0003 17.1159 17.9422 17.0578ZM3.125 8.75C3.125 7.63748 3.4549 6.54994 4.07298 5.62491C4.69106 4.69989 5.56957 3.97892 6.5974 3.55317C7.62524 3.12743 8.75624 3.01604 9.84738 3.23308C10.9385 3.45012 11.9408 3.98585 12.7275 4.77252C13.5141 5.55919 14.0499 6.56147 14.2669 7.65261C14.484 8.74376 14.3726 9.87476 13.9468 10.9026C13.5211 11.9304 12.8001 12.8089 11.8751 13.427C10.9501 14.0451 9.86252 14.375 8.75 14.375C7.25866 14.3733 5.82888 13.7802 4.77435 12.7256C3.71981 11.6711 3.12665 10.2413 3.125 8.75Z" fill="#828282"/>
                          </svg>
                          <input type="text" id="currency-search"  value={currencySearchTerm}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ): void => setCurrencySearchTerm(e.target.value)}
                            className="bg-neutral-secondary-strong border-none outline-0 text-heading text-sm rounded focus:ring-brand focus:border-brand block w-full px-2.5 py-2 placeholder:text-body" placeholder="Search for users" required />
                        </div>
                        <ul className="max-h-48 p-2 text-sm text-body font-medium overflow-y-auto" aria-labelledby="dropdownSearchButton">
                          {filteredCurrencies.length === 0 && (
                            <li className="text-sm text-gray-400 px-3 py-2">
                              No results found
                            </li>
                          )}
                          {filteredCurrencies.map(
                            (currency: Currency) => (
                              <li
                                key={currency.country}
                                onClick={(): void => {
                                  setSelectedCurrency(currency);
                                  setIsCurrencyDropdownOpen(false);
                                  setCurrencySearchTerm("");
                                }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F5F5F5] ${selectedCurrency.country === currency.country ? 'bg-[#F5F5F5]': ''} cursor-pointer`}
                              >
                                <img
                                  src={currency.thumbnail}
                                  alt={"country currency icon"}
                                  className="w-5 h-5"
                                />
                                <span>{currency.country}</span>
                              </li>
                            )
                          )}
                        </ul>
                                          </div>
                                        </div>
                      </div>
                        )
                      }
                </div>
        
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <div className='text-[#013941] mb-3'>Pay from</div>
            <div>
              <div className='w-full flex flex-col'>
                <button
                  onClick={()=> setIsPayFromDropdownOpen(!isPayFromDropdownOpen)}
                  id="dropdownUsersSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
                  className="inline-flex w-full items-start self-end justify-between text-[#013941] bg-brand box-border border border-[#E0E0E0] rounded-3xl shadow-xs font-medium leading-5 rounded-base text-sm p-4 focus:outline-none" type="button">
                  {selectedPaymentWallet  ? (
                      // If it's an object, safely access the name
                      selectedPaymentWallet.name
                    ) : (
                      // If it's the default string, display the string value
                      "Select an Option"
                    )}
                  <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
                </button>
                <div className="relative inline-block "></div>
        
                {/* <!-- Dropdown menu --> */}
                <div>
                  {
                  isPayFromDropdownOpen && (
                      <div className="relative">
                        <div id="dropdownSearch" className="absolute z-10 bg-neutral-primary-medium rounded-base shadow-lg w-full">
                                          <div className='absolute bg-white rounded-2xl top-1 border border-[#E0E0E0] p-2'>
                        <div className="flex items-center bg-white rounded-3xl border border-[#E0E0E0] px-2 py-1">
                          <label htmlFor="search" className="sr-only">Search</label>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.9422 17.0578L14.0305 13.1469C15.1642 11.7857 15.7296 10.0398 15.6089 8.27244C15.4883 6.50506 14.6909 4.85223 13.3826 3.65779C12.0744 2.46334 10.356 1.81926 8.58492 1.85951C6.81388 1.89976 5.12653 2.62125 3.87389 3.87389C2.62125 5.12653 1.89976 6.81388 1.85951 8.58492C1.81926 10.356 2.46334 12.0744 3.65779 13.3826C4.85223 14.6909 6.50506 15.4883 8.27244 15.6089C10.0398 15.7296 11.7857 15.1642 13.1469 14.0305L17.0578 17.9422C17.1159 18.0003 17.1848 18.0463 17.2607 18.0777C17.3366 18.1092 17.4179 18.1253 17.5 18.1253C17.5821 18.1253 17.6634 18.1092 17.7393 18.0777C17.8152 18.0463 17.8841 18.0003 17.9422 17.9422C18.0003 17.8841 18.0463 17.8152 18.0777 17.7393C18.1092 17.6634 18.1253 17.5821 18.1253 17.5C18.1253 17.4179 18.1092 17.3366 18.0777 17.2607C18.0463 17.1848 18.0003 17.1159 17.9422 17.0578ZM3.125 8.75C3.125 7.63748 3.4549 6.54994 4.07298 5.62491C4.69106 4.69989 5.56957 3.97892 6.5974 3.55317C7.62524 3.12743 8.75624 3.01604 9.84738 3.23308C10.9385 3.45012 11.9408 3.98585 12.7275 4.77252C13.5141 5.55919 14.0499 6.56147 14.2669 7.65261C14.484 8.74376 14.3726 9.87476 13.9468 10.9026C13.5211 11.9304 12.8001 12.8089 11.8751 13.427C10.9501 14.0451 9.86252 14.375 8.75 14.375C7.25866 14.3733 5.82888 13.7802 4.77435 12.7256C3.71981 11.6711 3.12665 10.2413 3.125 8.75Z" fill="#828282"/>
                          </svg>
                          <input type="text" id="currency-search"  value={isPayFromSearchTerm}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ): void => setIsPayFromSearchTerm(e.target.value)}
                            className="bg-neutral-secondary-strong border-none outline-0 text-heading text-sm rounded focus:ring-brand focus:border-brand block w-full px-2.5 py-2 placeholder:text-body" placeholder="Search for users" required />
                        </div>
                        <ul className="max-h-48 p-2 text-sm text-body font-medium overflow-y-auto" aria-labelledby="dropdownSearchButton">
                          {filteredWallets.length === 0 && (
                            <li className="text-sm text-gray-400 px-3 py-2">
                              No results found
                            </li>
                          )}
                          {filteredWallets.map(
                            (wallet: Wallet) => (
                              <li
                                key={wallet.name}
                                onClick={(): void => {
                                  setSelectedPaymentWallet(wallet);
                                  setIsPayFromDropdownOpen(false);
                                  setIsPayFromSearchTerm("");
                                }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F5F5F5] ${ selectedPaymentWallet ? (selectedPaymentWallet.name === wallet.name ? 'bg-[#F5F5F5]': '') : "Select an Option" } cursor-pointer`}
                              >
                                <img
                                  src={wallet.thumbnail}
                                  alt={"country currency icon"}
                                  className="w-5 h-5"
                                />
                                <span>{wallet.name}</span>
                              </li>
                            )
                          )}
                        </ul>
                                          </div>
                                        </div>
                      </div>
                        )
                      }
                </div>
        
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <div className='text-[#013941] mb-3'>Pay To</div>
            <div>
              <div className='w-full flex flex-col'>
                <button
                  onClick={()=> setIsPayToDropdownOpen(!isPayToDropdownOpen)}
                  id="dropdownUsersSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
                  className="inline-flex w-full items-start self-end justify-between text-[#013941] bg-brand box-border border border-[#E0E0E0] rounded-3xl shadow-xs font-medium leading-5 rounded-base text-sm p-4 focus:outline-none" type="button">
                  {selectedReceivingWallet ? (
                    selectedReceivingWallet.name
                    ) : (
                      "Select an Option"
                    )}
                  <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
                </button>
                <div className="relative inline-block "></div>
        
                {/* <!-- Dropdown menu --> */}
                <div>
                  {
                  isPayToDropdownOpen && (
                      <div className="relative">
                        <div id="dropdownSearch" className="absolute z-10 bg-neutral-primary-medium rounded-base shadow-lg w-full">
                                          <div className='absolute bg-white rounded-2xl top-1 border border-[#E0E0E0] p-2'>
                        <div className="flex items-center bg-white rounded-3xl border border-[#E0E0E0] px-2 py-1">
                          <label htmlFor="search" className="sr-only">Search</label>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.9422 17.0578L14.0305 13.1469C15.1642 11.7857 15.7296 10.0398 15.6089 8.27244C15.4883 6.50506 14.6909 4.85223 13.3826 3.65779C12.0744 2.46334 10.356 1.81926 8.58492 1.85951C6.81388 1.89976 5.12653 2.62125 3.87389 3.87389C2.62125 5.12653 1.89976 6.81388 1.85951 8.58492C1.81926 10.356 2.46334 12.0744 3.65779 13.3826C4.85223 14.6909 6.50506 15.4883 8.27244 15.6089C10.0398 15.7296 11.7857 15.1642 13.1469 14.0305L17.0578 17.9422C17.1159 18.0003 17.1848 18.0463 17.2607 18.0777C17.3366 18.1092 17.4179 18.1253 17.5 18.1253C17.5821 18.1253 17.6634 18.1092 17.7393 18.0777C17.8152 18.0463 17.8841 18.0003 17.9422 17.9422C18.0003 17.8841 18.0463 17.8152 18.0777 17.7393C18.1092 17.6634 18.1253 17.5821 18.1253 17.5C18.1253 17.4179 18.1092 17.3366 18.0777 17.2607C18.0463 17.1848 18.0003 17.1159 17.9422 17.0578ZM3.125 8.75C3.125 7.63748 3.4549 6.54994 4.07298 5.62491C4.69106 4.69989 5.56957 3.97892 6.5974 3.55317C7.62524 3.12743 8.75624 3.01604 9.84738 3.23308C10.9385 3.45012 11.9408 3.98585 12.7275 4.77252C13.5141 5.55919 14.0499 6.56147 14.2669 7.65261C14.484 8.74376 14.3726 9.87476 13.9468 10.9026C13.5211 11.9304 12.8001 12.8089 11.8751 13.427C10.9501 14.0451 9.86252 14.375 8.75 14.375C7.25866 14.3733 5.82888 13.7802 4.77435 12.7256C3.71981 11.6711 3.12665 10.2413 3.125 8.75Z" fill="#828282"/>
                          </svg>
                          <input type="text" id="currency-search"  value={isPayToSearchTerm}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ): void => setIsPayToSearchTerm(e.target.value)}
                            className="bg-neutral-secondary-strong border-none outline-0 text-heading text-sm rounded focus:ring-brand focus:border-brand block w-full px-2.5 py-2 placeholder:text-body" placeholder="Search for users" required />
                        </div>
                        <ul className="max-h-48 p-2 text-sm text-body font-medium overflow-y-auto" aria-labelledby="dropdownSearchButton">
                          {filteredPayToWallets.length === 0 && (
                            <li className="text-sm text-gray-400 px-3 py-2">
                              No results found
                            </li>
                          )}
                          {filteredPayToWallets.map(
                            (wallet: Wallet) => (
                              <li
                                key={wallet.name}
                                onClick={(): void => {
                                  setSelectedReceivingWallet(wallet);
                                  setIsPayToDropdownOpen(false);
                                  setIsPayToSearchTerm("");
                                }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F5F5F5] ${selectedReceivingWallet ? (selectedReceivingWallet.name === wallet.name ? 'bg-[#F5F5F5]': ''): "Select an Option"} cursor-pointer`}
                              >
                                <img
                                  src={wallet.thumbnail}
                                  alt={"country currency icon"}
                                  className="w-5 h-5"
                                />
                                <span>{wallet.name}</span>
                              </li>
                            )
                          )}
                        </ul>
                                          </div>
                                        </div>
                      </div>
                        )
                      }
                </div>
        
              </div>
            </div>
          </div>
          <div className='mt-8'>
              <button
                className='bg-[#013941] hover:cursor-pointer w-full rounded-3xl p-4 text-white'
                onClick={handleNext}>
                  Convert Now
                </button>
          </div>
      </div>
    </form>
  )
}

export default CheckoutForm