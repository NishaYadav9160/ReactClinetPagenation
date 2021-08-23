import React, { useState}  from 'react'
import PageLoader from './PageLoader'

const Pageimplement=()=>{
    const [loading, setloading] = useState(false)
    return [
               loading ? <PageLoader /> : null,
               () => setloading(true),
               () => setloading(false)
            ]
}

export default Pageimplement
