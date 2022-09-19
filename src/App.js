import React from "react";
import "./App.css";
import records from "./db.json";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSearch = (searchN) => {
    setValue(searchN);
    console.log("search", searchN);
  };

  function Profile() {
    return (
      <div className="container">
        {records.data.advisorProfileCollection.items.map((record) => {
          if (record.avatarUrl != null) {
            return (
              <div className="container" key={record.sys.id}>
                <div className="row-lg-4 col-md-12">
                  <Card>
                    <div className="row-lg-4 col-md-12">
                      <div>
                        <CardImg
                          width="10px"
                          src={record.avatarUrl.url}
                          alt={record.avatarUrl.title}
                        />
                        <CardText> Title: {record.avatarUrl.title}</CardText>
                      </div>
                      ;
                    </div>
                    <CardBody className="col-md-12 mt-1">
                      <CardTitle>Họ và tên: {record.displayName}</CardTitle>
                      <CardTitle>Phone: {record.phone}</CardTitle>
                      <CardTitle>Email: {record.email}</CardTitle>
                      <CardTitle>status: {record.status}</CardTitle>
                      <CardText>
                        Ngày vào công ty:
                        {dateFormat(record.publishedAt, "dd/mm/yy")}
                      </CardText>
                      <Card>
                        <CardBody className="col-md-12 mt-1">
                          {record.categoriesCollection.items.map((record) => {
                            if (record.avatarUrl != null)
                              return (
                                <div className="container" key={record.sys.id}>
                                  <div className="col-12 mt-3">
                                    <CardImg
                                      width="100%"
                                      src={record.avatarUrl.url}
                                      alt={record.avatarUrl.title}
                                    />
                                    <CardText>
                                      Title :{record.avatarUrl.title}
                                    </CardText>
                                  </div>
                                  <CardTitle>
                                    chuyên ngành: {record.displayName}
                                  </CardTitle>
                                </div>
                              );
                          })}
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody className="col-md-12 mt-1">
                          {record.skillsCollection.items.map((record) => {
                            if (record != null || record != []) {
                              return (
                                <div className="container" key={record.sys.id}>
                                  <CardTitle>
                                    skills: {record.displayName}
                                  </CardTitle>
                                </div>
                              );
                            } else
                              <div>
                                <p>skills : null</p>
                              </div>;
                          })}
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody className="col-md-12 mt-1">
                          {record.servicesCollection.items.map((record) => {
                            return (
                              <div className="container" key={record.sys.id}>
                                <CardTitle>services: {record.name}</CardTitle>
                              </div>
                            );
                          })}
                        </CardBody>
                      </Card>
                    </CardBody>
                  </Card>
                </div>
              </div>
            );
          } else
            <div>
              <p>null</p>
            </div>;
        })}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Search</h1>
      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}>Search</button>
        </div>
        <div className="dropdown">
          {records.data.advisorProfileCollection.items
            .filter((item) => {
              //console.log(item);
              const searchTerm = value.toLowerCase();
              const displayname = item.displayName.toLowerCase();
              {
                item.categoriesCollection.items.filter((item2) => {
                  //console.log(item2);
                  const searchTerm = value.toLowerCase();
                  const displayname2 = item2.displayName.toLowerCase();
                  return (
                    searchTerm &&
                    displayname2.startsWith(searchTerm) &&
                    displayname2 != searchTerm
                  );
                });
              }
              return (
                searchTerm &&
                displayname.startsWith(searchTerm) &&
                displayname != searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => {
                  onSearch(item.displayName);
                }}
                className="dropdown-row"
                key={item.displayName}
              >
                {item.displayName}
                <div>
                  {item.categoriesCollection.items.map((item) => (
                    <div
                      onClick={() => {
                        onSearch(item.displayName);
                      }}
                      className="dropdown-row"
                      key={item.displayName}
                    >
                      {item.displayName}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Profile />
    </div>
  );
}

export default App;
