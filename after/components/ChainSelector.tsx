
const ChainSelectorEnhance = ({ suppliesChain, setSuppliesChain }) => {
    const { openChainSelector, setOpenChainSelector, openChainSelectorModal } =
        useChainSelector();
    const { chains: receiveChains } = useWallet();
    return (
        <ChainSelector
            title={"Switch Token Chain"}
            openChainSelector={openChainSelector}
            setOpenChainSelector={setOpenChainSelector}
            chains={receiveChains}
            selectedChain={suppliesChain}
            setSelectedChain={setSuppliesChain}
        />
    )
}

export default ChainSelectorEnhance