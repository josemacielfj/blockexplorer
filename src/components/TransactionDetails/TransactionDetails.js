import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
//import "./transactiondetails.css";
import PropTypes from "prop-types";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function TransactionDetails({ selectedTransaction }) {
  const [transactionDetails, setTransactionDetails] = useState();

  useEffect(() => {
    const getTransactionDetails = async () => {
      setTransactionDetails(
        await alchemy.core.getTransactionReceipt(selectedTransaction)
      );
    };
    getTransactionDetails();
  }, [selectedTransaction]); // Refresh block lists only if selected transaction changes

  return selectedTransaction && transactionDetails ? (
    <div className="content">
      <b>Transaction</b>: {selectedTransaction}
      <div>&nbsp;</div>
      <div>
        <b>From</b>: {transactionDetails.from}
      </div>
      <div>
        <b>To</b>: {transactionDetails.to}
      </div>
      <div>
        <b>Block</b>: {transactionDetails.blockNumber}
      </div>
      <div>
        <b>Contract created</b>: {transactionDetails.contractAddress}
      </div>
      <div>
        <b>Gas Used</b>: {transactionDetails.gasUsed.toString()}
      </div>
      <div>
        <b>Gas Price</b>:{" "}
        {Utils.formatEther(
          transactionDetails.effectiveGasPrice.toString()
        ).toString() + " ETH"}
      </div>
      <div>
        <b>Transaction Fee</b>:{" "}
        {Utils.formatEther(
          (
            transactionDetails.effectiveGasPrice * transactionDetails.gasUsed
          ).toString()
        ).toString() + " ETH"}
      </div>
      <div>
        <b>Status</b>: {transactionDetails.status === 1 ? "Success" : "Failure"}
      </div>
    </div>
  ) : (
    <div className="content">Select a transaction to show details</div>
  );
}

TransactionDetails.propTypes = {
  selectedTransaction: PropTypes.string.isRequired,
};
