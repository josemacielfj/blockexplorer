import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "./blockdetails.css";
import PropTypes from "prop-types";
import ListTransactions from "../ListTransactions/ListTransactions";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function BlockDetails({ selectedBlock, selectTransaction }) {
  const [blockDetails, setBlockDetails] = useState();

  useEffect(() => {
    const getBlockDetails = async () => {
      setBlockDetails(
        await alchemy.core.getBlockWithTransactions(selectedBlock)
      );
    };
    getBlockDetails();
  }, [selectedBlock]); // Refresh block lists only if selected block changes

  const convertToDateTime = (blockTimestamp) => {
    // Create a Date object using blockTimestamp
    const data = new Date(blockTimestamp);

    // Get date components
    const d = data.getDate();
    const m = data.getMonth() + 1;
    const y = data.getFullYear();
    const h = data.getHours();
    const mm = data.getMinutes();
    const s = data.getSeconds();

    // Fomat date
    const fomatedDate = `${y}-${m < 10 ? "0" : ""}${m}-${
      d < 10 ? "0" : ""
    }${d} ${h < 10 ? "0" : ""}${h}:${mm < 10 ? "0" : ""}${mm}:${
      s < 10 ? "0" : ""
    }${s}`;

    return fomatedDate;
  };

  return selectedBlock ? (
    <div className="content">
      <b>Block</b>: {selectedBlock}
      <div>
        <b>Hash</b>: {blockDetails.hash}
      </div>
      <div>
        <b>Timestamp</b>: {convertToDateTime(blockDetails.timestamp * 1000)}
      </div>
      <div>
        <b>Gas Limit</b>: {blockDetails.gasLimit.toString()}
      </div>
      <div>
        <b>Gas Used</b>: {blockDetails.gasUsed.toString()}
      </div>
      <div>
        <b>Miner</b>: {blockDetails.miner}
      </div>
      <div>
        <b>Transactions</b> ({blockDetails.transactions.length}):
        <ListTransactions
          transactions={blockDetails.transactions}
          selectTransaction={selectTransaction}
        />
      </div>
    </div>
  ) : (
    <div className="content">Select a block to show details</div>
  );
}

BlockDetails.propTypes = {
  selectedBlock: PropTypes.number.isRequired,
  selectTransaction: PropTypes.func.isRequired,
};
