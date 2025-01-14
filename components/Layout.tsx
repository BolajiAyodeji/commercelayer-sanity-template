import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SEOHead from "@components/SEO";
import { LineItemsContainer, LineItemsCount } from "@commercelayer/react-components";
import ShoppingBag from "./ShoppingBag";
import LayoutContext from "@context/LayoutContext";
import LanguageSelector from "./LanguageSelector";
import CountrySelector from "./CountrySelector";
import { Country } from "@typings/models";
import { Transition } from "@headlessui/react";
import locale from "@locale/index";
import { SocialIcon } from "./SocialIcons";

type Props = {
  children: React.ReactNode;
  title?: string;
  socialIcons?: SocialIcon[];
  showMenu?: boolean;
  lang?: string;
  buildLanguages?: Country[];
  countries?: Country[];
  cms: string;
  pageTitle?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  showMenu = true,
  pageTitle,
  lang = "en-us",
  buildLanguages = [],
  countries = []
}) => {
  const [animation, setAnimation] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const handleAnimation = (event: React.MouseEvent) => {
    event.preventDefault();
    setAnimation(!animation);
  };
  const opacity = animation ? "opacity-25 transition ease-in duration-300" : "transition ease-in duration-300";
  return (
    <LayoutContext.Provider value={{ handleAnimation }}>
      <SEOHead productName={pageTitle} />
      <div className="relative bg-gray-50 overflow-hidden ">
        <div className="relative pt-5 pb-10 px-5 lg:px-0 lg:pb-16 max-w-screen-lg mx-auto">
          <div className="max-w-7xl mx-auto">
            <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/" passHref>
                    <span className="sr-only">Commerce Layer</span>
                    <Image
                      className="h-8 w-auto"
                      src="//data.commercelayer.app/assets/logos/full-logo/black/commercelayer_full_logo_black.svg"
                      alt="Commerce Layer Logo"
                      loading="eager"
                      width={200}
                      height={50}
                    />
                  </Link>
                  {showMenu && (
                    <div className="-mr-2 flex items-center md:hidden">
                      <button
                        type="button"
                        className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        id="main-menu"
                        aria-haspopup="true"
                        onClick={() => setBurgerMenu(!burgerMenu)}
                      >
                        <span className="sr-only">Open main menu</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden md:absolute md:inset-y-0 md:right-40 md:flex md:items-center md:justify-end md:space-x-5">
                {showMenu && <CountrySelector options={countries} />}
                {showMenu && <LanguageSelector options={buildLanguages} />}
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                {showMenu && (
                  <a href="#" onClick={handleAnimation}>
                    <div className="flex flex-row items-center">
                      <span className="hidden md:inline-block">{locale[lang].shoppingBag}</span>
                      <LineItemsContainer>
                        <LineItemsCount className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium leading-5 bg-blue-500 hover:bg-blue-400 text-gray-50" />
                      </LineItemsContainer>
                    </div>
                  </a>
                )}
              </div>
            </nav>
          </div>
          <Transition
            show={burgerMenu}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="pt-4 mb-10 flex items-center justify-between">
                  <div className="mr-8 mt-12 absolute right-0">
                    <button
                      type="button"
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      onClick={() => setBurgerMenu(!burgerMenu)}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                  <div className="px-2 pt-5 pb-2" role="none">
                    {showMenu && <CountrySelector options={countries} />}
                    {showMenu && <LanguageSelector options={buildLanguages} />}
                  </div>
                  <div className="px-3 pt-2 pb-20" role="none">
                    {showMenu && (
                      <a href="#" onClick={handleAnimation}>
                        <div className="flex flex-row items-center">
                          <span className="inline-block">Shopping Bag</span>
                          <LineItemsContainer>
                            <LineItemsCount className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium leading-5 bg-blue-500 hover:bg-blue-400 text-gray-50" />
                          </LineItemsContainer>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <ShoppingBag active={animation} handleAnimation={handleAnimation} lang={lang} />
        <main>{children}</main>
        <footer className={`mt-12 border-t border-gray-200 py-8 ${opacity}`}>
          <p className="text-xs mx-5 sm:mx-0 sm:text-base text-black-500 text-center">
            Powered by{" "}
            <a className="underline hover:no-underline" href="//commercelayer.io" target="_blank" rel="noreferrer">
              Commerce Layer
            </a>
            ,{" "}
            <a className="underline hover:no-underline" href="//sanity.io" target="_blank" rel="noreferrer">
              Sanity
            </a>
            , and{" "}
            <a className="underline hover:no-underline" href="//nextjs.org" target="_blank" rel="noreferrer">
              Next.js
            </a>{" "}
            on{" "}
            <a className="underline hover:no-underline" href="//netlify.com" target="_blank" rel="noreferrer">
              Netlify.
            </a>
          </p>
        </footer>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
