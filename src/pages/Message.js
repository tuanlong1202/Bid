import React, { useState } from "react";
import styled from "styled-components";
import InBox from "./InBox";
import NewMessage from "./NewMessage";
import OutBox from "./OutBox";
import ViewMessage from "./ViewMessage";
import { Button } from "../styles"
function Message({user}) {
    const [subject, setSubject] = useState("");
    const [receiver, setReceiver] = useState("");
    const [pages, setPages] = useState([{name: "inbox"}]);
    const [message, setMessage] = useState({
        id:1,
        subject:1,
        memo:``,
        sender:1,
    });
    
    function loadMessage(id) {
        // load message
        fetch(`/messages/${id}`).then((r) => {
            if (r.ok) {
              r.json().then(setMessage);
            }
        });        
    }

    function setUnReadToFalse(id) {
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

    function handleOnViewFromInbox(id) {
        //
        loadMessage(id);
        setUnReadToFalse(id);        
        const updatePages = [...pages, {name: "view"}];
        setPages(updatePages);
    }
    function goBackFromView() {
        const updatePages = [{name: "inbox"}]
        setPages(updatePages);
    }

    function goReply(subject, receiver) {
        const updatePages = [...pages, {name: "new"}];
        setPages(updatePages);
        setSubject(subject);
        setReceiver(receiver);
    }

    function goBackFromNewMessage(){
        pages.pop();
        setPages(pages);
        setSubject("");
        setReceiver("");
    }

    function clickInbox(){
        const updatePages = [{name: "inbox"}]
        setPages(updatePages);
    }

    function clickOutbox() {
        const updatePages = [{name: "outbox"}]
        setPages(updatePages);
    }

    function clickSendMessage() {
        const updatePages = [...pages, {name: "new"}];
        setPages(updatePages);
        setSubject("");
        setReceiver("");
    }

    return (
        <Wrapper>
            <Button variant="fill" color = "primary" onClick={clickInbox}>
                Inbox
            </Button>
            &nbsp;&nbsp;
            <Button variant="outline" color = "primary" onClick={clickOutbox}>
                Outbox
            </Button>
            &nbsp;&nbsp;
            <Button variant="outline" color = "primary" onClick={clickSendMessage}>
                Send message
            </Button>
        {(pages[pages.length -1].name === "inbox") ? (
            <InBox onView={handleOnViewFromInbox} />
        ) : (
            (pages[pages.length -1].name === "outbox") ? (
                <OutBox />
            ) : (
                (pages[pages.length -1].name === "view") ? (
                    <ViewMessage
                        message={message}
                        onHandleBack={goBackFromView}
                        onHandleReply={goReply}
                    />
                ) : (
                    (pages[pages.length -1].name === "new") ? (
                        <NewMessage 
                            user={user}
                            sub={subject}
                            receiver={receiver}
                            goBack={goBackFromNewMessage}
                        />
                    ) : (
                        <>
                        </>
                    )
                )
            )
        )
        }
        </Wrapper>
    );
}
const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default Message;