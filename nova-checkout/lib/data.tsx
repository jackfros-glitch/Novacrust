import {ConversionRate, BlockchainNetwork, Currency, Wallet } from '@/lib/types'

export const availableCurrencies: Currency[] = [
    { "code": "NGN", "country": "Nigeria", "thumbnail": "image.svg" }, 
    { "code" : "GHS", "country" : "Ghana", "thumbnail": "Flag_of_Ghana.svg" }
  ]

export const availableWallets: Wallet [] = [
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
export const availableBlockchainNetworks: BlockchainNetwork[] = [
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

export const availableBanks = [
    "UBA",
    "FirstBank",
    "ZenithBank"
]