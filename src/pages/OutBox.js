import React, {useState, useEffect} from "react";
import styled from "styled-components";
function OutBox(){
    const [outboxList, setOutboxList] = useState([]);
    useEffect(() => {
        // load inbox
        fetch("/outbox").then((r) => {
          if (r.ok) {
            r.json().then((messages) => setOutboxList(messages));
          }
        });
      }, []);
    return (
        <Item>
            {outboxList.length > 0 ? (
              <ol>{
                outboxList.map((m) => (
                <p key={m.id}>
                    {m.subject}
                </p>
                ))
              }</ol>
            ) : (
                <>
                <h2>No Message Found</h2>
                </>
            )}
        </Item>
    )
}
const Item = styled.article`
  margin-bottom: 24px;
`;
export default OutBox;