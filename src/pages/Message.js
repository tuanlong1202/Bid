import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InBox from "./InBox";
import NewMessage from "./NewMessage";
import OutBox from "./OutBox";
import ViewMessage from "./ViewMessage";
import { Button } from "../styles"
function Message({user}) {
    const [subject, setSubject] = useState("");
    const [receiver, setReceiver] = useState("");
    const [pages, setPages] = useState([
        {
          name: "inbox",
          recordID: 0
        }
      ]);
    function handleOnViewFromInbox(id) {
        //
        const updatePages = [...pages, {name: "view", recordID:id}];
        setPages(updatePages);
    }
    function goBackFromView() {
        pages.pop;
        setPages(pages);
    }

    function goReply(subject, receiver) {
        const updatePages = [...pages, {name: "new", recordID:0}];
        setPages(updatePages);
        setSubject(subject);
        setReceiver(receiver);
    }

    function goBackFromNewMessage(){
        pages.pop;
        setPages(pages);
    }

    function clickInbox(){
        const updatePages = [{name: "inbox", recordID:0}]
        setPages(updatePages);
    }

    function clickOutbox() {
        const updatePages = [{name: "outbox", recordID:0}]
        setPages(updatePages);
    }

    function clickSendMessage() {
        const updatePages = [...pages, {name: "new", recordID:0}];
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
        {(pages[pages.length -1].name == "inbox") ? (
            <InBox onView={handleOnViewFromInbox} />
        ) : (
            (pages[pages.length -1].name == "outbox") ? (
                <OutBox />
            ) : (
                (pages[pages.length -1].name == "view") ? (
                    <ViewMessage
                        id={pages[pages.length -1].recordID}
                        onHandleBack={goBackFromView}
                        onHandleReply={goReply}
                    />
                ) : (
                    (pages[pages.length -1].name == "new") ? (
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