import { useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Box, Button,Error } from "../styles";
import Tender from "./Tender";

function JoinBid({user, bid, goBack}) {
  const [errors, setErrors] = useState([]);
  const subject = "Invite message";
  const memo = `You have won my bid session.
  
  ## This is an invite letter for the winner.
  
  Please contact us at:
  - Email: 123456@123.com
  - Phone: 123-456-7890
  
  Thanks and best regards.
  `;

  function handleBack() {
        goBack();
    }
    function handleEndSession() {
      //load tenders
      if (user.id === bid.user_id){
        loadTenders();
      } else {
        setErrors([`You cannot end this bid session.`]);
      }
      
      //find the max value
      //update bid session with last_price and end_session=true => if good goback else console.log err

      // ***** NOTE *******
      // Bid session , which has end ,  have to frozen: Button Join in Bid's list must gray, and Not allow new tender
    }

    function loadTenders() {
      fetch(`/bids/${bid.id}/tenders`).then((r) => {
        if (r.ok) {
          r.json().then((tenders) => {
            if (tenders.length > 0) {
              updateBidSession(tenders[0].price,tenders[0].user_id);
            } else {
              setErrors([`No one join this Bid session. You can delete it.`]);
            }
          });
        }
      })
    }

    function updateBidSession(l_price,winnerID) {
      fetch(`/bids/${bid.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          last_price: l_price,
          end_session: true,
        }),
      }).then((r) => {
          if (r.ok) {
              invitedMessage(winnerID);
          }
        });
    }

    function invitedMessage(receiverID) {
      // send invited message to the winner Bid session
      fetch("/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          memo,
          sender:user.id,
          receiver:receiverID,
        }),
      }).then((r) => {
        if (r.ok) {
          goBack();
        }
      });
    }

    return (
        <Wrapper>
        <Item key={bid.id}>
            <Box>
              <h2>{bid.subject}</h2>
              <img src={bid.image} alt=""  width="150" height="200"/>
              <p>
                <h3>Price: {bid.price}</h3>
                &nbsp;·&nbsp;
                <cite>By {bid.user.user_name}</cite>
              </p>
              <ReactMarkdown>{bid.description}</ReactMarkdown>
              <Button variant="outline" color = "primary" onClick={handleBack}>
                Back
              </Button>
              &nbsp;&nbsp;
              {(!bid.end_session) ? (
                <Button variant="outline" color = "primary" onClick={handleEndSession}>
                  End session
                </Button>
              ) : (
                <></>
              )}
              {errors.map((err) => (
              <Error key={err}>{err}</Error>
              ))}
            </Box>
        </Item>
        <Tender user={user} bid={bid} tenders={bid.tenders} />
        </Wrapper>
    );
}
const Item = styled.article`
  margin-bottom: 24px;
`;
const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default JoinBid;