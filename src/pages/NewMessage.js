import { useState } from "react";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewMessage({ user }) {
  const [subject, setSubject] = useState("");
  const [memo, setMemo] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        memo,
        sender:user.id,
        receiver:,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
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
