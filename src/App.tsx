import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { UserProvider, UserState, useUserContext } from "./context/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "./components/ui/Loader";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Forex = lazy(() => import("./pages/Forex"));
const Commodities = lazy(() => import("./pages/Commodities"));
const Indices = lazy(() => import("./pages/Indices"));
const Shares = lazy(() => import("./pages/Shares"));
const Treasures = lazy(() => import("./pages/Treasures"));
const Cryptocurrencies = lazy(() => import("./pages/Cryptocurrencies"));
const Metatrader4 = lazy(() => import("./pages/Metatrader4"));
const Metatrader5 = lazy(() => import("./pages/Metatrader5"));
const LearnCfds = lazy(() => import("./pages/LearnCfds"));
const LearnForex = lazy(() => import("./pages/LearnForex"));
const LearnShares = lazy(() => import("./pages/LearnShares"));
const TradingGuides = lazy(() => import("./pages/TradingGuides"));
const LearnForexDetails = lazy(() => import("./pages/LearnForexDetails"));
const LearnSharesDetails = lazy(() => import("./pages/LearnSharesDetails"));
const LearnGuideDetails = lazy(() => import("./pages/LearnGuideDetails"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const Deposit = lazy(() => import("./pages/Deposit"));
const Withdrawal = lazy(() => import("./pages/Withdrawal"));
const Asset = lazy(() => import("./pages/Asset"));
const Subscription = lazy(() => import("./pages/Subscription"));
const Verify = lazy(() => import("./pages/Verify"));
const BuyBitcoin = lazy(() => import("./pages/BuyBitcoin"));
const Users = lazy(() => import("./pages/Users"));
const Account = lazy(() => import("./pages/Account"));
const AdminDeposit = lazy(() => import("./pages/AdminDeposit"));
const AdminWithdrawal = lazy(() => import("./pages/AdminWithdrawal"));
const AdminTradingSession = lazy(() => import("./pages/AdminTradingSession"));
const AdminSubscription = lazy(() => import("./pages/AdminSubscription"));
const AdminVerifications = lazy(() => import("./pages/AdminVerifications"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "company/about",
		element: <About />,
	},
	{
		path: "company/contact",
		element: <Contact />,
	},
	{
		path: "market/forex",
		element: <Forex />,
	},
	{
		path: "market/commodities",
		element: <Commodities />,
	},
	{
		path: "market/indices",
		element: <Indices />,
	},
	{
		path: "market/shares",
		element: <Shares />,
	},
	{
		path: "market/treasures",
		element: <Treasures />,
	},
	{
		path: "market/cryptocurrency",
		element: <Cryptocurrencies />,
	},
	{
		path: "platforms/meta4",
		element: <Metatrader4 />,
	},
	{
		path: "platforms/meta5",
		element: <Metatrader5 />,
	},
	{
		path: "education/learn-cfds",
		element: <LearnCfds />,
	},
	{
		path: "education/learn-forex",
		element: <LearnForex />,
	},
	{
		path: "education/learn-shares",
		element: <LearnShares />,
	},
	{
		path: "education/trading-guides",
		element: <TradingGuides />,
	},
	{
		path: "education/learn-forex/:id",
		element: <LearnForexDetails />,
	},
	{
		path: "education/learn-shares/:id",
		element: <LearnSharesDetails />,
	},
	{
		path: "education/trading-guides/:id",
		element: <LearnGuideDetails />,
	},
	{
		path: "signup",
		element: <SignUp />,
	},
	{
		path: "signin",
		element: <SignIn />,
	},
	{
		element: <ProtectedRoutes />,
		children: [
			{
				path: "admin/dashboard",
				element: <Dashboard />,
			},
			{
				path: "admin/users",
				element: <Users />,
			},
			{
				path: "admin/account",
				element: <Account />,
			},
			{
				path: "admin/deposit",
				element: <AdminDeposit />,
			},
			{
				path: "admin/withdrawal",
				element: <AdminWithdrawal />,
			},
			{
				path: "admin/trades",
				element: <AdminTradingSession />,
			},
			{
				path: "admin/subscriptions",
				element: <AdminSubscription />,
			},
			{
				path: "admin/trades",
				element: <AdminTradingSession />,
			},
			{
				path: "user/dashboard",
				element: <UserDashboard />,
			},
			{
				path: "user/deposit",
				element: <Deposit />,
			},
			{
				path: "user/withdrawal",
				element: <Withdrawal />,
			},
			{
				path: "user/assets",
				element: <Asset />,
			},
			{
				path: "user/subscriptions",
				element: <Subscription />,
			},
			{
				path: "user/user-verify",
				element: <Verify />,
			},
			{
				path: "user/settings",
				element: <Settings />,
			},
			{
				path: "user/buy-bitcoin",
				element: <BuyBitcoin />,
			},
		],
	},
]);

function App() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Suspense fallback={<Loader />}>
			<UserProvider>
				<Toaster position="top-right" reverseOrder={false} />
				<RouterProvider router={router} />
			</UserProvider>
		</Suspense>
	);
}

export default App;
