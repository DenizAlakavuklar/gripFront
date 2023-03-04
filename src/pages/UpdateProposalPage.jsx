import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'

import ProposalUpdateForm from '../components/ProposalUpdateForm'


function UpdateProposalPage() {

  const { tripId, proposalId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [proposal, setProposal] = useState()

  const fetchProposalToUpdateData = async () => {
    try {
      const response = await fetch(`http://localhost:5005/proposals/${tripId}/${proposalId}`)
      //console.log("This is the resp", response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const parsed = await response.json()
      console.log(parsed)
      setProposal(parsed[0])
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProposalToUpdateData()
  }, [proposalId])


  return (
    <div>

    <h1>Update your proposal</h1>
      {isLoading ? (
        <h1>Loading ...</h1>
      ) : (
        <ProposalUpdateForm
        currentTitle={proposal.title}
        currentImage={proposal.image}
        currentLocation={proposal.location}
        currentType={proposal.type}
        currentTotalPrice={proposal.totalPrice}
        currentNights={proposal.nights}
        currentLink={proposal.link}
        currentLink2={proposal.link2}
        isUpdating
        proposalId={proposalId}
      />
    )}
  </div>
  )
}

export default UpdateProposalPage