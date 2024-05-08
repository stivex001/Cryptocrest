import { Link } from "react-router-dom";
import heroImage from "../../images/heroImg.webp";
import referralBonusImg from "../../images/referral-img.jpg";
import VideoBackground from "../sharedUi/VideoBackground";
import Button from "../Button";
import { TickerTape } from "react-ts-tradingview-widgets";
import { useEffect } from "react";

export default function Hero() {
  // useEffect(() => {
  //   const init = async () => {
  //     const { Collapse, Dropdown, Ripple, initTE } = await import(
  //       "tw-elements"
  //     );
  //     initTE({ Collapse, Dropdown, Ripple });
  //   };
  //   init();
  // }, []);

  return (
    <>
      <div className="relative xl:min-h-[90vh] my-28 xl:my-20 ">
        <div
          className="!visible hidden bg-[#e2e5ec]"
          id="referral"
          data-te-collapse-item
        >
          <div className="px-6 max-w-[1240px] mx-auto py-10 xl:px-4 lg:flex justify-between items-center ">
            <div className="lg:w-[55%]">
              <h2 className="font-extrabold text-xl lg:text-3xl mb-5">
                Receive an extra bonus up to US$10,000 in 3 months* with
                Cryptocrest Partner
              </h2>
              <p className="lg:text-lg mb-10">
                For a limited time only, Universal Cryptocrest Trade is proud to
                announce the Cryptocrest Partner Campaign for Referrers!
                Partners, will have the opportunity to earn extra bonus on top
                of your rebate, simply by referring new clients. Your business
                can go further with Crytosphere Partner by Universal Cryptocrest
                Trade*. T&Cs apply.
              </p>
              <Link
                className="bg-darkBlue text-white py-4 rounded-md text-lg px-10 block w-full xl:inline text-center"
                to="/referral"
              >
                Learn More
              </Link>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-[39%]">
              <img
                src={referralBonusImg}
                alt="referal bonus"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
        {/* <button
          className="h-10 w-full bg-[#ff5a23] font-extrabold text-sm"
          type="button"
          data-te-collapse-init
          data-te-target="#referral"
          aria-controls="referral"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          REFERRAL PARTNER BONUS PROMOTION
        </button> */}
        <VideoBackground>
          <div className="min-h-[85vh] md:min-h-[50svh] xl:min-h-[85vh] flex items-center  bg-right text-white1 pt-10 xl:pb-10">
            <div className="px-6 xl:px-0 grid text-center lg:text-left lg:flex lg:gap-20 items-center max-w-[1240px] mx-auto">
              <div className="mb-20 lg:mb-0 xl:w-[55%]">
                <div className="mb-10">
                  <h1 className="text-4xl lg:text-[4rem] lg:leading-[120%]  mb-5">
                    Digital assets, investments and trading
                  </h1>
                  <p className="text-lg mb-4 xl:text-xl">
                    Join millions of users, from beginners to professionals, who
                    use Universal Cryptocrest Trade to purchase crypto, trade,
                    and manage their investments in a smarter way.
                  </p>
                </div>
                <div className="lg:flex items-center gap-2">
                  <Link to="/signup">
                    <Button btnText="Create Account" className="bg-primary" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </VideoBackground>
      </div>
      <div className="relative z-50">
        <TickerTape colorTheme="light"></TickerTape>
      </div>
    </>
    // <section className="my-28 xl:my-20 xl:mb-0 min-h-[80vh] max-w-7xl mx-auto px-6 xl:px-0 xl:flex xl:justify-between xl:items-center xl:gap-x-10">
    //   <div className="text-center mb-20 xl:text-left xl:mb-0">
    //     <span className="text-xl block mb-10 text-gray-500">
    //       BREAK THROUGH BREAK FREE
    //     </span>
    //     <h1 className="text-3xl xl:text-6xl font-bold mb-5 tracking-wide leading-[120%]">
    //       The Most Efficient Forex Trading and Investment Platform
    //     </h1>
    //     <p className="text-lg text-gray-500 mb-10">
    //       All-in-one crypto wallet and trading platform provides you with the
    //       tools <br /> and security you need to manage, trade, and grow your
    //       digital assets.
    //     </p>
    //     <div className="flex items-center gap-x-8 justify-center xl:justify-start">
    //       <Link
    //         to="/signup"
    //         className="border border-black py-3 px-8 block rounded-md"
    //       >
    //         Sign Up
    //       </Link>
    //       <Link
    //         to="/signin"
    //         className="bg-primary py-3 px-8 block hover:bg-primary-hover text-white rounded-md"
    //       >
    //         Get Started
    //       </Link>
    //     </div>
    //   </div>
    //   <div>
    //     <img src={heroImage} alt="hero" className="" />
    //   </div>
    // </section>
  );
}
