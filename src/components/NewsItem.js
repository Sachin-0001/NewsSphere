import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, desc, imageUrl, newsUrl, date } = this.props;
    return (
      <div>
        <div
          className="card mb-3"
          style={{
            width: "100%",
            height: "450px", // Uniform height for all cards
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={imageUrl}
            className="card-img-top"
            alt="news-thumbnail"
            style={{ objectFit: "cover", height: "200px", width: "100%" }}
          />
          <div
            className="card-body"
            style={{
              flex: 1, // Allows the body to expand to fill remaining space
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <div>
              <h5
                className="card-title"
                style={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </h5>
              <p
                className="card-text"
                style={{
                  color: "#555",
                  marginBottom: "15px",
                  maxHeight: "70px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {desc}
              </p>
            </div>
            <div>
              <p className="card-text">
                <small className="text-body-secondary">Last updated {date}</small>
              </p>
              <a
                href={newsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  alignSelf: "flex-start",
                }}
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
