import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Select } from 'antd'
import { BsCoin } from "react-icons/bs";
import axios from 'axios';
function Converter() {
    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates"

    const defaultFirstValue = "BitCoin"
    const defaultSecondValue = "Ether"

    const [cryptoList, setCryptoList] = useState([]);
    const [inputValue, setInputValue] = useState(0);
    const [firstSelect, setFirstInput] = useState(defaultFirstValue)
    const [secSelect, setSecondInput] = useState(defaultSecondValue)
    const [result, setResult] = useState("0");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetch(apiUrl)
            const res = await data.json();

            const tempArray = Object.entries(res.rates).map((items) => {
                return {
                    value: items[1].name,
                    label: items[1].name,
                    rate: items[1].value
                };
            });
            setCryptoList(tempArray)
        } catch (er) {
            console.log("error occured", error);
        }
    }

    useEffect(() => {
        if (cryptoList.length == 0) return;

        const fSel = cryptoList.find(item => {
            return item.value == firstSelect;
        })?.rate;

        const sSel = cryptoList.find(item => {
            return item.value == secSelect;
        })?.rate;
        if (fSel && sSel) {
            setResult(((inputValue * sSel) / fSel).toFixed(4))
        }

    }, [inputValue, firstSelect, secSelect])


    return (
        <div className='h-screen w-full flex justify-center items-center bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300'>
            <Card className='min-w-[300px] items-center' title={<div> <h1 className='flex gap-3 items-end text-3xl font-semibold text-black mb-4'> <BsCoin/> Crypto Convertor</h1></div>}>
                <Form size='large'>
                    <Form.Item>
                        <Input
                            type='number'
                            placeholder='Enter Value'
                            onChange={(event) => setInputValue(event.target.value)}
                        />
                    </Form.Item>
                </Form>

                <div className='flex gap-5 justify-between mt-4'>
                    <Select
                        options={cryptoList}
                        defaultValue="select"
                        onChange={(value) => setFirstInput(value)}
                        className='w-50'
                    />
                    <Select
                        options={cryptoList}
                        defaultValue="select"
                        onChange={(value) => setSecondInput(value)}
                        className='w-50'
                    />
                </div>

                <p className={`mt-4 text-xl ${inputValue && result ? 'text-green-500 font-bold transition-all duration-300 ease-in-out' : 'text-red-500 font-medium'} 
        transform ${inputValue && result ? 'scale-105' : 'scale-100'}`}>
                    {inputValue} {firstSelect} = {result} {secSelect}
                </p>

            </Card>
        </div>
    );
}

export default Converter