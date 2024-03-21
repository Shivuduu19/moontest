import React from 'react'

const AppToastEnhance = () => {
    const { toastMsg, toastSev, showToast } = useAppToast();
    return (
        <AppToast
            position={{ vertical: "bottom", horizontal: "center" }}
            message={toastMsg}
            severity={toastSev}
        />
    )
}

export default AppToastEnhance