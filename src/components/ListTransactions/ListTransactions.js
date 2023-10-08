import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "./listtransactions.css";
import PropTypes from "prop-types";
import PaginatedList from "../PaginatedList/PaginatedList";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function ListTransactions({ transactions, selectTransaction }) {
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  const [hashList, setHashList] = useState([]);
  const itemsPerPage = 5;

  function reduceStrSize(str, size = 2) {
    const halfsize = Math.round(size / 2);
    if (str.length <= size) return str;
    else return str.slice(0, halfsize) + "..." + str.slice(-halfsize);
  }

  useEffect(
    (e) => {
      setHashList([]);
      transactions.map((t) => {
        setHashList((existingHashes) => {
          return [...existingHashes, t.hash];
        });
      });
    },
    [transactions]
  );

  return (
    <div>
      <PaginatedList
        dataList={hashList}
        itemsPerPage={itemsPerPage}
        onClickAction={selectTransaction}
      />
    </div>
  );
}

ListTransactions.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectTransaction: PropTypes.func.isRequired,
};
