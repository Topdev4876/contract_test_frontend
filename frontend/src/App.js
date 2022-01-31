import logo from './logo.svg';
import './App.css';
import {useMetaMask,MetaMaskProvider} from 'metamask-react';
import contract from './ApesNFT.json';
//import contract from './contract.json';
import childcontract from './MintdropzERC721V2.json'
// import contract from './ERC721Factory.json';
import { ethers } from 'ethers'; 
import { useState } from 'react';

const { ethereum } = window;
// const contractAddress = "0xcB9eFeDbFb43Ac5660219F7E9ce121622514D379";
//  const contractAddress = "0x2f1b6ddfc852531bfd4474dda2d4aeb2be51ce84"
 const contractAddress = "0xf711464F6278ca8f34F01C83bC7d8442cc295927"
const abi = contract.abi;
function App() {
  const { status, connect, account } = useMetaMask();
  const [whiteaddress,setaddress]=useState('')
  const [name,setname]=useState('Monkey')
  const [symbol,setsymbol]=useState('MK')
  const [maxMintdropzPurchase,setmaxMintdropzPurchase]=useState('20')
  const [MAX_MINTDROPZ,setMAX_MINTDROPZ]=useState('10000')
  const [mintdropzPrice,setmintdropzPrice]=useState('0.03')
  const [DENOMINATOR,setDENOMINATOR]=useState('100')
  const [mintdropzReserve,setmintdropzReserve]=useState('125')
  const [royaltyReceiver,setroyaltyReceiver]=useState('0xce9659d0D1821aF4b575d058dd670eff851826ce')
  const [royaltyPercent,setroyaltyPercent]=useState('10')
  const [childcontr,setchild]=useState('')
  const [id,setid]=useState("0")

  async function startPublicsale(){
    const childabi=childcontract.abi;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(childcontr, childabi,signer);

    await nftContract.flipPublicSale()
  }


  async function mint(){
    // console.log('mint')
    // const childabi=childcontract.abi;
    // const provider = new ethers.providers.Web3Provider(ethereum);
    // const signer = provider.getSigner();
    // const nftContract = new ethers.Contract("0xE7c4FEce5A4AdBDc73f984981Ca25CD9c6D60b70", childabi,signer);


    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);
    //  await nftContract.setBreedingAvailable()
    // let nftTxn = await nftContract.adopt('2', {
    //   value: ethers.utils.parseEther("0.1")
    // });
    // console.log(nftTxn)
    //  await nftContract.initialize();
    //await nftContract.initialize(10000,6000000000000,10000,200,'0xce9659d0D1821aF4b575d058dd670eff851826ce',100,10);
    // await nftContract.withdraw()
    // var str = web3.toAscii("0x657468657265756d");
    // await nftContract.setMerkleTree("0x657468657265756d000000000000000000000000000000000000000000000000")
    // await nftContract.addwhitelister('0xce9659d0D1821aF4b575d058dd670eff851826ce')

    let etherAmount=0.01
    await nftContract.mintNFT('1',{
      value: ethers.utils.parseEther(etherAmount.toString())
    })
    // await nftContract.setMintAvailable()
    //  await nftContract.setBaseURI("https://mintdropz-staging.herokuapp.com/temp/metadata/token/");
    // await nftContract.mintNFT("1",{ value: ethers.utils.parseEther('0.1') });
  }
  async function create(){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);
    await nftContract.initialize();
    // await nftContract.freemint();
    //  let etherAmount = 0.005
    //  await nftContract.mintNFT('1',{
    //   value: ethers.utils.parseEther(etherAmount.toString())
    // })
    // for(let i = 1;i<500;i++)
    //   console.log(await nftContract.ownerOf(i))
    // await nftContract.transferOwnership("0xEA1B88c99CeA20b440462C42DBA9ff0402Ec6B41")
    //  await nftContract.createContract(name,symbol,maxMintdropzPurchase,MAX_MINTDROPZ,ethers.utils.
    //                       parseEther(mintdropzPrice),DENOMINATOR,mintdropzReserve,
    //                       royaltyReceiver,royaltyPercent).then(async ()=>{
    //   })
    //   console.log(`name ${name} symbol ${symbol} \n maxMintdropzPurchase ${maxMintdropzPurchase} MAX_MINTDROPZ ${MAX_MINTDROPZ} \n mintdropzPrice ${mintdropzPrice.toString()} DENOMINATOR ${DENOMINATOR}\n mintdropzReserve ${mintdropzReserve} royaltyReceiver ${royaltyReceiver}\n royaltyPercent ${royaltyPercent}`)
    // await nftContract.initialize()
    //  await nftContract.createContract(
    //   name,
    //   symbol,
    //   maxMintdropzPurchase,
    //   MAX_MINTDROPZ,
    //   ethers.utils.parseEther(mintdropzPrice),
    //   DENOMINATOR,
    //   mintdropzReserve,
    //   royaltyReceiver,
    //   royaltyPercent
    // )
    //  console.log(await nftContract.getMyContract());
  }
  async function get(){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);

    setchild(await nftContract.getMyContract());
    console.log(`child address is ${childcontr}`)
  }
  async function setwhite(){
    console.log(id)
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);
    
    let etherAmount=0.1
    await nftContract.adopt(id,{
      value: ethers.utils.parseEther(etherAmount.toString())
    });
    
  }
  async function upgrade(){
    const childabi=childcontract.abi;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(childcontr, childabi,signer);

      await nftContract.addwhitelister(whiteaddress)
  }
  return (
    <MetaMaskProvider>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <input type='text' value={whiteaddress} onChange={e=>setaddress(e.target.value)}> </input> */}
        <div className='button'>
          <input type="text" value={whiteaddress} onChange={e => setaddress(e.target.value)}></input>
          <button onClick={upgrade}>Set Whitelister</button>
        </div>
        <div className='button'>
          <input type="text" value={id} onChange={e => setid(e.target.value)}></input>
          <button onClick={setwhite}>Upgrade</button>
        </div>
        <button onClick={get}>GetMycontract</button>
        <button onClick={connect}>connect</button>
        <button onClick={mint}>Mint</button>
        <button onClick={startPublicsale}>Start Public Sale</button>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={e => setname(e.target.value)}></input>
          <label>symbol</label>
          <input type="text" value={symbol} onChange={e => setsymbol(e.target.value)}></input>
        </div>
        <div>
          <label>maxMintdropzPurchase</label>
          <input type="text" value={maxMintdropzPurchase} onChange={e => setmaxMintdropzPurchase(e.target.value)}></input>
          <label>MAX_MINTDROPZ</label>
          <input type="text" value={MAX_MINTDROPZ} onChange={e => setMAX_MINTDROPZ(e.target.value)}></input>
        </div>
        <div>
          <label>mintdropzPrice</label>
          <input type="text" value={mintdropzPrice} onChange={e => setmintdropzPrice(e.target.value)}></input>
          <label>DENOMINATOR</label>
          <input type="text" value={DENOMINATOR} onChange={e => setDENOMINATOR(e.target.value)}></input>
        </div>
        <div>
          <label>mintdropzReserve</label>
          <input type="text" value={mintdropzReserve} onChange={e => setmintdropzReserve(e.target.value)}></input>
          <label>royaltyReceiver</label>
          <input type="text" value={royaltyReceiver} onChange={e => setroyaltyReceiver(e.target.value)}></input>
        </div>
        <div>
          <label>royaltyPercent</label>
          <input type="text" value={royaltyPercent} onChange={e => setroyaltyPercent(e.target.value)}></input>
        </div>
        
        <button onClick={create}> Create </button>
      </header>
    </div>
    </MetaMaskProvider>
  );
}

export default App;
