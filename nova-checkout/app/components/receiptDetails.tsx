"use client"

import React, { use, useMemo, useState } from 'react'


interface ReceiptDetailsFormProp{
  setStage: React.Dispatch<React.SetStateAction<number>>
}


const ReceiptDetailsForm : React.FC<ReceiptDetailsFormProp> = ({ setStage }) => {

    const [bankDropdownState, setBankDropdownState] = useState<boolean>(false)
    const [bankSearchTerm, setBankSearchTerm] = useState<string>("")
    const [selectedBank, setSelectedBank] = useState<string>("");
    const [accountNumber, setAccountNumber] = useState("");

    const availableBanks = [
        "UBA",
        "FirstBank",
        "ZenithBank"
    ]

    const filteredbanks = useMemo<string[]>(() => {
        return availableBanks.filter((bank) =>
          bank.toLowerCase().includes(bankSearchTerm.toLowerCase())
        );
      }, [bankSearchTerm]);
    
    const handlePrevious = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>{
        setStage(1)
    }

    return (
        <form className='bg-white border border-slate-100 rounded-2xl p-2 h-full w-150'>
            <div className='overflow-y-auto h-full p-8'>
                <div className='flex items-center gap-40 mb-8'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className='cursor-pointer'
                        onClick={handlePrevious}
                    >
                        <path d="M18.0006 7.50042C18.0006 7.69933 17.9216 7.8901 17.7809 8.03075C17.6403 8.1714 17.4495 8.25042 17.2506 8.25042H2.5609L8.03122 13.7198C8.1009 13.7895 8.15617 13.8722 8.19389 13.9632C8.2316 14.0543 8.25101 14.1519 8.25101 14.2504C8.25101 14.349 8.2316 14.4465 8.19389 14.5376C8.15617 14.6286 8.1009 14.7114 8.03122 14.781C7.96153 14.8507 7.87881 14.906 7.78776 14.9437C7.69672 14.9814 7.59914 15.0008 7.50059 15.0008C7.40204 15.0008 7.30446 14.9814 7.21342 14.9437C7.12237 14.906 7.03965 14.8507 6.96996 14.781L0.219965 8.03104C0.150233 7.96139 0.0949134 7.87867 0.0571702 7.78762C0.019427 7.69657 0 7.59898 0 7.50042C0 7.40186 0.019427 7.30426 0.0571702 7.21321C0.0949134 7.12216 0.150233 7.03945 0.219965 6.96979L6.96996 0.219792C7.1107 0.0790615 7.30157 -1.48284e-09 7.50059 0C7.69961 1.48284e-09 7.89048 0.0790615 8.03122 0.219792C8.17195 0.360523 8.25101 0.551394 8.25101 0.750417C8.25101 0.94944 8.17195 1.14031 8.03122 1.28104L2.5609 6.75042H17.2506C17.4495 6.75042 17.6403 6.82943 17.7809 6.97009C17.9216 7.11074 18.0006 7.3015 18.0006 7.50042Z" fill="black"/>
                    </svg>
                    <h2 className='justify-self-center self-center'>Recipient details</h2>
                </div>
                <div>
                    <div className='mb-3'>Bank</div>
                    <button
                        onClick={()=> setBankDropdownState(!bankDropdownState)}
                        id="dropdownUsersSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
                        className="inline-flex w-full items-start self-end justify-between text-[#013941] bg-brand box-border border border-[#E0E0E0] rounded-3xl shadow-xs font-medium leading-5 rounded-base text-sm p-4 focus:outline-none" type="button">
                        {selectedBank ? selectedBank : "Select an Option"}
                        <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
                    </button>
                    <div className="relative inline-block "></div>
                
                    {/* <!-- Dropdown menu --> */}
                    <div>
                    {
                    bankDropdownState && (
                        <div className='relative'>
                            <div id="dropdownSearch" className="absolute z-10 bg-neutral-primary-medium rounded-base shadow-lg w-full">
                            <div className='bg-white rounded-2xl top-1 border border-[#E0E0E0] p-2'>
                            <div className="flex items-center bg-white rounded-3xl border border-[#E0E0E0] px-2 py-1">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.9422 17.0578L14.0305 13.1469C15.1642 11.7857 15.7296 10.0398 15.6089 8.27244C15.4883 6.50506 14.6909 4.85223 13.3826 3.65779C12.0744 2.46334 10.356 1.81926 8.58492 1.85951C6.81388 1.89976 5.12653 2.62125 3.87389 3.87389C2.62125 5.12653 1.89976 6.81388 1.85951 8.58492C1.81926 10.356 2.46334 12.0744 3.65779 13.3826C4.85223 14.6909 6.50506 15.4883 8.27244 15.6089C10.0398 15.7296 11.7857 15.1642 13.1469 14.0305L17.0578 17.9422C17.1159 18.0003 17.1848 18.0463 17.2607 18.0777C17.3366 18.1092 17.4179 18.1253 17.5 18.1253C17.5821 18.1253 17.6634 18.1092 17.7393 18.0777C17.8152 18.0463 17.8841 18.0003 17.9422 17.9422C18.0003 17.8841 18.0463 17.8152 18.0777 17.7393C18.1092 17.6634 18.1253 17.5821 18.1253 17.5C18.1253 17.4179 18.1092 17.3366 18.0777 17.2607C18.0463 17.1848 18.0003 17.1159 17.9422 17.0578ZM3.125 8.75C3.125 7.63748 3.4549 6.54994 4.07298 5.62491C4.69106 4.69989 5.56957 3.97892 6.5974 3.55317C7.62524 3.12743 8.75624 3.01604 9.84738 3.23308C10.9385 3.45012 11.9408 3.98585 12.7275 4.77252C13.5141 5.55919 14.0499 6.56147 14.2669 7.65261C14.484 8.74376 14.3726 9.87476 13.9468 10.9026C13.5211 11.9304 12.8001 12.8089 11.8751 13.427C10.9501 14.0451 9.86252 14.375 8.75 14.375C7.25866 14.3733 5.82888 13.7802 4.77435 12.7256C3.71981 11.6711 3.12665 10.2413 3.125 8.75Z" fill="#828282"/>
                                </svg>
                                <input type="text" id="currency-search"  value={bankSearchTerm}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void => setBankSearchTerm(e.target.value)}
                                className="bg-neutral-secondary-strong border-none outline-0 text-heading text-sm rounded focus:ring-brand focus:border-brand block w-full px-2.5 py-2 placeholder:text-body" placeholder="Search for users" required />
                            </div>
                            <ul className="max-h-48 p-2 text-sm text-body font-medium overflow-y-auto" aria-labelledby="dropdownSearchButton">
                                {filteredbanks.length === 0 && (
                                <li className="text-sm text-gray-400 px-3 py-2">
                                    No results found
                                </li>
                                )}
                                {filteredbanks.map(
                                (bank: string) => (
                                    <li
                                    key={bank}
                                    onClick={(): void => {
                                        setSelectedBank(bank);
                                        setBankDropdownState(false);
                                        setBankSearchTerm("");
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F5F5F5] ${selectedBank === bank ? 'bg-[#F5F5F5]': ''} cursor-pointer`}
                                    >
                                    <span>{bank}</span>
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
                <div className='mt-8'>
                    <div className='mb-3'>Account number</div>
                    <input
                        className="inline-flex w-full items-start self-end justify-between text-[#013941] bg-brand box-border border border-[#E0E0E0] rounded-3xl shadow-xs font-medium leading-5 rounded-base text-sm p-4 focus:outline-none" 
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10} 
                        onChange={(e) => {
                            const onlyNumbers = e.currentTarget.value.replace(/\D/g, "");
                            setAccountNumber(onlyNumbers);}
                        }
                        value={accountNumber}
                        />
                </div>
                <div className='mt-8'>
                    <div className='mb-3'>Account name</div>
                    <input
                        className="inline-flex w-full items-start self-end justify-between text-[#013941] bg-[#F2F2F2] box-border border border-[#E0E0E0] rounded-3xl shadow-xs font-medium leading-5 rounded-base text-sm p-4 focus:outline-none" 
                        type="text" 
                        readOnly={true}
                        value={"ODUTUGA GBEKE"}
                        />
                </div>
                <div className='mt-8'>
                <button
                  className='bg-[#013941] hover:cursor-pointer w-full rounded-3xl p-4 text-white'
                  >
                    Next
                  </button>
                        </div>
            </div>
        </form>
    )
}

export default ReceiptDetailsForm