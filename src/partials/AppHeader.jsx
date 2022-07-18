import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../utils/Dropdown';
import ModalBasic from '../utils/ModalBasic';
import MM from "../images/blockchian/mm.png"
import CBW from "../images/blockchian/cbw.png"
import WC from "../images/blockchian/wc.png"
import TP from "../images/blockchian/tp.png"
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../utils/connectors";
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';


function AppHeader() {
  const { t, i18n } = useTranslation();

  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const [connectModalOpen, setConnectModalOpen] = useState(false);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  useEffect(() => {
    
    console.log("error",error)
  },[error]);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return address;
    return `${match[1]}...${match[2]}`;
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, []);

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);

  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  return (
    <div className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg className="w-8 h-8 fill-current text-purple-600" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />
              </svg>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link to="/features" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">Pricing</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">Blog</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">About us</Link>
              </li>
              {/* 1st level: hover */}
              <Dropdown title="Support">
                {/* 2nd level: hover */}
                <li>
                  <Link to="/contact" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">Contact us</Link>
                </li>
                <li>
                  <Link to="/help" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">Help center</Link>
                </li>
                <li>
                  <Link to="/404" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">404</Link>
                </li>
              </Dropdown>
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                {
                  !active ? (<button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConnectModalOpen(true); }}  className="font-medium w-full inline-flex items-center justify-center border border-purple-600 hover:border-purple-700 px-4 py-2 my-2 rounded-sm text-purple-600 bg-transparent  transition duration-150 ease-in-out">
                    {t('Connect wallet')}
                  </button>):
                  (
                    <button onClick={(e)=>{e.preventDefault(); e.stopPropagation();setWalletModalOpen(true)}} className='font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out'>
                      {
                        truncateAddress(account)
                      }
                    </button>
                  )
                }
              </li>
              
            </ul>

          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">

            {/* Hamburger button */}
            <button ref={trigger} className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <nav id="mobile-nav" ref={mobileNav} className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: .8 } }>
              <ul className="bg-gray-800 px-4 py-2">
                <li>
                  <Link to="/features" className="flex text-gray-300 hover:text-gray-200 py-2">Features</Link>
                </li>
                <li>
                  <Link to="/pricing" className="flex text-gray-300 hover:text-gray-200 py-2">Pricing</Link>
                </li>
                <li>
                  <Link to="/blog" className="flex text-gray-300 hover:text-gray-200 py-2">Blog</Link>
                </li>
                <li>
                  <Link to="/about" className="flex text-gray-300 hover:text-gray-200 py-2">About us</Link>
                </li>
                <li className="py-2 my-2 border-t border-b border-gray-700">
                  <span className="flex text-gray-300 py-2">Support</span>
                  <ul className="pl-4">
                    <li>
                      <Link to="/contact" className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Contact us</Link>
                    </li>
                    <li>
                      <Link to="/help" className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Help center</Link>
                    </li>
                    <li>
                      <Link to="/404" className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">404</Link>
                    </li>
                  </ul>
                </li>
                {/* <li>
                  <Link to="/signin" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Sign in</Link>
                </li> */}
                <li>
                  {
                    !active ? (<button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConnectModalOpen(true); }}  className="font-medium w-full inline-flex items-center justify-center border border-purple-600 hover:border-purple-700 px-4 py-2 my-2 rounded-sm text-purple-600 bg-transparent  transition duration-150 ease-in-out">
                      {t('Connect wallet')}
                    </button>):
                    (
                      <button onClick={(e)=>{e.preventDefault(); e.stopPropagation();setWalletModalOpen(true)}} className='font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out'>
                        {
                          truncateAddress(account)
                        }
                      </button>
                    )
                  }
                  
                </li>
              </ul>
            </nav>

          </div>

        </div>
      </div>
      
      <ModalBasic id="connectModal" modalOpen={connectModalOpen} setModalOpen={setConnectModalOpen} title={t('Connect wallet')}>
        {/* Modal content */}
        <div className="px-5 pt-4 pb-4 space-y-4 ">
          <button className="btn border-slate-200 hover:border-slate-300 text-white w-full  flex justify-between px-16" onClick={() => {
                activate(connectors.injected);
                setProvider("injected");
                setConnectModalOpen();
              }}>
            <img src={TP} className='w-7 h-7 fill-current  shrink-0' />
            <span className='font-bold'>Token Pocket</span>
          </button>
          <button className="btn border-slate-200 hover:border-slate-300 text-white w-full  flex justify-between px-16 " onClick={() => {
                activate(connectors.injected);
                setProvider("injected");
                setConnectModalOpen(false);
              }}>
            
            <img src={MM} className='w-6 h-6 fill-current  shrink-0' />
            <span className='font-bold'>MetaMask</span>
          </button>
          {/* <button className="btn border-slate-200 hover:border-slate-300 text-slate-600 w-full  flex justify-between px-16" onClick={() => {
                activate(connectors.coinbaseWallet);
                setProvider("coinbaseWallet");
                setWalletModalOpen(false);
              }}>
            
            <img src={CBW} className='w-6 h-6 fill-current  shrink-0' />
            <span >Coinbase Wallet</span>
          </button> */}
          <button className="btn border-slate-200 hover:border-slate-300 text-white w-full  flex justify-between px-16"onClick={() => {
                activate(connectors.walletConnect);
                setProvider("walletConnect");
                setConnectModalOpen(false);
              }}>
            
            <img src={WC} className='w-7 h-7 fill-current text-slate-500 shrink-0' />
            <span className='font-bold'>Wallet Connect</span>
          </button>
          
        </div>
        
      </ModalBasic>
      <ModalBasic id="walletModal" modalOpen={walletModalOpen} setModalOpen={setWalletModalOpen} title={t("Account")}>
        {/* Modal content */}
        <div className="px-5 pt-4 pb-4  space-y-4">
          <div className=' text-xs text-slate-300'>{t('Connected wallet address')}</div>
          <div className=' text-sm break-all '>{account}</div>

          <div className='flex justify-around text-purple-600  w-full'>
            <div className='flex flex-nowarp space-x-1 cursor-pointer'>
              <span>{t("Details")}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </div>
            <div className='flex flex-nowarp  space-x-1 cursor-pointer' onClick={()=>{
              navigator.clipboard.writeText(account)
              toast.success(t("Copy successfully"))
            }
              }>
              <span>{t("Copy")}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div className='flex flex-nowarp space-x-1 text-red-500 cursor-pointer' onClick={() => {
                disconnect();
                setWalletModalOpen(false);
              }}>
              <span className='text-red '>{t("Log out")}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

        </div>
        
      </ModalBasic>

    </div>
  );
}

export default AppHeader;
