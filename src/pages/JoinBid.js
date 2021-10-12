import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Box } from "../styles";
function JoinBid({user, bid, goBack}) {
    const history = useHistory();
    function handleBack() {
        goBack();
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
              <button onClick={handleBack}>Back</button>
              <ReactMarkdown>{bid.description}</ReactMarkdown>
            </Box>
        </Item>
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