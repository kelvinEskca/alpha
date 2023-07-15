import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonHeroLoader = ({cards}) => {
  return (
    <React.Fragment>
        {Array(cards).fill(0).map((item,i) =>( 
            <div className='skeletalHero'>
                <Skeleton style={{borderRadius:"2rem"}} height={325}/>
            </div>
        ))}
    </React.Fragment>
  )
}

export default SkeletonHeroLoader