import React from 'react'
import Loadingsippner from '../image/Loader1.gif'

export const PageLoader = () => {
    return (
        <div className="loader-page">
            <img src={Loadingsippner} className="pg-laoder" alt="loading" ></img>
        </div>
    )
}
export default PageLoader