import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Box , Button } from "../styles";
function BidItem({user, bid, onUpdateBid, onDeleteBid, onJoinBid}) {
    
    function handleDeleteBid() {
        if (user.id === bid.user_id) {
            fetch(`/bids/${bid.id}`, {
                method: "DELETE",
              }).then((r) => {
                if (r.ok) {
                  onDeleteBid(bid);
                }
              });
        }
    }    
    function handleUpdateBid() {
        if (user.id === bid.user_id) {
            onUpdateBid(bid);
        }
    }
    function handleJoinBid() {
        onJoinBid(bid.id);
    }

    return (
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
              {(!bid.end_session) ? (
                  <Button variant="outline" color = "primary" onClick={handleUpdateBid}>
                    Uodate Bid session
                  </Button>
              ) : (
                <></>
              )}
              &nbsp;&nbsp;
              <Button variant="outline" color = "primary" onClick={handleDeleteBid}>
                Delete Bid session
              </Button>
              &nbsp;&nbsp;
              {(!bid.end_session) ? (
                  <Button variant="outline" color = "primary" onClick={handleJoinBid}>
                    Join Bid session
                  </Button>
              ) : (
                <></>
              )}
            </Box>
        </Item>
    );
}
const Item = styled.article`
  margin-bottom: 24px;
`;
export default BidItem;