import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InBox from "./InBox";
import OutBox from "./OutBox";
import ViewMessage from "./ViewMessage";
function Message() {
    const [page, setPage] = useState("inbox");
    const [prevPage, setPrevPage] = useState("");
    const [viewID, setViewID] = useState("");
    function handleOnViewFromInbox(id) {
        //
        setPrevPage("inbox");
        setPage("view");
        setViewID(id);
    }
    function goBack() {
        setViewID("");
        if (prevPage != "") {
            setPage(prevPage);
        } else {
            setPage("inbox");
        }
    }

    return (
        <Wrapper>
        {(page == "inbox") ? (
            <InBox onView={handleOnViewFromInbox} />
        ) : (
            (page == "outbox") ? (
                <OutBox />
            ) : (
                (page == "view") ? (
                    <ViewMessage
                        id={viewID}
                        onHandleBack={goBack}
                    />
                ) : (
                    <>
                    </>
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