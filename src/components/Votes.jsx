import React from 'react'
import VoteButton from './VoteButton'
import VotingList from './VotingList'

function Votes({proposal, allVotes, trip}) {
  return (
    <div>
       
<VotingList allVotes={allVotes} proposal trip tripId/>
    </div>
  )
}

export default Votes