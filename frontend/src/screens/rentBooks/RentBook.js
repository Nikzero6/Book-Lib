import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { listBooks } from "../../actions/booksActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { rentBookAction } from "../../actions/userActions";

function RentBooks({ history, search }) {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state["bookList"]);
  const { loading, error, books } = bookList;

  const userLogin = useSelector((state) => state["userLogin"]);
  const { userInfo } = userLogin;

  const bookRent = useSelector((state) => state["bookRent"]);
  const { error: errorRent, success: successRent } = bookRent;

  useEffect(() => {
    dispatch(listBooks());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successRent]);

  const rentHandler = (id) => {
    if (window.confirm("Do you want to rent this book?")) {
      dispatch(rentBookAction(id));
    }
  };

  return (
    <MainScreen
      title={`${userInfo && userInfo.name} rent your favourite books..`}
    >
      {console.log(books)}
      {console.log(successRent)}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorRent && <ErrorMessage variant="danger">{errorRent}</ErrorMessage>}
      {loading && <Loading />}
      {books &&
        books
          .filter((filteredBook) =>
            filteredBook.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((book) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={book._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {book.title}
                    </Accordion.Toggle>
                  </span>
                  {userInfo && !userInfo.isAdmin && (
                    <div>
                      <Button onClick={() => rentHandler(book._id)}>
                        Rent
                      </Button>
                    </div>
                  )}
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {book.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{book.short_desc}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {book.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default RentBooks;
