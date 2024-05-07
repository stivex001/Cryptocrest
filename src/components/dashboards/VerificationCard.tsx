import { MdVerified } from "react-icons/md";
import { useUserContext } from "../../context/UserContext";

export default function VerificationCard() {
	const { state } = useUserContext();
	const verified = state.verification?.status === "verified" ? true : false;

	return (
		<div className="w-full rounded-md border border-stroke  bg-primary text-white py-4 px-7 shadow-default ">
			<div className="w-full my-2 flex items-end justify-between">
				<div>
					<span className="text-xl font-semibold mb-2 block">Verification Status</span>

					<h4 className="text-lg font-medium text-white mb-1 flex items-center gap-x-2">
						<span className={`${verified ? "text-meta-3" : "text-warning"} text-2xl`}>
							<MdVerified />
						</span>
						Not Verified
					</h4>
				</div>
			</div>
		</div>
	);
}
