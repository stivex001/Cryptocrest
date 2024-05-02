import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth, db } from "../lib/firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export interface UserState {
  uid: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  mobile: string;
  country: string;
  password: string;
  gender: string;
  account: AccountState;
  deposits: DepositState[];
  withdrawals: WithdrawalState[];
  verification: VerificationState;
  subscription: SubscriptionState;
  trades: TradeState[];
}

interface User {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  mobile: string;
  country: string;
  password: string;
  gender: string;
  uid: string;
}

export interface AccountState {
  balance: string;
  profit: string;
  bonus: string;
}

interface DepositState {
  amount: string;
  date: string;
  method: string;
  status: string;
  id: string | null;
  screenshot: string | null;
}

interface WithdrawalState {
  amount: string;
  date: string;
  method: string;
  status: string;
}

interface TradeState {
  entry: string;
  lotSize: string;
  pairs: string;
  profit: string;
  status: string;
  stopLoss: string;
  takeProfit: string;
  tradeOption: string;
  tradeType: string;
  result: string;
  date: string;
}
interface SubscriptionState {
  plan: string;
  amount: string;
  duration: string;
  date: string;
}
interface VerificationState {
  document: string;
  status: string;
}

interface UserContextType {
  state: UserState;
  fetchUserData: (uid: string) => void;
  addDeposit: (payload: DepositState) => void;
  addWithdrawal: (payload: WithdrawalState) => void;
  updateSubscription: (payload: SubscriptionState) => void;
  updateVerification: (payload: VerificationState) => void;
}

const initialState: UserState = {
  uid: "",
  username: "",
  email: "",
  firstname: "",
  lastname: "",
  mobile: "",
  country: "",
  password: "",
  gender: "",
  account: { balance: "0", profit: "0", bonus: "0" },
  trades: [],
  withdrawals: [],
  deposits: [],
  verification: { document: "", status: "" },
  subscription: { plan: "", amount: "", duration: "", date: "" },
};

// Step 3: Define Action Types
type Action =
  | { type: "GET_USER"; payload: User }
  | { type: "GET_ACCOUNT"; payload: AccountState }
  | { type: "GET_DEPOSITS"; payload: DepositState[] }
  | { type: "ADD_DEPOSIT"; payload: DepositState }
  | { type: "GET_WITHDRAWALS"; payload: WithdrawalState[] }
  | { type: "ADD_WITHDRAWAL"; payload: WithdrawalState }
  | { type: "TRADES"; payload: TradeState[] }
  | { type: "ADD_TRADE"; payload: TradeState }
  | { type: "VERIFICATION_STATUS"; payload: VerificationState }
  | { type: "SUBSCRIPTION"; payload: SubscriptionState }
  | { type: "UPDATE_SUBSCRIPTION"; payload: SubscriptionState }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

const UserContext = createContext<UserContextType>({
  state: initialState,
  fetchUserData: () => null,
  addDeposit: () => null,
  addWithdrawal: () => null,
  updateSubscription: () => null,
  updateVerification: () => null,
});

const userReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, ...action.payload };
    case "GET_ACCOUNT":
      return { ...state, account: action.payload };
    case "GET_WITHDRAWALS":
      return { ...state, withdrawals: action.payload };
    case "GET_DEPOSITS":
      return { ...state, deposits: action.payload };
    case "ADD_DEPOSIT":
      return { ...state, deposits: [...state.deposits, action.payload] };
    case "ADD_WITHDRAWAL":
      return { ...state, withdrawals: [...state.withdrawals, action.payload] };
    case "ADD_TRADE":
      return { ...state, trades: [...state.trades, action.payload] };
    case "VERIFICATION_STATUS":
      return { ...state, ...action.payload };
    case "SUBSCRIPTION":
      return { ...state, subscription: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = state.uid;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchUserData(user.uid);
      }
    });

    return () => {
      unSub();
    };
  }, []);

  const fetchUserData = useCallback(async (uid: string) => {
    const userDocRef = doc(db, "users", uid);
    const accountDocRef = doc(db, "accounts", uid);
    const depositDocRef = doc(db, "deposits", uid);
    const withdrawalDocRef = doc(db, "withdrawals", uid);
    const verificationDocRef = doc(db, "verifications", uid);
    const subscriptionDocRef = doc(db, "subscriptions", uid);
    const tradeDocRef = doc(db, "trades", uid);

    const userDocSnap = await getDoc(userDocRef);
    const accountDocSnap = await getDoc(accountDocRef);
    const depositDocSnap = await getDoc(depositDocRef);
    const withdrawalDocSnap = await getDoc(withdrawalDocRef);
    const verificationDocSnap = await getDoc(verificationDocRef);
    const subscriptionDocSnap = await getDoc(subscriptionDocRef);
    const tradeDocSnap = await getDoc(tradeDocRef);

    if (userDocSnap.exists())
      dispatch({ type: "GET_USER", payload: userDocSnap.data() as User });
    if (accountDocSnap.exists())
      dispatch({
        type: "GET_ACCOUNT",
        payload: accountDocSnap.data().account as AccountState,
      });
    if (depositDocSnap.exists())
      dispatch({
        type: "GET_DEPOSITS",
        payload: depositDocSnap.data().deposits as DepositState[],
      });

    if (withdrawalDocSnap.exists())
      dispatch({
        type: "GET_WITHDRAWALS",
        payload: withdrawalDocSnap.data().withdrawals as WithdrawalState[],
      });
    if (verificationDocSnap.exists())
      dispatch({
        type: "VERIFICATION_STATUS",
        payload: verificationDocSnap.data().verification as VerificationState,
      });
    if (subscriptionDocSnap.exists())
      dispatch({
        type: "SUBSCRIPTION",
        payload: subscriptionDocSnap.data().subscription as SubscriptionState,
      });
    if (tradeDocSnap.exists())
      dispatch({
        type: "TRADES",
        payload: tradeDocSnap.data().trades as TradeState[],
      });
  }, []);

  const addDeposit = useCallback(async (payload: DepositState) => {
    if (payload) {
      try {
        const addDepositRef = doc(db, "deposits", currentUser);
        await updateDoc(addDepositRef, { deposits: arrayUnion(payload) });
        dispatch({ type: "ADD_DEPOSIT", payload });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const addWithdrawal = async (payload: WithdrawalState) => {
    if (payload) {
      try {
        const addWithdrawalRef = doc(db, "withdrawals", currentUser);
        await updateDoc(addWithdrawalRef, { withdrawals: arrayUnion(payload) });
        dispatch({ type: "ADD_WITHDRAWAL", payload });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateSubscription = async (payload: SubscriptionState) => {
    if (payload) {
      try {
        const addSubscriptionRef = doc(db, "subscriptions", currentUser);
        await setDoc(addSubscriptionRef, { subscription: payload });
        dispatch({ type: "SUBSCRIPTION", payload });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateVerification = async (payload: VerificationState) => {
    if (payload) {
      try {
        const addVerificationRef = doc(db, "verifications", currentUser);
        await setDoc(addVerificationRef, payload);
        dispatch({ type: "VERIFICATION_STATUS", payload });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        fetchUserData,
        addDeposit,
        addWithdrawal,
        updateSubscription,
        updateVerification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
