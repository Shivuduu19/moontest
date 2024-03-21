import React from 'react'

const BurnStatsContainer = ({ openChainModal, walletChain, suppliesChain, tokenAddress, statsSupplies, ChainScanner }) => {

    const [isOldToken, setIsOldToken] = useState(false);

    const [burnTransactions, setBurnTransactions] = useState < any[] > ([]);

    const refetchTransactions = () => {
        Promise.all(
            ChainScanner.fetchAllTxPromises(isChainTestnet(walletChain?.id))
        )
            .then((results: any) => {
                //console.log(res);
                let res = results.flat();
                res = ChainScanner.sortOnlyBurnTransactions(res);
                res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
                setBurnTransactions(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (!walletChain) return;
        //console.log(suppliesChain);
        let isSubscribed = true;
        // const newTokenAddress = fetchAddressForChain(
        //   walletChain?.id,
        //   isOldToken ? "oldToken" : "newToken"
        // );
        if (isSubscribed) setBurnTransactions([]);
        const isTestnet = isChainTestnet(walletChain?.id);
        let _chainObjects: any[] = [mainnet, avalanche, fantom];
        if (isTestnet) _chainObjects = [sepolia, avalancheFuji, fantomTestnet];
        Promise.all(ChainScanner.fetchAllTxPromises(isTestnet))
            .then((results: any) => {
                //console.log(results, isTestnet);
                if (isSubscribed) {
                    let new_chain_results: any[] = [];
                    results.forEach((results_a: any[], index: number) => {
                        new_chain_results.push(
                            results_a.map((tx: any) => ({
                                ...tx,
                                chain: _chainObjects[index],
                            }))
                        );
                    });
                    let res = new_chain_results.flat();
                    console.log(res, isTestnet);
                    res = ChainScanner.sortOnlyBurnTransactions(res);
                    res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
                    setBurnTransactions(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return () => {
            isSubscribed = false;
        };
    }, [walletChain, isOldToken]);

    return (<>
        <div className="top_bar">
            <AppIcon
                url="/images/token/App_new.svg"
                size={2}
                margin={0}
                fill={IconFilter.unset}
            />
            <p className="label">App SUPPLY</p>
            <AppChip
                onClick={openChainModal}
                title={walletChain?.name || "---"}
                endIcon={"/icons/expand_more.svg"}
                startIcon={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
            ></AppChip>
            <AppExtLink
                className=" supply_label"
                url={`${suppliesChain?.blockExplorers?.default?.url}/address/${tokenAddress}`}
            >
                View Contract
            </AppExtLink>
        </div>
        <div className="supply_bar">
            <AppIcon
                url="/icons/fire.svg"
                size={1.15}
                margin={0}
                fill={IconFilter.primary}
            />
            <AppIcon
                url="/icons/double_arrow.svg"
                size={1.15}
                style={{
                    margin: "0 0 0 -0.8rem",
                }}
                fill={IconFilter.primary}
            />
            <span
                className="line orange"
                style={{ width: `${100 - statsSupplies.circulatingPercent}%` }}
            ></span>
            <span
                className="line green"
                style={{ width: `${statsSupplies.circulatingPercent}%` }}
            ></span>
        </div>
        <div className="supply_label_list">
            <div>
                <p className="supply_label">
                    <span className="hyphen orange"></span>
                    <span className="text">Burnt App Tokens</span>
                    <span className="percent orange">
                        {(100 - statsSupplies.circulatingPercent).toFixed(2)}%
                    </span>
                </p>
                <p className="supply_value">
                    <AppIcon
                        size={1.25}
                        url={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
                        fill={IconFilter.unset}
                        margin={0}
                    />
                    {numberWithCommas(
                        statsSupplies.totalSupply - statsSupplies.circulatingSupply
                    )}
                </p>
                <div className="full_supply">
                    Original App Token Initial Supply:
                    {numberWithCommas(statsSupplies.totalSupply)}
                </div>
            </div>
            <div>
                <p className="supply_label">
                    <span className="hyphen green"></span>
                    <span className="text">Circulating App Tokens</span>
                    <span className="percent green">
                        {statsSupplies.circulatingPercent.toFixed(2)}%
                    </span>
                </p>
                <p className="supply_value">
                    <AppIcon
                        size={1.25}
                        url={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
                        fill={IconFilter.unset}
                        margin={0}
                    />
                    {numberWithCommas(statsSupplies.circulatingSupply)}
                </p>
                {allSupplies
                    .filter((s) => s.chainId != walletChain?.id)
                    .map((s: any) => (
                        <p key={s.chainId} className="supply_value mini">
                            <AppIcon
                                size={1.25}
                                url={`/images/token/${chainTokenSymbols.get(s.chainId) ?? "ETH"
                                    }.svg`}
                                fill={IconFilter.unset}
                                margin={0}
                            />
                            {numberWithCommas(s.circulatingSupply)}
                        </p>
                    ))}
            </div>
        </div>
        <TransactionTableStyled burnTransactions={burnTransactions} />
    </>
    )
}

export default BurnStatsContainer