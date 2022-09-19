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

  const [display, setDisplay] = useState("main_advisors");
  function UpdateDisplay() {
    display == "main_advisors"
      ? setDisplay("main_advisors hori")
      : setDisplay("main_advisors");
  }

  function Profile() {
    return (
      <div className="advisors_item">
        {records.data.advisorProfileCollection.items.map((record) => {
          if (record.avatarUrl != null) {
            return (
              <div key={record.sys.id}>
                <div>
                  <div className="container">
                    <div className="col-12">
                      <CardImg
                        className="card-img"
                        src={
                          record.avatarUrl.url != null
                            ? record.avatarUrl.url
                            : "./assets/images/alberto.png"
                        }
                        alt={record.avatarUrl.title}
                      />
                    </div>
                    <CardText> Title: {record.avatarUrl.title}</CardText>
                  </div>
                  <div className="advisors_info basic">
                    <h2 className="advisors_name">
                      Họ và tên: {record.displayName}
                    </h2>
                    <span className="bold">
                      Phone:
                      {record.phone != null ? record.phone : "...update"}
                    </span>
                    <br />
                    <span>
                      Email: {record.email != null ? record.email : "...update"}
                    </span>
                    <span className="advisors_status">
                      Status : {record.status}
                    </span>
                    <span>
                      Ngày vào công ty:
                      {dateFormat(record.publishedAt, "dd/mm/yy")}
                    </span>
                    <div className="advisors_info plus">
                      {record.categoriesCollection.items.map((record) => {
                        if (record.avatarUrl != null)
                          return (
                            <div className="container" key={record.sys.id}>
                              <div className="container">
                                <CardImg
                                  className="card-img2"
                                  src={
                                    record.avatarUrl.url != null
                                      ? record.avatarUrl.url
                                      : "./assets/images/alberto.png"
                                  }
                                  alt={record.avatarUrl.title}
                                />
                                <span>Title :{record.avatarUrl.title}</span>
                              </div>
                              <span className="bold">chuyên ngành: </span>
                              <span> {record.displayName}</span>
                            </div>
                          );
                      })}
                      {record.skillsCollection.items.map((record) => {
                        return (
                          <div key={record.sys.id}>
                            <span className="bold">skills :</span>
                            <span>
                              {record.displayName != null
                                ? record.displayName
                                : "update"}
                            </span>
                          </div>
                        );
                      })}
                      {record.servicesCollection.items.map((record) => {
                        return (
                          <div key={record.sys.id}>
                            <span className="bold">services: </span>
                            <span>{record.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          } else <div></div>;
        })}
      </div>
    );
  }
  //UpdateDisplay();
  return (
    <div className="App">
      <h1 className="Search">Search</h1>
      <div className="search-container">
        <div className="search-inner">
          <input
            type="text"
            value={value}
            placeholder="Search"
            onChange={onChange}
          />
          <button onClick={() => onSearch(value)}>Search</button>
        </div>
        <div className="dropdown">
          {records.data.advisorProfileCollection.items
            .filter((item) => {
              //console.log(item);
              const searchTerm = value.toLowerCase();
              //const Status1 = item.status.toLowerCase();
              const displayname = item.displayName.toLowerCase();

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
                  onSearch(item.status);
                }}
                className="dropdown-row"
                key={item.sys.id}
              >
                {item.displayName}
                {item.status}
                {/* <div>
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
                </div> */}
              </div>
            ))}
        </div>
      </div>
      <Profile />
    </div>
  );
}

export default App;
