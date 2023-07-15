import React from 'react'
import Skeleton from 'react-loading-skeleton';
const SkeletonLoader = ({cards}) => {
  return (
    <React.Fragment>
        {Array(cards).fill(0).map((item,i) =>( 
            <div className='skeletonContainer' key={i} style={{marginRight:"1rem"}}>
                <div className='skeletonWrapper' style={{marginBottom:"1rem"}}>
                    <div className='skeletonLeft'>
                        <Skeleton height={280} />
                    </div>
                </div>
                <Skeleton height={40}/>
            </div>
        ))}
    </React.Fragment>
  )
}

export default SkeletonLoader