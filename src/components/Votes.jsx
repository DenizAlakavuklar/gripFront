import React, { useState, useContext, useEffect } from 'react'
import VotingList from './VotingList'

function Votes({proposal, allVotes, trip}) {

  return (
    <div>
<VotingList allVotes={allVotes} proposal={proposal} trip={trip}/>
    </div>
  )
}
export default Votes
