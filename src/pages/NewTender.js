import { useState } from "react";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewTender({ bid_id , onAdd}) {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/bids/${bid_id}/tenders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        description,
      }),
    })
    .then(response => response.json())
    .then((data) => {
        setDescription("");
        setPrice("");
        onAdd();
    })
    .catch((error) => {
        setErrors(error.errors)
        console.error('Error:', error);
    });
  }

  return (
      <>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              Submit Tender
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
    </>
  );
}

export default NewTender;
