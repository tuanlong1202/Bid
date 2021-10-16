import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Box, Button } from "../styles";
import Tender from "./Tender";
function JoinBid({user, bid, goBack}) {
    console.log(bid)
    function handleBack() {
        goBack();
    }
    function handleEndSession() {
      //load tenders
      //find the max value
      //update bid session with last_price and end_session=true => if good goback else console.log err

      // ***** NOTE *******
      // Bid session , which has end ,  have to frozen: Button Join in Bid's list must gray, and Not allow new tender
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
                <cite>By {user.user_name}</cite>
              </p>
              <ReactMarkdown>{bid.description}</ReactMarkdown>
              <Button variant="outline" color = "primary" onClick={handleBack}>
                Back
              </Button>
              &nbsp;&nbsp;
              <Button variant="outline" color = "primary" onClick={handleEndSession}>
                End session
              </Button>
            </Box>
        </Item>
        <Tender
          bid_id={bid.id}
          tenders={bid.tenders}
        >
        </Tender>
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