import React, { FormEvent, useState } from "react";
import { cryptoPairs, forexPairs } from "./data";

type Props = {};

export const TradingSession = (props: Props) => {
  const [tradeOption, setTradeOption] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [pairs, setPairs] = useState("");
  const [amount, setAmount] = useState(0);
  const [lotSize, setLotSize] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    alert("submitted");
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="px-3 py-5 text-black border-b border-b-white">
        <h3 className="uppercase text-lg font-semibold">trading session</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="col-span-12 xl:col-span-3  px-3 py-6"
      >
        <div>
          <label className="mb-3 block text-black font-bold">
            Trade Options
          </label>
          <div className="relative z-20  mb-3">
            <select
              value={tradeOption}
              onChange={(e) => setTradeOption(e.target.value)}
              required
              className="relative text-sm z-20 w-full appearance-none rounded border border-stroke bg-white py-3 px-5 outline-none transition focus:border-white active:border-white "
            >
              <option value="">Select Trading Option</option>
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-3 block text-black font-bold">Trade Type</label>
          <div className="relative z-20 mb-3">
            <select
              value={tradeType}
              required
              onChange={(e) => setTradeType(e.target.value)}
              className="relative text-sm z-20 w-full  appearance-none rounded border border-stroke bg-white py-3 px-5 outline-none transition focus:border-white active:border-white dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="">Select Trade Type</option>
              <option value="CRYPTO">CRYPTO</option>
              <option value="FOREX">FOREX</option>
            </select>
          </div>
        </div>
        {tradeType && (
          <div>
            <label className="mb-3 block text-black font-bold">Pairs</label>
            <div className="relative z-20 mb-3">
              <select
                value={pairs}
                required
                onChange={(e) => setPairs(e.target.value)}
                className="relative text-sm z-20 w-full text-black appearance-none rounded border border-stroke bg-white py-3 px-5 outline-none transition focus:border-white active:border-white dark:border-form-strokedark dark:bg-form-input"
              >
                <option value="">Select Pairs</option>
                {tradeType === "FOREX" &&
                  forexPairs.map((pair, id) => {
                    return (
                      <>
                        <option key={id} value={pair}>
                          {pair}
                        </option>
                      </>
                    );
                  })}
                {tradeType === "CRYPTO" &&
                  cryptoPairs.map((pair, id) => {
                    return (
                      <>
                        <option key={id} value={pair}>
                          {pair}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
          </div>
        )}
        <div className="mb-3">
          <label className="mb-3 block text-black font-bold">Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            type="text"
            placeholder="500"
            className="w-full text-black rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-white active:border-white disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-white"
          />
        </div>
        <div className="mb-3">
          <label className="mb-3 block text-black font-bold">Lot Size</label>
          <div className="relative z-20 bg-white dark:bg-form-input mb-3">
            <select
              value={lotSize}
              required
              onChange={(e) => setLotSize(e.target.value)}
              className="relative text-black text-sm z-20 w-full appearance-none rounded border border-stroke bg-white py-3 px-5 outline-none transition focus:border-white active:border-white dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="">Select Lot Size</option>
              <option value="2LS">2LS</option>
              <option value="5LS">5LS</option>
              <option value="10LS">10LS</option>
              <option value="15LS">15LS</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="mb-3 block text-black font-bold">Take Profit</label>
          <input
            type="text"
            value={takeProfit}
            required
            onChange={(e) => setTakeProfit(e.target.value)}
            placeholder="1.001"
            className="w-full text-black rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-white active:border-white disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-white"
          />
        </div>
        <div className="mb-3">
          <label className="mb-3 block text-black font-bold">Stop Loss</label>
          <input
            type="text"
            value={stopLoss}
            required
            onChange={(e) => setStopLoss(e.target.value)}
            placeholder="1.0013"
            className="w-full text-black rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-white active:border-white disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-white"
          />
        </div>
        <div className="mb-5">
          <label className="mb-3 block text-black font-bold">
            Time in Force
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input mb-3">
            <select
              required
              className="relative text-black text-sm z-20 w-full appearance-none rounded border border-stroke bg-white py-3 px-5 outline-none transition focus:border-white active:border-white dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="">Select Time in Force</option>
              <option value="">5 Minutes</option>
              <option value="">10 Minutes</option>
              <option value="">15 Minutes</option>
              <option value="">30 Minutes</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled
          className="inline-flex w-full items-center justify-center rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 cursor-pointer"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};
