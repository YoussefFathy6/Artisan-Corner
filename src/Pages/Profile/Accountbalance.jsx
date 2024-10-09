import { useState } from 'react';
import { HiMail } from "react-icons/hi";
import "../Home/Component/Slider/Hero.css"

import { Label, TextInput } from "flowbite-react";
function Accountbalance() {
    const [selectedAccount, setSelectedAccount] = useState('bank');

    return (
        <>
        <div className='animate-slide-up'>
            <div className="mt-12 ml-5 mb-14  flex justify-between items-center">
                <h1 className="text-5xl  text-[#344646]" style={{fontFamily:"Abril Fatface, serif"}}>Account Profits</h1>
            </div>

            <div className="flex justify-around bg-[#f2fffc] w-[90%] h-[30%] p-10 text-center ml-24 mb-14">
                <div className="w-[25%] flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-semibold pb-5">Total Balance</h1>
                    <h1 className="text-center pb-5 text-teal-600 font-semibold text-2xl">00.00 $</h1>
                    <h1 className="text-xl text-center">
                        The entire balance in your account now includes profits and the pending balance as well.
                    </h1>
                </div>

                <div className="w-[25%] flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-semibold pb-5">Suspended Balance</h1>
                    <h1 className="text-center pb-5 text-2xl text-teal-600 font-semibold">00.00 $</h1>
                    <h1 className="text-xl text-center">
                        Your profits are suspended for 14 days before you can use them.
                    </h1>
                </div>

                <div className="w-[25%] flex flex-col justify-center items-center ">
                    <h1 className="text-3xl font-semibold pb-5">Profits can be withdrawn</h1>
                    <h1 className="text-center pb-5 text-2xl text-teal-600 font-semibold">00.00 $</h1>
                    <h1 className="text-xl text-center">
                        The amount you have earned from selling services and can be withdrawn to your bank account or PayPal.
                    </h1>
                </div>
            </div>

            <div className="bg-[#f2fffc] w-[90%] p-10 ml-24 mb-72">
                <h1 className="text-3xl font-semibold border-b-4 border-zinc-50 pb-5 w-full">
                    Request to Withdraw Profits
                </h1>
                <p className="mt-7 text-2xl text-gray-700">
                    You can request to withdraw your profits from HandiCraft via your bank account or PayPal account.
                </p>

                <div className="flex justify-between mt-24">
                    <div className="w-full">
                        <button
                            className={`border-b-4 text-xl font-semibold mr-5 ${selectedAccount === 'bank' ? 'border-green-500 text-black' : 'border-transparent text-gray-400'
                                }`}
                            onClick={() => setSelectedAccount('bank')}
                        >
                            Bank Account
                        </button>

                        <button
                            className={`text-xl font-semibold ${selectedAccount === 'paypal' ? 'border-b-4 border-green-500 text-black' : 'text-gray-400'
                                }`}
                            onClick={() => setSelectedAccount('paypal')}
                        >
                            PayPal
                        </button>
                    </div>
                </div>

                {selectedAccount === 'bank' ? (
                    <div className="mt-28 mb-10">
                        <p className="text-center mt-5 text-gray-500 text-2xl">You do not have any bank accounts</p>
                        <div className="flex justify-center mt-5">
                            <button className="bg-[#3d5050cc] text-white px-5 py-2 rounded">Add a bank account</button>
                        </div>
                    </div>
                ) : (
                    <div>
                    <div className="mt-28 mb-10  flex justify-around w-[100%]">
                        <div className="max-w-lg w-[50%]">
                            <div className="mb-2 block">
                                <Label htmlFor="email4" value="Your Paypal account email" className='text-xl' />
                            </div>
                            <TextInput id="email4" type="email" icon={HiMail} placeholder="name@Paypal.com" required style={{ height: '56px', fontSize: '18px', fontWeight: 'bold' }} />
                       <p className='mt-3'>Enter your active PayPal account email</p>
                        </div>
                        
                            <div className="max-w-lg  w-[50%]">
                                <div className="mb-2 block">
                                    <Label htmlFor="Amount" value="Amount" className='text-xl' />
                                </div>
                                <TextInput id="Amount" placeholder="" addon={<span style={{ fontSize: '24px' }}>$</span>} required style={{ height: '56px', fontSize: '18px', padding: '0 0px', fontWeight: 'bold' }} />
                            <p className='mt-3'>Enter the amount you wish to withdraw from your winnings with a minimum of $10.00</p>
                            </div>
                        </div>
                        <button className="bg-[#3d5050cc] text-white px-5 py-3 mt-10 rounded">Send The Request</button>

                        </div>
                )}
            </div>
            </div>
        </>
    );
}

export default Accountbalance;
