import React, {useState, useEffect} from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Box, Button } from "../styles";
function ViewMessage({id, onHandleBack}){
    const [message, setMessage] = useState(null);
    const [userSender, setUserSender] = useState(null);
    useEffect(() => {
        // load message
        fetch(`/messages/${id}`).then((r) => {
          if (r.ok) {
            r.json().then((message) => setMessage(message));
            if (message.unread) {
                setUnReadToFalse();
            }
          }
        });
    }, []);
    useEffect(() => {
        // load message
        fetch(`/user`).then((r) => {
            if (r.ok) {
                r.json().then((users) => {
                    setUserSender((users) => {
                        users.select(function(x) { if (x.id == message.sender)  return true})
                    })
                });
            }
        });        
    },[]);

    function setUnReadToFalse() {
        fetch(`/messages/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              unread: false,
            }),
        }).then((r) => {
              if (r.ok) {
                  //
              } else {
                r.json().then((err) => console.log(err.errors));
              }
        });
    }

    function handleBack() {
        onHandleBack();
    }

    return (
            <Item key={message.id}>
                <Box>
                <p>
                    <h3>{message.subject}</h3>
                    &nbsp;·&nbsp;
                    <cite>By {userSender.user_name}</cite>
                </p>
                <ReactMarkdown>{message.memo}</ReactMarkdown>
                <Button variant="outline" color = "primary" onClick={handleBack}>
                    Back
                </Button>
                &nbsp;&nbsp;
                <Button variant="outline" color = "primary" onClick={handleEndSession}>
                    Reply
                </Button>
                </Box>
            </Item>
    )
}
const Item = styled.article`
  margin-bottom: 24px;
`;

export default ViewMessage