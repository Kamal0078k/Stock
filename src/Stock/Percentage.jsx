import React, { useState, useEffect } from "react";
import axios from "axios";

const StockPercentageCalculator = () => {
  const [diff, setDiff] = useState(0);

  const [percentage, setPercentage] = useState(0);
  const [bought, setBought] = useState(0);
  const [sell, setSell] = useState(0);
  const [prevbought, setPrevbought] = useState(0);
  const [prevsell, setPrevsell] = useState(0);

  useEffect(() => {
    const fetchStockData = async () => {
      const stockSymbol = "TATAMOTORS"; // Replace with the stock symbol

      try {
        const response = await axios.get(
          `
          https://api.stockmarketapi.in/api/v1/getprices?token=bf40cef52eb2dae94bf7c49a96c1b28238db3aed920cf82ab059bfccbd02be6a&nsecode=POWERGRID
          `
        );

        const data = response.data.data;
        const bot = data.POWERGRID.totalBuyQty;
        const sol = data.POWERGRID.totalSellQty;

        // setBought(bot);
        // setSell(sol);
        setPrevbought(bot - bought);
        setPrevsell(sol - sell);
        setBought(bot);
        setSell(sol);
        const per = bot / sell;
        setDiff(-per * 100 + percentage);
        setPercentage(per * 100);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const interval = setInterval(fetchStockData, 86400000); // Fetch stock data every 5 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div>
      <h2>Stock Percentage Calculator</h2>
      <p>Total Quantity Bought: {bought}</p>
      <p>Percentage Change : {prevbought}</p>

      <p>Total Quantity Sold: {sell}</p>
      <p>Percentage Change : {prevsell}</p>
      <p>Percentage: {percentage.toFixed(2)}%</p>
      <p>Difference : {diff.toFixed(2)}%</p>
    </div>
  );
};

export default StockPercentageCalculator;
