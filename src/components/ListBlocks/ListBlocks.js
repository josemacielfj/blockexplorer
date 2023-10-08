import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "./listblocks.css";
import PropTypes from "prop-types";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function ListBlocks({ block, setSelBlock }) {
  const [lastBlocks, setLastBlocks] = useState([]);

  useEffect(() => {
    let newBlockList = [];
    for (let i = block; i > block - 10; i--) newBlockList.push(i);
    setLastBlocks(newBlockList);
  }, [block]); // Refresh block lists only if block number changes

  return (
    <div>
      <div>Last 10 blocks:</div>
      <div className="smallContent">Click to view block details</div>
      <div className="listOfBlocks">
        {lastBlocks.map((b) => {
          return (
            <div>
              <a className="link" href="#" onClick={() => setSelBlock(b)}>
                {b}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

ListBlocks.propTypes = {
  block: PropTypes.number.isRequired,
  setSelBlock: PropTypes.func.isRequired,
};
