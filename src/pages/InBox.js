import React, {useState, useEffect} from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";
function InBox({onView}){
    const [inboxList, setInboxList] = useState([]);
    useEffect(() => {
        // load inbox
        fetch("/inbox").then((r) => {
          if (r.ok) {
            r.json().then((messages) => setInboxList(messages));
          }
        });
      }, []);
    function handleViewClick(id){
        onView(id);
    }
    return (
        <Item>
            {inboxList.length > 0 ? (
              <ol>{
                inboxList.map((m) => (
                  <MessageItem 
                    key={m.id}
                    m={m}
                    viewClick={handleViewClick}
                  />
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
export default InBox;