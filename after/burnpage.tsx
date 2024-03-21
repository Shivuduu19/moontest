import AppToastEnhance from "./components/AppToast";
import BurnButtonBar from "./components/BurnButtonBar";
import BurnStatsContainer from "./components/BurnStatsContainer";
import ChainSelectorEnhance from "./components/ChainSelector";

const BurnPageStyled = styled.div``;

enum BurnTxProgress {
    default = "Burn App Tokens",
    burning = "Burning...",
}

export const BurnPage = () => {
    const {
        walletAddress,
        isWalletConnected,
        walletBalance,
        isBalanceError,
        openChainModal,
        walletChain,
        chains,
        openConnectModal,
    } = useWallet();
    const {
        supplies,
        allSupplies,
        setSuppliesChain,
        suppliesChain,
        fetchSupplies,
    } = useAppSupplies(true);

    const ethersSigner = useEthersSigner({
        chainId: walletChain?.id ?? chainEnum.mainnet,
    });

    const [approveTxHash, setApproveTxHash] = useState<string | null>(null);


    const statsSupplies = supplies;
    const tokenAddress = fetchAddressForChain(
        suppliesChain?.id,
        isOldToken ? "oldToken" : "newToken"
    );

    return (
        <div>
            <DashboardLayoutStyled className="burnpage">
                <div
                    className="top_conatiner burnpage"
                    style={{ alignItems: "flex-start" }}
                >
                    <div className="info_box filled">
                        <h1 className="title">App TOKEN BURN</h1>
                        <p className="description medium"></p>
                        <BurnButtonBar
                            iswalletConnected={isWalletConnected}
                            walletChain={walletChain}
                            tokenAddress={tokenAddress}
                            ethersSigner={ethersSigner}
                        />
                    </div>
                    <BurnStatsContainer openChainModal={openChainModal}
                        walletChain={walletChain}
                        suppliesChain={suppliesChain}
                        tokenAddress={tokenAddress}
                        statsSupplies={statsSupplies}
                        ChainScanner={ChainScanner}
                    />
                </div>
            </DashboardLayoutStyled>
            <TransactionTableStyled />
            <ChainSelectorEnhance suppliesChain={suppliesChain}
                setSuppliesChain={setSuppliesChain}
            />
            <AppToastEnhance />

        </div>
    );
};