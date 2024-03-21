# Task-Fragmentation
AN assignment to test the fragmentation ability of Developers

My Pick - Fragmentation of UI

I completed this in one and half hour then started writing readme 

## My Reasons for Fragmentating it like that

- It has a mix of states and hooks(functions) which are related to different elements. so, I thought to fragment it based on this functions.

-  I divided it into 5 components and one main(root) page based on states related to the component.

- firstly, I went into the tsx and analysed it based on elements which are using variables(props) and started to seperate them based on that, and after that went to state hooks and attached them to the components which are useless without them and also reduced the chance of rendering at the main component

- then, analysed useEffect hooks and based on the variables it using i put them in the appropriate components where these variables which are used by useEffect are available

- after that functions like "refetchTransactions" it's using setBurnTransactions so i put it in BurnStatsContainer component

- by fragmenting based on states it reduces the re rendering at the root and imroves performance

- I think i have made the fragmentation accordingly even though the Burnstatscontainer is looking longer but it has just tsx so i thought to not fragment it further