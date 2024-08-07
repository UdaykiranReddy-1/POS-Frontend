"use client"
import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"
import styles from "../../styles/Home.module.css"
import {useRouter} from 'next/navigation';
import blockchainStyles from "../../styles/blockchain.module.css";
import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
const Blockchain = () => {
  const chainSVGPath = '/chain.svg';
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetch("https://pos-backend-plyp.onrender.com/api/get/blocks")
      .then(response => response.json())
      .then(data => setBlocks(data.blocksdata))
      .catch(err => console.error('Error fetching blocks:', err));
  }, []);

  const router = useRouter();

  return (
    <div>
      <section className={styles.main}>
        <Header />

        <div className={blockchainStyles.blockchainContainer}>

          <div className={blockchainStyles.leftAds}>
          </div>

          <div className={blockchainStyles.blockchainScroll}>
            <div className={blockchainStyles.blockchain}>
              {blocks.map((block, index) => (
                <React.Fragment key={index}>
                
                  <div
                    className={blockchainStyles.block}
                    onClick={() => {
                      setSelectedBlock(block);
                      setSelectedTransaction(null);
                      router.push(`/block/${index+1}`);
                    }}
                  >
                    <div className={blockchainStyles.blocknumber}>
                    Block {index + 1} <br />
                    </div>
                    <div className={blockchainStyles.blockdetails}>
                      <div>
                    Transactions: {block.transactions.length} <br /></div>
                    Validator: {block.validator ? block.validator.address : null} <br />
                    PrevHash:{block.prevHash?.slice(0,5)}.....{block.prevHash?.slice(block.prevHash.length-5)} <br />
                    Hash:{block.hash}
                    </div>
                  </div>

                  {index !== blocks.length - 1 &&
                    <img src={chainSVGPath} alt="Chain" className={blockchainStyles.chainImg} />
                  }
                </React.Fragment>
              ))}
          
            </div>
            {/* {selectedBlock && (
              <div>
                <h2>Transactions for Block {blocks.indexOf(selectedBlock) + 1}</h2>
                <ul>
                  {selectedBlock.transactions.map((transaction, idx) => (
                    <li key={idx}>
                      <span
                        className={blockchainStyles.transactionItem}
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        {transaction.txHash}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
{/* 
            {selectedTransaction && (
              <div>
                <h2>Transaction Details</h2>
                <ul>
                  <li>Sender: {selectedTransaction.sender}</li>
                  <li>Recipient: {selectedTransaction.recipient}</li>
                  <li>Amount: {selectedTransaction.amount}</li>
                  <li>Nonce: {selectedTransaction.nonce}</li>
                  <li>Gas Price: {selectedTransaction.gasPrice}</li>
                  <li>Gas Limit: {selectedTransaction.gasLimit}</li>
                  <li>Data: {selectedTransaction.data}</li>
                  <li>Status: {selectedTransaction.status}</li>
                  <li>Block Hash: {selectedTransaction.blockHash}</li>
                  <li>Signature: {selectedTransaction.signature}</li>
                </ul>
              </div>
            )} */}
          </div>
          <div >
            
          </div>


          <div className={blockchainStyles.rightAds}>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Blockchain;
