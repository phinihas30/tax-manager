'use client';

import React, { useState, useEffect } from 'react';
import { FiActivity, FiSliders, FiHelpCircle } from 'react-icons/fi';

export default function CalculatorPage() {
  const [calculatorType, setCalculatorType] = useState<'inclusive' | 'exclusive'>('exclusive');
  const [amount, setAmount] = useState<string>('');
  const [gstRate, setGstRate] = useState<string>('18');
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);

  // Custom GST rates in India
  const gstRates = [
    { value: '0', label: '0%' },
    { value: '5', label: '5%' },
    { value: '12', label: '12%' },
    { value: '18', label: '18%' },
    { value: '28', label: '28%' },
  ];

  useEffect(() => {
    calculateGST();
  }, [amount, gstRate, calculatorType]);

  const calculateGST = () => {
    // Guard against invalid inputs
    if (!amount || isNaN(Number(amount)) || Number(amount) < 0) {
      resetCalculation();
      return;
    }

    const amountValue = parseFloat(amount);
    const rateValue = parseFloat(gstRate) / 100;

    if (calculatorType === 'exclusive') {
      // GST Exclusive calculation (adding GST to base price)
      const gst = amountValue * rateValue;
      setGstAmount(gst);
      setNetAmount(amountValue);
      setTotalAmount(amountValue + gst);
    } else {
      // GST Inclusive calculation (extracting GST from total price)
      const net = amountValue / (1 + rateValue);
      const gst = amountValue - net;
      setGstAmount(gst);
      setNetAmount(net);
      setTotalAmount(amountValue);
    }
  };

  const resetCalculation = () => {
    setGstAmount(0);
    setTotalAmount(0);
    setNetAmount(0);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and a single decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">GST Calculator</h1>
        <p className="text-gray-600 mt-1">Calculate GST amounts quickly and accurately</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <div className="dashboard-card bg-white overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center">
                <FiActivity className="h-5 w-5 text-indigo-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">GST Calculator</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calculation Type
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="exclusive"
                      name="calculatorType"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={calculatorType === 'exclusive'}
                      onChange={() => setCalculatorType('exclusive')}
                    />
                    <label htmlFor="exclusive" className="ml-2 block text-sm text-gray-700">
                      Add GST to amount (Exclusive)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="inclusive"
                      name="calculatorType"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={calculatorType === 'inclusive'}
                      onChange={() => setCalculatorType('inclusive')}
                    />
                    <label htmlFor="inclusive" className="ml-2 block text-sm text-gray-700">
                      Extract GST from amount (Inclusive)
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    {calculatorType === 'exclusive' ? 'Base Amount' : 'Total Amount (Including GST)'}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="text"
                      name="amount"
                      id="amount"
                      value={amount}
                      onChange={handleAmountChange}
                      className="block w-full pl-7 pr-12 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gstRate" className="block text-sm font-medium text-gray-700 mb-1">
                    GST Rate
                  </label>
                  <select
                    id="gstRate"
                    name="gstRate"
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {gstRates.map((rate) => (
                      <option key={rate.value} value={rate.value}>
                        {rate.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Calculation Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-md">
                    <p className="text-xs text-gray-500">Net Amount</p>
                    <p className="text-lg font-medium text-gray-800">₹{netAmount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-md">
                    <p className="text-xs text-gray-500">GST Amount ({gstRate}%)</p>
                    <p className="text-lg font-medium text-gray-800">₹{gstAmount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-md">
                    <p className="text-xs text-indigo-700">Total Amount</p>
                    <p className="text-lg font-medium text-indigo-900">₹{totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card bg-white overflow-hidden mt-5">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center">
                <FiSliders className="h-5 w-5 text-indigo-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Detailed GST Breakdown</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Component
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Net Amount
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ₹{netAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {totalAmount > 0 ? ((netAmount / totalAmount) * 100).toFixed(2) : '0.00'}%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        CGST ({parseInt(gstRate) / 2}%)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ₹{(gstAmount / 2).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {parseInt(gstRate) / 2}%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        SGST ({parseInt(gstRate) / 2}%)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ₹{(gstAmount / 2).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {parseInt(gstRate) / 2}%
                      </td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">
                        Total Amount
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900 text-right">
                        ₹{totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900 text-right">
                        100.00%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="dashboard-card bg-white overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center">
                <FiHelpCircle className="h-5 w-5 text-indigo-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">About GST</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">GST (Goods and Services Tax)</span> is a comprehensive indirect tax levied on the manufacture, sale, and consumption of goods and services throughout India.
                </p>
                
                <h3 className="font-medium text-gray-900">GST Calculation Types:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><span className="font-medium">Exclusive GST:</span> The tax amount is added to the original price.</li>
                  <li><span className="font-medium">Inclusive GST:</span> The tax amount is already included in the final price.</li>
                </ul>
                
                <h3 className="font-medium text-gray-900">GST Components:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><span className="font-medium">CGST (Central GST):</span> Collected by the Central Government</li>
                  <li><span className="font-medium">SGST (State GST):</span> Collected by the State Government</li>
                  <li><span className="font-medium">IGST (Integrated GST):</span> For inter-state transactions</li>
                </ul>

                <h3 className="font-medium text-gray-900">Common GST Rates in India:</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {gstRates.map((rate) => (
                    <div key={rate.value} className="p-2 bg-gray-50 rounded text-center">
                      {rate.label}
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  This calculator provides both CGST and SGST calculations at half of the selected rate each. For interstate transactions (IGST), the full rate applies.
                </p>
              </div>
            </div>
          </div>

          <div className="dashboard-card bg-white overflow-hidden mt-5">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">GST Formula</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">To Add GST (Exclusive):</h3>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    <p className="font-mono">GST Amount = Original Price × GST Rate</p>
                    <p className="font-mono mt-1">Total Price = Original Price + GST Amount</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">To Extract GST (Inclusive):</h3>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    <p className="font-mono">Original Price = Total Price ÷ (1 + GST Rate)</p>
                    <p className="font-mono mt-1">GST Amount = Total Price - Original Price</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 