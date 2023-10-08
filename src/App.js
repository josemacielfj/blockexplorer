import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ListBlocks from "./components/ListBlocks/ListBlocks";
import BlockDetails from "./components/BlockDetails/BlockDetails";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [selectedBlock, setSelectedBlock] = useState();
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [editableBlockNumber, setEditableBlockNumber] = useState();
  const [editableTransactionNumber, setEditableTransactionNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  const stopEditingBlock = (e) => {
    if (e.key === "Enter") {
      changeSelectedBlock(Number(e.target.value));
    }
  };

  const updateStatusBlock = (e) => {
    setEditableBlockNumber(e.target.value);
  };

  const changeSelectedBlock = (newBlock) => {
    setSelectedBlock(newBlock);
    setEditableBlockNumber(newBlock);
  };

  const changeSelectedTransaction = (newTransaction) => {
    setSelectedTransaction(newTransaction);
    setEditableTransactionNumber(newTransaction);
  };

  const stopEditingTransaction = (e) => {
    if (e.key === "Enter") {
      changeSelectedTransaction(e.target.value);
    }
  };

  const updateStatusTransaction = (e) => {
    setEditableTransactionNumber(e.target.value);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div>
          Block Number: {blockNumber}
          <ListBlocks block={blockNumber} setSelBlock={changeSelectedBlock} />
          <div className="smallContent">
            Type a block number and press ENTER to view details:
          </div>
          <div>
            <input
              className="input-block"
              type="text"
              value={editableBlockNumber ? editableBlockNumber : ""}
              onKeyDown={stopEditingBlock}
              onChange={updateStatusBlock}
            />
          </div>
        </div>
        <div>
          <div className="titleContent">Block Details</div>
          <div className="blockdetails">
            <BlockDetails
              selectedBlock={selectedBlock}
              selectTransaction={changeSelectedTransaction}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="titleContent">Details</div>
        <div className="transactiondetails">
          Type a transaction hash and press ENTER:
          <div>
            <input
              className="input-transaction"
              type="text"
              value={editableTransactionNumber ? editableTransactionNumber : ""}
              onKeyDown={stopEditingTransaction}
              onChange={updateStatusTransaction}
            />
          </div>
          <div>
            <TransactionDetails selectedTransaction={selectedTransaction} />
          </div>
        </div>
      </div>
      <div>&nbsp;</div>
    </div>
  );
}

export default App;
