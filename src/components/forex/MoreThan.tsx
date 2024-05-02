export default function MoreThan() {
  return (
    <div className="bg-black text-white py-16">
      <section className="max-w-7xl mx-auto my-24 px-6">
        <h2 className="text-2xl xl:text-4xl text-center font-semibold mb-16">
          More than a forex trading platform
        </h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
          <TradingOptionsCard
            img={
              "https://assets.cmcmarkets.com/web_redesign/icon_comp_fx_pairs_white.svg"
            }
            title="We've got your pair"
            description="More forex pairs than any other broker*. If you want it, we've probably got it."
            url="/forex"
          />
          <TradingOptionsCard
            img={
              "https://assets.cmcmarkets.com/web_redesign/icon_comp_accurate_pricing_white.svg"
            }
            title="Precision pricing"
            description="We combine 8 feeds from tier-one banks, to get you our most accurate price."
            url="/indices"
          />
          <TradingOptionsCard
            img={
              "https://assets.cmcmarkets.com/web_redesign/icon_comp_no_slippage_white.svg"
            }
            title="Minimal slippage"
            description="With fully automated, lightning-fast execution in 0.0045 seconds**.
          "
            url="/crypto"
          />
          <TradingOptionsCard
            img={
              "https://assets.cmcmarkets.com/web_redesign/icon_comp_confirmed_white.svg"
            }
            title="99.7% fill rate^"
            description="No dealer intervention, regardless of your trading size."
            url="/commodities"
          />
          <TradingOptionsCard
            img={
              "https://assets.cmcmarkets.com/web_redesign/icon_comp_24hr_uk_support_white.svg"
            }
            title="UK-based client services"
            description="Award-winning service*, online 24/5, whenever you're trading."
            url="/shares"
          />
          <TradingOptionsCard
            img={
              "	https://assets.cmcmarkets.com/web_redesign/icon_comp_no_partial_fills_white.svg"
            }
            title="No partial fills"
            description="Get the trade you want – we don’t reject or partially fill trades based on size."
            url="/treasuries"
          />
        </div>
      </section>
    </div>
  );
}

interface TradingOptionsCardProps {
  img: string;
  title: string;
  description: string;
  url: string;
}
function TradingOptionsCard({
  img,
  title,
  description,
  url,
}: TradingOptionsCardProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img src={img} alt={title} className="h-16 w-16" />
      <h3 className="py-4 font-extrabold text-xl leading-7">{title}</h3>
      <p className="text-gray-500 w-[95%]">{description}</p>
    </div>
  );
}
