import React, {useState, useEffect} from "react";
import styled from "styled-components";
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
    function onViewClick(id){
        onView(id);
    }
    return (
        <Item>
            {inboxList.length > 0 ? (
              <ol>{
                inboxList.map((m) => (
                <li key={m.id}>
                    <a onClick={onViewClick(m.id)}>{ m.unread ? "<strong>" : ""}{m.subject}{ m.unread ? "</strong>" : ""}</a>
                </li>
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