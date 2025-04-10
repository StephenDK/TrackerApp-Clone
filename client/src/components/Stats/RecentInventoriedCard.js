import React from 'react'
import { Card } from 'semantic-ui-react'
import moment from 'moment'


const RecentlyInventoriedCard = (props) => {
  // console.log('List Dashboard Props', props)
  return(
    <Card 
      href={props.link}
      header={`${props.make} ${props.model}`}
      meta={props.serial}
      description={moment(props.date).format('MM-DD-YYYY')}
    />
  )
}


export default RecentlyInventoriedCard;
