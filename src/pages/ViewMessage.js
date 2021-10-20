import React, {useState, useEffect} from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Box, Button } from "../styles";
function ViewMessage({message, onHandleBack, onHandleReply}){
    //const [sender, setSender] = useState("");
    const [userList, setUserList] = useState([]);
    
    useEffect(() => {
        // load users
        fetch(`/users`).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setUserList(data);
                    //setSender(data.find(x => x.id === message.sender).user_name);
                });
            }
        }); 
    }, []);

    function sender_name(){
        return (userList.length > 0) ? userList.find(x => x.id === message.sender).user_name : "";
    }

    function handleBack() {
        onHandleBack();
    }

    function handleReply() {
        onHandleReply(message.subject.indexOf("Re: ") === -1 ? "Re: " + message.subject : message.subject , sender_name());
    }

    return (
            <Item key={message.id}>
                <Box>
                <p>
                    <h3>{message.subject}</h3>
                    &nbsp;·&nbsp;
                    <cite>By {sender_name()}</cite>
                </p>
                <ReactMarkdown>{message.memo}</ReactMarkdown>
                <Button variant="outline" color = "primary" onClick={handleBack}>
                    Back
                </Button>
                &nbsp;&nbsp;
                <Button variant="outline" color = "primary" onClick={handleReply}>
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