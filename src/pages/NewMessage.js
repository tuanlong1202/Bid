import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewMessage({ user, sub, receiver, goBack }) {
  const [subject, setSubject] = useState(sub);
  const [to, setTo] = useState(receiver);
  const [memo, setMemo] = useState("");
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    fetch("/users")
      .then((r) => r.json())
      .then(setUsers);
  },[])

  function receiveUser(){
    return users.select(function(x) { if (x.user_name == to)  return true})
  }

  function handleSubmit(e) {
    e.preventDefault();
    const receiveID = receiveUser().id;
    setIsLoading(true);
    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        memo,
        sender:user.id,
        receiver:receiveID,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((data) => console.log(data));
        goBack();
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleGoBack(){
    goBack();
  }

  return (
      <WrapperChild>
        <h2>Create Bid</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="to">To</Label>
            <Input
              type="text"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="memo">Memo</Label>
            <Textarea
              id="memo"
              rows="10"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Message"}
            </Button>
            <Button variant="outline" onClick={handleGoBack}>
              Cancel
            </Button>            
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
  );
}

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewMessage;
