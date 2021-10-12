import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BidItem from "./BidItem";
import { Button } from "../styles";
import UpdateBid from "./UpdateBid";
import JoinBid from "./JoinBid";

function BidList({user}) {
  const [bids, setBids] = useState([]);
  const [updateBid, setUpdatingBid] = useState(null)
  const [joinBid, setJoinBid] = useState(null)

  useEffect(() => {
    fetch("/bids")
      .then((r) => r.json())
      .then(setBids);
  }, []);

  function handleDeleteBid(deletedBid) {
    setBids((bids) =>
      bids.filter((bid) => bid.id !== deletedBid.id)
    );
  }
  function handleUpdatingBid(updatingBid) {
    setUpdatingBid(updatingBid);
  }
  function onHandleUpdateBid(updatedBid) {
    setUpdatingBid(null);
    setBids((bids) =>
      bids.map((bid) => {
        return bid.id === updatedBid.id ? updatedBid : bid;
      })
    );
  }
  function handleJoinBid(bidID) {
    fetch(`/bids/${bidID}`)
      .then((r) => r.json())
      .then(setJoinBid);
  }
  function joinBack() {
    setJoinBid(null);
  }
  if (joinBid) return <JoinBid user={user} bid={joinBid} goBack={joinBack} />
  if (updateBid) return <UpdateBid bid={updateBid} updateBids={onHandleUpdateBid} />;
  return (
    <Wrapper>
      {bids.length > 0 ? (
        bids.map((bid) => (
          <BidItem
            user={user}
            key={bid.id}
            bid={bid}
            onUpdateBid={handleUpdatingBid}
            onDeleteBid={handleDeleteBid}
            onJoinBid={handleJoinBid}
          />
        ))
      ) : (
        <>
          <h2>No Bids Found</h2>
          <Button as={Link} to="/new">
            Make a New Bid session
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default BidList;
