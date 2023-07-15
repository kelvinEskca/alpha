import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonCardLoader = ({cards}) => {
  return (
    <div className='skeletelCardContainer'>
        {Array(cards).fill(0).map((item,i) =>( 
            <div className='skeletalCard'>
                <Skeleton style={{marginRight:"1rem", borderRadius:"2rem"}} height={650}/>
            </div>
        ))}
    </div>
  )
}

export default SkeletonCardLoader